const express = require('express');
const router = express.Router()
const { Users } = require("../models")
const bcrypt = require("bcrypt")
const { sign } = require('jsonwebtoken');
const { validateToken } = require("../middlewares/AuthMiddleware.js")

router.post('/', async (req, res) => {
    const { username, password } = req.body;
    const user = await Users.findOne({ where: { username: username } });
    if (user) {
        res.json({ error: "User Existed" });
    } else {
        bcrypt.hash(password, 10).then((hash) => {
            Users.create({
                username: username,
                password: hash
            });
            res.json(username + " saved");
        });
    }
})

router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    const user = await Users.findOne({ where: { username: username } });
    if (!user) {
        res.json({ error: "User Doesn't Exist" });
    } else {
        bcrypt.compare(password, user.password).then((match) => {
            if (!match) {
                res.json({ error: "Wrong Username or Password" });
            } else {
                const accessToken = sign({
                    username: user.username,
                    id: user.id
                },
                "importantsecret"
            )
            res.json({token: accessToken, username: username, id: user.id});
            }
        });
    }
})

router.get('/auth', validateToken, (req, res) => {
    res.json(req.user)
})

module.exports = router
