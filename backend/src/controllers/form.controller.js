import { prisma } from "../prisma.js";

const fieldData = (field, position) => {
  label: field.label;
  name: field.name;
  dataType: field.dataType;
  placeholder: field.placeholder ?? null;
  helpText: field.helpText ?? null;
  options: field.options ?? null;
  validation: field.validation ?? null;
  isRequired: field.isRequired ?? false;
  position;
};

const getAllForms = async (req, res) => {
  try {
    const forms = await prisma.form.findMany({
      orderBy: { id: "desc" },
      include: {
        _count: { select: { FormField: true, FormSubmission: true } },
      },
    });
    res.json(forms);
  } catch (e) {}
};

const getFormById = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const form = await prisma.form.findUnique({
      where: { id },
      include: { FormField: { orderBy: { position: "asc" } } },
    });
    if (!form) return res.status(404).json({ message: "Form not found" });
    res.json(form);
  } catch (e) {}
};

const createForm = async (req, res) => {
  try {
    // todo :: don't forget validation
    // const data = validate(formSchema, req.body);
    const data = "";

    // start transaction
    const form = await prisma.$transaction(async (tx) => {
      // 1st step -> create from after validation
      const created = await tx.form.create({
        data: {
          name: data.name,
          description: data.description ?? null,
          is_active: data.is_active,
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

      // 3rd step -> return the that was just created to send back in response
      return tx.form.findUnique({
        where: { id: created.id },
        include: { FormField: { orderBy: { position: "asc" } } },
      });
    });

    res
      .status(201)
      .json({ success: true, message: "Form created successfully" });
  } catch (e) {}
};

const updateForm = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const existingForm = prisma.form.findUnique({ where: { id } });

    if (!existingForm)
      return res
        .status(400)
        .json({ success: false, message: "Form not found" });

    // todo :: add valdation
    const data = "";

    const form = await prisma.$transaction(async (tx) => {
      await tx.form.update({
        where: { id },
        data: {
          name: data.name,
          is_active: data.is_active,
          description: data.description ?? null,
        },
      });

      await tx.formField.deleteMany({ where: { form_id: id } });

      if (data.fields.length) {
        await tx.formField.createMany({
          data: data.fields.map((f, i) => ({
            ...fieldData(f, i),
            form_id: id,
          })),
        });
      }

      return tx.form.findUnique({
        where: { id },
        include: { fields: { orderBy: { position: "asc" } } },
      });
    });
    res.json(form);
  } catch (e) {}
};

export { getAllForms, getFormById, createForm };
