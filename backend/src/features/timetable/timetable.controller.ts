import HttpStatus from "../../utils/httpStatus";
import timetableDao from "./timetable.dao";

const TimetableController = {
  // ------------------- CREATE TIMETABLE -------------------
  createTimetable: async (req, res) => {
    try {
      const timetable = await timetableDao.create(req.body);
      return res.status(HttpStatus.CREATED).json({
        message: "Timetable created successfully",
        timetable: timetable,
      });
    } catch (error) {
      console.error("Create Timetable Error:", error);
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: "Something went wrong" });
    }
  },

  // ------------------- GET ALL TIMETABLES -------------------
  getAllTimetables: async (req, res) => {
    try {
      const timetables = await timetableDao.findAll();
      return res.status(HttpStatus.OK).json(timetables);
    } catch (error) {
      console.error("Get All Timetables Error:", error);
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: "Something went wrong" });
    }
  },

  // ------------------- GET TIMETABLE BY ID -------------------
  getTimetableById: async (req, res) => {
    const { id } = req.params;
    try {
      const timetable = await timetableDao.findById(id);
      if (!timetable) {
        return res
          .status(HttpStatus.NOT_FOUND)
          .json({ message: "Timetable not found" });
      }
      return res.status(HttpStatus.OK).json(timetable);
    } catch (error) {
      console.error("Get Timetable Error:", error);
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: "Something went wrong" });
    }
  },

  // ------------------- UPDATE TIMETABLE -------------------
  updateTimetable: async (req, res) => {
    const { id } = req.params;
    try {
      const updated = await timetableDao.update(id, req.body);
      if (!updated) {
        return res
          .status(HttpStatus.NOT_FOUND)
          .json({ message: "Timetable not found" });
      }
      return res.status(HttpStatus.OK).json({
        message: "Timetable updated successfully",
        timetable: updated,
      });
    } catch (error) {
      console.error("Update Timetable Error:", error);
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: "Something went wrong" });
    }
  },

  // ------------------- DELETE TIMETABLE -------------------
  deleteTimetable: async (req, res) => {
    const { id } = req.params;
    try {
      const deleted = await timetableDao.delete(id);
      if (!deleted) {
        return res
          .status(HttpStatus.NOT_FOUND)
          .json({ message: "Timetable not found" });
      }
      return res.status(HttpStatus.OK).json({
        message: "Timetable deleted successfully",
      });
    } catch (error) {
      console.error("Delete Timetable Error:", error);
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: "Something went wrong" });
    }
  },

  // ------------------- UPDATE TIMETABLE SLOT -------------------
  updateTimetableSlot: async (req, res) => {
    const { id, day, slotId } = req.params;
    try {
      const updated = await timetableDao.updateSlot(id, day, slotId, req.body);
      if (!updated) {
        return res
          .status(HttpStatus.NOT_FOUND)
          .json({ message: "Slot not found" });
      }
      return res.status(HttpStatus.OK).json({
        message: "Slot updated successfully",
        timetable: updated,
      });
    } catch (error) {
      console.error("Update Slot Error:", error);
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: "Something went wrong" });
    }
  },

  // ------------------- DELETE TIMETABLE SLOT -------------------
  deleteTimetableSlot: async (req, res) => {
    const { id, day, slotId } = req.params;
    try {
      const updated = await timetableDao.deleteSlot(id, day, slotId);
      if (!updated) {
        return res
          .status(HttpStatus.NOT_FOUND)
          .json({ message: "Slot not found" });
      }
      return res.status(HttpStatus.OK).json({
        message: "Slot deleted successfully",
        timetable: updated,
      });
    } catch (error) {
      console.error("Delete Slot Error:", error);
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: "Something went wrong" });
    }
  },
};

export default TimetableController;
