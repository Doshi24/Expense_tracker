import { useNavigate } from "react-router-dom";

function Expenses(){

    const useNavigater = useNavigate();

    return(
        <div className="flex flex-col items-center justify-center min-h-screen">
            <div className="text-center">
                <h1 className="text-4xl font-bold mb-4 text-gray-800">Welcome to Expenses Tracker</h1>
                <h3 className="text-lg font-medium mb-8 text-gray-600 max-w-2xl">Track and manage your expenses effectively, use the links below to add new expenses or view your expense history</h3>

                <div className="flex flex-col gap-6">
                    <button
                        onClick={() => useNavigater("/CreateExpenses")}
                        className="px-8 py-3 bg-blue-600 text-white font-semibold"
                    >
                     Create New Expense
                    </button>

                    <button
                        onClick={() => useNavigater("/Expenseslist")}
                        className="px-8 py-3 bg-green-500 text-white font-semibold"
                    >
                    View Expense History
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Expenses