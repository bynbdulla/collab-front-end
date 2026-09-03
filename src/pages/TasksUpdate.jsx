import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import * as taskService from "../services/task";
import * as workspaceService from "../services/workspace";
import "../App.css";
// import * as userService from "../services/user";

const TasksUpdate = (props) => {
  const { workspaceId, taskId } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    priority: "High",
    assignedTo: "",
    workspaceId: "",
    status: "To Do",
  });
  const [workspace, setWorkspace] = useState(null);
  // const [currentUser, setCurrentUser] = useState(null);
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  // const [authorized, setAuthorized] = useState(false);

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const task = await taskService.show(workspaceId, taskId);
        const workspaceData = await workspaceService.show(workspaceId);

        const assignedToId = 
          typeof taskData.assignedTo === "object" 
            ? taskData.assignedTo._id 
            : taskData.assignedTo || "";

        setFormData({
          name: task.name || "",
          description: task.description || "",
          priority: task.priority || "High",
          assignedTo: assignedToId || "",
          workspaceId: task.workspaceId || "",
          status: task.status || "To Do",
        });
        setTask(task);
        setWorkspace(workspaceData);
      } catch (error) {
        console.error("Failed to fetch:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [workspaceId, taskId]);

  // useEffect(() => {
  //   if (currentUser && task) {
  //     const taskOwner = task.owner?._id || task.owner;
  //     const userId = currentUser._id || currentUser.id;

  //     // Only owner can edit
  //     const isAuthorized = taskOwner === userId;
  //     setAuthorized(isAuthorized);
  //   }
  // }, [task, currentUser]);

  const memberNames =
    workspace?.members?.map((member) => member.username) || [];

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await props.handleUpdateTask(workspaceId, taskId, formData);

      navigate(`/workspaces/${workspaceId}/tasks/${taskId}`);
    } catch (error) {
      console.error("Failed to update:", error);
    }
  };

  if (loading) {
    return (
      <main className="tasks-edit">
        <p className="loading-message">Loading task...</p>
      </main>
    );
  }

  // if (!task) {
  //   return (
  //     <main className="tasks-edit">
  //       <div className="error-state">
  //         <p>Task not found</p>
  //         <button onClick={() => navigate(`/workspaces/${workspaceId}/tasks`)}>
  //           Back to Tasks
  //         </button>
  //       </div>
  //     </main>
  //   );
  // }

  // if (!authorized) {
  //   return (
  //     <main className="tasks-edit">
  //       <div className="error-state">
  //         <h2>🔒 Access Denied</h2>
  //         <p>Only the task owner can edit this task.</p>
  //         <button onClick={() => navigate(`/workspaces/${workspaceId}/tasks/${taskId}`)}>
  //           Back to Task Details
  //         </button>
  //       </div>
  //     </main>
  //   );
  // }

  return (
    <div className="task-edit-container">
      <div className="task-edit-card">
        <header className="edit-header">
          <h1>Edit Task</h1>
        </header>
        <form id="task-form" className="task-form" onSubmit={handleSubmit}>
          <div className="form-group">
          <label htmlFor="name" className="form-label">
            Task name:
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            id="name"
            required
            className="form-input"
          />
          </div>
          <div className="form-group">
            <label htmlFor="description" className="form-label">
              Description:
            </label>
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="priority">Priority: </label>
            <select name="priority" onChange={handleChange}>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="assignedTo" className="form-label">
              Assignee:
            </label>
            <select
              name="assignedTo"
              value={formData.assignedTo}
              onChange={handleChange}
              className="form-select"
            >
              <option value="">-- Select a member --</option>
              {memberNames.length > 0 ? (
                memberNames.map((memberName) => (
                  <option key={memberName} value={memberName}>
                    {memberName}
                  </option>
                ))
              ) : (
                <option disabled>No members in workspace</option>
              )}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="status" className="form-label">
              Status:{" "}
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="form-select"
            >
              <option value="To Do">To Do</option>
              <option value="In Progress">In Progress</option>
              <option value="Done">Done</option>
            </select>
          </div>
          <button type="submit" className="btn-primary">
            Update Task
          </button>
        </form>
      </div>
    </div>
  );
};

export default TasksUpdate;
