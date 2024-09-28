export const logInController = async (req, res) => {
  const { email, password } = req.body;
  console.log(`loggedin user`, { email, password});
  res.send(`logged in successfully ${email}`);
};
