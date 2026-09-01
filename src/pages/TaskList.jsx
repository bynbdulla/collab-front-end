import { Link } from "react-router";
import { useParams } from "react-router";
import { useEffect } from "react";
import * as taskService from "../services/task";
import * as userService from "../services/user";
import { useState } from "react";

const TaskList = () => {
  const { workspaceId } = useParams();
  const [tasks, setTasks] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [filteredTasks, setFilteredTasks] = useState([]);
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

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const user = await userService.getCurrentUser();
        setCurrentUser(user);
      } catch (error) {
        console.error("Failed to fetch current user:", error);
        const storedUser = JSON.parse(localStorage.getItem("user"));
        setCurrentUser(storedUser);
      }
    };
    fetchCurrentUser();
  }, []);

  useEffect(() => {
    if (currentUser && tasks.length > 0) {
      const filtered = tasks.filter((task) => {
        const taskOwner = task.owner?._id || task.owner;
        const taskAssignedTo = task.assignedTo?._id || task.assignedTo;
        const userId = currentUser._id || currentUser.id;
        return taskOwner === userId || taskAssignedTo === userId;
      });
      setFilteredTasks(filtered);
    }
  }, [tasks, currentUser]);

  if (loading) {
    return (
      <main className="tasks-list">
        <p className="loading-message">Loading tasks...</p>
      </main>
    );
  }

  if (!currentUser) {
    return (
      <main className="tasks-list">
        <p className="loading-message">Please log in to view tasks.</p>
      </main>
    );
  }

  return (
    <main className="tasks-list">
      <div className="all-tasks">
        <h1>My tasks</h1>
        <Link to={`/workspaces/${workspaceId}/tasks/new`}>
          <button type="submit">create new task</button>
        </Link>
      </div>
      {filteredTasks.length === 0 ? (
        <div className="empty-state">
          <p>No tasks assigned to you yet.</p>
        </div>
      ) : (
        filteredTasks.map((task) => {
          const taskOwner = task.owner?._id || task.owner;
          const taskAssignedTo = task.assignedTo?._id || task.assignedTo;
          const userId = currentUser._id || currentUser.id;

          return (
            <Link
              key={task._id}
              to={`/workspaces/${workspaceId}/tasks/${task._id}`}
            >
              <article className="task-card">
                <h2>{task.name}</h2>
                
              </article>
            </Link>
          );
        })
      )}
    </main>
  );
};
export default TaskList;
