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
    <main className="meeting-form-container">
      <div className="form-wrapper">
        <div className="form-header">
          <h1>Create a Meeting</h1>
        </div>{" "}
        <form onSubmit={handleSubmit} className="meeting-form">
          <div className="form-group">
            <label htmlFor="name" className="form-label">
              Meeting name:{" "}
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
            <label htmlFor="meeting-date" className="form-label">
              Meeting Date:{" "}
            </label>
            <input
              type="date"
              name="meetingDate"
              value={formData.meetingDate}
              onChange={handleChange}
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="meeting-time" className="form-label">
              Meeting Time:{" "}
            </label>
            <input
              type="time"
              name="meetingTime"
              value={formData.meetingTime}
              onChange={handleChange}
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="location" className="form-label">
              Location:{" "}
            </label>
            <input
              type="text"
              name="location"
              onChange={handleChange}
              value={formData.location}
              className="form-input"
            />
          </div>
          <div className="form-actions">
          <button type="submit" className="btn-submit">Create Meeting</button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default MeetingForm;
