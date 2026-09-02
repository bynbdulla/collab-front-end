import { useParams, useNavigate } from "react-router";
import * as meetingService from "../services/meeting";
import { useState, useEffect } from "react";

const MeetingsDetails = (props) => {
  const { workspaceId, meetingId } = useParams();
  const [meetings, setMeetings] = useState(null);
  const navigate = useNavigate();

  // const formattedDate = meetings.meetingDate
  // ? new Date(meetings.meetingDate).toLocaleDateString("en-US", {
  //     year: "numeric",
  //     month: "long",
  //     day: "numeric",
  //   })
  // : "Not specified";


  useEffect(() => {
    const fetchMeeting = async () => {
      const meetingData = await meetingService.show(workspaceId, meetingId);
      setMeetings(meetingData);
    };
    fetchMeeting();
  }, [workspaceId, meetingId]);

  if (!meetings) return <main>Loading...</main>;
  return (
    <main className="meetings-details">
      <article className="meetings-card">
        <header className="meetings-header">
          <div className="header-content">
            <h1>{meetings.name}</h1>
          
          </div>
          <div className="header-actions">
            <button
              onClick={() =>
                navigate(
                  `/workspaces/${workspaceId}/meetings/${meetingId}/edit`,
                )
              }
              className="btn-edit"
            >
              EDIT
            </button>
            <button
              onClick={() => props.handleDeleteMeeting(meetingId, workspaceId)}
              className="btn-delete"
            >
              DELETE
            </button>
          </div>
        </header>
        <div className="meetings-meta">
          <div className="meta-item">
            <p className="meta-value">
              {meetings.description}
            </p>
          </div>
          <div className="meta-item">
          <p className="meta-value">
            <strong>Date: </strong>
            {meetings.meetingDate}
          </p>
          </div>
          <div className="meta-item">
          <p className="meta-value">
            <strong>Time: </strong>
            {meetings.meetingTime}
          </p>
          </div>
          <div className="meta-item">
          <p className="meta-value">
            <strong>Location: </strong>
            {meetings.location}
          </p>
          </div>
        </div>
      </article>
    </main>
  );
};
export default MeetingsDetails;
