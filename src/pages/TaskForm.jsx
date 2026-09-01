import { useState } from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import * as workspaceService from "../services/workspace";

const TaskForm = ({ handleAddTask }) => {
  const { workspaceId } = useParams();
  const navigate = useNavigate();
  const [workspace, setWorkspace] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    priority: "High",
    assignedTo: "",
    workspaceId: "",
    status: "To Do",
  });
  useEffect(() => {
    const fetchWorkspace = async () => {
      const workspaceData = await workspaceService.show(workspaceId);
      setWorkspace(workspaceData);
    };
    fetchWorkspace();
  }, [workspaceId]);

  const memberNames =
    workspace?.members?.map((member) => member.username) || [];

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const formDataWithWorkspace = {
        ...formData,
        workspaceId,
      };
      console.log("Submitting:", formDataWithWorkspace);
      await handleAddTask(workspaceId, formDataWithWorkspace);
      navigate(`/workspaces/${workspaceId}/tasks`);
      
    } catch (err) {
      console.error("Error creating task", err);
    }
  };

  return (
    <main className="card">
      <form onSubmit={handleSubmit}>
        <h1>Create a task</h1>
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
        <button type="submit">Create Task</button>
      </form>
    </main>
  );
};

export default TaskForm;
