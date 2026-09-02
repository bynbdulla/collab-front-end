import { Link } from "react-router";
import { useParams } from "react-router";
import { useEffect } from "react";
import * as meetingService from "../services/meeting";
import { useState } from "react";

const MeetingList = () => {
  const { workspaceId } = useParams();
  const [meetings, setMeetings] = useState([]);

  useEffect(() => {
    const fetchAllMeetings = async () => {
      if (!workspaceId) return;

      try {
        const meetingsData = await meetingService.index(workspaceId);
        setMeetings(meetingsData || []);
      } catch (error) {
        console.error("Failed to fetch meetings:", error);
      }
    };
    if (!meetings || meetings.length === 0) {
      fetchAllMeetings();
    }
  }, [workspaceId]);

  return (
    <main className="meeting-list">
      <div className="meeting-list-header">
        <div className="header-content">
          <h1>All Meetings</h1>
        </div>
        <Link
          to={`/workspaces/${workspaceId}/meetings/new`}
          className="btn-create-meeting"
        >
          + New Meeting
        </Link>
      </div>
      <div className="meetings-grid">
        {meetings.map((meeting) => (
          <Link
            key={meeting._id}
            to={`/workspaces/${workspaceId}/meetings/${meeting._id}`}
            className="workspace-card-link"
          >
            <article className="meeting-card">
              <header className="card-header">
                <div className="card-header">
                  <h2>{meeting.name}</h2>
                </div>
              </header>
              <p className="meeting-desc">{meeting.description}</p>

              <footer className="meeting-footer">
                <div className="footer-info">
                  <span className="date">{new Date(meeting.meetingDate).toLocaleDateString(
                        "en-US",
                        {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        }
                      )}</span>
                </div>
              </footer>
            </article>
          </Link>
        ))}
      </div>
    </main>
  );
};
export default MeetingList;
