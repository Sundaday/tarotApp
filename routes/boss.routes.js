const router = require("express").Router();
const bossController = require("../controllers/boss.controller");

//bosss
router.post("/", bossController.createBoss);
router.get("/", bossController.readBoss);
router.put("/:id", bossController.updateBoss);
router.delete("/:id", bossController.deleteBoss);

module.exports = router;