import React, { useState } from "react";
import url from '../config.js'
import showToast from "../Toast.jsx";
import { useNavigate } from "react-router-dom";

function Login(){

    const [username, setusername] = useState("")
    const [password, setpassword] = useState("")

    const navigate = useNavigate();

    const handleNavigateToRegister = () => {
        setusername("")
        setpassword("")
        navigate("/")
    }

    const handleLogin = async (e)=>{
        e.preventDefault()
        if(!username.trim() || !password.trim()){
            showToast("error", "Please fill all fields")
            return
        }
        try {
            const response = await fetch(`${url}/api/user/login`,{
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password })
            })
            console.log("response", response)
            const data =  await response.json()
            console.log(data)
            if(data.status === "success"){
                localStorage.setItem("token", data.data.token)
                showToast("success",data.message || "USER Logined SUCCESSFULLY")
                setusername("")
                setpassword("")
                navigate('/ExpensesHome')
            }else{
                showToast("error", data.message || "SOMETHING WENT WRONG" )
            }
        } catch (error) {
            alert ("something went worng")
        }
    }



    return(
        <div className="flex flex-col items-center justify-center min-h-screen">
            <div className="bg-gray-200 rounded-lg p-8 w-full max-w-md">
                <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Login</h1>
                <form onSubmit={handleLogin} className="flex flex-col gap-4">
                    <label>
                        Username
                    </label>
                    <input
                        type="text"
                        placeholder="Username"
                        className="border border-gray-300 p-3"
                        value={username}
                        onChange={(e) => setusername(e.target.value)}
                    />
                    <label>
                        Password
                    </label>
                    <input
                        type="password"
                        placeholder="Password"
                        className="border border-gray-300 p-3"
                        value={password}
                        onChange={(e) => setpassword(e.target.value)}
                    />
                    <button type="submit" className="bg-blue-600 text-white font-semibold p-3">
                        Login
                    </button>
                    <div className="flex flex-col gap-6">
                    <p
                        type="button"
                        onClick={handleNavigateToRegister}
                        className="flex flex-col items-center justify-center bg-blue-600 text-white font-semibold"
                    >
                    Are you new user? Register Here
                    </p>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login