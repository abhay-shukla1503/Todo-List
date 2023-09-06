import { useState, useEffect } from "react";
import Navigation from "../components/Navigation";
const ViewallTasks=()=>{
    const [taskList,setTasklist] = useState([])

    useEffect(()=>{
        const allTasks = async()=>{
            try{
                const res = await fetch("http://localhost:3000/api/ethereum/view-all-task",{
                    method:"GET",
                    headers:{
                        "content-type":"applicatio/json"
                    }
                })
                
                const data = await res.json();
                console.log(data);
                if(data.status===200){
                    setTasklist(data.tasklist)
                }
            }catch(error){
                console.error(error)
            }
        }
        allTasks();
    },[])
    return<>
    <Navigation/>
    <div className="view_all_tasks">
      {taskList.map((task)=>{
        return(
            <div 
            className="view_all_tasks_card"
            key={task.taskid}
            style={task.taskid!=="" && task.name!=="" && task.date!=="" ? {} : {display:"none"}}
            >   
                <p>{task.taskid}</p>
                <p>{task.name}</p>
                <p>{task.date}</p>
            </div>
        )
      })}
      </div>
    </>
}
export default ViewallTasks;