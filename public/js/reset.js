'use strict';


const passwordResetForm = document.querySelector('.passwordResetForm');
const newPassword = document.querySelector('#newPassword');
const confirmPassword = document.querySelector('#confirmPassword');

const paramIndexLength = document.location.toString().split('/').length

const token  = document.location.toString().split('/')[paramIndexLength-1];

console.log(token);

passwordResetForm.addEventListener('submit',async function(e){
    e.preventDefault();
    console.log('clicked');

    if (newPassword.value !== confirmPassword.value) {
        passwordResetForm.insertAdjacentHTML('afterend',`<p> new Password and Password confirm must be same
        <h2>Retry!!!</h2>
        </p>`);
        return;
    }
    
   const response = await axios({
       method:'patch',
       url: `https://localhost:8000/resetPassword/${token}`,
       data:{
           newPassword : newPassword.value,
           confirmPassword : confirmPassword.value
       }
   })
   
    if (response.status === 200) {
        console.dir(response);
        passwordResetForm.insertAdjacentHTML('afterend',`<p> ${response.data.message} </p>`);
    }else{
        console.log('error');
    }
})

