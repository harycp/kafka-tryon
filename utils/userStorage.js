let users = [];

const addUser = (email) => {
  const verificationToken = Math.random().toString(36).substring(2, 15);
  const newUser = {
    email,
    verified: false,
    verificationToken,
  };

  users.push(newUser);
  return newUser;
};

const verifyUser = (token) => {
  const user = users.find((u) => u.verificationToken === token);
  if (user) {
    user.verified = true;
    return user;
  }
  return null;
};

module.exports = { addUser, verifyUser };
