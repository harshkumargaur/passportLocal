'use strict';

const loginForm = document.querySelector('.loginForm');
const email = document.querySelector('#email');
const password = document.querySelector('#password');

let url;

if (document.title === 'login') {
    url = 'https://localhost:8000/login'   
} else if(document.title === 'register') {
    url= 'https://localhost:8000/register'
}

loginForm.addEventListener('submit',async function(e){
    e.preventDefault();
    const response = await axios({
        method: 'post',
        url: url,
        data:{
            email : email.value,
            password : password.value
        }
    })
    console.log(response);
    if(response.status === 200){
        location = '/';
    }
    
    
})

