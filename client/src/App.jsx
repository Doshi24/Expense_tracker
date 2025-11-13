import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './Component/Login'
import Register  from './Component/Register'
import Expenses from './Component/Expenses.jsx';
import CreateExpenses from './Component/CreateExpenses.jsx';
import ExpenseHistory from './Component/ExpenseHistory.jsx';

function App() {


  return (
    <>
    <Router>
        <Routes>
          <Route path = "/" element={<Register/>} />
          <Route path = "/login" element={<Login/>} />
          <Route path = "/ExpensesHome" element={<Expenses/>} />
          <Route path = "/CreateExpenses" element={<CreateExpenses/>} />
          <Route path = "/Expenseslist" element={<ExpenseHistory/>} />
        </Routes>
      </Router>
    </>
  )
}

export default App
