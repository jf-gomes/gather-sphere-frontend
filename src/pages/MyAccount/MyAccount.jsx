import styles from './MyAccount.module.css'
import { useContext, useEffect, useState } from 'react'
import { api } from '../../data/services/api.js'
import { useNavigate } from 'react-router-dom'
import Header from '../../ui/components/Header/Header.jsx'
import { AuthContext } from '../../data/contexts/auth.jsx'
import NavBar from '../../ui/components/NavBar/NavBar.jsx'
import Footer from '../../ui/components/Footer/Footer.jsx'
import Loader from '../../ui/components/Loader/Loader.jsx'

export default function MyAccount(){

    const { token, userData, setUserData } = useContext(AuthContext)

    const [name, setName] = useState(userData.name)
    const [email, setEmail] = useState(userData.email)
    const [cpf, setCpf] = useState(userData.cpf)
    const [cel, setCel] = useState(userData.cel)
    const [loader, setLoader] = useState(false)

    const navigate = useNavigate()

    useEffect(() => {
        if (!token) navigate('/gather-sphere-frontend/login')
    }, [])

    async function handleSubmit(e){
        e.preventDefault()
        setLoader(true)
        const response = await api.patch(`/users/${userData._id}`, {
            name: name,
            email: email,
            cpf: cpf,
            cel: cel
        })
        console.log(response)
        if (response.status == 200){
            alert('Cadastro alterado com sucesso!')
            const user = await api.get(`/users/${userData._id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            setUserData(user.data.user)
            setLoader(false)
        }
        setLoader(false)
    }

    return (
        <>
            <Header />
            <NavBar />
            <main className={styles.signUpMain}>
                <div className={styles.mainDiv}>
                    <h1>Editar meu cadastro</h1>
                    <form className={styles.loginForm}>
                        <input value={name} onChange={(txt) => setName(txt.target.value)} type="text" placeholder='Seu nome completo' />
                        <input value={email} onChange={(txt) => setEmail(txt.target.value)} type="email" placeholder='Seu e-mail' />
                        <input value={cpf} onChange={(txt) => setCpf(txt.target.value)} type="text" placeholder='CPF (apenas números)' />
                        <input value={cel} onChange={(txt) => setCel(txt.target.value)} type="text" placeholder='Celular' />
                        <input className={styles.signUpBtn} type="button" value="Editar" onClick={handleSubmit} />
                        {loader ? <Loader /> : null}
                    </form>
                </div>
            </main>
            <Footer />
        </>
    )
}