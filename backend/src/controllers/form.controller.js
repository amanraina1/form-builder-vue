import { prisma } from "../prisma.js";
import { validate } from "../lib/validate.js";
import { buildSubmissionSchema, formSchema } from "../lib/schemas.js";

const reshapeForms = (form) => {
  if (!form) return form;

  const { _count, ...rest } = form;
  if (_count) {
    rest.fieldsCount = _count.fields;
    rest.submissionsCount = _count.submissions;
  }
  return rest;
};

const fieldData = (field, position) => {
  const polishedData = {
    label: field.label,
    name: field.name,
    dataType: field.dataType,
    placeholder: field.placeholder ?? null,
    helpText: field.helpText ?? null,
    options: field.options ?? null,
    validation: field.validation ?? null,
    isRequired: field.isRequired ?? false,
    position,
  };
  return polishedData;
};

const getAllForms = async (req, res) => {
  try {
    const forms = await prisma.form.findMany({
      orderBy: { id: "desc" },
      include: {
        _count: { select: { fields: true, submissions: true } },
      },
    });
    return res
      .status(200)
      .json({ success: true, data: forms.map(reshapeForms) });
  } catch (e) {}
};

const getFormById = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const form = await prisma.form.findUnique({
      where: { id },
      include: { fields: { orderBy: { position: "asc" } } },
    });
    if (!form) return res.status(404).json({ message: "Form not found" });
    return res.status(200).json({ success: true, data: form });
  } catch (e) {}
};

const createForm = async (req, res) => {
  try {
    // validation logic lives here
    const data = validate(formSchema, req.body);

    // start transaction
    const form = await prisma.$transaction(async (tx) => {
      // 1st step -> create from after validation
      const created = await tx.form.create({
        data: {
          name: data.name,
          description: data.description ?? null,
          isActive: data.isActive,
        },
      });

      // 2nd step -> if there are fields, add them in fieds column with this form id
      if (data.fields.length) {
        await tx.formField.createMany({
          data: data.fields.map((f, i) => ({
            ...fieldData(f, i),
            formId: created.id,
          })),
        });
      }

      // 3rd step -> return the form that was just created to send back in response
      return tx.form.findUnique({
        where: { id: created.id },
        include: { fields: { orderBy: { position: "asc" } } },
      });
    });

    res
      .status(201)
      .json({ success: true, message: "Form created successfully" });
  } catch (e) {
    // console.log("Errorrrrrrr ===>>>>", e);
    res.status(e.status).json({
      success: false,
      message: `Error in creating form: ${JSON.stringify(e.errors)}`,
    });
  }
};

const updateForm = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const existingForm = await prisma.form.findUnique({ where: { id } });

    if (!existingForm)
      return res
        .status(400)
        .json({ success: false, message: "Form not found" });

    const data = validate(formSchema, req.body);
    const form = await prisma.$transaction(async (tx) => {
      await tx.form.update({
        where: { id },
        data: {
          name: data.name,
          isActive: data.isActive,
          description: data.description ?? null,
        },
      });

      await tx.formField.deleteMany({ where: { formId: id } });

      if (data.fields.length) {
        await tx.formField.createMany({
          data: data.fields.map((f, i) => ({
            ...fieldData(f, i),
            formId: id,
          })),
        });
      }

      return tx.form.findUnique({
        where: { id },
        include: { fields: { orderBy: { position: "asc" } } },
      });
    });
    return res.status(200).json({
      success: true,
      message: "Form updated successfully...",
      data: form,
    });
  } catch (e) {
    return res.status(e.status).json({ success: false, message: e.message });
  }
};

const deleteForm = async (req, res) => {
  try {
    const id = Number(req.params.id);
    await prisma.form.delete({ where: { id } });
    res
      .status(200)
      .json({ success: true, message: "Form deleted successfully" });
  } catch (e) {}
};

const formSubmit = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const form = await prisma.form.findUnique({
      where: { id },
      include: { FormField: { orderBy: { position: "asc" } } },
    });

    if (!form)
      return res
        .status(400)
        .json({ success: false, message: "Form not found" });

    if (!form.is_active)
      return res.status(422).json({
        success: false,
        message: "This form is not accepting submissions",
      });

    const schema = buildSubmissionSchema(form.fields);
    const payload = validate(schema, { data: req.body?.data ?? {} });

    const submission = await prisma.formSubmission.create({
      data: { form_id: id, data: payload.data },
    });
    res
      .status(201)
      .json({ success: true, message: "Form submitted successfully" });
  } catch (e) {}
};

const getFormSubmissions = async (req, res) => {
  try {
    const id = Number(req.params.id);

    const form = await prisma.form.findUnique({
      where: { id },
      include: { FormField: { orderBy: { position: "asc" } } },
    });

    if (!form)
      return res.status(400).json({ success: true, message: "Form not found" });

    const submissions = await prisma.formSubmission.findMany({
      where: { form_id: id },
      orderBy: { id: "asc" },
    });

    res.status(200).json({ success: true, data: { form, submissions } });
  } catch (e) {}
};

export {
  getAllForms,
  getFormById,
  createForm,
  updateForm,
  deleteForm,
  formSubmit,
  getFormSubmissions,
};
