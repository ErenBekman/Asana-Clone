const express = require("express");
const router = express.Router();
const validate = require("../middleware/validate");
const schemas = require("../validations/Sections");
const authenticateToken = require("../middleware/authenticate");
const idChecker = require("../middleware/idChecker");
const SectionsController = require("../controllers/Sections");

// Section
router.route("/").post(authenticateToken, validate(schemas.createValidation), SectionsController.create);
router.route("/:id").patch(idChecker(), authenticateToken, validate(schemas.updateValidation), SectionsController.update);
router.route("/:id").delete(idChecker(), authenticateToken, SectionsController.deleteSection);
// Section of Project
router.route("/:projectId").get(authenticateToken, SectionsController.index);

module.exports = router;
