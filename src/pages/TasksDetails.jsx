import { useParams, useNavigate } from "react-router";
import * as taskService from "../services/task";
import * as userService from "../services/user";
import { useState, useEffect } from "react";

const TasksDetails = (props) => {
  const { workspaceId, taskId } = useParams();
  const [tasks, setTasks] = useState(null);

  const navigate = useNavigate();

  // current user fetch
  // useEffect(() => {
  //   const fetchCurrentUser = async () => {
  //     try {
  //       const user = await userService.getCurrentUser();
  //       setCurrentUser(user);
  //     } catch (error) {
  //       console.error("Failed to fetch current user:", error);
  //       const storedUser = JSON.parse(localStorage.getItem("user"));
  //       setCurrentUser(storedUser);
  //     }
  //   };
  //   fetchCurrentUser();
  // }, []);

  // Tasks fetch
  useEffect(() => {
    const fetchTask = async () => {
      const taskData = await taskService.show(workspaceId, taskId);
      setTasks(taskData);
    };
    fetchTask();
  }, [workspaceId, taskId]);

  // // Authorization check fetch
  //   useEffect(() => {
  //   if (currentUser && tasks) {
  //     const taskOwner = tasks.owner?._id || tasks.owner;
  //     const taskAssignedTo = tasks.assignedTo?._id || tasks.assignedTo;
  //     const userId = currentUser._id || currentUser.id;
 
  //     // Allow access if user is owner OR assignedTo
  //     const isAuthorized = taskOwner === userId || taskAssignedTo === userId;
  //     setAuthorized(isAuthorized);
  //   }
  // }, [tasks, currentUser]);


  if (!tasks) {
    return (
      <main className="tasks-details">
        <div className="error-state">
          <p>Task not found</p>
          <button onClick={() => navigate(`/workspaces/${workspaceId}/tasks`)}>
            Back to Tasks
          </button>
        </div>
      </main>
    );
  }

  // if (!authorized) {
  //   return (
  //     <main className="tasks-details">
  //       <div className="error-state">
  //         <h2>🔒 Access Denied</h2>
  //         <p>You don't have permission to view this task.</p>
  //         <p className="error-note">Only the task owner or assigned user can access this task.</p>
  //         <button onClick={() => navigate(`/workspaces/${workspaceId}/tasks`)}>
  //           Back to My Tasks
  //         </button>
  //       </div>
  //     </main>
  //   );
  // }

  // const isOwner = 
  //   tasks.owner?._id === (currentUser?._id || currentUser?.id) ||
  //   tasks.owner === (currentUser?._id || currentUser?.id);

  return (
    <article className="card">
      <header className="tasks-header">
        <h2>{tasks.name}</h2>
        <div className="actions">
          {/* {isOwner && (
            <button
              onClick={() =>
                navigate(`/workspaces/${workspaceId}/tasks/${taskId}/edit`)
              }
              className="actions-btn"
            >
              EDIT
            </button>
          )}
          {isOwner && (
            <button
              onClick={() => props.handleDeleteTask(taskId, workspaceId)}
              className="actions-btn"
            >
              DELETE
            </button>
          )} */}
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
