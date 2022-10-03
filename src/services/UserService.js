const BaseService = require("./BaseService");
const baseModel = require("../models/Users");
class UserService extends BaseService {
  constructor() {
    super(baseModel);
  }
}
module.exports = new UserService();
