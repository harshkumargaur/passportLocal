'use strict';


const passwordResetForm = document.querySelector('.passwordResetForm');
const email = document.querySelector('#email');


passwordResetForm.addEventListener('submit',async function(e){
    e.preventDefault();
    console.log('clicked');
   const response = await axios({
       method:'post',
       url: 'https://localhost:8000/forgotPassword',
       data:{
           email: email.value
       }
   })
   
    if (response.status === 200) {
        console.dir(response);
        passwordResetForm.insertAdjacentHTML('afterend',`<p> ${response.data.message}`);
    }else{
        console.log('error');
    }
})

