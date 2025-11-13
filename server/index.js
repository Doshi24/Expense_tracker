import { connectdb } from "./utils/dbconfig.js";
import { main } from "./main.js";

connectdb()
.then(()=>{
    main.listen(process.env.PORT, ()=>{
        console.log(`Server started at port ${process.env.PORT}`);
        console.log(`http://localhost:${process.env.PORT}`);
        
    })
}).catch((error)=>{
    console.log("Error in DB connection || Can't Connect to Port "+error);
})