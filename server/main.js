import express from "express"
import cors from "cors"
import { userRouter } from "./routes/user.route.js"
import { ExpenseRouter } from "./routes/expense.router.js";


const main = express();

main.use(cors());
main.use(express.json());
main.use(express.urlencoded({ extended: true }));


main.use('/api/user', userRouter);
main.use('/api/expense', ExpenseRouter);

export { main }