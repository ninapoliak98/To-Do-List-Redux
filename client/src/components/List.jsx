import React, { useState } from 'react'
import Task from './Task'
import Modal from './Modal'
import CreateTask from './CreateTask'
import { useGetTasksQuery, useDeleteListMutation, useUpdateListMutation } from '../store/api/todo.api'
import { useNavigate } from 'react-router-dom'
import { TODO_ROUTE } from '../routes/consts'
import NavBar from './NavBar'

const List = ({ listName, listId }) => {

  const navigate = useNavigate()
  const [deleteList] = useDeleteListMutation()
  const [updateList] = useUpdateListMutation()
  const { data: tasks, isSuccess } = useGetTasksQuery(listId)

  const removeList = async (id) => {
    try {
      await deleteList(id)
      navigate(TODO_ROUTE)
    } catch (error) {
      console.log(error)
    }
  }

  const changeListName = async (id, body) => {
    try {
      await updateList({ id, name: body })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='flex flex-col items-center justify-center mx-auto h-screen bg-shark-50 rounded-lg'>
      <div className='flex flex-col p-10 border-2 border-shark-600 rounded-lg shadow-lg shadow-shark-300  bg-shark-200 w-[550px] h-[700px]'>
        <NavBar />

        <div className='flex justify-center'>
          <h2 className='text-3xl font-bold text-shark-600 text-center  mr-2'>{listName}</h2>
          <Modal clickHandler={changeListName} id={listId} />
        </div>





        <CreateTask listId={listId} />

        <div className='overflow-auto'>
          {isSuccess && tasks.map(item => (
            <Task taskName={item.task} key={item.id} isComplete={item.isComplete} id={item.id} listId={listId} />
          ))}
        </div>

        {/* <div className='flex w-full justify-end mt-10'>
          <button onClick={() => removeList(listId)}
            className='text-[#D9727A]'>
            Delete List
          </button>
        </div> */}

      </div>
    </div>
  )
}

export default List