const express = require("express");
const router = express.Router();
const validate = require("../middleware/validate");
const schemas = require("../validations/Tasks");
const authenticateToken = require("../middleware/authenticate");
const idChecker = require("../middleware/idChecker");
const TasksController = require("../controllers/Tasks");

// Task
router.route("/").get(authenticateToken, TasksController.index);
router.route("/").post(authenticateToken, validate(schemas.createValidation), TasksController.create);
router.route("/:id").patch(idChecker(), authenticateToken, validate(schemas.updateValidation), TasksController.update);
router.route("/:id").delete(idChecker(), authenticateToken, TasksController.deleteTask);
// Comment
router.route("/:id/add-comment").post(idChecker(), authenticateToken, validate(schemas.updateValidation), TasksController.addComment);
router.route("/:id/:commentId").delete(idChecker(), authenticateToken, TasksController.deleteComment);
// Sub Task
router.route("/:id/add-sub-task").post(idChecker(), authenticateToken, validate(schemas.createValidation), TasksController.addSubTask);
router.route("/:id").get(idChecker(), authenticateToken, TasksController.fetchTask);

module.exports = router;
