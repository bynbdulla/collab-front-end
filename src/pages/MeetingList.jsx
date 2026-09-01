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
      <h1>All meetings</h1>
      <Link to={`/workspaces/${workspaceId}/meetings/new`}>
        <button type="submit">create new meeting</button>
      </Link>
      {meetings.map((meeting) => (
        <Link
          key={meeting._id} 
          to={`/workspaces/${workspaceId}/meetings/${meeting._id}`}
        >
          <article className="card">
            <header>
              <h2>{meeting.name}</h2>
             
            </header>
            
            <footer className="meeting-footer">
              <span>{meeting.meetingsDate}</span>
            </footer>
          </article>
        </Link>
      ))}
    </main>
  );
};
export default MeetingList;
