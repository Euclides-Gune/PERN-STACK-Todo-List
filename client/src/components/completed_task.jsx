import React, {useState, useEffect, Fragment} from "react";
import { useParams, useLocation } from "react-router-dom";
import axios from "axios";

const CompletedTask = () => {

    const { id } = useParams();
    const location = useLocation();
    console.log(location);
    const [tasks, setTasks] = useState([]);
 
    useEffect(() => {
        const take = [];
        axios.get("http://localhost:5000/completed/tasks").then(data => {
            data.data.forEach(element => {
                if(element.todo_id == id) {
                    take.push(element);
                }

                setTasks(take);
                    
            });
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
            <h1 className="task-length">Completed Tasks: {tasks.length}</h1>
            {tasks.map(task => (
                <div className="completed-tasks">
                    <p>{task.description}</p>
                </div>
            ))}
            <footer>
                <h3>Why have an todo List? </h3>
                <p>Writing your daily tasks on a list can help you increase productivity and decrease stress. To-do lists enable you to segment your goals into achievable activities and complete large projects by breaking them into smaller assignments. Recording tasks can allow you to better manage your time and encourages you to achieve more throughout your day. In this article, we discuss the benefits of having a daily to-do list, how it can boost your mental health, and provide tips on how to create an effective list.</p>
                <h4>If you want to know more follow this: <a target="_blank" href="https://ca.indeed.com/career-advice/career-development/daily-to-do-list">Link</a></h4>
            </footer>
        </div>
    );
}

export default CompletedTask;