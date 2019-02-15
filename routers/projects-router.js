const express = require("express");
const Projects = require("../data/helpers/projectModel");

const router = express.Router();

router.get("/", (req, res) => {
  Projects.get()
    .then(project => {
      if (!project) {
        res.status(404).json({ message: "No projects were found" });
      } else {
        res.status(200).json(project);
      }
    })
    .catch(() => res.status(500).json({ message: "server error" }));
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  Projects.getProjectActions(id)
    .then(project => {
      if (project.length > 0) {
        res.status(200).json(project);
      } else {
        res
          .status(404)
          .json({ message: "No actions were found within this project." });
      }
    })
    .catch(() => res.status(500).json({ message: "server error" }));
});

router.post("/", (req, res) => {
  const { name, description, completed } = req.body;

  if (!name || !description) {
    res.status(400).json({ message: "Please enter a name and description." });
  }
  Projects.insert({ name, description, completed })
    .then(project => res.status(201).json(project))
    .catch(() => res.status(500).json({ message: "server error" }));
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  Projects.remove(id)
    .then(project => {
      if (!project) {
        res.status(404).json({
          message:
            "There are no projects to delete with that id. try a different id."
        });
      } else {
        res.status(200).json({ message: "project successfully deleted." });
      }
    })
    .catch(() => res.status(500).json({ message: "server error" }));
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { name, description, completed } = req.body;

  Projects.update(id, { name, description, completed })
    .then(project => {
      if (!name || !description) {
        res
          .status(400)
          .json({ message: "Please enter a name and description" });
      } else if (!project) {
        res
          .status(404)
          .json({ message: "a project with that id was not found" });
      } else {
        res.status(200).json(project);
      }
    })
    .catch(() => res.status(500).json({ message: "server error" }));
});

module.exports = router;
