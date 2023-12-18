import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { LOGIN_ROUTE, LIST_ROUTE } from "../../routes/consts"
import { useActions } from '../../hooks/useActions'
import { useGetListsQuery, useDeleteListMutation, useUpdateListMutation } from '../../store/api/todo.api'
import CreateList from '../../components/CreateList'

const Todo = () => {

  const navigate = useNavigate()

  const { isLoading, data, isSuccess, refetch } = useGetListsQuery()
  const { isAuth } = useActions()
  const [deleteList] = useDeleteListMutation()
  const [updateList] = useUpdateListMutation()

  const logout = () => {
    try {
      localStorage.removeItem('user')
      isAuth(false)
      navigate(LOGIN_ROUTE)
    } catch (error) {
      console.error(error)
    }
  }

  const removeList = async (id) => {
    try {
      await deleteList(id)
      // await refetch()
    } catch (error) {
      console.log(error)
    }
  }


  if (isLoading) {
    return <div>Here should be spinner</div>
  }

  return (
    <div>
      <button onClick={logout}>Logout</button>

      <CreateList />
      <ul>
        {isSuccess && data.map(list => (
          <li key={list.id}>
            <Link to={LIST_ROUTE + `/${list.id}`}>{list.name}</Link>
            <button onClick={() => removeList(list.id)}>x</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Todo