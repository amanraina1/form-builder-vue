import { ZodError } from "zod";

export function formatZodError(err) {
  const errors = {};
  for (const issue of errors.issues) {
    const key = issue.path.join(".");
    if (!errors[key]) errors[key] = [];
    errors[key].push(issue.message);
  }
  return errors;
}

export function validate(schema, data) {
  const result = schema.safeParse(data);
  if (!result.success) {
    const e = new Error("Validation failed");
    e.status = 422;
    e.errors = formatZodError(result.errors);
    throw e;
  }
  return result.data;
}

export { ZodError };
