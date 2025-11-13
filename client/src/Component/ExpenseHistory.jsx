import React, { useEffect, useState } from "react";

import url from '../config.js'
import showToast from "../Toast.jsx";
import { useNavigate } from "react-router-dom";


function ExpenseHistory(){
    const [expenses, setExpenses] = useState([])
    const navigate = useNavigate()

    useEffect(()=>{
    const getdata = async ()=>{
        try {
            const response = await fetch(`${url}/api/expense/GetExpenses`,{
                method : "GET",
                headers :{
                        "Content-Type" : "application/json",
                        Authorization : `Bearer ${localStorage.getItem("token")}`
                }
            })
            const res =  await response.json()
            console.log("res", res)
            if(res.status === "success"){
                console.log("fetched expenses" , res.data)
                setExpenses(res.data)
            }else{
                showToast("error" , res.message)
                console.log("error in fetch expenses")
            }
        } catch (error) {
            console.log("error in fetching api" ,error.message)
        }
    };
    getdata()
    },[])

    const handleEdit = (expense) => {
        navigate('/CreateExpenses', { state: { expense } })
    }

    return(
    <>
    <h1 className="text-2xl font-bold mb-4 ">Expense History</h1>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
  {Array.isArray(expenses) && expenses.length > 0 ? (
    expenses.map((expense) => (
      <div
        key={expense._id}
        className="bg-white rounded-lg shadow p-4 hover:shadow-md transition relative"
      >
        <h3 className="font-semibold text-gray-800 mb-2">{expense.Expense_name}</h3>
        <p className="text-gray-600 mb-2"><strong>Amount:</strong> ${expense.amount}</p>
        <p className="text-gray-600 mb-2"><strong>Date:</strong> {new Date(expense.date).toLocaleDateString()}</p>
        <p className="text-gray-600 mb-4"><strong>Description:</strong> {expense.description}</p>
        <p className="text-xs text-gray-400">
          Created on {new Date(expense.createdAt).toLocaleDateString()}
        </p>

        <div className="absolute top-3 right-3 flex space-x-2">
          <button
            onClick={() => handleEdit(expense)}
            className="text-blue-500 hover:text-blue-700 font-semibold text-sm"
          >
            Edit
          </button>
        </div>
      </div>
    ))
  ) : (
    <p className="text-gray-500">No expenses available.</p>
  )}
</div>
    </>
    )
}

export default ExpenseHistory