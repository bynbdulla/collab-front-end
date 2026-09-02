import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import * as taskService from "../services/task";
import * as workspaceService from "../services/workspace";
import * as userService from "../services/user";

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
  const [currentUser, setCurrentUser] = useState(null);
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const user = await userService.getCurrentUser();
        setCurrentUser(user);
      } catch (error) {
        console.error("Failed to fetch current user:", error);
        const storedUser = JSON.parse(localStorage.getItem("user"));
        setCurrentUser(storedUser);
      }
    };
    fetchCurrentUser();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const task = await taskService.show(workspaceId, taskId);
        const workspaceData = await workspaceService.show(workspaceId);

        setFormData({
          name: "",
          description: "",
          priority: "High",
          assignedTo: "",
          workspaceId: "",
          status: "To Do",
        });
        setWorkspace(workspaceData);
      } catch (error) {
        console.error("Failed to fetch:", error);
      }
    };
    fetchData();
  }, [workspaceId, taskId]);

  useEffect(() => {
    if (currentUser && task) {
      const taskOwner = task.owner?._id || task.owner;
      const userId = currentUser._id || currentUser.id;
 
      // Only owner can edit
      const isAuthorized = taskOwner === userId;
      setAuthorized(isAuthorized);
    }
  }, [task, currentUser]);

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

  if (!task) {
    return (
      <main className="tasks-edit">
        <div className="error-state">
          <p>Task not found</p>
          <button onClick={() => navigate(`/workspaces/${workspaceId}/tasks`)}>
            Back to Tasks
          </button>
        </div>
      </main>
    );
  }

  if (!authorized) {
    return (
      <main className="tasks-edit">
        <div className="error-state">
          <h2>🔒 Access Denied</h2>
          <p>Only the task owner can edit this task.</p>
          <button onClick={() => navigate(`/workspaces/${workspaceId}/tasks/${taskId}`)}>
            Back to Task Details
          </button>
        </div>
      </main>
    );
  }

  return (
    <div className="container">
      <h1>Edit Task</h1>
      <form id="task-form" className="task-form" onSubmit={handleSubmit}>
        <label htmlFor="name">Task name: </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          id="name"
          required
        />
        <label htmlFor="description">Description: </label>
        <input
          type="text"
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
        <label htmlFor="priority">Priority: </label>
        <select name="priority" onChange={handleChange}>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
        <label htmlFor="assignedTo">Assignee: </label>
        <select
          name="assignedTo"
          value={formData.assignedTo}
          onChange={handleChange}
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

        <label htmlFor="status">Status: </label>
        <select name="status" value={formData.status} onChange={handleChange}>
          <option value="To Do">To Do</option>
          <option value="In Progress">In Progress</option>
          <option value="Done">Done</option>
        </select>
        <button type="submit">Update Task</button>
      </form>
    </div>
  );
};

export default TasksUpdate;
