const { Event, Event_category, Event_attendance, User } = require("../models");

module.exports = {
  async getAll(req, res) {
    try {
      const events = await Event.findAll({
        include: [
          {
            model: Event_category,
            as: "category",
            attributes: ["id", "name"],
          },
        ],
      });
      res.json({
        success: true,
        data: events,
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  },

  async getOne(req, res) {
    const { id } = req.params;
    try {
      const event = await Event.findByPk(id, {
        include: [
          {
            model: Event_category,
            as: "category",
          },
          {
            model: Event_attendance,
            as: "event_attendances",
          },
        ],
      });

      if (!event) {
        return res.status(404).json({
          message: "Merchant not found",
        });
      }

      res.json({
        success: true,
        data: event,
      });
    } catch (err) {}
  },

  async create(req, res) {
    const {
      name,
      description,
      img_url,
      category_id,
      start_date,
      end_date,
      location,
      map_url,
    } = req.body;
    try {
      const event = await Event.create({
        name,
        description,
        img_url,
        category_id,
        start_date,
        end_date,
        location,
        map_url,
      });

      res.status(201).json({
        success: "Event created",
        data: {
          ...event.toJSON(),
        },
      });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  async getAttendance(req, res) {
    const { id } = req.params;
    try {
      const result = await Event_attendance.findAll({
        where: {
          event_id: id,
        },
        include: [
          {
            model: User,
            as: "users",
          },
        ],
      });

      res.status(200).json({
        success: true,
        data: result,
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  },

  async createAttendance(req, res) {
    const { event_id, user_id } = req.body;

    try {
      const event = await Event.findByPk(event_id);

      const start = new Date(event.start_date);
      const end = new Date(event.end_date);

      console.log(start, end);

      const days = Math.round((end - start) / 86400000) + 1;

      console.log(days);

      const presence = [];

      for (let i = 0; i < days; i++) presence.push(false);

      const attendance = await Event_attendance.create({
        event_id,
        user_id,
        presence,
      });

      res.status(201).json({
        message: "Event Attendance created",
        data: {
          ...attendance.toJSON(),
        },
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  },

  async updateAttendance(req, res) {
    const { id } = req.params;
    const data = req.body;
    try {
      const update = await Event_attendance.update(data);

      res.json({
        message: "Merchant updated",
        data: update,
      });
    } catch (Err) {
      res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  },
};
