import Nav from "./components/Nav";
import SignUpForm from "./pages/SignUpForm";
import "./App.css";
import { Routes, Route, useNavigate, useParams } from "react-router";
import { useState, useEffect } from "react";
import SignInForm from "./pages/SignInForm";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import WorkspaceList from "./pages/WorkspaceList";
import MeetingList from "./pages/MeetingList";
import WorkspaceForm from "./pages/WorkspaceForm";
import MeetingForm from "./pages/MeetingForm";
import WorkspaceDetails from "./pages/WorkspaceDetails";
import WorkspaceUpdate from "./pages/WorkspaceUpdate";
import * as workspaceService from "./services/workspace";
import * as meetingService from "./services/meeting";
import MeetingsDetails from "./pages/MeetingsDetails";

const getUserFromToken = () => {
  const token = localStorage.getItem("token");

  if (!token) return null;

  return JSON.parse(atob(token.split(".")[1])).payload;
};

const App = () => {
  const [user, setUser] = useState(getUserFromToken());
  const [workspaces, setWorkspaces] = useState([]);
  const [meetings, setMeetings] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllWorkspaces = async () => {
      const workspacesData = await workspaceService.index();

      setWorkspaces(workspacesData);
    };
    if (user) fetchAllWorkspaces();
  }, [user]);

  // useEffect(() => {
  //   const fetchAllMeetings = async () => {
  //     const meetingsData = await meetingService.index()
  //       console.log('meetingsData:', meetingsData)
  //       setMeetings(meetingsData)
  //   }
  //   if (user) fetchAllMeetings()
  // }, [user])

  const handleAddWorkspace = async (formData) => {
    const newWorkspace = await workspaceService.create(formData);
    setWorkspaces([newWorkspace, ...workspaces]);
    navigate("/workspaces");
  };


  const handleAddMeeting = async (formData) => {
    // try {
      const newMeeting = await meetingService.create(formData);
      setMeetings([newMeeting, ...meetings]);
      navigate(`/workspaces/${formData.workspaceId}/meetings`);
    // } catch (err) {
    //   console.log("Failed to create a meeting", err);
    // }
  };

  const handleDeleteWorkspace = async (workspaceId) => {
    const deletedWorkspace =
      await workspaceService.deleteWorkspace(workspaceId);
    setWorkspaces(
      workspaces.filter((workspace) => workspace._id !== workspaceId),
    );
    navigate("/workspaces");
  };
  const handleDeleteMeeting = async (meetingId) => {
    const deletedMeeting =
      await meetingService.deleteMeeting(meetingId);
    setMeetings(
      workspaces.filter((meetings) => meetings._id !== meetingId),
    );
    navigate("/workspaces");
  };

  const handleUpdateWorkspace = async (workspaceId, formData) => {
    const updateWorkspace = await workspaceService.update(
      workspaceId,
      formData,
    );
    const updatedWorkspaceArr = workspaces.map((workspace) => {
      return workspace._id === workspaceId ? updateWorkspace : workspace;
    });
    setWorkspaces(updatedWorkspaceArr);
  };

  return (
    <div>
      <Nav user={user} setUser={setUser} />
      <main className="app-main">
        <Routes>
          <Route
            path="/"
            element={user ? <Dashboard user={user} /> : <Landing />}
          />
          {user ? (
            <>
              <Route
                path="/workspaces"
                element={<WorkspaceList workspaces={workspaces} />}
              />
              <Route
                path="/workspaces/:workspaceId"
                element={
                  <WorkspaceDetails
                    user={user}
                    handleDeleteWorkspace={handleDeleteWorkspace}
                  />
                }
              />
              <Route
                path="/workspaces/:workspaceId/edit"
                element={
                  <WorkspaceUpdate
                    handleUpdateWorkspace={handleUpdateWorkspace}
                  />
                }
              />
              <Route
                path="/workspaces/new"
                element={
                  <WorkspaceForm handleAddWorkspace={handleAddWorkspace} />
                }
              />
              {/* Meetings routes */}
              <Route
                path="/workspaces/:workspaceId/meetings/new"
                element={<MeetingForm handleAddMeeting={handleAddMeeting} />}
              />

              <Route
                path="/workspaces/:workspaceId/meetings"
                element={<MeetingList meetings={meetings} />}
              />

              <Route path="/workspaces/:workspaceId/meetings/:meetingId" element={<MeetingsDetails user={user}
                    handleDeleteMeeting={handleDeleteMeeting} />} />
            </>
          ) : (
            <>
              <Route
                path="/sign-up"
                element={<SignUpForm setUser={setUser} />}
              />
              <Route
                path="/sign-in"
                element={<SignInForm setUser={setUser} />}
              />
            </>
          )}
        </Routes>
      </main>
    </div>
  );
};

export default App;
