const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}`

const index = async () => {
    try {
        const res = await fetch(`${BASE_URL}/users`, {
            method: 'GET',
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        })
        const data = await res.json()
        

        if (data.err) {
            console.log(data.err)
            throw new Error(data.err)
        }

        return data
    } catch (err) {
        throw new Error(err)
    }
}

// const getCurrentUser = async ()=>{
// try {
//     const token = localStorage.getItem("token");
    
//     if (!token) {
//       throw new Error("No authentication token found");
//     }
//     const res = await fetch(`${BASE_URL}/users/me`, {
//       method: "GET",
//       headers: {
//         Authorization: `Bearer ${token}`,
//         "Content-Type": "application/json",
//       },
//     });

//     if (!res.ok) {
//       throw new Error(`Failed to fetch user: ${res.statusText}`);
//     }

//     const user = await res.json();
//     return user;
//   } catch (error) {
//     console.error("Error fetching current user:", error);
//     throw error;
//   }
// }

export {
    index,
    // getCurrentUser
}