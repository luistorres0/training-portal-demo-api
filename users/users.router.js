const router = require("express").Router();
const controller = require("./users.controller")

router.route("/").post(controller.create)
router.route("/login").post(controller.authenticate)

module.exports = router;