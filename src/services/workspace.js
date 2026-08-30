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
  try {
    const res = await fetch(`$BASE_URL/${workspaceId}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
    return res.json()
  } catch (err) {
    console.log(err);
    
  }
};

export { create, index, show };
