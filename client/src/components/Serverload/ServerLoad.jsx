import loading from '../../imgs/wait.gif'
import './serverload.css'

const ServerLoad = () => {
  return (
    <div className='serverload'>
      <div className='serverload-container'>
        <img src={loading} alt="" />
        <p>Deployed to free tier</p>
        <p>Please wait a moment for server to respond</p>
      </div>
    </div>
  )
}

export default ServerLoad