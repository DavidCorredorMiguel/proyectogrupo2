const USERS_KEY = "users";

//OBTENGO USUARIOS//
export const getUsers = () => {
  return JSON.parse(localStorage.getItem(USERS_KEY)) || [];
};

//REGISTRO USUARIO//
export const registerUser = (name, email, password) => {
  const users = getUsers();

  if (users.some((u) => u.email === email)) {
    return null;
  }

  const newUser = {
    id: Date.now(),
    name,
    email,
    password,
    role: "user",
  };

  localStorage.setItem(USERS_KEY, JSON.stringify([...users, newUser]));

  return newUser;
};

// LOGIN USUARIO
export const loginUser = (email, password) => {
  const users = getUsers();

  return (
    users.find((u) => u.email === email && u.password === password) || null
  );
};

//RECUPERAR CONTRASEÑA//
export const updatePassword = (email, newPassword) => {
  const users = getUsers();

  const index = users.findIndex((u) => u.email === email);
  if (index === -1) return null;

  const updatedUser = {
    ...users[index],
    password: newPassword,
  };

  users[index] = updatedUser;

  localStorage.setItem("users", JSON.stringify(users));

  return updatedUser;
};


