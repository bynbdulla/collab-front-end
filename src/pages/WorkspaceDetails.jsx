import { useParams, useNavigate } from "react-router";
import * as workspaceService from "../services/workspace";
import { useState, useEffect } from "react";

const WorkspaceDetails = (props) => {
  const { workspaceId } = useParams();
  const [workspace, setWorkspace] = useState(null);
  const [loading, setLoading] = useState(true);
  // const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchWorkspace = async () => {
      try {
        const workspaceData = await workspaceService.show(workspaceId);
        setWorkspace(workspaceData);
      } catch (error) {
       console.log(
          "Failed to load workspace. Please try again or go back to workspaces."
        );
        // console.log("Failed to fetch workspace:"error, );
      } finally {
        setLoading(false);
      }
    };
    fetchWorkspace();
  }, [workspaceId]);

  if (loading) {
    return (
      <main className="workspace-details">
        <div className="loading-state">
          <div className="spinner"></div>
          <p className="loading-message">Loading workspace...</p>
        </div>
      </main>
    );
  }

  if (!workspace) {
    return (
      <main className="workspace-details">
        <div className="error-state">
          <div className="error-icon">!</div>
          <h2>Workspace not found</h2>
          {/* <p>
            {error ||
              "This workspace doesn't exist or you don't have access to it."}
          </p> */}
          <button
            onClick={() => navigate("/workspaces")}
            className="btn-back-primary"
          >
            Back to Workspaces
          </button>
        </div>
      </main>
    );
  }

  const memberCount = workspace.members?.length || 0;
  const createdDate = new Date(workspace.createdAt).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );

  return (
    <main className="workspace-details">
      <article className="workspace-card">
        {/* Header Section */}
        <header className="workspace-header">
          <div className="header-content">
            <h1>{workspace.name}</h1>
            {workspace.description && (
              <p className="workspace-description">{workspace.description}</p>
            )}
          </div>
          <div className="header-actions">
            <button
              onClick={() => navigate(`/workspaces/${workspaceId}/edit`)}
              className="btn-edit"
            >
              Edit
            </button>
            <button
              onClick={() => props.handleDeleteWorkspace(workspaceId)}
              className="btn-delete"
            >
              Delete
            </button>
          </div>
        </header>

        {/* Meta Information */}
        <div className="workspace-meta">
          <div className="meta-item">
            <span className="meta-label">Created by</span>
            <span className="meta-value">
              {workspace.owner?.username || "Unknown user"}
            </span>
          </div>
          <div className="meta-item">
            <span className="meta-label">Created on</span>
            <span className="meta-value">{createdDate}</span>
          </div>
          <div className="meta-item">
            <span className="meta-label">Members</span>
            <span className="meta-value">
              <span className="badge-count">{memberCount}</span>
            </span>
          </div>
        </div>

        {/* Members Section */}
        <section className="members-section">
          <h3 className="section-title">
            Team Members <span className="member-count">({memberCount})</span>
          </h3>

          {memberCount > 0 ? (
            <div className="members-list">
              {workspace.members.map((member) => (
                <div key={member._id} className="member-item">
                  <div className="member-avatar">
                    {member.username.charAt(0).toUpperCase()}
                  </div>
                  <div className="member-info">
                    <p className="member-name">{member.username}</p>
                    {member.email && (
                      <p className="member-email">{member.email}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-members">
              <p>No members yet. Add some to collaborate!</p>
            </div>
          )}
        </section>

        {/* Quick Actions */}
        <section className="quick-actions">
          <h3 className="section-title">Quick Access</h3>
          <div className="action-buttons">
            <button
              onClick={() => navigate(`/workspaces/${workspaceId}/meetings`)}
              className="btn-action meetings"
            >
              <span className="action-icon">📅</span>
              <span className="action-label">Meetings</span>
            </button>
            <button
              onClick={() => navigate(`/workspaces/${workspaceId}/tasks`)}
              className="btn-action tasks"
            >
              <span className="action-icon">✓</span>
              <span className="action-label">Tasks</span>
            </button>
          </div>
        </section>
      </article>
    </main>
  );
};

export default WorkspaceDetails;