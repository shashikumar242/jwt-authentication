const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();


app.use(express.json());
app.use(cookieParser());
// Without cookie-parser, req.cookies is undefined.

// cookie-parser parses cookies from incoming requests and populates req.cookies properly.

// Then req.cookies['token-shashi'] works as expected.s


app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}));


const PORT = 5000;


const user = {
    username:"Shashi",
    password : "Shashikumar@1997"
}

const JWT_SECRET = 'supersecretkey'

app.get("/",(req,res)=>{
    // res.send(('API IS RUNNING'));
    res.json({shashi:'i am shashi'})
});



app.post('/login',(req,res)=>{

    const {username,password} = req.body;

    if(!username || !password){
        return res.status(401).json({message: "Username and Password are required"})
    }

    if(user.username !== username || user.password !== password){
         return res.status(401).json({message: "Invalid Credentials"})
    }

    const token = jwt.sign({username},JWT_SECRET);

    res.cookie("token-shashi",token,{
        httpOnly:true,
        secure:false,
        sameSite:"lax",
        maxAge: 60 * 60 * 1000  // it will persist for one hour

//   If you did not set maxAge or expires, it becomes a session cookie, which:
// Lives only while the browser is open

// Gets deleted when the browser/tab is closed

// better to use maxAge or expire time in large scale apps becas everytime you close tab - you need to login again

    })

    res.json({message:"Login Successfull",token})

})


app.get('/names-list',authenticateToken,(req,res)=>{

    res.json({data:[{id:1,name:'shashi'},{id:2,name:'Umarani'},{id:3,name:'Srinivas'}]})

})

app.post('/logout',authenticateToken,(req,res)=>{
    res.clearCookie('token-shashi',{
        httpOnly:true,
        sameSite:'lax',
        secure:false
    })
  res.json({message: "Logout Successfull"});
})


function authenticateToken(req,res,next){

// Middlewares in Express are functions that run before the route handler and have access to:

// req – the request object

// res – the response object

// next() – a function to pass control to the next middleware or route

    const tokenFromCookie = req.cookies['token-shashi'];

     const tokenFromHeader = req.headers['authorization']?.split(' ')[1];

     const token = tokenFromCookie || tokenFromHeader;

    if(!token) return res.sendStatus(401); // Unauthorized

    jwt.verify(token,JWT_SECRET,(err,decoded)=>{
        if(err) return res.sendStatus(403); // Invalid Token

        req.user = decoded; // 

//         req.user = decoded;
// If token is valid, the decoded data (like { username: "Shashi" }) is saved to req.user

// This allows downstream route handlers to access the user info:

// console.log(req.user.username);

        next();

    })

}


app.listen(PORT,()=>{
    console.log(`server running at http://localhost:${PORT}`)
})


// 1. ✅ httpOnly: true
// Meaning: JavaScript cannot access this cookie (document.cookie won’t show it).

// Why: This protects the token from being stolen via XSS (Cross-Site Scripting) attacks.

// ✅ This is one of the main reasons HttpOnly cookies are considered more secure.

// 2. ✅ secure: false
// Meaning: The cookie will be sent over HTTP, not just HTTPS.

// Note: In production, you MUST set this to true so that it only gets sent over secure connections.

// js
// Copy
// Edit
// secure: process.env.NODE_ENV === "production"
// ✅ Secure cookies prevent attackers from intercepting them over insecure networks.

// 3. ✅ sameSite: "Lax"

// 🔐 What is sameSite in cookies?
// The SameSite attribute tells the browser when to send the cookie along with a request — especially in cross-site requests.

// Cross-site requests happen when:

// A different website (not your domain) tries to send a request to your backend.

// Example: a malicious site tries to hit yourdomain.com/api/transfer-funds from a hidden form.

//  🎯 Why it matters: CSRF Protection
// Without SameSite, any site can trick the browser into sending your 
// cookies (including your JWT token) to your site — which may allow attackers to perform unauthorized actions.

// SameSite: "Lax" ✅ (Default in many browsers)
// Cookies are sent in top-level navigations:

// Clicking a link to your site from another site ✅

// Cookies are not sent for:

// POST, PUT, or AJAX fetch() requests from other sites ❌

// ✅ This is a good balance between security and usability.
// ✅ Helps prevent CSRF, because it blocks cross-site form submissions and AJAX requests.

// 4. ✅ maxAge: 60 * 60 * 1000
// This is how long the cookie will last in the browser (in milliseconds).

// 60 * 60 * 1000 = 3,600,000 ms = 1 hour

// After this time, the browser will automatically delete the cookie.