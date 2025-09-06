import HttpStatus from "../../utils/httpStatus";
import departmentDao from "./department.dao";

const DepartmentController = {
  // CREATE
  createDepartment: async (req, res) => {
    const { name, shortName, code, college, degreesOffered, hod, faculty } =
      req.body;

    if (!name || !shortName || !college) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: "Name, shortName, and college are required" });
    }

    try {
      const department = await departmentDao.create({
        name,
        shortName,
        code,
        college,
        degreesOffered,
        hod,
        faculty,
      });

      return res.status(HttpStatus.CREATED).json({
        message: "Department created successfully",
        department,
      });
    } catch (error) {
      console.error("Create Department Error:", error);
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: "Something went wrong" });
    }
  },

  // READ ALL
  getDepartments: async (req, res) => {
    try {
      const departments = await departmentDao.findAll();
      return res.status(HttpStatus.OK).json(departments);
    } catch (error) {
      console.error("Get Departments Error:", error);
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: "Something went wrong" });
    }
  },

  // READ ONE
  getDepartmentById: async (req, res) => {
    const { id } = req.params;
    try {
      const department = await departmentDao.findById(id);
      return res.status(HttpStatus.OK).json(department);
    } catch (error) {
      console.error("Get Department Error:", error);
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: "Something went wrong" });
    }
  },

  // UPDATE
  updateDepartment: async (req, res) => {
    const { id } = req.params;
    try {
      const department = await departmentDao.update(id, req.body);
      if (!department) {
        return res
          .status(HttpStatus.NOT_FOUND)
          .json({ message: "Department not found" });
      }
      return res
        .status(HttpStatus.OK)
        .json({ message: "Department updated successfully", department });
    } catch (error) {
      console.error("Update Department Error:", error);
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: "Something went wrong" });
    }
  },

  // DELETE
  deleteDepartment: async (req, res) => {
    const { id } = req.params;
    try {
      const department = await departmentDao.delete(id);
      if (!department) {
        return res
          .status(HttpStatus.NOT_FOUND)
          .json({ message: "Department not found" });
      }
      return res
        .status(HttpStatus.OK)
        .json({ message: "Department deleted successfully" });
    } catch (error) {
      console.error("Delete Department Error:", error);
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: "Something went wrong" });
    }
  },
};

export default DepartmentController;
