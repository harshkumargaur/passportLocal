# Using Passport.js Local Strategy Database: mongoDb  (Authentication basics)

**Functionalities**
1. create user
2. login user
3. logout user
4. change password given user know old password
5. reset the password 
6. protecting the routes 
7. persisting user sessions using cookie-session npm pkg (the ssession cookie will contain the logged in user id which is base 64 encoded)

*** Notes ***
1. to create a self signed certificate run the command in  *** gen_self_signed.txt ***
2. ***isLogged()**  function present in the index.js at line 57 restrict only authorized user to enter
3. **res.locals.variable_name**  are present accross all the template files  .ejs

## File/Folder Structure

<img src = "/treeLayout.png" />


*** configure passport js to use email as the username field  ***
 set usernameField: email
 set usernameQueryFields : ['email']

 refer to models/user.js  line : 26 - 27




*** Index.js ***
1. registering user : line 77 - 91
2. logging in user : 97 - 100
3. change password : 107 - 120
4. forgot password : 122 - 140
5. reset password : 142 - 176
6. logout user : 179 - 182


*** working of change password ***

The whole process is done using a get request to /changePassword and a post request to /changePassword

1. The user needs to be logged in 
2. The user will be find using the **req.user** object 
3. findByUsername static built in method provided by passport.js will be used to find user
4. using **user.changePassword(oldPass,newPass)** the user passwod is now changed to *** newPass *** 
5. log out the current user using req.logout() 

*** working of forgot password ***

The whole process is done using 4 requests :

1. app.get('/forgotPassword',function(req,res){}
2. app.post('/forgotPassword',async function(req,res){}
3. app.get('/resetPassword/:q',async function(req,res){}
4. app.patch('/resetPassword/:q',async function(req,res){}

_step 1_ : the get request to /forgotPassword will render a form which will ask to enter your email with which the user exists

_step 2_ : on submitting the above form a post request will bw done to /forgotPassword and perform the below actions:

        1. find the user with the provided email
        2. generate the resetToken for the user
        3. for generation of reset Token refer to ***models/user.js**  look for the instance method ***createResetToken***
        4. add the encrypted token in the resetToken field
        5. save the user
        6. send the email to the user's email will the reset token (unencrypted) with the reset link
        7. the email functionality is present in utils/email.js

_step 3_ : the user will get the email with the reset url and token 

        1. make a get request to the url /resetPassword/:q and extract the req.params.q  refer to '/public/js/reset.js'
        2. first encrypt the reset token and then find the user based on reset token
        3. render the reset template 
        4. fill the form 

_step 4_ : on submiting the form a patch request will be made to /resetPassword/:q 

            1. find the user based on encrypted token 
            2. user the method setpassword provided by passport.js on user
            3. save the user
            4. reset successful






