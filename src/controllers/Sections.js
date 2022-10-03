const httpStatus = require("http-status");
const SectionService = require("../services/SectionService");
const ApiError = require("../errors/ApiError");

class Section {
  index(req, res) {
    SectionService.list({ project_id: req.params.projectId })
      .then((response) => {
        res.status(httpStatus.OK).send(response);
      })
      .catch((e) => {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e);
      });
  }

  create(req, res) {
    req.body.user_id = req.user;
    SectionService.create(req.body)
      .then((response) => {
        res.status(httpStatus.CREATED).send(response);
      })
      .catch((e) => {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e);
      });
  }

  update(req, res, next) {
    if (!req.params.id) {
      res.status(httpStatus.BAD_REQUEST).send({
        message: "id not found",
      });
    }
    SectionService.update(req.params.id, req.body)
      .then((updatedDoc) => {
        if (!updatedDoc) return next(new ApiError("no such user found!", 404));
        res.status(httpStatus.OK).send(updatedDoc);
      })
      .catch((e) => next(new ApiError(e.message)));
  }

  deleteSection(req, res) {
    if (!req.params.id) {
      res.status(httpStatus.BAD_REQUEST).send({
        message: "user id not found",
      });
    }
    SectionService.delete(req.params.id)
      .then((response) => {
        if (!response) {
          return res.status(httpStatus.NOT_FOUND).send({ message: "user  id not found" });
        }
        res.status(httpStatus.OK).send({
          message: `user - id#${response._id} deleted`,
        });
      })
      .catch((e) => {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e);
      });
  }
}

module.exports = new Section();
