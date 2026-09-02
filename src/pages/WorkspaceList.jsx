import { Link } from "react-router";
import { useState } from "react";
import WorkspaceForm from "./WorkspaceForm";

const WorkspaceList = (props) => {
  return (
    <main className="workspace-list">
     <div className="workspace-list-header">
        <div className="header-content">
          <h1>All Workspaces</h1>
          <p className="header-subtitle">
            Browse and manage all your collaborative spaces
          </p>
        </div>
        <Link to="/workspaces/new" className="btn-create-workspace">
          + New Workspace
        </Link>
      </div>
      <div className="workspaces-grid">
      {props.workspaces.map((workspace) => (
        <Link key={workspace._id} to={`/workspaces/${workspace._id}`} className="workspace-card-link">
          <article className="workspace-card">
            <header className="card-header">
              <div className="card-header">
              <h2 key={workspace._id}>{workspace.name}</h2>
              
              </div>
              <p className="workspace-author">
                Created by {workspace.owner?.username || "Unknown user"}
              </p>
            </header>
            <p className="workspace-desc">{workspace.description}</p>
            <footer className="workspace-footer">
                  <div className="footer-info">
                    <span className="author">
                      By {workspace.owner?.username || "Unknown user"}
                    </span>
                    <span className="date">
                      {new Date(workspace.createdAt).toLocaleDateString(
                        "en-US",
                        {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        }
                      )}
                    </span>
                  </div>
                </footer>
          </article>
        </Link>
      ))}
      </div>
      
    </main>
  );
};
export default WorkspaceList;
