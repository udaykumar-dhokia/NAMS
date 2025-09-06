import HttpStatus from "../../utils/httpStatus";

const AdminController = {
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

export default AdminController;
