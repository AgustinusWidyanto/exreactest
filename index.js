const express = require('express');
const app = express();
const cors = require('cors');
 
app.use(express.json());
app.use(cors())

const db = require('./models');

//Routers
const postsRouter = require('./routes/Posts.js');
app.use("/posts", postsRouter);
const commentsRouter = require('./routes/Comments.js');
app.use("/comments", commentsRouter);
const usersRouter = require('./routes/Users.js');
app.use("/auth", usersRouter);
const likesRouter = require('./routes/Likes.js');
app.use("/like", likesRouter);

const port = 3001;

db.sequelize.sync().then(() => {
    app.listen(port, ()=>{
        console.log("Server Running On http://localhost:" + port )
    })
})
