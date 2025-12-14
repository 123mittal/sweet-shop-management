import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Login.css";
export const Login = () =>{
    const[email,setEmail]=useState("");
    const[password,Setpassword]=useState("");

    const handlelogin = (e) =>{
        e.preventDefault();
        alert(`Logging in with email: ${email}`)
    }

    return(
    <div className="login-page">
    <form onSubmit={handlelogin} className="login-form">
    <h2>Login</h2>
        <input type="email" placeholder="email" value={email} onChange={(e)=> setEmail(e.target.value)} required/>
        <input type="password" placeholder="password" value={password} onChange={(e)=> Setpassword(e.target.value)} required/>        
        <button type="submit">Login</button>
         <p className="signup-text">
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </p>
        </form>
    </div>
    )
}