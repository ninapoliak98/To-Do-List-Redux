import React from 'react'
import { Link } from 'react-router-dom'
import { LIST_ROUTE } from "../../routes/consts"
import { useGetListsQuery, useDeleteListMutation } from '../../store/api/todo.api'
import CreateList from '../../components/CreateList'
import NavBar from '../../components/NavBar'
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

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
    <div className='flex flex-col items-center justify-center mx-auto h-screen bg-shark-50 rounded-lg '>
      <div className='flex flex-col p-10 border-2 border-shark-600 rounded-lg shadow-lg shadow-shark-300  bg-shark-200 w-[550px] h-[700px]'>
        <NavBar />
        <h1 className='text-3xl font-bold tracking-wide text-gray-500 text-center mt-5 mb-5'>Task<span className='text-shark-400 ml-2 font-semibold'>Lists</span></h1>
        <CreateList />
        <ul className='list-none flex flex-col overflow-auto'>
          {isSuccess && data.map(list => (
            <li key={list.id}
              className='mb-5 p-3 flex rounded-lg bg-shark-100 justify-between'
            >
              <Link to={LIST_ROUTE + `/${list.id}`} className='text-sm font-semibold leading-6 text-shark-600 w-full'>{list.name}</Link>
              <button onClick={() => removeList(list.id)} className='ml-2 text-[#D9727A] font-semibold text-sm'>

                <FontAwesomeIcon icon={faTrash} size="lg" style={{ color: "#3f525f", }} />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Todo