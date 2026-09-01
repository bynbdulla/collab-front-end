import { useParams, useNavigate } from "react-router";
import * as workspaceService from "../services/workspace";
import { useState, useEffect } from "react";

const WorkspaceDetails = (props) => {
  const { workspaceId } = useParams();
  const [workspace, setWorkspace] = useState(null);

  const navigate = useNavigate();
  useEffect(() => {
    const fetchWorkspace = async () => {
      const workspaceData = await workspaceService.show(workspaceId);
      setWorkspace(workspaceData);
    };
    fetchWorkspace();
  }, [workspaceId]);

  if (!workspace) return <main>Loading...</main>;
  return (
    <article className="card">
      <header className="workspace-header">
        <h2>{workspace.name}</h2>
        <div className="actions">
          <button
            onClick={() => navigate(`/workspaces/${workspaceId}/edit`)}
            className="actions-btn"
          >
            edit
          </button>
          <button
            onClick={() => props.handleDeleteWorkspace(workspaceId)}
            className="actions-btn"
          >
            delete
          </button>
        </div>
      </header>
      <p className="workspace-text">{workspace.description}</p>
      <h4>Members: </h4>
      <p></p>
      <p className="workspace-owner">
        Created by {workspace.owner?.username || "Unknown user"} on{" "}
        <span>{new Date(workspace.createdAt).toLocaleDateString()}</span>
      </p>

      <div className="button-group">
        <button onClick={() => navigate(`/workspaces/${workspaceId}/meetings`)}>
          Meetings
        </button>
        <button onClick={() => navigate(`/workspaces/${workspaceId}/tasks`)}>
          Tasks
        </button>
      </div>
    </article>
  );
};
export default WorkspaceDetails;
