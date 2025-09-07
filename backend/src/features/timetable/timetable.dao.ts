import TimetableModel from "./timetable.model";

class TimetableDAO {
  // ------------------- CREATE TIMETABLE -------------------
  async create(payload) {
    const timetable = new TimetableModel(payload);
    return await timetable.save();
  }

  // ------------------- FIND ALL TIMETABLES -------------------
  async findAll(filter = {}) {
    return await TimetableModel.find(filter)
      .populate("department")
      .populate("timetable.Mon.course")
      .populate("timetable.Tue.course")
      .populate("timetable.Wed.course")
      .populate("timetable.Thu.course")
      .populate("timetable.Fri.course")
      .populate("timetable.Sat.course");
  }

  // ------------------- FIND TIMETABLE BY ID -------------------
  async findById(id: string) {
    return await TimetableModel.find({ college: id });
  }

  // ------------------- UPDATE TIMETABLE -------------------
  async update(id: string, payload) {
    return await TimetableModel.findByIdAndUpdate(id, payload, {
      new: true,
      runValidators: true,
    });
  }

  // ------------------- DELETE TIMETABLE -------------------
  async delete(id: string) {
    return await TimetableModel.findByIdAndDelete(id);
  }

  async updateSlot(id, day, slotId, slotData) {
    return await TimetableModel.findOneAndUpdate(
      { _id: id, [`timetable.${day}._id`]: slotId },
      { $set: { [`timetable.${day}.$`]: slotData } },
      { new: true }
    ).populate(
      "timetable.Mon.course timetable.Tue.course timetable.Wed.course timetable.Thu.course timetable.Fri.course timetable.Sat.course"
    );
  }

  async deleteSlot(id, day, slotId) {
    return await TimetableModel.findByIdAndUpdate(
      id,
      { $pull: { [`timetable.${day}`]: { _id: slotId } } },
      { new: true }
    ).populate(
      "timetable.Mon.course timetable.Tue.course timetable.Wed.course timetable.Thu.course timetable.Fri.course timetable.Sat.course"
    );
  }
}

export default new TimetableDAO();
