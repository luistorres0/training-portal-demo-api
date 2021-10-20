const router = require("express").Router();
const controller = require("./users.controller")

router.route("/login").post(controller.authenticate)
router.route("/").post(controller.create)

module.exports = router;