
export const validateName = (name) => {
  return name && name.trim().length > 0;
};

export const validateEmail = (email) => {
  const regex = /\S+@\S+\.\S+/;
  return regex.test(email);
};

export const validateCompany = (company) => {
  return !company || company.trim().length > 0;
};
