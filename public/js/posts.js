//this part helps us retrieve all functions working with posts
//getPost helps us retrieve posts
//we need to put the right URL to get the posts from the frontend
//in the backend we said the root path is /posts so the fronted needs
//to match it as well
//since the response is encrypted we need to turn the response into json
//in order to use getPost function we need to connect this file to the admin page
//go to admin>index.html add the script tag called /js/posts.js
//everytime the user opens admin page, the getPost function is called
// it download the posts from database and insert it into the admin page


//this is a function to get all the posts from the backend and then inject it the posts into the admin page
async function getPosts() {
    return await fetch('http://localhost:3000/posts')
                    .then((response) => response.json())
                    .then((data) => data);
}