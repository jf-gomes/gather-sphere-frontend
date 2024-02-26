import loader from '../../../assets/loader.gif'

export default function Loader(){
    return (
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', paddingBottom: '2rem'}}>
            <img style={{width: 50, height: 50}} src={loader} />
        </div>
    )
}