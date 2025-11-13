import React, { useState } from "react";
import url from "../config.js";
import showToast from "../Toast.jsx";
import { useNavigate } from "react-router-dom";

function Register(){

    const [email, setEmail] = useState("")
    const [password, setpassword] =useState("")
    const [username, setusername] =useState("")
    const [fullname, setfullname] =useState("")

    const navigate = useNavigate();

    const handleNavigateToLogin = () => {
        setEmail("")
        setpassword("")
        setusername("")
        setfullname("")
        navigate("/login")
    }

    const handleRegister = async (e)=>{
        e.preventDefault()
        if(!email.trim() || !password.trim() || !username.trim() || !fullname.trim()){
            showToast("error", "Please fill all fields")
            return
        }
        try {
            const response = await fetch(`${url}/api/user/register`,{
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password, username, fullname})
            })
            console.log("response", response)
            const data =  await response.json()
            console.log(data)
            if(data.status === "success"){
                showToast("success",data.message || "USER REGISTERED SUCCESSFULLY")
                setEmail("")
                setpassword("")
                setusername("")
                setfullname("")
                navigate('/ExpensesHome')
            }else{
                showToast("error", data.message || "SOMETHING WENT WRONG" )
            }
        } catch (error) {
        showToast("error", "SOMETHING WENT WRONG" )
        }
    }



    return(
        <div className="flex flex-col items-center justify-center min-h-screen ">
            <div className="bg-gray-200 rounded-lg p-8 w-full max-w-md">
                <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Register</h1>
                <form onSubmit={handleRegister} className="flex flex-col gap-4 ">
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
                    <label>
                        email
                    </label>
                    <input
                        type="email"
                        placeholder="Email"
                        className="border border-gray-300 p-3"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <label>
                        Full Name
                    </label>
                    <input
                        type="text"
                        placeholder="Full Name"
                        className="border border-gray-300 p-3"
                        value={fullname}
                        onChange={(e) => setfullname(e.target.value)}
                    />
                    <button type="submit" className="bg-blue-600 text-white font-semibold p-3 rounded-lg hover:bg-blue-700 transition mt-2">
                        Register
                    </button>
                    <div className="flex flex-col gap-6">
                    <p
                        type="button"
                        onClick={handleNavigateToLogin}
                        className="flex flex-col items-center justify-center bg-blue-600 text-white font-semibold"
                    >
                    Already have an account? Login Here
                    </p>
                    </div>  
                </form>
            </div>
        </div>
    )
}

export default Register