//we need to attach an event handler to every remove button so when the
//user clicks any of these buttons the post has be deleted


//problem is how to attach event handler to elements created dynamically?
//we need to use an "event delegation"
//all posts are nested inside the class "articles"
//the div already exists and then the posts are dynamically loaded into this div
//since "articles" already exists we can attach an event handler to this div

//search for articles div
let articlesBlock = document.querySelector('.articles');
//something happens when we click on X by linking its class name
articlesBlock.addEventListener('click', function(e){
    //if this class has element btn-remove then we delete post from database
    if(e.target.classList.contains('btn-remove')) {
        //we delete post by their id numbers
        //parentNode = article tag
        //inside of the article tag we find the input with class id 
        //and finally we take the id value
        let id = e.target.parentNode.parentNode.querySelector('.id').value;

        //now we delete post with this id by using fetch
        fetch('http://localhost:3000/posts/' + id, {
            //specifiy delete request
            method: 'DELETE'
            //convert response from server into text format
        }).then((resp) => resp.text())
        //then redirect client to main page of the admin page
        .then(() => window.history.go());
    }

})

//final part is connect delete-post.js to index.html file