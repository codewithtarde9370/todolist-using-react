import React, { useState, useEffect } from 'react';
import './App.css';
import {TiDeleteOutline} from "react-icons/ti";
import {MdDone} from "react-icons/md";

function App() {
  const [isCompleteScreen, setIsCompleteScreen] = useState(false);
  const [allTasks, setTasks] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");

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
  reducedTasksArray.splice(index);

  localStorage.setItem('todolist',JSON.stringify(reducedTasksArray));
  setTasks(reducedTasksArray);
 }

 // When initializing state (e.g., in useEffect)
 useEffect(() => {
  try {
    const storedTasks = JSON.parse(localStorage.getItem("todolist"));
    if (storedTasks) {
      setTasks(storedTasks);
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
            
          <button type="submit" onClick={addTasks} className="primary-btn">Add</button>
          </div>

        </div>
       
        <div className="todo-btn-container">

          <button type="button" className={`task-btn ${isCompleteScreen === false ?'active' : ''}`} onClick={() => setIsCompleteScreen (false)}>Tasks</button>

          <button type="button" className={`task-btn ${isCompleteScreen === true ?'active': ''}`} onClick={() => setIsCompleteScreen (true)}>Completed</button>
        </div>

          {allTasks.map((item,index)=>{
            return(
              <div className="todo-task-list" key={index}>
              <div className="todo-list-items">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
              <div className='icons'>
                <TiDeleteOutline onClick={()=> deleteTask(index)}className="del-icon"/>
                <MdDone className="done-icon"/>

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
