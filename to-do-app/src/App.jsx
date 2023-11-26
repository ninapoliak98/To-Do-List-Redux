import { Link, BrowserRouter as Router } from 'react-router-dom';
import AppRouter from './routes/AppRouter';
import { LOGIN_ROUTE, SIGNUP_ROUTE, TODO_ROUTE } from './routes/consts';



function App() {

  return (
    <Router>
      <Link to={TODO_ROUTE}>To Do</Link>
      <AppRouter />
    </Router>
  )
}

export default App
