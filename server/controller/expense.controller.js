import { Expense } from "../models/expense.model.js"

const AddExpense =  async (req, res) => {

    try {
            const {Expense_name , amount, date ,description } = req.body


        
            const newExpense = await Expense.create({
                Expense_name,
                amount,
                date ,
                description,
                userid : req.user.userid
            })
    
            return res.status(201).json({status : "success", message : `New Expense Created ${newExpense.Expense_name}` , data : newExpense })
    
        } catch (error) {
            return res.status(500).json({status : "unsuccess", message : error.message , data : null })
        }

}


const updateExpense =  async (req, res) => {
    try {
        
        const {id} = req.params
        const {Expense_name , amount, date ,description } = req.body

        const Expenses = await Expense.findById(id)
        if(!Expenses){
            return res.status(404).json({ status : "unsuccess", message : "Expense not found", data : null})
        }
        console.log("expenses userid", Expenses);
        console.log("req.user.", req.user);
        if(Expenses.userid.toString() !== req.user.userid.toString()){
            return res.status(403).json({ status : "unsuccess", message : "Access forbidden you can't update other user's expenses", data : null})
        }
        console.log("req", req)
        console.log("Expense", Expenses)

        Expenses.Expense_name = Expense_name || Expenses.Expense_name;
        Expenses.amount = amount || Expenses.amount;
        Expenses.date = date || Expenses.date;
        Expenses.description = description || Expenses.description;
        await Expenses.save();

        return res.status(200).json({ status : "success", message : "Expense updated successfully", data : Expenses})

    } catch (error) {
        return res.status(500).json({ status : "unsuccess", message : error.message, data : null})        
    }

}

const GetExpenses = async (req, res) => {

    try {
        const Expenses = await Expense.find({ userid : req.user.userid})
        return res.status(200).json({ status : "success", message : "Notes fetched successfully", data : Expenses})
    } catch (error) {
        return res.status(500).json({ status : "unsuccess", message : error.message, data : null})
    }
}



export { AddExpense, updateExpense, GetExpenses }