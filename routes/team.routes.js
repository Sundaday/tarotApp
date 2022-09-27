const router = require("express").Router();
const teamController = require("../controllers/team.controller");

//Teams
router.post("/", teamController.createTeam);
router.get("/", teamController.readTeam);
router.put("/:id", teamController.updateTeam);
router.delete("/:id", teamController.deleteTeam);

module.exports = router;