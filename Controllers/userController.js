import { users } from "../Data/user.js";

let userList = users;

export const getAllUsers = (req, res) => {
  res.json(userList);
};

export const getUserById = (req, res) => {
  const user = userList.find((u) => parseInt(u.id) === parseInt(req.params.id));
  if (!user) return res.status(404).json({ message: "User not found" });
  res.json(user);
};

export const createUser = (req, res) => {
  const { name, email } = req.body;

  if (userList.find((u) => u.email === email))
    return res.status(400).json({ message: "Email already exists" });

  const newUser = {
    id:
      users.length > 0 ? Math.max(...users.map((u) => parseInt(u.id))) + 1 : 1,
    name,
    email,
  };
  userList.push(newUser);

  res.status(201).json({ message: "User created", user: newUser });
};

export const updateUser = (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;

  const index = userList.findIndex((u) => parseInt(u.id) === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ message: "User not found" });

  if (
    email &&
    userList.find((u) => u.email === email && u.id.toString() !== id)
  )
    return res.status(400).json({ message: "Email already in use" });

  if (name) userList[index].name = name;
  if (email) userList[index].email = email;

  res.json({ message: "User updated", user: userList[index] });
};

export const deleteUser = (req, res) => {
  const { id } = req.params;
  const index = userList.findIndex((u) => u.id.toString() === id);

  if (index === -1) return res.status(404).json({ message: "User not found" });

  const deletedUser = userList.splice(index, 1)[0];
  res.json({ message: "User deleted", user: deletedUser });
};
