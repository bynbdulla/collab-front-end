import { useEffect, useState } from "react"
import { index } from '../services/user'

const Dashboard = (props) => {

    const [allUsers, setAllUsers] = useState([])

    useEffect(() => {
        const fetchUsers = async () => {
            const usersData =  await index()
            setAllUsers(usersData)
        }
        fetchUsers()
        
    }, [])

    return (
        <section>
            <header>
                <h1>Welcome {props.user.username}!</h1>
            </header>
           
        </section>
    )
}

export default Dashboard