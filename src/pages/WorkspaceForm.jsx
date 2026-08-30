import { useState } from "react";

const WorkspaceForm = (props) => {
  const initialState = {
    name: "",
    description: "",
    members: "",
  };

  const [formData, setFormData] = useState(initialState);

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    props.handleAddWorkspace(formData)
  };


  return (
    <main className="card">
        <form onSubmit={handleSubmit}>
            <h1>Create a workspace</h1>
            <label htmlFor="name">Workspace name: </label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} required />
            <label htmlFor="description">Description: </label>
            <input type="text" name="description" value={formData.description} onChange={handleChange} />
        
        <button type="submit">Create Workspace</button>
        </form>
    </main>
  )
};

export default WorkspaceForm