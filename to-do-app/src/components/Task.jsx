import React, { useState, useEffect } from 'react'
import { useUpdateTaskMutation, useDeleteTaskMutation } from '../store/api/todo.api'

const Task = ({ taskName, isComplete, id, refetch }) => {

  const [updateTask] = useUpdateTaskMutation()
  const [deleteTask] = useDeleteTaskMutation()

  const checkComplete = async (e) => {
    try {
      const { checked } = e.target
      await updateTask({ id, isComplete: checked })
    } catch (error) {
      console.log(error)
    }
  }

  const removeTask = async (e) => {
    try {
      await deleteTask(id)
      refetch()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <p>{taskName}</p>
      <input onChange={checkComplete} type="checkbox" defaultChecked={isComplete} />
      <button onClick={removeTask}>x</button>
    </div>
  )
}

export default Task