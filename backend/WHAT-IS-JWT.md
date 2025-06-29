<!-- JWT (JSON Web Token) A JWT is a compact, URL-safe string used to securely transmit information between parties as a JSON object.

 It is widely used for authentication and authorization in modern web applications.

🔐 JWT in a Nutshell:
A JWT is a string that looks like this:


eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.
eyJ1c2VybmFtZSI6InNoYXNoaSIsImlhdCI6MTY5NTYzMzUwMH0.
A_2uYoszHvjAFWl2TQsI5KKa74ZyPTAMN4DLrRSH50M
It’s made of three parts separated by dots (.):

Header — metadata about the token

Payload — actual data/claims (e.g., username, role, expiry)

Signature — ensures the token hasn’t been tampered with

✅ Structure Breakdown
1. Header

{
  "alg": "HS256", // algorithm used
  "typ": "JWT"
}
2. Payload (Claims)


{
  "username": "shashi",
  "role": "admin",
  "exp": 1719489600 // expiry timestamp
}
3. Signature
js

HMACSHA256(
  base64UrlEncode(header) + "." + base64UrlEncode(payload),
  secret
)
The signature is created using a secret key that only the server knows. That’s why JWTs are tamper-proof — if you change even one character, the signature becomes invalid.

🧠 What JWT is used for:
Purpose	How it's used
Authentication	After login, the server issues a JWT and sends it to the client (browser/mobile).
Authorization	The client sends this token with future requests (in headers/cookies) to access protected resources.
Stateless	Server doesn’t need to store session data — everything is encoded in the token.

🚀 JWT Flow Example
User logs in with username/password.

Server verifies the credentials.

Server generates a JWT (with payload like { username: "shashi" }) and sends it to the client.

Client stores it (e.g., in HttpOnly cookie or localStorage).

For every request, the client sends the JWT.

Server verifies it using the secret key and allows or denies access.


✅ Advantages
Stateless (no need to store sessions in the DB)

Portable (you can pass it through URLs, headers, etc.)

Secure if stored in HttpOnly cookies

Self-contained (all necessary info is inside the token)

⚠️ Things to be careful about
Concern	Best Practice
Token Theft	Store in HttpOnly cookies (avoid localStorage for sensitive tokens)
Token Expiry	Always set short-lived exp and use refresh tokens for longer sessions
Tampering	Sign with a strong secret or private key
 -->




Here's a practical example to understand JWT as a URL-safe string:

✅ Suppose you have a JWT like this:

eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InNoYXNoaSIsImlhdCI6MTcxODk2MzM3MH0.qrY5fyO4mGh3u0oLFpBojTkaNpsH9ZRA8kexLTMEZ5A
This token contains three parts:

Header: Encoded metadata

Payload: Data like username, user ID, etc.

Signature: Verifies integrity

✅ You can safely include this in a URL:
bash

https://yourapp.com/verify?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InNoYXNoaSIsImlhdCI6MTcxODk2MzM3MH0.qrY5fyO4mGh3u0oLFpBojTkaNpsH9ZRA8kexLTMEZ5A
✅ This works without breaking the URL
✅ No need for encoding or escaping special characters

🔴 But if it had unsafe characters like +, /, =
Let’s say you had this non-URL-safe Base64 string:

bash

eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9+/ey==...
Putting that in a URL like:

bash

https://yourapp.com/verify?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9+/ey==...
🚫 It could break the URL or mislead the server into splitting parameters incorrectly.

🧠 That’s why JWT uses Base64URL encoding to keep the token URL-safe by avoiding characters like:
+ → becomes -

/ → becomes _

= → is removed

