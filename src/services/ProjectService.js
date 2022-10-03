const BaseService = require("./BaseService");
const baseModel = require("../models/Projects");
class ProjectService extends BaseService {
  constructor() {
    super(baseModel);
  }
  list = (where) => {
    return baseModel.find(where || {}).populate({
      path: "user_id",
      select: "full_name email profile_image",
    });
  };
}

module.exports = new ProjectService();
