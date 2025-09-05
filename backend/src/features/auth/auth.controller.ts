import { jwtCookieOptions } from "../../utils/cookie";
import { hashPassword, comparePassword } from "../../utils/hash";
import HttpStatus from "../../utils/httpStatus";
import { setToken } from "../../utils/jwt";
import adminDao from "../admin/admin.dao";

const AuthController = {
  // ------------------- REGISTER -------------------
  adminRegister: async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: "Name, email, and password are required" });
    }

    try {
      const existingAdmin = await adminDao.findByEmail(email);
      if (existingAdmin) {
        return res
          .status(HttpStatus.CONFLICT)
          .json({ message: "Email already registered" });
      }

      const hashedPassword = await hashPassword(password);

      const newAdmin = await adminDao.create({
        name,
        email,
        password: hashedPassword,
      });

      const token = await setToken(newAdmin._id.toString());

      res.cookie("token", token, jwtCookieOptions);

      return res.status(HttpStatus.CREATED).json({
        message: "Registration successful",
      });
    } catch (error) {
      console.error("Admin Registration Error:", error);
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: "Something went wrong" });
    }
  },

  // ------------------- LOGIN -------------------
  adminLogin: async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: "Email and password are required" });
    }

    try {
      const admin = await adminDao.findByEmail(email);
      if (!admin) {
        return res
          .status(HttpStatus.NOT_FOUND)
          .json({ message: "No such user found" });
      }

      const isMatch = await comparePassword(password, admin.password);
      if (!isMatch) {
        return res
          .status(HttpStatus.UNAUTHORIZED)
          .json({ message: "Invalid credentials" });
      }

      const token = await setToken(admin._id.toString());

      res.cookie("token", token, jwtCookieOptions);

      return res.status(HttpStatus.OK).json({
        message: "Login successful",
        admin: {
          id: admin._id,
          name: admin.name,
          email: admin.email,
        },
      });
    } catch (error) {
      console.error("Admin Login Error:", error);
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: "Something went wrong" });
    }
  },
};

export default AuthController;
