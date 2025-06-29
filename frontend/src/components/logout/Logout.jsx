import React from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {

    const navigate = useNavigate();

    const logout = async()=>{

        try{

            const response =  await fetch("http://localhost:5000/logout",{
                method:'POST',
                credentials:"include",
            });
            

            if(response.ok){
                console.log("LOGGED OUT");
                navigate("/");

            }

        }catch(err){
console.log("ERRROR OCCURED");
            }
        }
    

//     🔍 Reasons why POST is preferred:
// Reason	Explanation
// 1. It performs a side effect	Logging out changes session state by removing the token cookie — that’s a side effect, not a "read-only" operation.
// 2. Avoids CSRF attacks	Some browsers allow cookies to be sent with GET requests from malicious sites. A POST requires intent and is safer with sameSite policies.
// 3. Aligns with REST principles	Actions that modify state (like logout) should not be GET. POST is the right verb.
// 4. Consistent with login	Login is also a POST, since it sets a cookie or token. Logout being a POST mirrors that flow.



  return (
    <button style={{padding:'20px',border:'1px solid red'}} onClick={logout}>Logout</button>
  )
}

export default Logout;