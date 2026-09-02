const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/workspaces`;

const create = async (workspaceFormData) => {
  try {
    const res = await fetch(BASE_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(workspaceFormData),
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

const show = async (workspaceId) => {
  console.log("workspace show, id: ", workspaceId);
  try {
    const res = await fetch(`${BASE_URL}/${workspaceId}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return res.json();
  } catch (err) {
    console.log(err);
  }
};

const deleteWorkspace = async (workspaceId) => {
  try {
    const res = await fetch(`${BASE_URL}/${workspaceId}`, {
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

async function update(workspaceId, workspaceFormData) {
  console.log(workspaceFormData);
  try {
    const res = await fetch(`${BASE_URL}/${workspaceId}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(workspaceFormData),
    });
    // const data = await res.json();
    // console.log(data);
    return res.json();
  } catch (error) {
    console.log(error);
  }
}

export { create, index, show, deleteWorkspace, update };
