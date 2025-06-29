✅ Your Doubt:
When JWT is sent back to the backend in cookies on future requests,
how does the backend know this token is valid for that particular user?

🔐 Here's how it works step by step:
✅ 1. On Login:
You call /login with username/password.

Backend creates a JWT token:

js
Copy
Edit
const token = jwt.sign({ username }, JWT_SECRET);
This token contains encoded user info ({ username: "Shashi" }) and a digital signature using your JWT_SECRET.

✅ 2. Token sent to browser:
It's stored in an HttpOnly cookie → automatically sent on every future request.

🔁 3. On future API request (e.g. /profile, /dashboard):
The browser automatically includes the cookie containing the JWT token.

Backend reads this cookie and verifies it:

js
Copy
Edit
const token = req.cookies["token-shashi"];
const decoded = jwt.verify(token, JWT_SECRET);
jwt.verify() does two things:

Checks the signature using JWT_SECRET to ensure it's not tampered.

Decodes the data (e.g., { username: "Shashi" }) and gives it back.

✅ 4. Now backend knows:
The token is valid (not forged).

The token was not modified.

It belongs to the same user who logged in, because it contains their data.

📦 Middleware (to protect routes):
To make this easy, you write middleware:

js
Copy
Edit
const jwt = require("jsonwebtoken");

function authenticateToken(req, res, next) {
  const token = req.cookies["token-shashi"];
  if (!token) return res.sendStatus(401); // Unauthorized

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403); // Invalid token
    req.user = user; // Attach decoded user to request
    next(); // Continue to protected route
  });
}
Use it like this:

js
Copy
Edit
app.get("/dashboard", authenticateToken, (req, res) => {
  res.json({ message: `Hello ${req.user.username}` });
});
🧠 Summary
What happens	How it works
✅ Token issued	At login, JWT is signed with JWT_SECRET
✅ Token stored	In HttpOnly cookie
✅ Token sent	Automatically with every request
✅ Backend verifies	With jwt.verify(token, JWT_SECRET)
✅ Identity confirmed	User data is extracted from the token
✅ Route protected	Only verified users get access