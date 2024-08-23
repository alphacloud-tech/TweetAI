const express = require("express");
const User = require("../../models").User;
const passport = require("passport");
require("../../config/passport")(passport);
const Helper = require("../utils/helper");
const helper = new Helper();
const Response = require("../utils/response");
const response = new Response();
const BaseFunction = require("../utils/baseFunction");
const baseFunction = new BaseFunction();
const { Autobot, Post, Comment } = require('../../models');


exports.getAutobots = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 0;
        const limit = 10;
        const offset = page * limit;

        const autobots = await Autobot.findAll({
            limit,
            offset,
            include: [{
                model: Post,
                include: [Comment]
            }]
        });

        res.status(200).send(response.responseSuccess(autobots, true, "Autobots retrieve successfully!", "Autobots retrieve successfully!", 200));
    } catch (error) {
        console.log(error);
        console.error(error.message);
        res.status(400).send(response.responseError(error.message, false, "Sorry! Autobots retrieve unsuccessfully!", "Sorry! Autobots retrieve unsuccessfully!", 400));
    }
};
exports.getAutobotsPost = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 0;
        const limit = 10;
        const offset = page * limit;

        const autobots = await Post.findAll({
            limit,
            offset,
            include: [{
                model: Autobot,
                Comment
            }]
        });

        res.status(200).send(response.responseSuccess(autobots, true, "Autobots retrieve successfully!", "Autobots retrieve successfully!", 200));
    } catch (error) {
        console.log(error);
        console.error(error.message);
        res.status(400).send(response.responseError(error.message, false, "Sorry! Autobots retrieve unsuccessfully!", "Sorry! Autobots retrieve unsuccessfully!", 400));
    }
};


exports.getAutobotCount = async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 10;
        const count = await Autobot.count({ limit });
        res.status(200).send(response.responseSuccess({ count }, true, "", "", 200));
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch count' });
    }
};


exports.getPostByAutobotId = async (req, res) => {
    try {
        const posts = await Post.findAll({
            include: [{ model: Comment, }, { model: Autobot }],
            where: { autobotId: req.params.autobotId }, limit: 10
        });
        res.status(200).send(response.responseSuccess(posts, true, "Posts retrieve successfully!", "Posts retrieve successfully!", 200));
    } catch (error) {
        console.error(error.message);
        res.status(400).send(response.responseError(error.message, false, "Sorry! Posts retrieve unsuccessfully!", "Sorry! Posts retrieve unsuccessfully!", 400));
    }
};

exports.getAutobotPostById = async (req, res) => {
    try {
        const posts = await Post.findOne({
            include: [{ model: Comment, }, { model: Autobot }],
            where: { id: req.params.id }, limit: 10
        });
        res.status(200).send(response.responseSuccess(posts, true, "Posts retrieve successfully!", "Posts retrieve successfully!", 200));
    } catch (error) {
        console.error(error.message);
        res.status(400).send(response.responseError(error.message, false, "Sorry! Posts retrieve unsuccessfully!", "Sorry! Posts retrieve unsuccessfully!", 400));
    }
};


exports.getAutobotPostCommentsById = async (req, res) => {
    try {
        console.log(req.params.id);
        const comments = await Comment.findAll({ where: { postId: req.params.id }, limit: 10 });
        res.status(200).send(response.responseSuccess(comments, true, "Comments retrieve successfully!", "Comments retrieve successfully!", 200));
    } catch (error) {
        console.error(error.message);
        res.status(400).send(response.responseError(error.message, false, "Sorry! Comments retrieve unsuccessfully!", "Sorry! Comments retrieve unsuccessfully!", 400));
    }
};

