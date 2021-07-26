
//link to call-me-form
let callMeForm = document.querySelector('.call-me-form');

//this is for the front page call-me function
callMeForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    //find value of the submitted request
    let phoneInp = callMeForm.querySelector('input');
    //make a post request to the server from the frontend URL 
    fetch('http://localhost:3000/callback-requests', {
        //specify that is a POST request
        method: 'POST',
        //sending json object
        headers: {
            'Content-Type': 'application/json'
        },
        //send data itself 
        body: JSON.stringify({
            //phone number is the key; phoneInp is the value
            //the value is nested inside of the form and its tag is input
            phoneNumber: phoneInp.value
        })
        //then when request is made we convert response from serve into text format
        //then inform user we got the callback request
    }).then((resp) => resp.text()).then(() => alert('We will call you back as soon as possible!'));
})

//this is for the front page cards
document.addEventListener('DOMContentLoaded', async function() {
    //once document is loaded, do getPost from the database
    let posts = await getPosts();

    //we search the div with the class articles
    let articles = document.querySelector('.articles');
    //makes sure the div is not empty
    articles.innerHTML = ' ';

    //since it's an array list we can use a forEach function to get each post
    posts.forEach((post) => {
        //automatically generate cards in the front page
        //redirect "details button" to big-ben.html page
        let postHTML = `
        <div class="col-4">
        <div class="card">
            <img class="card-img-top" src="${post.imageURL}" alt="${post.title}">
            <div class="card-body">
                <h4 class="card-title">${post.title}</h4>
                <p class="card-text">${post.description}</p>
                <a href="/sight?id=${post.id}" class="btn btn-primary">Details</a>
            </div>
        </div>
    </div>`;

      //if it's empty we add data after the end of the postHHTML
      articles.insertAdjacentHTML('beforeend', postHTML);
    })
})

