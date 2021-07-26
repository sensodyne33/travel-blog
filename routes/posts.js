
let Post = require ('../models/posts').Post;
let uniqid = require('uniqid');
let express = require('express');
let router = express.Router();


//get all the posts from the backend
router.get('/', async (req, resp)=>{
    let posts = await Post.find();
    resp.send(posts);
})

//get the posts data for the update-form
//get data by its id number
router.get('/:id', async (req, resp) => {
    //first we gotta read the id number
    let id = req.params.id;
    let post = await Post.findOne({id: id});
    //return this post
    resp.send(post);
})

//post all the posts from frontend and save to backend
router.post('/', async (req, resp)=>{
    let reqBody = req.body;

    //allow us to display image files in the front page by accessingthe public/image folder
    let imgPath;
    if(reqBody.imageURL){
        imgPath = reqBody.imageURL;
    } else{
        imgPath = req.file.path.substring(req.file.path.indexOf(path.sep), req.file.path.length);
    }
 
    let newPost  = new Post({
        id: uniqid(),
        title: reqBody.title,
        date: new Date(),
        description: reqBody.description,
        text: reqBody.text,
        country: reqBody.country,
        imageURL: imgPath
    })
    // console.log(req.file);
    await newPost.save();
    resp.send('Created')
})
 
//add a delete request to the backend 
router.delete('/:id', async (req, resp) => {
    //get the value of the id
    let id = req.params.id;
    //delete post by id
   await Post.deleteOne({id: id});
   //once post is delete display deleted message
   resp.send('Deleted');
})
 
//add a put request to update backend data
router.put('/:id', async (req,resp) => {
    //to read id of the post
    let id = req.params.id;
    //update the post id and body
    //this is an async process
    await Post.updateOne({id: id}, req.body);
    //send response to client with msg updated
    resp.send('updated');
})


module.exports = router;