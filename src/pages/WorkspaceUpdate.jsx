import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import * as workspaceService from "../services/workspace";
import { index as getAllUsers } from "../services/user";
import Select from "react-select";

const WorkspaceUpdate = (props) => {
  const { workspaceId } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    members: [],
  });

  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const workspace = await workspaceService.show(workspaceId);
        setFormData({
          name: workspace.name || "",
          description: workspace.description || "",
          members: workspace.members || [],
        });

        const users = await getAllUsers();
        setAllUsers(users);
      } catch (error) {
        console.error("Failed to fetch:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [workspaceId]);

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await props.handleUpdateWorkspace(workspaceId, formData);
      navigate("/workspaces");
    } catch (error) {
      console.error("Failed to update:", error);
    }
  };

  // const handleMembersChange = (event) => {
  //   const selected = Array.from(
  //     event.target.selectedOptions,
  //     (option) => option.value,
  //   );
  //   setFormData({ ...formData, members: selected });
  // };

  const handleMembersChange = (selectedOptions) => {
    const selectedUsers = selectedOptions.map((option) => ({
      _id: option.value,
      username: option.label,
    }));
    setFormData({ ...formData, members: selectedUsers });
  };

  if (loading) return <p>Loading...</p>;

  const selectedUsers = allUsers.filter((user) =>
    formData.members.includes(user._id),
  );

  const userOptions = allUsers.map((user) => ({
    value: user._id,
    label: user.username,
    _id: user._id,
    username: user.username,
    email: user.email,
  }));

  const selectedValues = formData.members.map((member) => ({
    value: member._id || member,
    label: member.username || member,
  }));

  return (
    <div className="container">
      <h1>Edit Workspace</h1>
      <form
        id="workspace-form"
        className="workspace-form"
        onSubmit={handleSubmit}
      >
        <label htmlFor="name">Name:</label>
        <input
          required
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
        <label htmlFor="description">Description: </label>
        <input
          type="text"
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
        <label htmlFor="members">members: </label>
        <div>
          <Select
            value={selectedValues}
            options={userOptions}
            onChange={handleMembersChange}
            isMulti
            isSearchable={true}
            isClearable={true}
          />
          {/* <select
            id="members"
            name="members"
            multiple
            value={formData.members}
            onChange={handleMembersChange}
          >
            {allUsers.map((user) => (
              <option key={user._id} value={user._id} selected>
                {user.username}
              </option>
            ))}
          </select> */}
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default WorkspaceUpdate;
