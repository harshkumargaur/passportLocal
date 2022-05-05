# Using Passport.js Local Strategy Database: mongoDb  (Authentication basics)

**Functionalities**
1. create user
2. login user
3. logout user
4. change password given user know old password
5. reset the password 
6. protecting the routes 
7. persisting user sessions using cookie-session npm pkg

*** Notes ***
1. to create a self signed certificate run the command in  *** gen_self_signed.txt ***
2. ***isLogged()**  function present in the index.js at line 57 restrict only authorized user to enter
3. **res.locals.variable_name**  are present accross all the template files  .ejs


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



