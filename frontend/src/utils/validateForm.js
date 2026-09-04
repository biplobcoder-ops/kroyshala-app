const validateForm = (schema, formData) => {
  const result = schema.safeParse(formData);

  if (result.success) {
    return {
      isValid: true,
      errors: {},
      data: result.data,
    };
  }

  const errors = {};

  result.error.issues.forEach((issue) => {
    const fieldName = issue.path.join(".");

    if (!errors[fieldName]) {
      errors[fieldName] = issue.message;
    }
  });

  return {
    isValid: false,
    errors,
    data: null,
  };
};

export default validateForm;