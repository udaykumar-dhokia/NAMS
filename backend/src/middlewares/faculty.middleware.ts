import facultyDao from "../features/faculty/faculty.dao";
import HttpStatus from "../utils/httpStatus";
import { verifyToken } from "../utils/jwt";

const facultyMiddleware = async (req, res, next) => {
  const token =
    req.cookies.token ||
    (req.headers.authorization && req.headers.authorization.split(" ")[1]);

  if (!token) {
    return res
      .status(HttpStatus.UNAUTHORIZED)
      .json({ message: "Token not found." });
  }

  try {
    const id = await verifyToken(token);
    const user = await facultyDao.getFacultyById(id.id);
    if (!user) {
      return res
        .status(HttpStatus.NOT_FOUND)
        .json({ message: "No such user found." });
    }
    req.user = user;
    next();
  } catch (error) {
    return res
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal Server Error.", error });
  }
};

export default facultyMiddleware;
