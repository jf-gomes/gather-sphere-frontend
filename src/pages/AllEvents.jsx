import { useEffect, useContext, useState } from "react"
import { api } from "../sevices/api.js"
import styles from './AllEvents.module.css'
import { AuthContext } from "../contexts/auth.jsx"
import { useNavigate } from "react-router-dom"
import NavBar from "../components/NavBar.jsx"
import Header from "../components/Header.jsx"
import Footer from '../components/Footer.jsx'
import Toast from "../components/Toast.jsx"
import Modal from "../components/Modal.jsx"

export default function AllEvents(){

    const { token, userData, events, setEvents } = useContext(AuthContext)

    const [toggleToast, setToggleToast] = useState(false)
    const [toastContent, setToastContent] = useState('')

    const [toggleModal, setToggleModal] = useState(false)
    const [modalContent, setModalContent] = useState('')

    const [size, setSize] = useState()

    useEffect(() => {
        function handleResize(){
            if (window.innerWidth <= 840) setSize('p')
            else setSize('g')
        }
        handleResize()
        window.addEventListener('resize', handleResize)
        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])

    const navigate = useNavigate()

    useEffect(() => {
        getEvents()
    }, [events])

    async function getEvents(){
        if (!token){
            navigate('/gather-sphere-frontend/login')
        } else {
            const response = await api.get('/events', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            setEvents(response.data)
        }
    }

    async function signupEvent(event){
        let newList = userData.events
        if (newList.indexOf(event._id) != -1){
            alert('Já inscrito')
        } else {
            newList.push(event._id)
            const response = await api.patch(`/users/${userData._id}`, {
                events: newList
            })
            if (response.status == 200){
                setToggleToast(!toggleToast)
                setToastContent('Inscrição efetuada com sucesso!')
            }
        }
    }

    return (
        <>
            <Header />
            <NavBar />
            <Modal toggleModal={toggleModal} modalContent={modalContent} setToggleModal={setToggleModal} size={size} />
            <main className={styles.allEventsMain}>
                <Toast isOpen={toggleToast} toastContent={toastContent} setToggleToast={setToggleToast} />
                <div className={styles.allEventsContainer}>
                {events.length > 0 ? events.map((event) => (
                    <div key={event._id} className={styles.eventDiv}>
                        <p className={styles.eventTitle}>{event.name}</p>
                        <img className={styles.eventBanner} src={event.banner} alt={event.name} />
                        <p style={{textAlign: 'justify'}}>{event.description}</p>
                        <div className={styles.btnDiv}>
                            <input className={styles.btn} type="button" value="Ver mais" onClick={() => {
                                setToggleModal(!toggleModal)
                                setModalContent(event)
                            }} />
                            <input style={userData.events.indexOf(event._id) != -1 ? {backgroundColor: 'lightgray'} : null} id="liveToastBtn" className={styles.btn} type="button" value={userData.events.indexOf(event._id) == -1 ? 'Inscrever-se' : 'Já Inscrito(a)'} onClick={() => signupEvent(event)} />
                        </div>
                    </div>
                )) : <div>Nenhum evento disponível. Tente novamente mais tarde.</div>}
                </div>
            </main>
            <Footer />
        </>
    )
}