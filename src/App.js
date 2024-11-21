const Form = () => (
  <form>
    <label for="name">Full name:</label>
    <input type="text" id="name" name="name"></input> <br />
    <label for="email">Email:</label>
    <input type="text" id="email" name="email"></input>
  </form>
)

const Header = ({text}) => (
  <h1>{text}</h1>
)

const App = () => {
  return (
    <div>
      <Header text="Book a table"/>
      <Header text="Please enter your contact information" />
      <Form />
      <p>
        hello world!
      </p>
    </div>
  )
}

export default App;
