import { Link } from "react-router";
import { useParams } from "react-router";
import { useState } from "react";
// import MeetingDetails from "./MeetingDetails";

const MeetingList = (props) => {
  const { workspaceId } = useParams();
  
  console.log(meetings, "check");

  return (
    <main className="meeting-list">
      <h1>All meetings</h1>
      <Link to={`/workspaces/${workspaceId}/meetings/new`}>
        <button type="submit">create new meeting</button>
      </Link>
      {props.meetings.map((meeting) => (
        <Link
          key={meeting._id}
          to={`/workspaces/${workspaceId}/meetings/${meeting._id}`}
        >
          <article className="card">
            <header>
              <h2 key={meeting._id}>{meeting.name}</h2>
              <p className="meeting-owner">
                Created by {meeting.owner?.username || "Unknown user"}
              </p>
            </header>
            <p className="meeting-desc">{meeting.description}</p>
            <footer className="meeting-footer">
              <span>{new Date(meeting.createdAt).toLocaleDateString()}</span>
            </footer>
          </article>
        </Link>
      ))}
    </main>
  );
};
export default MeetingList;
