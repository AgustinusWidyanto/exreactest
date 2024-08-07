const express= require('express');
const router = express.Router()
const { Comments } = require("../models");
const { validateToken } = require('../middlewares/AuthMiddleware');

router.get('/:postId', async (req, res) => {
    const postId = req.params.postId  
    const postComment = await Comments.findAll({
        where: {
            PostId: postId
        }
    });
    res.send(postComment);
})

router.post('/', validateToken, async (req, res) => {
    const comment = req.body;
    comment.username = req.user.username
    await Comments.create(comment);
    res.json(comment);
})

router.delete('/:commentId', validateToken, async (req, res) => {
    const commentId = req.params.commentId;
    await Comments.destroy({
        where: {
            id:commentId
        }
    });
    res.json()
})

module.exports = router
