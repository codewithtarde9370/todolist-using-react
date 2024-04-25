import React, { useState, useEffect } from 'react';
import './App.css';
import {TiDeleteOutline} from "react-icons/ti";
import {MdDone} from "react-icons/md";

function App() {
  const [isCompleteScreen, setIsCompleteScreen] = useState(false);
  const [allTasks, setTasks] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [completedTasks, setCompletedTasks] = useState([]);

 const addTasks= ()=> {
   const newTaskItem = {
    title:newTitle,
    description:newDescription
  };

 const updatedTaskArray = [...allTasks];
  updatedTaskArray.push(newTaskItem);
  setTasks(updatedTaskArray);
  localStorage.setItem("todolist", updatedTaskArray);
  localStorage.setItem("todolist", JSON.stringify(updatedTaskArray));
  setNewTitle("");
  setNewDescription("");
 }

 const deleteTask= index => {
  const reducedTasksArray = [...allTasks];
  reducedTasksArray.splice(index,1  );

  localStorage.setItem('todolist',JSON.stringify(reducedTasksArray));
  setTasks(reducedTasksArray);
 }

 const handleCompleted= (index) => {
  const now = new Date();
  const dd = now.getDate();
  const mm = now.getMonth() + 1;
  const yyyy = now.getFullYear();
  const  hr = now.getHours();
  const min = now.getMinutes();
  const sec = now.getSeconds(); 
  const completedOn = dd + '-' + mm + '-' + yyyy+ ' at '+ hr + ':' + min + ':' + sec;

const filteredItem = {

  ...allTasks[index],
  completedOn:completedOn
}
const updatedCompletedArray = [...completedTasks];
updatedCompletedArray.push(filteredItem);
setCompletedTasks(updatedCompletedArray);
deleteTask(index);
localStorage.setItem("completedTask", JSON.stringify(updatedCompletedArray));

 }
const deleteCompletedTask= (index) =>{
  const reducedTasksArray = [...completedTasks];
  reducedTasksArray.splice(index,1);

  localStorage.setItem('completedTasks',JSON.stringify(reducedTasksArray));
  setCompletedTasks(reducedTasksArray);

}

 // When initializing state (e.g., in useEffect)
 useEffect(() => {
  try {
    const storedTasks = JSON.parse(localStorage.getItem("todolist"));
    const storeCompletedTasks = JSON.parse(localStorage.getItem("completedTask"));
    if (storedTasks) {
      setTasks(storedTasks);
    }
    if (storeCompletedTasks) {
      setCompletedTasks(storeCompletedTasks);
    }

  } catch (error) {
    console.error("Error parsing JSON:", error);
    // Handle the error (e.g., clear localStorage, show an error message)
  }
}, []);


  return (
    <div className="App">
      <h1 className="todo-title">My Tasks Lists</h1>
      <div className="todo-container">
       
       <div className="todo-input-container">
          <div className="todo-inputs">
            <label>Title</label>
            <input type="text" id='title' name='title' placeholder="Title of task" value={newTitle} onChange={(e)=>setNewTitle(e.target.value)} required ></input>
          </div>
          <div className="todo-inputs">
            <label>Description</label>
            <input type="text" id='desc' name='desc' placeholder="Describe your task" value={newDescription} onChange={(e)=>setNewDescription(e.target.value)} required ></input>
          </div>
          <div className="todo-inputs">
            
          <button type="submit" title='Add Task' onClick={addTasks} className="primary-btn">Add</button>
          </div>

        </div>
       
        <div className="todo-btn-container">

          <button type="button" className={`task-btn ${isCompleteScreen === false ?'active' : ''}`} onClick={() => setIsCompleteScreen (false)}>Tasks</button>

          <button type="button" className={`task-btn ${isCompleteScreen === true ?'active': ''}`} onClick={() => setIsCompleteScreen (true)}>Completed</button>
        </div>

          {isCompleteScreen===false && allTasks.map((item,index)=>{
            return(
              <div className="todo-task-list" key={index}>
              <div className="todo-list-items">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
              <div className='icons'>
                <TiDeleteOutline title='delete' onClick={()=> deleteTask(index)} className="del-icon"/>
                <MdDone title='completed' onClick={()=>handleCompleted(index)} className="done-icon"/>

              </div>
          </div>
            )
          }
         ) }

{isCompleteScreen===true && completedTasks.map((item,index)=>{
            return(
              <div className="todo-task-list" key={index}>
              <div className="todo-list-items">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <p className='com-time'> <small> Completed On: {item.completedOn} </small> </p>
              </div>
              <div className='icons'>
                <TiDeleteOutline title='delete' onClick={()=> deleteCompletedTask(index)} className="del-icon"/>
          

              </div>
          </div>
            )
          }
         ) }

      </div>
    </div>
  );
}

export default App;
