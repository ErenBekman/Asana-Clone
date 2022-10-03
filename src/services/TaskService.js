const BaseService = require("./BaseService");
const baseModel = require("../models/Tasks");
class TaskService extends BaseService {
  constructor() {
    super(baseModel);
  }
  list = (where) => {
    return baseModel.find(where || {}).populate({
      path: "user_id",
      select: "full_name email profile_image",
    });
  };

  show = (where, expand) => {
    if (!expand) return baseModel.findOne(where || {});

    return baseModel
      .findOne(where || {})
      .populate({
        path: "user_id",
        select: "full_name email profile_image",
      })
      .populate({
        path: "comments",
        populate: {
          path: "user_id",
          select: "full_name email profile_image",
        },
      })
      .populate({
        path: "sub_tasks",
        select: "title description isCompleted assigned_to due_date order sub_tasks",
      });
  };
}

module.exports = new TaskService();
