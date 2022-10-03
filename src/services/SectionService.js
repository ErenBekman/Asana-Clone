const BaseService = require("./BaseService");
const baseModel = require("../models/Sections");
class SectionService extends BaseService {
  constructor() {
    super(baseModel);
  }
  list = (where) => {
    return baseModel
      .find(where || {})
      .populate({
        path: "user_id",
        select: "full_name email profile_image",
      })
      .populate({
        path: "project_id",
        select: "name",
      });
  };
}

module.exports = new SectionService();
