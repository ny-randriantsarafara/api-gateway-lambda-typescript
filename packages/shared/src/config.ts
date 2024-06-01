export const config = () => {
  const envVariables: Record<string, string> = {};

  for (const key in process.env) {
    if (process.env.hasOwnProperty(key)) {
      // Convert the key from ENV_VARIABLE to envVariable
      const camelCaseKey = key
        .toLowerCase()
        .replace(/_./g, (match) => match.charAt(1).toUpperCase());

      envVariables[camelCaseKey] = process.env[key] ?? '';
    }
  }

  return envVariables;
};
