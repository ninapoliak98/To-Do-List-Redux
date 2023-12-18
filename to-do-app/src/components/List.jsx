import React, { useState } from 'react'
import Task from './Task'
import Modal from './Modal'
import CreateTask from './CreateTask'
import { useGetTasksQuery, useDeleteListMutation, useUpdateListMutation } from '../store/api/todo.api'
import { useNavigate } from 'react-router-dom'
import { TODO_ROUTE } from '../routes/consts'

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
    <div>
      <button>back to list</button>
      <Modal clickHandler={changeListName} id={listId} />
      <button onClick={() => removeList(listId)}>x</button>
      <h2>{listName}</h2>

      <CreateTask listId={listId} />

      {isSuccess && tasks.map(item => (
        <Task taskName={item.task} key={item.id} isComplete={item.isComplete} id={item.id} listId={listId} />
      ))}
    </div>
  )
}

export default List