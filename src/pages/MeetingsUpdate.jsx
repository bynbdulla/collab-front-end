import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import * as meetingService from "../services/meeting";

const MeetingUpdate = (props) => {
  const { workspaceId } = useParams();
  const { meetingId } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    meetingDate: "",
    meetingTime: "",
    location: "",
  });

  // const [allUsers, setAllUsers] = useState([]);
  // const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const meeting = await meetingService.show(workspaceId, meetingId);

        const dateOnly = meeting.meetingDate?.split("T")[0] || "";

        setFormData({
          name: meeting.name || "",
          description: meeting.description || "",
          meetingDate: dateOnly,
          meetingTime: meeting.meetingTime || "",
          location: meeting.location || "",
        });

        // const users = await meetingService.getAllUsers();
        // setAllUsers(users);
      } catch (error) {
        console.error("Failed to fetch:", error);
      }
    };
    fetchData();
  }, [workspaceId, meetingId]);

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await props.handleUpdateMeeting(workspaceId, meetingId, formData);

      navigate(`/workspaces/${workspaceId}/meetings/${meetingId}`);
    } catch (error) {
      console.error("Failed to update:", error);
    }
  };
  // if (loading) return <p>Loading...</p>;

  // if (!formData) return <p>Loading...</p>;

  return (
    <div className="container">
      <h1>Edit Meeting</h1>
      <form id="meeting-form" className="meeting-form" onSubmit={handleSubmit}>
        <label htmlFor="name">Meeting name: </label>
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

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default MeetingUpdate;
