import React, {useState, useEffect, Fragment} from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const Body = () => {

    const { id } = useParams();

    const [description ,setDescription] = useState("");
    const [tasks, setTasks] = useState([]);

    const handleSubmit = async e => {
        e.preventDefault();

        const body = { description };
        
        try {
            const result = await axios.post(`http://localhost:5000/add/todo/${id}`, body, {
                headers: {'Content-Type': 'application/json'}
            });
            console.log(result.data);
            window.location = `/${id}`;
        } catch (error) {
            console.log(error);
        } 
    }

    const completeTodo = async e => {
        console.log(task);
    }

    useEffect(() => {
        axios.get("http://localhost:5000/").then(data => {
            let take = Array();
            data.data.forEach(result => {
                if(result.todo_id == id) {
                    take.push(result);
                }
            });

            setTasks(take);
        
        }).catch(error => console.log(error));
    }, []);

    return(
        <div>
            <nav>
                <ul>
                <li className="first"><a href="#">TODO LIST</a></li>
                <li><a href={`/${id}`}>HOME</a></li>
                <li><a href={`/tasks/completed/${id}`}>Completed Tasks</a></li>
                <li><a href={`/tasks/uncompleted/${id}`}>Uncompleted Tasks</a></li>
                </ul>
            </nav>
            <div className="container">
                <div className="task-form">
                    <form onSubmit={handleSubmit}>
                        <h2>Add Task</h2>
                        <div>
                            <input type="text" name="description" id="description" required value={description} onChange={e => {
                                setDescription(e.target.value);
                            }}/>
                            <input type="submit" value="Add" className="task-btn" />
                        </div>
                    </form>
                </div>
                {tasks.map(task => (
                    <div className="tasks">
                    <p className="task">{task.description}</p>
                    <button className="check" onClick={async e => {
                        try {
                            const result = await axios.post(`http://localhost:5000/add/complete/${id}`, task, {
                                headers: {'Content-Type': 'application/json'}
                            });
                            console.log(result.data);
                        } catch (error) {
                            console.log(error);
                        }
                    }}><span className="material-symbols-outlined">check</span></button>
                    <button className="remove" onClick={async e => {
                        try {
                            const result = await axios.post(`http://localhost:5000/add/uncomplete/${id}`, task, {
                                headers: {'Content-Type': 'application/json'}
                            });
                            console.log(result.data);
                            const response = await axios.delete(`http://localhost:5000/delete/todo/${task.id}`);
                            console.log(response.data);
                            alert("Task deleted and added to 'Uncompleted Tasks'");
                            window.location = `/${id}`;
                        } catch (error) {
                            alert("Error when removing task");
                        }
                    }}><span className="material-symbols-outlined">close</span></button>
                </div>
                ))}
            </div>
            <footer>
                <h3>Why have an todo List? </h3>
                <p>Writing your daily tasks on a list can help you increase productivity and decrease stress. To-do lists enable you to segment your goals into achievable activities and complete large projects by breaking them into smaller assignments. Recording tasks can allow you to better manage your time and encourages you to achieve more throughout your day. In this article, we discuss the benefits of having a daily to-do list, how it can boost your mental health, and provide tips on how to create an effective list.</p>
                <h4>If you want to know more follow this: <a target="_blank" href="https://ca.indeed.com/career-advice/career-development/daily-to-do-list">Link</a></h4>
            </footer>
        </div>
    );
}

export default Body;