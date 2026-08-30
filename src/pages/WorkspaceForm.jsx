// import { useState } from "react";

// const WorkspaceForm = (props) => {

//   const initialState = {
//     name: "",
//     description: "",
//     memberIds: [],
//   };

//   const [formData, setFormData] = useState(initialState);

//   const handleChange = (evt) => {
//     setFormData({ ...formData, [evt.target.name]: evt.target.value });
//   };

//   const handleSubmit = (evt) => {
//     evt.preventDefault();
//     props.handleAddWorkspace(formData);
//   };

//   return (
//     <main className="card">
//       <form onSubmit={handleSubmit}>
//         <h1>Create a workspace</h1>
//         <label htmlFor="name">Workspace name: </label>
//         <input
//           type="text"
//           name="name"
//           value={formData.name}
//           onChange={handleChange}
//           required
//         />
//         <label htmlFor="description">Description: </label>
//         <input
//           type="text"
//           name="description"
//           value={formData.description}
//           onChange={handleChange}
//         />

//         <button type="submit">Create Workspace</button>
//       </form>
//     </main>
//   );
// };

// export default WorkspaceForm;

import { useState, useEffect, useRef } from "react";
import { index } from "../services/user";

const WorkspaceForm = (props) => {
  const initialState = {
    name: "",
    description: "",
    memberIds: [],
  };

  const [formData, setFormData] = useState(initialState);
  const [searchTerm, setSearchTerm] = useState("");
  const [allUsers, setAllUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  // Fetch all users on component mount
  useEffect(() => {
    const fetchUsers = async () => {
      const usersData = await index();
      setAllUsers(usersData);
      // setFilteredUsers(data);
    };
    fetchUsers();
  }, []);

  // Filter users based on search term
  useEffect(() => {
    const filtered = allUsers.filter(
      (user) =>
        user.username.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !selectedMembers.find((m) => m.id === user.id),
    );
    setFilteredUsers(filtered);
  }, [searchTerm, allUsers, selectedMembers]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleInputFocus = () => {
    setShowDropdown(true);
  };

  const selectMember = (user) => {
    setSelectedMembers([...selectedMembers, user]);
    setFormData({
      ...formData,
      memberIds: [...selectedMembers.map((m) => m.id), user.id],
    });
    setSearchTerm("");
    setShowDropdown(false);
  };

  const removeMember = (userId) => {
    const updated = selectedMembers.filter((m) => m.id !== userId);
    setSelectedMembers(updated);
    setFormData({ ...formData, memberIds: updated.map((m) => m.id) });
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

        <label htmlFor="members">Add Members: </label>
        <div ref={dropdownRef} style={{ position: "relative" }}>
          <select multiple>
            {allUsers.map((user) => (
              <option value={user.username}>{user.username}</option>
            ))}
          </select>
          {showDropdown && filteredUsers.length > 0 && (
            <div>
              {filteredUsers.map((user) => (
                <div
                  key={user.id}
                  onClick={() => selectMember(user)}
                >
                  {user.username}
                </div>
              ))}
            </div>
          )}
        </div>

        {selectedMembers.length > 0 && (
          <div>
            <h3>Selected Members:</h3>
            <ul>
              {selectedMembers.map((member) => (
                <li
                  key={member.id}
                >
                  {member.username}
                  <button
                    type="button"
                    onClick={() => removeMember(member.id)}
                    
                  >
                    ×
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        <button type="submit">Create Workspace</button>
      </form>
    </main>
  );
};

export default WorkspaceForm;
