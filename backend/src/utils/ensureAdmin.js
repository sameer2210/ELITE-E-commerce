import User from "../models/user.model.js";

const ensureAdmin = async () => {
  const name = process.env.ADMIN_NAME;
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;

  if (!name || !email || !password) {
    console.log(
      "Admin seed skipped: ADMIN_NAME, ADMIN_EMAIL, or ADMIN_PASSWORD is missing."
    );
    return;
  }

  const existingAdmin = await User.findOne({ role: "admin" });
  if (existingAdmin) {
    return;
  }

  const existingByEmail = await User.findOne({ email });
  if (existingByEmail) {
    existingByEmail.role = "admin";
    existingByEmail.name = name;
    await existingByEmail.save();
    console.log(`Admin role granted to existing user: ${email}`);
    return;
  }

  await User.create({
    name,
    email,
    password,
    role: "admin",
  });

  console.log(`Admin user created: ${email}`);
};

export default ensureAdmin;
