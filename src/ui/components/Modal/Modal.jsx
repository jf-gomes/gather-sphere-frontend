import styles from './Modal.module.css'

export default function Modal({ toggleModal, modalContent, setToggleModal, size }){
    if (toggleModal){
        return (
            <div className={styles.modalContainerDiv} style={size == 'p' ? {width: '400px', height: '700px'} : {width: '700px', height: '700px'}}>
                <button onClick={() => setToggleModal(!toggleModal)} className={styles.modalBtn}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
                    </svg>
                </button>
                <h2>{modalContent.name}</h2>
                <img src={modalContent.banner} alt="" />
                <p style={{textAlign: 'justify'}}>{modalContent.description}</p>
                <p>Data de início: {modalContent.startDate.slice(0, 10)}</p>
                <p>Data de encerramento: {modalContent.endDate.slice(0, 10)}</p>
                <p>Localização: {modalContent.location}</p>
                <p>Número de vagas: {modalContent.expectedPeople}</p>
            </div>
        )
    }
    return null
}