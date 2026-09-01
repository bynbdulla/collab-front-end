import { useParams, useNavigate } from "react-router";
import * as taskService from "../services/task";
import { useState, useEffect } from "react";

const TasksDetails = (props) => {
  const { workspaceId, taskId } = useParams();
  const [tasks, setTasks] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTask = async () => {
      const taskData = await taskService.show(workspaceId, taskId);
      setTasks(taskData);
    };
    fetchTask();
  }, [workspaceId, taskId]);


  if (!tasks) return <main>Loading...</main>;
  return (
    <article className="card">
      <header className="tasks-header">
        <h2>{tasks.name}</h2>
        <div className="actions">
          <button
            onClick={() =>
              navigate(`/workspaces/${workspaceId}/tasks/${taskId}/edit`)
            }
            className="actions-btn"
          >
            EDIT
          </button>
          <button
            onClick={() => props.handleDeleteTask(taskId, workspaceId)}
            className="actions-btn"
          >
            DELETE
          </button>
        </div>
      </header>

      <p className="tasks-text">
        <strong>Task name: </strong>
        {tasks.name}
      </p>
      <p className="tasks-text">
        <strong>Description: </strong>
        {tasks.description}
      </p>
      <p className="tasks-text">
        <strong>Priority: </strong>
        {tasks.priority}
      </p>
      <p className="tasks-text">
        <strong>Assigned To: </strong>
        {tasks.assignedTo?.username}
      </p>
      <p className="tasks-text">
        <strong>Status: </strong>
        {tasks.status}
      </p>
    </article>
  );
};
export default TasksDetails;
