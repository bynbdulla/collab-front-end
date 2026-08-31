import { useParams, useNavigate } from "react-router";
import * as meetingService from "../services/meeting";
import { useState, useEffect } from "react";

const MeetingsDetails = (props) => {
  const { workspaceId, meetingId } = useParams();
  const [meetings, setMeetings] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMeeting = async () => {
      const meetingData = await meetingService.show(workspaceId ,meetingId);
      setMeetings(meetingData);
    };
    fetchMeeting();
  }, [workspaceId, meetingId]);

  if (!meetings) return <main>Loading...</main>;
  return (
    <article className="card">
      <header className="meetings-header">
        <h2>{meetings.name}</h2>
        <div className="actions">
          <button onClick={() => navigate(`/workspaces/${workspaceId}/meetings/${meetingId}/edit`)} className="actions-btn">
            EDIT
          </button>
          <button onClick={() => props.handleDeleteMeeting(meetingId, workspaceId)} className="actions-btn">
            DELETE
          </button>
        </div>
      </header>
      <p className="meetings-text"><strong>Description: </strong>{meetings.description}</p>
      <p className="meetings-text"><strong>Date: </strong>{meetings.meetingDate}</p>
      <p className="meetings-text"><strong>Time: </strong>{meetings.meetingTime}</p>
      <p className="meetings-text"><strong>Location: </strong>{meetings.location}</p>
      

  
    </article>
  );
};
export default MeetingsDetails;
