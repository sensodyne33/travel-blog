//search for form in index.html by its class name
let createForm = document.querySelector('.create-post-form');

//search for post variables by its name
//. is for class names; # is for id names
let createTitle = document.querySelector('#create-title');
let createCountry = document.querySelector('#create-country');
let createImageUrl = document.querySelector('#create-image-url');
let createText = document.querySelector('#create-text');
let createImageFile = document.querySelector('#create-image-file');

//once it's submitted some actions have to be executed
createForm.addEventListener('submit', function(e) {
    //prevent default submit response
    e.preventDefault();

    let text = createText.value;
    //send files with binary data like images
    //by using the form data format we can work with files; json we cant
    let data = new FormData();
    data.append('title', createTitle.value);
    data.append('country', createCountry.value);
    data.append('imageURL', createImageUrl.value);
    data.append('text', text);
    data.append('description', text.substring(0, text.indexOf('.') + 1));
    //allow us to import images files
    data.append('imageFile', createImageFile.files[0]);

    //collect and send all data to the backend server by calling fetch function
    //this is diff since now we passing data format instead of json in order to send images
    fetch('http://localhost:3000/posts', {
        method: 'POST',
        body: data
        //shows the posts sent to the backend in the main html page
    }).then((response) => response.text()).then((data) => window.history.go());

})

//once one image is added, the other input is disabled
//if input1 is filled, inout 2 has to be disabled
function disabledInput(input1, input2) {
    if (input1.value) {
        input2.disabled = true;
    } else {
        input2.disabled = false;
    }
}
//when the event change happens, we call the function that has not been disabled
createImageUrl.addEventListener('change', function(){disabledInput(this, createImageFile)});
createImageFile.addEventListener('change', function(){disabledInput(this, createImageUrl)});