import { Link } from "react-router";
import { useParams } from "react-router";
import { useEffect } from "react";
import * as taskService from "../services/task";
// import * as userService from "../services/user";
import { useState } from "react";

const TaskList = () => {
  const { workspaceId } = useParams();
  const [tasks, setTasks] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  // const [filteredTasks, setFilteredTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllTasks = async () => {
      if (!workspaceId) return;

      try {
        const tasksData = await taskService.index(workspaceId);
        setTasks(tasksData || []);
      } catch (error) {
        console.error("Failed to fetch tasks:", error);
      } finally {
        setLoading(false);
      }
    };
    if (!tasks || tasks.length === 0) {
      fetchAllTasks();
    }
  }, [workspaceId]);

  //   useEffect(() => {
  //   const fetchCurrentUser = async () => {
  //     try {
  //       const user = await userService.getCurrentUser();
  //       setCurrentUser(user);
  //     } catch (error) {
  //       console.error("Failed to fetch current user:", error);
  //       const storedUser = JSON.parse(localStorage.getItem("user"));
  //       setCurrentUser(storedUser);
  //     }
  //   };
  //   fetchCurrentUser();
  // }, []);

  // useEffect(() => {
  //   if (currentUser && tasks.length > 0) {
  //     const filtered = tasks.filter((task) => {
  //       const taskOwner = task.owner?._id || task.owner;
  //       const taskAssignedTo = task.assignedTo?._id || task.assignedTo;
  //       const userId = currentUser._id || currentUser.id;
  //       return taskOwner === userId || taskAssignedTo === userId;
  //     });
  //     setFilteredTasks(filtered);
  //   }
  // }, [tasks, currentUser]);

  return (
    <main className="task-list">
     <div className="task-list-header">
        <div className="header-content">
          <h1>All tasks</h1>
        </div>
        <Link
          to={`/workspaces/${workspaceId}/tasks/new`}
          className="btn-create-task"
        >
          + New task
        </Link>
      </div>
      <div className="tasks-grid">
        {tasks.map((task) => (
          <Link
            key={task._id}
            to={`/workspaces/${workspaceId}/tasks/${task._id}`}
            className="task-card-link"
          >
            <article className="task-card">
              <h2>{task.name}</h2>
              <p>
                <strong>Assigned to:</strong>{" "}
                {task.assignedTo?.username || "Unassigned"}
              </p>
            </article>
          </Link>
        ))}
      </div>
    </main>
  );
};
export default TaskList;
