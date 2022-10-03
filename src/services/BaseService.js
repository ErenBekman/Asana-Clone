let baseModel = null;
class BaseService {
   constructor(model) {
      this.baseModel = model;
   }
   list(where) {
      return this.baseModel.find(where || {});
   }
   create(data) {
      return new this.baseModel(data).save();
   }
   show(where) {
      return this.baseModel.findOne(where);
   }
   update(id, data) {
      return this.baseModel.findByIdAndUpdate(id, data, { new: true });
   }
   updateWhere(where, data) {
      return this.baseModel.findOneAndUpdate(where, data, { new: true });
   }
   delete(id) {
      return this.baseModel.findByIdAndDelete(id);
   }
}

module.exports = BaseService;
