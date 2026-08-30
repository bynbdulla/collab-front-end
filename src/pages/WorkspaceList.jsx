import { Link } from "react-router";
import { useState } from "react";
import WorkspaceForm from "./WorkspaceForm";

const WorkspaceList = (props) => {

     return (
    <main className="workspace-list">
      <h1>All workspaces</h1>
      <Link to={"/workspaces/new"}>
        <button type="submit">create a workspace</button>
      </Link>
      {props.workspaces.map((workspace) => (
        <Link key={workspace._id} to={`/workspaces/${workspace._id}`}>
            <article className="card">
                <header>
                    <h2 key={workspace._id}>{workspace.name}</h2>
                    <p className="workspace-author">Created by {workspace.owner?.username || 'Unknown user'}</p>
                </header>
                <p className="workspace-desc">{workspace.description}</p>
                <footer className="workspace-footer">
                <span>
                    {new Date(workspace.createdAt).toLocaleDateString()}
                </span>
                </footer>
            </article>
        </Link>
      ))}
    </main>
  )
}
export default WorkspaceList;
