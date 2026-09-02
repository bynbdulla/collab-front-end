import { useState, useEffect } from "react";
import { index } from "../services/user";

const WorkspaceForm = (props) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    memberIds: [],
  });

  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const usersData = await index();
      setAllUsers(usersData);
    };
    fetchUsers();
  }, []);

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleMembersChange = (evt) => {
    const selected = Array.from(
      evt.target.selectedOptions,
      (option) => option.value,
    );
    setFormData({ ...formData, memberIds: selected });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    props.handleAddWorkspace(formData);
  };

  return (
    <main className="workspace-form-container">
      <div className="form-wrapper">
        <div className="form-header">
          <h1>Create a Workspace</h1>
        </div>{" "}
        <form onSubmit={handleSubmit} className="workspace-form">
          <div className="form-group">
            <label htmlFor="name" className="form-label">
              Workspace name:{" "}
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="form-input"
              required
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

          {/* <label htmlFor="memberIds">Add Members: </label>
          <select name="memberIds"
          multiple
          value={formData.memberIds}
          onChange={handleMembersChange}>
            {allUsers.map((user) => (
              <option key={user.username} value={user.username}>{user.username}</option>
            ))}
          </select>
           */}
          <div className="form-actions">
            <button type="submit" className="btn-submit">
              Create Workspace
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default WorkspaceForm;
