import { useEffect, useState } from 'react'
import reserverService from './service/reservers.js'

const Form = () => {
  const [name, setName] = useState('Type here!');
  const [email, setEmail] = useState('Type here!');

  return (
    <form >
      <label htmlFor="name">Full name:</label>
      <input type="text" id="name" name="name" value={name} onChange={e => setName(e.target.value)}></input> <br />
      <label htmlFor="email">Email:</label>
      <input type="text" id="email" name="email" value={email} onChange={e => setEmail(e.target.value)}></input> <br />
      <Button text={'Submit'} />
    </form>
  )
}

const Header = ({text}) => (
  <h1>{text}</h1>
)

const ReserverList = ({reservers, deleteHandler}) => (
  <ul>
    {reservers.map(r =><li key={r.id}>{r.name} <Button onClickHandler={deleteHandler} id={r.id} text={'Cancel'} /> </li>)}
  </ul>
)

const Button = ({onClickHandler, text, id}) => (
  <button value={id} onClick={onClickHandler}>
    {text}
  </button>
)


const App = () => {
  const [reservers, setReservers] = useState([]);

  useEffect(() => {
    reserverService
      .getAll()
      .then(initialReservers => {
        console.log(initialReservers);
        setReservers(initialReservers);
      })
  }, []);

  const deleteReserver = event => {
    const reserverToDelete = reservers.find(reserver => reserver.id == event.target.value);
    console.log(reserverToDelete, event.target.value);
    reserverService
      .destroy(reserverToDelete.id)
      .then(deletedReserver => {
        console.log('deleted, ', deletedReserver);
        setReservers(reservers.filter(reserver => reserver.id != deletedReserver.id));
      })
  }

  const addReservee = event => {

  }

  return (
    <div>
      <Header text="Book a table"/>
      <Header text="Please enter your contact information" />
      <Form />
      <ReserverList reservers={reservers} deleteHandler={deleteReserver}/>
    </div>
  )
}

export default App;
