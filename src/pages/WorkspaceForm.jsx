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
      (option) => option.value
    );
    setFormData({ ...formData, memberIds: selected });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    props.handleAddWorkspace(formData);
  };

  return (
    <main className="card">
      <form onSubmit={handleSubmit}>
        <h1>Create a workspace</h1>

        <label htmlFor="name">Workspace name: </label>
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

        <label htmlFor="memberIds">Add Members: </label>
          <select name="memberIds"
          multiple
          value={formData.memberIds}
          onChange={handleMembersChange}>
            {allUsers.map((user) => (
              <option key={user.username} value={user.username}>{user.username}</option>
            ))}
          </select>
          
        <button type="submit">Create Workspace</button>
      </form>
    </main>
  );
};

export default WorkspaceForm;
