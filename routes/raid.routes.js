const router = require("express").Router();
const raidController = require("../controllers/raid.controller");

//raids
router.post("/", raidController.createRaid);
router.get("/", raidController.readRaid);
router.put("/:id", raidController.updateRaid);
router.delete("/:id", raidController.deleteRaid);

module.exports = router;