function validateRequiredFields(...requiredFields) {
  // Parametros devem ser passados dentro de um objeto
  const missingFields = [];

  for (const field of requiredFields) {
    for (const prop in field) {
      if (field[prop] === undefined || field[prop] === "") {
        missingFields.push(prop);
      }
    }
  }

  if (missingFields.length > 0) {
    return {
      result: true,
      missingFields,
    };
  } else {
    return {
      result: false,
    };
  }
}

module.exports = {
  validateRequiredFields,
};
