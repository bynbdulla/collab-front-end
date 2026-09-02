import { useEffect, useState } from "react";
import { index } from "../services/user";
import { Link } from "react-router";

const Dashboard = (props) => {
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const usersData = await index();
      setAllUsers(usersData);
    };
    fetchUsers();
  }, []);

  return (
    <main className="dashboard">
      <div className="dashboard-welcome">
        {/* <p className="dashboard-eyebrow">COLLAB DASHBOARD</p> */}

        <h1>Welcome {props.user.username}!</h1>
        <h4>
          Keep track of your workspaces, tasks, and meetings in one place.
        </h4>
      </div>
      {/* <div className="dashboard-stats">
        <div className="dashboard-stat-card">
          <Link to="/workspaces" className="stat-link">
            <div className="stat-icon">W</div>
          </Link>

          <div>
            <p className="stat-label">Workspaces</p>
            <h2>—</h2>
          </div>
        </div>

        <div className="dashboard-stat-card">
          <Link to="/workspaces/:workspaceId/tasks" className="stat-link">
            <div className="stat-icon">T</div>
          </Link>
          <div>
            <p className="stat-label">Tasks</p>
            <h2>—</h2>
          </div>
        </div>

        <div className="dashboard-stat-card">
          <Link to="/workspaces/:workspaceId/meetings" className="stat-link">
            <div className="stat-icon">M</div>
          </Link>
          <div>
            <p className="stat-label">Meetings</p>
            <h2>—</h2>
          </div>
        </div>
      </div> */}

      <div className="dashboard-section">
        <div className="dashboard-section-header">
          <div>
            <Link to="/workspaces">
              <h2>My Workspaces</h2>
            </Link>
            <p>Access and manage the projects you're part of.</p>
          </div>

          <Link to="/workspaces/new" className="dashboard-create-btn">
            + New Workspace
          </Link>
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
