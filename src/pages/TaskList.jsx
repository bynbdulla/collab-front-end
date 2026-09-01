import { Link } from "react-router";
import { useParams } from "react-router";
import { useEffect } from "react";
import * as taskService from "../services/task";
import { useState } from "react";
// import TaskDetails from "./TaskDetails";

const TaskList = () => {
  const { workspaceId } = useParams();
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchAllTasks = async () => {
      if (!workspaceId) return;

      try {
        const tasksData = await taskService.index(workspaceId);
        setTasks(tasksData || []);
      } catch (error) {
        console.error("Failed to fetch tasks:", error);
      }
    };
    if (!tasks || tasks.length === 0) {
      fetchAllTasks();
    }
  }, [workspaceId]);

  return (
    <main className="tasks-list">
      <h1>All tasks</h1>
      <Link to={`/workspaces/${workspaceId}/tasks/new`}>
        <button type="submit">create new task</button>
      </Link>
      {tasks.map((task) => (
        <Link
          key={task._id}
          to={`/workspaces/${workspaceId}/tasks/${task._id}`}
        >
          <article className="card">
            <header>
              <h2>{task.name}</h2>
            </header>
            <p className="tasks-desc">{task.description}</p>
            <footer className="task-footer">
              <span>{new Date(task.createdAt).toLocaleDateString()}</span>
            </footer>
          </article>
        </Link>
      ))}
    </main>
  );
};
export default TaskList;
