const httpStatus = require("http-status");
const TaskService = require("../services/TaskService");
const ApiError = require("../errors/ApiError");

class Tasks {
  index(req, res) {
    TaskService.list()
      .then((response) => {
        res.status(httpStatus.OK).send(response);
      })
      .catch((e) => {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e);
      });
  }

  create(req, res) {
    req.body.user_id = req.user;
    TaskService.create(req.body)
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
    TaskService.update(req.params.id, req.body)
      .then((updatedDoc) => {
        if (!updatedDoc) return next(new ApiError("no such user found!", 404));
        res.status(httpStatus.OK).send(updatedDoc);
      })
      .catch((e) => next(new ApiError(e.message)));
  }

  deleteTask(req, res) {
    if (!req.params.id) {
      res.status(httpStatus.BAD_REQUEST).send({
        message: "user id not found",
      });
    }
    TaskService.delete(req.params.id)
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

  addComment(req, res) {
    if (!req.params.id) return res.status(httpStatus.BAD_REQUEST).send({ message: "id not found" });
    TaskService.show({ _id: req.params.id }).then((mainTask) => {
      if (!mainTask) return res.status(httpStatus.NOT_FOUND).send({ message: "task not found" });
      const comment = {
        ...req.body,
        commented_at: new Date(),
        user_id: req.user,
      };
      mainTask.comments.push(comment);
      mainTask
        .save()
        .then((updatedDoc) => {
          return res.status(httpStatus.OK).send(updatedDoc);
        })
        .catch((e) => res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e));
    });
  }

  deleteComment(req, res) {
    if (!req.params.id) return res.status(httpStatus.BAD_REQUEST).send({ message: "id not found" });
    TaskService.show({ _id: req.params.id }).then((mainTask) => {
      if (!mainTask) return res.status(httpStatus.NOT_FOUND).send({ message: "task not found" });

      mainTask.comments = mainTask.comments.filter((comment) => comment._id?.toString() !== req.params.commentId);
      mainTask
        .save()
        .then((updatedDoc) => {
          return res.status(httpStatus.OK).send(updatedDoc);
        })
        .catch((e) => res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e));
    });
  }

  addSubTask(req, res) {
    if (!req.params.id) return res.status(httpStatus.BAD_REQUEST).send({ message: "id not found" });
    TaskService.show({ _id: req.params.id }).then((mainTask) => {
      if (!mainTask) return res.status(httpStatus.NOT_FOUND).send({ message: "task not found" });

      TaskService.create({ ...req.body, user_id: req.user })
        .then((subTask) => {
          mainTask.sub_tasks.push(subTask);
          mainTask
            .save()
            .then((updatedDoc) => {
              return res.status(httpStatus.OK).send(updatedDoc);
            })
            .catch((err) => res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err));
          return res.status(httpStatus.CREATED).send(subTask);
        })
        .catch((e) => res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e));
    });
  }

  fetchTask(req, res) {
    if (!req.params.id) return res.status(httpStatus.BAD_REQUEST).send({ message: "id not found" });
    TaskService.show({ _id: req.params.id }, true)
      .then((task) => {
        if (!task) return res.status(httpStatus.NOT_FOUND).send({ message: "task not found" });
        return res.status(httpStatus.OK).send(task);
      })
      .catch((e) => res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e));
  }
}

module.exports = new Tasks();
