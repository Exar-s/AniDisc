# Anidisc
Anidisc is a web app where users can browse and discuss anime

# Features
  - Make post(Title, Body, Img)
  - Make comments under post
  - Search anime by name or filter
  - Create and authenticate user using JWT
  - Update user profile pic and signature
  - View other users profile

# Tools
  ## Front End
    - react
    - react-redux
    - react-router-dom
    - react-draft-wysiwyg
    - jwt-decode
  ## Back End
    - node.js
    - express
    - mongoose
    - mongoose-paginate-v2
    - bcyrpt
    - sharp
    - multer
    - jsonwebtoken
   ## API
    - Jikan API
    
# Installation
```
git clone
Create a .env file for mongodb and a secret key
cd server npm install && npm start / npm run dev
cd client npm install && npm start
```

# Future plans
  - Post and comment voting
  - Follow anime 
  - Seperate home view when logged in and get followed anime posts
  

# Screenshots
<b>Home Page</b>
<br>
<img src="https://github.com/Exar-s/Anidisc/blob/main/client/src/imgs/docs/home.png" alt="home" width="500"/>
<br>
<br>
<b>Post Page</b>
<br>
<img src="https://github.com/Exar-s/Anidisc/blob/main/client/src/imgs/docs/post.png" alt="post" width="500"/>
<br>
<br>
<b>Comment Page</b>
<br>
<img src="https://github.com/Exar-s/Anidisc/blob/main/client/src/imgs/docs/comment.png" alt="comment" width="500"/>
<br>
<br>
<b>User Page</b>
<br>
<img src="https://github.com/Exar-s/Anidisc/blob/main/client/src/imgs/docs/user.png" alt="user" width="500"/>
