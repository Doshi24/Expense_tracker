import React, { useState, useEffect } from "react";
import url from "../config.js";
import showToast from "../Toast.jsx";
import { useNavigate, useLocation } from "react-router-dom";

function CreateExpenses(){

    const [Expense_name, setEexpense_name] = useState("")
    const [amount, setamount] =useState("")
    const [date, setdate] =useState("")
    const [description, setdescription] =useState("")
    const [editingId, setEditingId] = useState(null)

    const useNavigater = useNavigate();
    const location = useLocation();
    const token = localStorage.getItem("token")

    useEffect(() => {
        // Check if there's expense data passed from ExpenseHistory for editing
        if (location.state && location.state.expense) {
            const expense = location.state.expense
            setEditingId(expense._id)
            setEexpense_name(expense.Expense_name)
            setamount(expense.amount)
            // Format date to YYYY-MM-DD for date input
            const formattedDate = new Date(expense.date).toISOString().split('T')[0]
            setdate(formattedDate)
            setdescription(expense.description)
        }
    }, [location])

    const createExpense = async (expenseData) => {
        try {
            const response = await fetch(`${url}/api/expense/AddExpense`, {
                method: "POST",
                headers: { 
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(expenseData)
            })
            const data = await response.json()
            return data
        } catch (error) {
            console.log("Error creating expense:", error.message)
            throw error
        }
    }

    const updateExpense = async (expenseId, expenseData) => {
        try {
            const response = await fetch(`${url}/api/expense/UpdateExpense/${expenseId}`, {
                method: "PUT",
                headers: { 
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(expenseData)
            })
            const data = await response.json()
            return data
        } catch (error) {
            console.log("Error updating expense:", error.message)
            throw error
        }
    }

    const handleSubmit = async (e)=>{
        e.preventDefault()
        try {
            const expenseData = { Expense_name, amount, date, description }
            let result
            
            if (editingId) {
                result = await updateExpense(editingId, expenseData)
            } else {
                result = await createExpense(expenseData)
            }
            
            if(result.status === "success"){
                showToast("success", editingId ? "Expense Updated SUCCESSFULLY" : "Expense Created SUCCESSFULLY")
                useNavigater('/Expenseslist')
            }else{
                showToast("error", result.message || "SOMETHING WENT WRONG")
            }
        } catch (error) {
            showToast("error", "SOMETHING WENT WRONG")
        }
    }



    return(
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
  <div className="bg-gray-200 rounded-lg p-8 w-full max-w-md shadow-md">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">{editingId ? "Edit Expense" : "Add New Expense"}</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
    <label className="block mb-2 font-semibold">
        Expense Name
    </label> 
    <input
        type="text"
        placeholder="ex: Groceries"
        className="border p-2 m-2 w-full"
        value={Expense_name}
        onChange={(e) => setEexpense_name(e.target.value)}
      />
      <label className="block mb-2 font-semibold">
        Expense Amount
    </label>
      <input
        type="text"
        placeholder="ex: 50.00"
        className="border p-2 m-2 w-full"
        value={amount}
        onChange={(e) => setamount(e.target.value)}
      />
      <label className="block mb-2 font-semibold">
        Date
    </label>
      <input
        type="date"
        className="border p-2 m-2 w-full"
        value={date}
        onChange={(e) => setdate(e.target.value)}
      />
      <label className="block mb-2 font-semibold">
        Expense Description
    </label>
      <input
        type="text"
        placeholder="buying groceries for the week"
        className="border p-2 m-2 w-full"
        value={description}
        onChange={(e) => setdescription(e.target.value)}
      />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded mt-4">
        {editingId ? "Update Expense" : "Add Expense"}
      </button>
    </form>
    </div>
    </div>
    )
}

export default CreateExpenses