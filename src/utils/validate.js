export const validateData = (email, password) => {
  const validEamil =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
      email
    );
  const validPassword =
    /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{5,15}$/.test(password);

  if (!validEamil) return "Eamil is not valid";
  if (!validPassword) return "Password is not valid";

  return null;
};
