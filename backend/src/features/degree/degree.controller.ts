import HttpStatus from "../../utils/httpStatus";
import degreeDao from "./degree.dao";

const DegreeController = {
  // ------------------- CREATE DEGREE -------------------
  createDegree: async (req, res) => {
    const { name, duration, semesters, departments, college, createdBy } =
      req.body;

    if (!name || !duration || !college) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: "Name, duration, and college are required" });
    }

    try {
      const degree = await degreeDao.create({
        name,
        duration,
        semesters,
        departments,
        college,
        createdBy,
      });

      return res.status(HttpStatus.CREATED).json({
        message: "Degree created successfully",
        degree: degree,
      });
    } catch (error) {
      console.error("Create Degree Error:", error);
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: "Something went wrong" });
    }
  },

  getDegreesByCollegeId: async (req, res) => {
    const { collegeId } = req.params;

    try {
      const degrees = await degreeDao.findByCollegeId(collegeId);

      return res.status(200).json(degrees);
    } catch (error) {
      console.error("Get Degrees Error:", error);
      return res.status(500).json({ message: "Something went wrong" });
    }
  },

  // ------------------- GET DEGREE BY ID -------------------
  getDegreeById: async (req, res) => {
    const { id } = req.params;

    try {
      const degree = await degreeDao.findById(id);
      if (!degree) {
        return res
          .status(HttpStatus.NOT_FOUND)
          .json({ message: "Degree not found" });
      }
      return res.status(HttpStatus.OK).json(degree);
    } catch (error) {
      console.error("Get Degree By ID Error:", error);
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: "Something went wrong" });
    }
  },

  // ------------------- GET ALL DEGREES -------------------
  getAllDegrees: async (req, res) => {
    try {
      const degrees = await degreeDao.findAll();
      return res.status(HttpStatus.OK).json(degrees);
    } catch (error) {
      console.error("Get All Degrees Error:", error);
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: "Something went wrong" });
    }
  },

  // ------------------- UPDATE DEGREE -------------------
  updateDegree: async (req, res) => {
    const { id } = req.params;
    const payload = req.body;

    try {
      const updatedDegree = await degreeDao.update(id, payload);
      if (!updatedDegree) {
        return res
          .status(HttpStatus.NOT_FOUND)
          .json({ message: "Degree not found" });
      }
      return res.status(HttpStatus.OK).json({
        message: "Degree updated successfully",
        degree: updatedDegree,
      });
    } catch (error) {
      console.error("Update Degree Error:", error);
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: "Something went wrong" });
    }
  },

  // ------------------- DELETE DEGREE -------------------
  deleteDegree: async (req, res) => {
    const { id } = req.params;

    try {
      const deletedDegree = await degreeDao.delete(id);
      if (!deletedDegree) {
        return res
          .status(HttpStatus.NOT_FOUND)
          .json({ message: "Degree not found" });
      }
      return res.status(HttpStatus.OK).json({
        message: "Degree deleted successfully",
      });
    } catch (error) {
      console.error("Delete Degree Error:", error);
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: "Something went wrong" });
    }
  },
};

export default DegreeController;
