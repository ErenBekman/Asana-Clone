const express = require("express");
const router = express.Router();
const validate = require("../middleware/validate");
const schemas = require("../validations/Projects");
const authenticateToken = require("../middleware/authenticate");
const idChecker = require("../middleware/idChecker");
const ProjectController = require("../controllers/Project");

// Project
router.route("/").get(authenticateToken, ProjectController.index);
router.route("/").post(authenticateToken, validate(schemas.createValidation), ProjectController.create);
router.route("/:id").patch(idChecker(), authenticateToken, validate(schemas.updateValidation), ProjectController.update);
router.route("/:id").delete(idChecker(), authenticateToken, ProjectController.deleteProject);

module.exports = router;
