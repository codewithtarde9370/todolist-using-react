import React,{useState} from 'react';
import './App.css';
import { TiDeleteOutline } from "react-icons/ti";


function App() {
  const [isCompleteScreen, setIsCompleteScreen] = useState(false);
  return (
    <div className="App">
      <h1 className="todo-title">My Tasks Lists</h1>
      <div className="todo-container">
        <div className="todo-input-container">
          <div className="todo-inputs">
            <label>Title</label>
            <input type="text" placeholder="Title of task"></input>
          </div>
          <div className="todo-inputs">
            <label>Description</label>
            <input type="text" placeholder="Describe your task"></input>
          </div>
          <div className="todo-inputs">
            
          <button type="button" className="primary-btn">Add</button>
          </div>

        </div>
        <div className="todo-btn-container">

          <button type="button" className={`task-btn ${isCompleteScreen === false ?'active' : ''}`} onClick={() => setIsCompleteScreen (false)} >Tasks</button>

          <button type="button" className={`task-btn ${isCompleteScreen === true ?'active': ''}`} onClick={() => setIsCompleteScreen (true)}>Completed</button>
        </div>

          <div className="todo-task-list">
              <div className="todo-list-items">
                <h3>Task 1</h3>
                <p>Description</p>

              </div>

          </div>
      </div>
    </div>
  );
}

export default App;
