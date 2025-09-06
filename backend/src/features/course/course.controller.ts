import HttpStatus from "../../utils/httpStatus";
import courseDao from "./course.dao";

const CourseController = {
  // CREATE
  createCourse: async (req, res) => {
    const {
      code,
      name,
      credits,
      department,
      degree,
      faculty,
      type,
      description,
      status,
      college,
    } = req.body;

    if (!code || !name || !credits || !department || !degree) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: "Code, Name, Credits, Department and Degree are required",
      });
    }

    try {
      const course = await courseDao.create({
        code,
        name,
        credits,
        department,
        degree,
        faculty,
        type,
        description,
        status,
        college,
      });

      return res.status(HttpStatus.CREATED).json({
        message: "Course created successfully",
        course: course,
      });
    } catch (error) {
      console.error("Create Course Error:", error);
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: "Something went wrong" });
    }
  },

  // READ ALL
  getCourses: async (req, res) => {
    try {
      const courses = await courseDao.findAll();
      return res.status(HttpStatus.OK).json(courses);
    } catch (error) {
      console.error("Get Courses Error:", error);
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: "Something went wrong" });
    }
  },

  // READ ONE
  getCourseById: async (req, res) => {
    const { id } = req.params;
    try {
      const course = await courseDao.findById(id);
      if (!course) {
        return res
          .status(HttpStatus.NOT_FOUND)
          .json({ message: "Course not found" });
      }
      return res.status(HttpStatus.OK).json(course);
    } catch (error) {
      console.error("Get Course Error:", error);
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: "Something went wrong" });
    }
  },

  // UPDATE
  updateCourse: async (req, res) => {
    const { id } = req.params;
    try {
      const course = await courseDao.update(id, req.body);
      if (!course) {
        return res
          .status(HttpStatus.NOT_FOUND)
          .json({ message: "Course not found" });
      }
      return res.status(HttpStatus.OK).json({
        message: "Course updated successfully",
        course,
      });
    } catch (error) {
      console.error("Update Course Error:", error);
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: "Something went wrong" });
    }
  },

  // DELETE
  deleteCourse: async (req, res) => {
    const { id } = req.params;
    try {
      const course = await courseDao.delete(id);
      if (!course) {
        return res
          .status(HttpStatus.NOT_FOUND)
          .json({ message: "Course not found" });
      }
      return res
        .status(HttpStatus.OK)
        .json({ message: "Course deleted successfully" });
    } catch (error) {
      console.error("Delete Course Error:", error);
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: "Something went wrong" });
    }
  },
};

export default CourseController;
