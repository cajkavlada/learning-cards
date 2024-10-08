type ZSAError = {
  fieldErrors?: Record<string, string[]>;
  message: string;
};

export function formatZsaError(error: ZSAError) {
  if (!error.fieldErrors) return error.message;
  return Object.values(error.fieldErrors ?? {})
    .reduce((acc, current) => [...acc, ...current], [])
    .join(", ");
}
