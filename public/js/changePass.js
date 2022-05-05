'use strict';

const passwordChangeForm = document.querySelector('.passwordChangeForm');
const passwordOld = document.querySelector('#passwordOld');
const passwordNew = document.querySelector('#passwordNew');

passwordChangeForm.addEventListener('submit',async function(e){
    e.preventDefault();
    console.log("change form clicked");

    const response = await axios({
        method:'post',
        url:'https://localhost:8000/changePassword',
        data:{
            oldPassword: passwordOld.value,
            newPassword: passwordNew.value
        }
    })

    if (response.status === 200) {
        location = '/login'
    }
})