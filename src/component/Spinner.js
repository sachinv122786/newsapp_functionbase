import loading from './loading.gif'

const Spinner=()=> {
    return (
      <div className='d-flex justify-content-center my-3'>
        <img src={loading} alt='Loading'></img>
      </div>
    )
}

export default Spinner
