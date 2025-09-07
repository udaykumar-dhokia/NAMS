import { jwtCookieOptions } from "../../utils/cookie";
import { comparePassword, hashPassword } from "../../utils/hash";
import HttpStatus from "../../utils/httpStatus";
import { setToken } from "../../utils/jwt";
import facultyDao from "./faculty.dao";

const FacultyAuthController = {
  // ------------------- REGISTER -------------------
  facultyRegister: async (req, res) => {
    const {
      name,
      email,
      password,
      college,
      department,
      designation,
      phone,
      isHOD,
    } = req.body;

    if (!name || !email || !password || !college || !department) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: "Name, email, password, college, and department are required",
      });
    }

    try {
      const existingFaculty = await facultyDao.getFacultyByEmail(email);
      if (existingFaculty) {
        return res
          .status(HttpStatus.CONFLICT)
          .json({ message: "Email already registered" });
      }

      const hashedPassword = await hashPassword(password);

      const newFaculty = await facultyDao.createFaculty({
        name,
        email,
        password: hashedPassword,
        college,
        department,
        designation: designation || "Assistant Professor",
        phone,
        isHOD: isHOD || false,
      });

      const token = await setToken(newFaculty._id.toString());

      res.cookie("token", token, jwtCookieOptions);

      return res.status(HttpStatus.CREATED).json({
        message: "Faculty registration successful",
      });
    } catch (error) {
      console.error("Faculty Registration Error:", error);
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: "Something went wrong" });
    }
  },

  // ------------------- LOGIN -------------------
  facultyLogin: async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: "Email and password are required" });
    }

    try {
      const faculty = await facultyDao.getFacultyByEmail(email);
      if (!faculty) {
        return res
          .status(HttpStatus.NOT_FOUND)
          .json({ message: "No such faculty found" });
      }

      //   const isMatch = await comparePassword(password, faculty.password);
      //   if (!isMatch) {
      //     return res
      //       .status(HttpStatus.UNAUTHORIZED)
      //       .json({ message: "Invalid credentials" });
      //   }

      // Update last login timestamp
      await facultyDao.updateLastLogin(faculty._id);

      const token = await setToken(faculty._id.toString());

      res.cookie("token", token, jwtCookieOptions);

      return res.status(HttpStatus.OK).json({
        message: "Login successful",
        faculty: {
          id: faculty._id,
          name: faculty.name,
          email: faculty.email,
          designation: faculty.designation,
          department: faculty.department,
          college: faculty.college,
          isHOD: faculty.isHOD,
        },
      });
    } catch (error) {
      console.error("Faculty Login Error:", error);
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: "Something went wrong" });
    }
  },
  exists: (req, res) => {
    const user = req.user;
    if (!user) {
      return res
        .status(HttpStatus.NOT_FOUND)
        .json({ message: "User not found." });
    }
    return res.status(HttpStatus.OK).json({ user });
  },
};

export default FacultyAuthController;
