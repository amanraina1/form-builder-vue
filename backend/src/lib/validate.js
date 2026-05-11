import { ZodError } from "zod";

export function formatZodError(err) {
  const errors = {};
  for (const issue of err.issues) {
    const key = issue.path.join(".");
    if (!errors[key]) errors[key] = [];
    errors[key].push(issue.message);
  }
  return errors;
}

export function validate(schema, data) {
  const result = schema.safeParse(data);
  console.log("result =>", result.error);
  if (!result.success) {
    const e = new Error("Validation failed");
    e.status = 422;
    e.errors = formatZodError(result.error);
    throw e;
  }
  return result.data;
}

export { ZodError };
