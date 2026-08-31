import { useParams, useNavigate } from "react-router";
import * as meetingService from "../services/meeting";
import { useState, useEffect } from "react";

const MeetingsDetails = (meetingId) => {
  const { workspaceId } = useParams();
  const [meetings, setMeetings] = useState(null);

  const navigate = useNavigate();
  useEffect(() => {
    const fetchMeetings = async () => {
      const MeetingsData = await meetingService.show(meetingId);
      setMeetings(MeetingsData);
    };
    fetchMeetings();
  }, [meetingId]);

  if (!meetings) return <main>Loading...</main>;
  return (
    <article className="card">
      <header className="meetings-header">
        <h2>{meetings.name}</h2>
        <div className="actions">
          <button onClick={() => navigate(`/workspaces/${workspaceId}/meetings/${meetingId}/edit`)} className="actions-btn">
            edit
          </button>
          <button onClick={() => props.handleDeleteMeeting(meetingId)} className="actions-btn">
            delete
          </button>
        </div>
      </header>
      <p className="meetings-text">{meetings.description}</p>
      <h4>Members: </h4>
      <p className="meetings-owner">
        Created by {meetings.owner?.username || "Unknown user"} on{" "}
        <span>{new Date(meetings.createdAt).toLocaleDateString()}</span>
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
export default MeetingsDetails;
