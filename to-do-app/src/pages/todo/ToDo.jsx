import React from 'react'
import { Link } from 'react-router-dom'
import { LIST_ROUTE } from "../../routes/consts"
import { useGetListsQuery, useDeleteListMutation } from '../../store/api/todo.api'
import CreateList from '../../components/CreateList'

const Todo = () => {

  const { isLoading, data, isSuccess } = useGetListsQuery()

  const [deleteList] = useDeleteListMutation()


  const removeList = async (id) => {
    try {
      await deleteList(id)
    } catch (error) {
      console.log(error)
    }
  }


  if (isLoading) {
    return <div>Here should be spinner</div>
  }

  return (
    <div>
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