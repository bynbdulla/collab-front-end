import { useState } from "react";

const MeetingForm = (props) => {

  const initialState = {
    name: "",
    description: "",
    meetingDate: "",
    location: ""
  };

  const [formData, setFormData] = useState(initialState);

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    props.handleAddMeeting(formData);
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
          name="meeting-date"
          value={formData.meetingDate}
          onChange={handleChange}
        />
        <label htmlFor="location">Location: </label>
        <input
          type="text"
          name="location"
          onChange={handleChange}
        />

        <button type="submit">Create Meeting</button>
      </form>
    </main>
  );
};

export default MeetingForm;
