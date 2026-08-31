import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";

const MeetingForm = ({ handleAddMeeting }) => {
  const { workspaceId } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    meetingDate: "",
    meetingTime: "",
    location: "",
  });

  // useEffect(() => {
  //   const fetchMeetings = async () => {
  //     const meetingsData = await index();
  //     setAllUsers(meet);
  //   };
  //   fetchMeetings();
  // }, []);

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
      await handleAddMeeting(workspaceId, formDataWithWorkspace);
      navigate(`/workspaces/${workspaceId}/meetings`);
    } catch (err) {
      console.error("Error creating meeting", err);
    }
  };

  return (
    <main className="card">
      <form onSubmit={handleSubmit}>
        <h1>Create a meeting</h1>
        <label htmlFor="name">Meeting name: </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <label htmlFor="description">Description: </label>
        <input
          type="text"
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
        <label htmlFor="meeting-date">Meeting Date: </label>
        <input
          type="date"
          name="meetingDate"
          value={formData.meetingDate}
          onChange={handleChange}
        />
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
