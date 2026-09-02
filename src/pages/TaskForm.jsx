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
    <main className="task-form-container">
      <div className="form-wrapper">
        <div className="form-header">
          <h1>Create a task</h1>
        </div>{" "}
        <form onSubmit={handleSubmit} className="task-form">
          <div className="form-group">
            <label htmlFor="name" className="form-label">
              Task name:{" "}
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              id="name"
              className="form-input"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="description" className="form-label">
              Description:{" "}
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
            <label htmlFor="priority" className="form-label">
              Priority:{" "}
            </label>
            <select
              name="priority"
              onChange={handleChange}
              className="form-select"
            >
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="assignedTo" className="form-label">
              Assignee:{" "}
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
          <button type="submit" className="btn-submit">
            Create Task
          </button>
        </form>
      </div>
    </main>
  );
};

export default TaskForm;
