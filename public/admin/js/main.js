
let addPostBtn = document.querySelector('.create-post-btn');

document.addEventListener('DOMContentLoaded', async function() {
    //when the webpage is loading add-post is first called
    addPosts();
    //then callback request is called
    addCallbackRequest() ;
    addEmails();
})

addPostBtn.addEventListener('click', function() {
  let articlesTab = document.getElementById('v-pills-articles');
  articlesTab.classList.remove('show');
  articlesTab.classList.remove('active');

  //then we need to add show actice to id=v-pills-create-post
  let createTab = document.getElementById('v-pills-create-post');
  createTab.classList.add('show');
  createTab.classList.add('active');
})

//add-post section 
async function addPosts() {
  let posts = await getPosts();

  //we search the div with the class articles
  let articles = document.querySelector('.articles');
  //makes sure the div is not empty
  articles.innerHTML = ' ';

  //saves order number instead of actual id
  let i = 1;
  //since it's an array list we can use a forEach function to get each post
  posts.forEach((post) => {
      //these are the data we are getting and turning into HTML form into the admin page
      let postHTML = `
      <article class="d-flex justify-content-between align-items-center article-inline">
      <div class="num w5">${i++}</div>
      <input class="id" type="hidden" value="${post.id}">
      <div class="name w30">${post.title}</div>
      <div class="date w30">${post.date}</div>
      <div class="country w20">${post.country}</div>
      <div class="edit w10"><button class="btn btn-link btn-edit">Edit</button></div>
      <div class="remove w5"><button class="btn btn-link btn-remove">X</button></div>
    </article>`;
    //if it's empty we add data after the end of the postHHTML
    articles.insertAdjacentHTML('beforeend', postHTML);
  })
}

//call-back request section
async function addCallbackRequest() {
  let requests = await getCallbackRequests();

  //v-pills-callback is the section where we inserted the data into html form
  let requestsBlock = document.querySelector('#v-pills-callback');
  requestsBlock.innerHTML = ' ';
  let i = 1;
  
  requests.forEach((request) => {
      let requestHTML = `
      <article class="d-flex justify-content-between align-items-center article-inline">
      <div class="num w5">${i++}</div>
      <input class="id" type="hidden" value="${request.id}">
      <div class="name w60">${request.phoneNumber}</div>
      <div class="date w30">${request.date}</div>
      <div class="remove w5"><button class="btn btn-link btn-remove">X</button></div>
    </article>`;
    requestsBlock.insertAdjacentHTML('beforeend', requestHTML);
  })
}

//when the pages loading the tab with post and the callback request is being filled in with data
//we will do the same for tab emails
async function addEmails() {
  let requests = await getEmails();
  let requestsBlock = document.querySelector('#v-pills-mail');
  requestsBlock.innerHTML = '';
  let i = 1;
  requests.forEach((request) => {
      let requestHTML = `
      <article class="d-flex justify-content-between align-items-center article-inline">
          <div class="num w5">${i++}</div>
          <input class="id" type="hidden" value="${request.id}">
          <div class="name w30">${request.name}</div>
          <div class="email w30">${request.email}</div>
          <div class="date w30">${request.date}</div>
          <div class="remove w5"><button class="btn btn-link btn-remove">X</button></div>
          <div class="text w100">${request.text}</div>
      </article>`;
      requestsBlock.insertAdjacentHTML('beforeend', requestHTML);
  })
}