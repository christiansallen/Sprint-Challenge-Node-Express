const express = require("express");

const actionsRouter = require("./routers/actions-router");
const projectsRouter = require("./routers/projects-router");

const server = express();
server.use(express.json());

server.use("/api/actions", actionsRouter);
server.use("/api/projects", projectsRouter);

server.get("/", (req, res) => {
  res.send("<h2>Sprint Challenge Node Express</h2>");
});

module.exports = server;
