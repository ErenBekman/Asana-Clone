const express = require("express");
const fileupload = require("express-fileupload");
const helmet = require("helmet");
const config = require("./config");
const loaders = require("./loaders");
const events = require("./scripts/events");
const path = require("path");
const errorHandler = require("./middleware/errorHandler");
const { ProjectRoutes, UserRoutes, SectionsRoutes, TasksRoutes } = require("./routes");

config();
loaders();
events();

const app = express();
app.use("/uploads", express.static(path.join(__dirname, "./", "uploads")));
app.use(express.json());
app.use(helmet());
app.use(fileupload());

app.listen(process.env.APP_PORT || 8080, process.env.HOST || "0.0.0.0", () => {
  console.log(`Server is listening on http://localhost:${process.env.APP_PORT}/`);
  // * routers ****************************************************************
  app.use("/api/projects", ProjectRoutes);
  app.use("/api/users", UserRoutes);
  app.use("/api/sections", SectionsRoutes);
  app.use("/api/tasks", TasksRoutes);
  // * end routers ************************************************************

  app.use((req, res, next) => {
    const error = new Error("The page you were looking for could not be found..");
    error.status = 404;
    next(error);
  });
  // * error handler
  app.use(errorHandler);
});
