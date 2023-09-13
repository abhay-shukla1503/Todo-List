//0xbec24e5abd6daa586ceb4ec18bf4d94b6bc0bbcc

const express = require('express')
const cors = require("cors")
const ABI = require('./ABI.json');
const {Web3} = require("web3");

const app = express();
app.use(cors())
app.use(express.json())

const web3 = new Web3("https://tiniest-quaint-mound.ethereum-sepolia.discover.quiknode.pro/dbd0673f8a07edaff1e7f01ee3b72f7f9667e3d1/")
const contractAddress = "0xbec24e5abd6daa586ceb4ec18bf4d94b6bc0bbcc";
const contract = new web3.eth.Contract(ABI,contractAddress);

const dateclashcheck = async(taskDate)=>{
    const tasks = await contract.methods.alltask().call();
    const foundtask = tasks.find(task=>task.date===taskDate);

    if(foundtask){
        return foundtask.name;
    }
    return "No Task Found";
}

app.post("/api/ethereum/create-task",async(req,res)=>{
    
    const {taskDate}=req.body;
    const task = await dateclashcheck(taskDate);
    try{
        if(task!=="No Task Found"){
            res.status(409).json({status:409,message:"Date Clash:Task cannot be added"})
        }else{
            res.status(200).json({status:200,message:"Task can be added"})
        }
    }catch(error){
        console.error(error)
    }
})

app.get("/api/ethereum/view-task/:taskId",async(req,res)=>{
    try{
        const {taskId} = req.params;
    const task = await contract.methods.viewtask(taskId).call();
    const {id,name,date} = task;
    const numId = Number(id);
    const taskObj={
        numId,name,date
    }
    res.status(200).json({status:200,taskObj,message:"Task Exist"})
    }
    catch(error){
        res.status(500).json({status:500,message:"Task Does Not Exist"})
        console.error(error)
    }

    
})

app.get("/api/ethereum/view-all-task",async(req,res)=>{
    try{
        const tasks = await contract.methods.alltask().call();
        if(tasks.length<0){
            res.status(400).json({status:400,message:"Task list does not exist"})
        }else{
            const tasklist = tasks.map(({id,name,date})=>{
                const taskid = Number(id);
                return {taskid,name,date}
            })
            res.status(200).json({status:200,tasklist,message:"Task Exist"})
        }
    }
    catch(error){
        console.error(error)
    }
})

app.post("/api/ethereum/update-task",async(req,res)=>{
    const {taskDate}=req.body;
    const task = await dateclashcheck(taskDate);
    try{
        if(task!=="No Task Found"){
            res.status(409).json({status:409,message:"Date Clash:Task cannot be updated"})
        }else{
            res.status(200).json({status:200,message:"Task can be updated"})
        }
    }catch(error){
        console.error(error)
    }
})

const PORT=3000;
app.listen(PORT,()=>{
    console.log(`Server Running At Port ${PORT}`)
})