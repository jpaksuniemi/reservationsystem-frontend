import { useEffect, useState } from 'react'
import reserverService from './service/reservers.js'

const Form = () => (
  <form>
    <label htmlFor="name">Full name:</label>
    <input type="text" id="name" name="name"></input> <br />
    <label htmlFor="email">Email:</label>
    <input type="text" id="email" name="email"></input>
  </form>
)

const Header = ({text}) => (
  <h1>{text}</h1>
)

const ReserverList = ({reservers}) => (
  <ul>
    {reservers.map(reserver => <li id='{reserver.id}'>{reserver.name}</li>)}
  </ul>
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

  return (
    <div>
      <Header text="Book a table"/>
      <Header text="Please enter your contact information" />
      <Form />
      <p>
        hello world!
      </p>
      <ReserverList reservers={reservers} />
    </div>
  )
}

export default App;
