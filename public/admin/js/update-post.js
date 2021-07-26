{
let articlesBlock = document.querySelector('.articles');
let updateForm = document.querySelector('.update-post-form');
let titleInp = document.querySelector('#update-title');
let textArea = document.querySelector('#update-text');
let id;


articlesBlock.addEventListener('click', async function(e){
    //these actions have to be executed when we click on edit button
    if(e.target.classList.contains('btn-edit')) {

        //search for the id value
        id = e.target.parentNode.parentNode.querySelector('.id').value;

        //to fill data in update form we gotta first get the data
        //to do this we create a new get post method from router>posts.js
        //after creating the file we call it using fetch

        //store all the data inside postInfo while we await the data
        let postInfo = await fetch('http://localhost:3000/posts/' + id)
            //convert response fron server into json format
            .then((resp) => resp.json())
            //then we work with this data
            .then((data) => data)


        //fill in the form with the current title 
        titleInp.value = postInfo.title;

        //fill in the form with current text of the post
        textArea.value = postInfo.text;

        //after all the actions above, the updateTab below will be shown/become active
        let articlesTab = document.getElementById('v-pills-articles');
        articlesTab.classList.remove('show');
        articlesTab.classList.remove('active');

        //update-post button is active
        let updateTab = document.getElementById('v-pills-update-post');
        updateTab.classList.add('show');
        updateTab.classList.add('active');
      }
    })


    updateForm.addEventListener('submit', function(e) {
        e.preventDefault();
        fetch('http://localhost:3000/posts/' + id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: titleInp.value,
                text: textArea.value,
                description: textArea.value.substring(0, textArea.value.indexOf('.') + 1)
            })
        }).then((resp) => resp.text())
        .then(() => window.history.go());
    })
}