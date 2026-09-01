import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import * as taskService from "../services/task";
import * as workspaceService from "../services/workspace";

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
  // if (loading) return <p>Loading...</p>;

  // if (!formData) return <p>Loading...</p>;

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
