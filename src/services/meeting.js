const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/meetings`;

const create = async (MeetingFormData) => {
  try {
    const res = await fetch(BASE_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(MeetingFormData),
    });
    return res.json();
  } catch (err) {
    console.log(err);
  }
};

const index = async () => {
  console.log("index");
  try {
    const res = await fetch(BASE_URL, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

const show = async (workspaceId , meetingId) => {
  try {
    const res = await fetch(`${BASE_URL}/${workspaceId}/meetings/${meetingId}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return res.json();
  } catch (err) {
    console.log(err);
  }
};

const deleteMeeting = async (workspaceId , meetingId) => {
  try {
    const res = await fetch(`${BASE_URL}/${workspaceId}/meetings/${meetingId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

const update = async (meetingId, meetingFormData) => {
  try {
    const res = await fetch(`${BASE_URL}/${workspaceId}/meetings/${meetingId}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(meetingFormData),
    })
    return res.json()
  } catch (error) {
    console.log(error)
  }
}


export { create, index, show, deleteMeeting, update };
