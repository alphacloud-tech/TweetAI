const express = require('express');
const router = express.Router();
const autobot_controller = require("../../../controllers/autobotController");


// Rate Limiting Middleware
const rateLimit = require('express-rate-limit');
const limiter = rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: 5, // Limit each IP to 5 requests per windowMs
});


router.get('/list', limiter, autobot_controller.getAutobots);
router.get('/post-list', limiter, autobot_controller.getAutobotsPost);
router.get('/count', limiter, autobot_controller.getAutobotCount);

router.get('/post/list/:autobotId', limiter, autobot_controller.getPostByAutobotId);
router.get('/post/show/:id', limiter, autobot_controller.getAutobotPostById);
router.get('/post/comment/show/:id', limiter, autobot_controller.getAutobotPostCommentsById);

module.exports = router;
