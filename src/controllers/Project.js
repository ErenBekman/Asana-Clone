const httpStatus = require("http-status");
const ProjectService = require("../services/ProjectService");
const ApiError = require("../errors/ApiError");

class Project {
  index(req, res) {
    ProjectService.list()
      .then((response) => {
        res.status(httpStatus.OK).send(response);
      })
      .catch((e) => {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e);
      });
  }

  create(req, res) {
    req.body.user_id = req.user;
    ProjectService.create(req.body)
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
    ProjectService.update(req.params.id, req.body)
      .then((updatedProject) => {
        if (!updatedProject) return next(new ApiError("project not found!", 404));
        res.status(httpStatus.OK).send(updatedProject);
      })
      .catch((e) => next(new ApiError(e.message)));
  }

  deleteProject(req, res) {
    if (!req.params.id) {
      res.status(httpStatus.BAD_REQUEST).send({
        message: "user id not found",
      });
    }
    ProjectService.delete(req.params.id)
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

module.exports = new Project();
