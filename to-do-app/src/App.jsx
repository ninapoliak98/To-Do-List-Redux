import { BrowserRouter as Router, useNavigate } from 'react-router-dom';
import AppRouter from './routes/AppRouter';
import { useCheckUserQuery } from './store/api/user.api';
import { useEffect, useState } from 'react';
import { LOGIN_ROUTE } from './routes/consts';


function App() {
  const { isLoading, data, isSuccess } = useCheckUserQuery()


  useEffect(() => {
    if (isSuccess) localStorage.setItem('user', data.token)
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
