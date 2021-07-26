//search for form by its class name

let emailRequestForm = document.querySelector('.email-request-form');

//now when the form is submitted we stop the default handler of the submit button
emailRequestForm.addEventListener('submit', function(e) {
    e.preventDefault();

    //now make a post request to the server
    fetch('http://localhost:3000/emails', {
        method: 'POST', 
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            name: document.querySelector('#name').value,
            email: document.querySelector('#email').value,
            text: document.querySelector('#message').value
        })
    }).then((resp) => resp.text()).then((data) => console.log(data));

})