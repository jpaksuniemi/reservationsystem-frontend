import { useEffect, useState } from 'react'
import reserveeService from './service/reservees.js'

const Form = ({reservees, setReservees}) => {
  const [name, setNewName] = useState('Type here!');
  const [email, setNewEmail] = useState('Type here!');

  const onSubmitHandler = e => {
    e.preventDefault();
    const newReservee = { name, email };
    console.log(newReservee);
    reserveeService
      .create(newReservee)
      .then(returnedReservee => {
        setReservees(reservees.concat(returnedReservee));
      })
  }

  return (
    <form onSubmit={onSubmitHandler}>
      <label htmlFor="name">Full name:</label>
      <input type="text" id="name" name="name" value={name} onChange={e => setNewName(e.target.value)}></input> <br />
      <label htmlFor="email">Email:</label>
      <input type="text" id="email" name="email" value={email} onChange={e => setNewEmail(e.target.value)}></input> <br />
      <Button text={'Submit'} />
    </form>
  )
}

const Header = ({text}) => (
  <h1>{text}</h1>
)

const ReserveeList = ({reservees, deleteHandler}) => (
  <ul>
    {reservees.map(r => <li key={r.id}>{r.name} - {r.email}<Button onClickHandler={deleteHandler} id={r.id} text={'Cancel'} /> </li>)}
  </ul>
)

const Button = ({onClickHandler, text, id}) => (
  <button value={id} onClick={onClickHandler}>
    {text}
  </button>
)


const App = () => {
  const [reservees, setReservees] = useState([]);

  useEffect(() => {
    reserveeService
      .getAll()
      .then(initialReservers => {
        console.log(initialReservers);
        setReservees(initialReservers);
      })
  }, []);

  const deleteReservee = event => {
    const reserveeToDelete = reservees.find(reservee => reservee.id == event.target.value);
    console.log(reserveeToDelete, event.target.value);
    reserveeService
      .destroy(reserveeToDelete.id)
      .then(deletedReservee => {
        console.log('deleted, ', deletedReservee);
        setReservees(reservees.filter(reservee => reservee.id != deletedReservee.id));
      })
  }

  const addReservee = event => {

  }

  return (
    <div>
      <Header text="Book a table"/>
      <Header text="Please enter your contact information" />
      <Form setReservees={setReservees} reservees={reservees} />
      <ReserveeList reservees={reservees} deleteHandler={deleteReservee}/>
    </div>
  )
}

export default App;
