const express = require("express");
const Actions = require("../data/helpers/actionModel");
const router = express.Router();

router.get("/", (req, res) => {
  Actions.get()
    .then(action => {
      if (action) {
        res.status(200).json({ action });
      } else {
        res.status(404).json({ message: "No actions are found" });
      }
    })
    .catch(() => res.status(500).json({ message: "Server error" }));
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  Actions.get(id)
    .then(action => {
      if (action) {
        res.status(200).json({ action });
      } else {
        res.status(404).json({ message: "No actions with that ID are found" });
      }
    })
    .catch(() => res.status(500).json({ message: "Server error" }));
});

router.post("/", (req, res) => {
  const { project_id, description, notes, completed } = req.body;

  if (!project_id || !description || !notes) {
    res.status(404).json({
      message: "Please enter a project id, description and notes"
    });
  }
  Actions.insert({ project_id, description, notes, completed })
    .then(action => {
      res.status(201).json(action);
    })
    .catch(() => res.status(500).json({ message: "Server error" }));
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;

  Actions.remove(id)
    .then(action => {
      if (!action) {
        res.status(404).json({ message: "No action with that ID was found." });
      } else {
        res
          .status(200)
          .json({ message: "The action was successfully deleted." });
      }
    })
    .catch(() => res.status(500).json({ message: "Server error" }));
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { project_id, description, notes, completed } = req.body;

  Actions.update(id, { project_id, description, notes, completed })
    .then(action => {
      if (!project_id || !description || !notes) {
        res
          .status(400)
          .json({
            message: "Please enter a project id, description and notes."
          });
      } else if (!action) {
        res
          .status(404)
          .json({
            message:
              "No action was associated with that id. try again with a different id."
          });
      } else {
        res.status(200).json(action);
      }
    })
    .catch(() => res.status(500).json({ message: "server error" }));
});

module.exports = router;
