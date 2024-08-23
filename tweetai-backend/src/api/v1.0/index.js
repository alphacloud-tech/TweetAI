var express = require("express");
var router = express.Router();
const cors = require("cors");
const passport = require("passport");
require("../../../config/passport")(passport); // Require controller modules.

const index_controller = require("../../controllers/indexController");
const autobotsRouter = require("./route/autobots");


if (process.env.NODE_ENV == "test") {
    //for UNIT TESTING
} else {
    router.get("/", index_controller.index);

    // router.use("/autobot", cors(), auth, passport.authenticate("jwt", { session: false }), usersRouter);
    router.use("/autobot", cors(), autobotsRouter);

}

module.exports = router;
