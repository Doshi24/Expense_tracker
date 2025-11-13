import express from 'express'
import { AddExpense, updateExpense, GetExpenses } from '../controller/expense.controller.js'
import { Authorizationcheck } from '../middleware/Authorizationcheck.middleware.js'

const ExpenseRouter = express.Router()

ExpenseRouter.post('/AddExpense', Authorizationcheck,AddExpense)
ExpenseRouter.put('/updateExpense/:id', Authorizationcheck,updateExpense)
ExpenseRouter.get('/GetExpenses', Authorizationcheck,GetExpenses)

export { ExpenseRouter }