import HttpStatus from "../../utils/httpStatus";
import collegeDao from "./college.dao";

const CollegeController = {
  // ------------------- REGISTER -------------------
  registerCollege: async (req, res) => {
    const { name, address, contact } = req.body;

    if (!name || !contact?.email) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: "Name and contact email are required" });
    }

    try {
      const college = await collegeDao.create({ name, address, contact });
      return res.status(HttpStatus.CREATED).json({
        message: "College created successfully",
        id: college._id,
      });
    } catch (error) {
      console.error("College Create Error:", error);
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: "Something went wrong" });
    }
  },

  // ------------------- GET COLLEGE -------------------
  getCollegeById: async (req, res) => {
    const { id } = req.params;

    try {
      const college = await collegeDao.findById(id);
      if (!college) {
        return res
          .status(HttpStatus.NOT_FOUND)
          .json({ message: "College not found" });
      }
      return res.status(HttpStatus.OK).json(college);
    } catch (error) {
      console.error("Get College Error:", error);
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: "Something went wrong" });
    }
  },

  getAllColleges: async (req, res) => {
    try {
      const colleges = await collegeDao.findAll();
      return res.status(HttpStatus.OK).json(colleges);
    } catch (error) {
      console.error("Get All Colleges Error:", error);
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: "Something went wrong" });
    }
  },

  // ------------------- UPDATE -------------------
  updateCollege: async (req, res) => {
    const { id } = req.params;
    const payload = req.body;

    try {
      const updatedCollege = await collegeDao.updateById(id, payload);
      if (!updatedCollege) {
        return res
          .status(HttpStatus.NOT_FOUND)
          .json({ message: "College not found" });
      }
      return res.status(HttpStatus.OK).json({
        message: "College updated successfully",
        college: updatedCollege,
      });
    } catch (error) {
      console.error("Update College Error:", error);
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: "Something went wrong" });
    }
  },

  // ------------------- DELETE -------------------
  deleteCollege: async (req, res) => {
    const { id } = req.params;

    try {
      const deletedCollege = await collegeDao.deleteById(id);
      if (!deletedCollege) {
        return res
          .status(HttpStatus.NOT_FOUND)
          .json({ message: "College not found" });
      }
      return res.status(HttpStatus.OK).json({
        message: "College deleted successfully",
      });
    } catch (error) {
      console.error("Delete College Error:", error);
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: "Something went wrong" });
    }
  },
};

export default CollegeController;
