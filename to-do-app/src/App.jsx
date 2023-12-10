import { BrowserRouter as Router, useNavigate } from 'react-router-dom';
import AppRouter from './routes/AppRouter';
import { useCheckUserQuery } from './store/api/user.api';
import { useEffect } from 'react';
import { useActions } from './hooks/useActions';
import { useAuth } from './hooks/useAuth';


function App() {
  const { isLoading, data, isSuccess } = useCheckUserQuery()

  const { isAuth } = useActions()
  const { auth } = useAuth();


  useEffect(() => {
    if (isSuccess) {
      localStorage.setItem('user', data.token)
      isAuth(true)
    }
  }, [isSuccess])

  if (isLoading) {
    return <> need to add a spinner </>
  }

  return (
    <Router>
      <AppRouter />
    </Router>
  )
}

export default App
