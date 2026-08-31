import { useState } from "react";
import { useNavigate, useParams } from "react-router";

const TaskForm = ({ handleAddForm }) => {
  const { workspaceId } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    priority: "",
    assignedTo: "",
    workspaceId: "",
    status: "",
  });

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
        priority: "",
    assignedTo: "",
    workspaceId: "",
    status: "",
        <label htmlFor="priority">Priority: </label>
        <select>
          
        </select>
        <label htmlFor="meeting-time">Meeting Time: </label>
        <input
          type="time"
          name="meetingTime"
          value={formData.meetingTime}
          onChange={handleChange}
        />
        <label htmlFor="location">Location: </label>
        <input
          type="text"
          name="location"
          onChange={handleChange}
          value={formData.location}
        />

        <button type="submit">Create Meeting</button>
      </form>
    </main>
  );
};

export default MeetingForm;
