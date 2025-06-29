import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setAuth } from './redux/authReducer';
import './App.css'

function App() {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [username,setUsername] = useState("");
  const [password,setPassword] = useState("");
 



  async function login(username,password){

     const response = await fetch("http://localhost:5000/login",{
      method:'POST',
      credentials:"include",
      headers:{
        'Content-Type':'application/json'
      },

//   When sending a POST request to the backend:

// Content-Type: 'application/json' tells the server:
// "I'm sending data in JSON format. Please parse it as JSON."

// Without this header:

// The server won’t know how to interpret the request body.

// req.body will be undefined (especially in Express if you're using express.json()).

// So, always set Content-Type: 'application/json' when sending JSON data in the body.
      
      body: JSON.stringify({username:username,password:password})

//       🔍 Why fetch expects the body to be a string, not a JS object:
// The fetch API is designed to work with HTTP requests, and the HTTP specification defines that:

// ✅ The body of an HTTP request is just raw data — not tied to any programming language or structure.

// 💡 Here's why we must JSON.stringify:
// JavaScript objects ({}) aren't valid HTTP body content by themselves. So, to send them over HTTP:

// You must convert the object to a string.

// And tell the server what type of string it is using headers like Content-Type: 'application/json'.
     })

     

     if(response.ok){
      const data = await response.json();
        dispatch(setAuth({username,token:data.token}));  // for normal token generation - you can store token in redux;
        navigate("/dashboard")
     }

    //  In the Fetch API, response.ok is a boolean that indicates whether the HTTP response
    //   was successful (i.e., the status code is in the range 200–299).


  }


  const handleSubmit= (e)=>{
    e.preventDefault();
     if(!username || !password){
      alert("provider username and password");
      return;
     }

     login(username,password)
  }

  return (
    <div className='container'>


    <div className='login-wrapper'>
      <label htmlFor='username'>UserName:</label>
      <input id="username" onChange={(e)=>setUsername(e.target.value)} type="text" placeholder='Username' />
      <label htmlFor='password'>Password:</label>
      <input id="password" onChange={(e)=>setPassword(e.target.value)} type="text" placeholder='Password'  />

      <button onClick={handleSubmit}>SUBMIT</button>

    </div>


     
    </div>
  )
}

export default App
