import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema(
    {
        Expense_name : {
            type : String,
            required : true,
        },
        amount : {
            type : String,
            required : true
        },
        date : {
            type : Date,
            required : true,
        },
        description : {
            type : String,
        },
        userid : {
            type : mongoose.Schema.Types.ObjectId,
            ref : "User",
            required : true
        }
        
    },
    {
        timestamps : true
    }
)

 export const Expense = mongoose.model("Expense", expenseSchema)