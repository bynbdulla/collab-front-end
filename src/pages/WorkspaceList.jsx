import { Link } from "react-router";

const WorkspaceList = (props) => {
  return (
      <main className="workspaces-list">
        <h1>All Workspaces </h1>
        {props.workspaces.map((workspace) =>(
            <Link key={workspace._id} to={`/workspaces/${workspace._id}`}>
                <section className="card">
                    
                </section>
            </Link>
        ))}
        {props.workspaces.map((workspace) => (
            <p key={workspace._id}>{workspace.name}</p>
        ))}
    </main>
  );
};
export default WorkspaceList;
