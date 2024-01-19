import Header from '../components/Header.jsx'
import { useEffect, useContext, useState } from 'react'
import { AuthContext } from '../contexts/auth.jsx'
import styles from './MyEvents.module.css'
import NavBar from '../components/NavBar.jsx'
import { api } from '../sevices/api.js'
import Footer from '../components/Footer.jsx'
import { useNavigate } from 'react-router-dom'

export default function MyEvents(){

    const navigate = useNavigate()

    const { token, events, setUserData, userData } = useContext(AuthContext)

    const [myEvents, setMyEvents] = useState([])

    useEffect(() => {
        if (!token){
            navigate('/gather-sphere-frontend/login')
        } else {
            const userEvents = events.filter((event) => userData.events.indexOf(event._id) != -1)
            setMyEvents(userEvents)
        }
    }, [userData])

    async function cancelSubscription(id){
        let newList = userData.events.filter((event) => event != id)
        const response = await api.patch(`/users/${userData._id}`, {
            events: newList
        })
        const user = await api.get(`/users/${userData._id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        setUserData(user.data.user)
        if (response.status == 200){
            alert('Inscrição cancelada com sucesso!')
        }
    }

    return (
        <>
            <Header />
            <NavBar />
            <main className={styles.myEventsMain}>
                {myEvents.length == 0 ? <p style={{textAlign: 'center', padding: '2em'}}>Você não está inscrito(a) em nenhum evento.</p> : myEvents.map((event) => (
                    <div key={event._id} className={styles.eventDiv}>
                        <div style={{display: 'flex', gap: '2rem'}}>
                            <p style={{fontWeight: 'bold'}}>{event.name}</p>
                            <p>Início: {event.startDate.slice(0, 10)}</p>
                            <p>Fim: {event.endDate.slice(0, 10)}</p>
                        </div>
                        <button onClick={() => cancelSubscription(event._id)} className={styles.cancelEventBtn}>Cancelar a inscrição</button>
                    </div>
                ))}
            </main>
            <Footer />
        </>
    )
}