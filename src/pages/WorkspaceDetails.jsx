import { useParams } from "react-router";
import * as workspaceService from "../services/workspace";
import { useState, useEffect } from "react";

const WorkspaceDetails = () => {
  const { workspaceId } = useParams();
  const [workspace, setWorkspace] = useState(null);

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
          <p className="workspace-owner">
            Created by {workspace.owner?.username || "Unknown user"} on{" "}
            <span>{new Date(workspace.createdAt).toLocaleDateString()}</span>
          </p>
        </header>
        <p className="hoot-text">{workspace.description}</p>
      </article>
  );
};
export default WorkspaceDetails;
