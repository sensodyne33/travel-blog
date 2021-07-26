//create function to get all callback requests from the database to the frontend
//this is a function to get all the posts from the backend and then inject it the posts into the admin page


//THIS IS THE GET REQUEST
async function getCallbackRequests() {
    return await fetch('http://localhost:3000/callback-requests')
                    .then((response) => response.json())
                    .then((data) => data);
}
