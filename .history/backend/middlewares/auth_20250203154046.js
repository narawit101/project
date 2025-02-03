const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.cookies.token; // ดึง Token จาก Cookie
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // เพิ่มข้อมูลผู้ใช้ลงใน request object
    next();
  } catch (error) {
    res.status(403).json({ message: "Invalid token" });
  }
};
