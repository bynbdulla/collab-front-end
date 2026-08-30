import { Link } from "react-router";
import { useState } from "react";
import WorkspaceDetails from "./WorkspaceDetails";

const MeetingList = (props) => {
  return (
    <main className="meeting-list">
      <h1>All meetings</h1>
      <Link to={"/workspaces/new"}>
        <button type="submit">create a meeting</button>
      </Link>
      {props.meetings.map((meeting) => (
        <Link
          key={meeting._id}
          to={`/workspaces/${workspace._id}/meetings/${meeting._id}`}
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
