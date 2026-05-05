import { z } from "zod";

export const ALLOWED_TYPES = [
  "text",
  "textarea",
  "email",
  "number",
  "date",
  "select",
  "multiselect",
  "radio",
  "checkbox",
];

export const HAS_OPTIONS = ["select", "multiselect", "radio", "checkbox"];

const optionsSchema = z.object({
  label: z.string().min(1).max(50),
  value: z.string().min(1).max(50),
});

const validationSchema = z.object({
  min: z.number().nullable().optional(),
  max: z.number().nullable().optional(),
});

const fieldSchema = z.object({
  label: z.string().min(1, "Label is required").max(50),
  name: z.string().min(1, "Name is required").max(50),
  dataType: z.enum(ALLOWED_TYPES, "Unknown field type"),
  placeholder: z.string().max(150).nullable().optional(),
  isRequired: z.boolean().optional().default(false),
  options: z.array(optionsSchema).nullable().optional(),
  validation: validationSchema,
});

export const formSchema = z
  .object({
    name: z.string().min(1, "Form name is required").max(50),
    description: z.string().max(1000).nullable().optional(),
    isActive: z.boolean().optional().default(true),
    fields: z.array(fieldSchema).optional().default([]),
  })
  .superRefine((form, ctx) => {
    const seen = new Set();
    form.fields.forEach((f, idx) => {
      if (seen.has(f.name)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `Duplicate field name ${f.name}`,
          path: ["fields", idx, "name"],
        });
      }
      seen.add(f.name);
    });
  });

export function buildSubmissionSchema(fields) {
  const shape = {};

  for (const field of fields) {
    let s;
    switch (field.dataType) {
      case "email":
        s = z.string().email("Must be a valid email");
        break;
      case "number":
        s = z.coerce.number({ message: "Must be a number" });
        if (field.validation?.min !== null)
          s = s.min(
            field.validation.min,
            `Must be greater than or equal to ${field.validation.min} characters`,
          );
        if (field.validation?.max !== null)
          s = s.max(
            field.validation.max,
            `Must be less than or equal to ${field.validation.max} characters`,
          );
        break;

      case "date":
        s = z
          .string()
          .refine((v) => !Number.isNaN(Date.parse(v)), "Must be a valid date");
        break;

      case "select":
      case "radio":
        const values = (field.option ?? []).map((o) => o.value);
        s = values.length
          ? z
              .string()
              .refine(
                (v) => !Number.isNaN(Date.parse(v)),
                `Must be one of: ${values.join(", ")}`,
              )
          : z.string();
        break;

      case "multiselect":
      case "checkbox": {
        const values = (field.options ?? []).map((o) => o.value);
        s = z.array(
          values.length
            ? z.string().refine((v) => values.includes(v), "Invalid option")
            : z.string(),
        );
        break;
      }

      case "textarea":
      case "text":
      default:
        s = z.string();
        if (field.validation?.max !== null)
          s = s.max(
            field.validation.max,
            `Must be at most ${field.validation.max} characters`,
          );
        if (field.validation?.min !== null)
          s = s.min(
            field.validation.min,
            `Must be at least ${field.validation.min} characters`,
          );

        break;
    }

    if (!field.isRequired) {
      s = s.nullable().optional();
    } else if (
      field.dataType === "multiselect" ||
      field.dataType === "checkbox"
    ) {
      s = s.refine(
        (arr) => Array.isArray(arr) && arr.length > 0,
        "At least one option is required",
      );
    } else {
      s = s.refine((v) => v !== "" && v != null, `${field.label} is required`);
    }

    shape[field.name] = s;
  }

  return z.object({ data: z.object(shape) });
}
