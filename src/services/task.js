const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/workspaces`;

const create = async (workspaceId ,TaskFormData) => {
  try {
    const res = await fetch(`${BASE_URL}/${workspaceId}/tasks`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(TaskFormData),
    });
    return res.json();
  } catch (err) {
    console.log(err);
  }
};

const index = async (workspaceId) => {
  console.log("index");
  try {
    const res = await fetch(`${BASE_URL}/${workspaceId}/tasks`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
    }, });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

const show = async (workspaceId , taskId) => {
  try {
    const res = await fetch(`${BASE_URL}/${workspaceId}/tasks/${taskId}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return res.json();
  } catch (err) {
    console.log(err);
  }
};

const deleteTask = async (workspaceId , taskId) => {
  try {
    const res = await fetch(`${BASE_URL}/${workspaceId}/tasks/${taskId}`, {
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

const update = async (workspaceId ,taskId, taskFormData) => {
  try {
    const res = await fetch(`${BASE_URL}/${workspaceId}/tasks/${taskId}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(taskFormData),
    })
    return res.json()
  } catch (error) {
    console.log(error)
  }
}


export { create, index, show, deleteTask, update };
