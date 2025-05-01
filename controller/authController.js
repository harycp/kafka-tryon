const emailService = require("../service/emailService");
const { verifyUser } = require("../utils/userStorage");

const register = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: "Email diperlukan" });
  }
  try {
    await emailService.sendVerificationEmail(email);
    res.json({
      message: "Silahkan cek terminal untuk link verifikasi",
    });
  } catch (error) {
    res.status(500).json({ error: "Gagal mengirim email verifikasi" });
  }
};

const verifyEmail = async (req, res) => {
  const { token } = req.query;
  const user = verifyUser(token);

  if (!user) return res.status(400).json({ error: "Token tidak valid" });

  res.json({ message: `Email ${user.email} telah diverifikasi` });
};

module.exports = {
  register,
  verifyEmail,
};
