import React from 'react'
import { useUpdateTaskMutation, useDeleteTaskMutation } from '../store/api/todo.api'
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Task = ({ taskName, isComplete, id }) => {

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

  const removeTask = async () => {
    try {
      await deleteTask(id)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='flex justify-between items-center mb-5 border border-gray-300 p-3 rounded-lg bg-shark-100'>
      <label className='w-full flex gap-5 items-center text-sm font-semibold leading-6 text-shark-600'>
        <input
          onChange={checkComplete}
          type="checkbox"
          defaultChecked={isComplete}
          className=' text-shark-600 h-4 w-4 rounded-full focus:ring-shark-300' />
        {taskName}
      </label>

      <button
        onClick={removeTask}
        className='ml-2 text-[#D9727A] font-semibold text-sm'
      >
        <FontAwesomeIcon icon={faTrash} size="lg" style={{ color: "#3f525f", }} />
      </button>
    </div>
  )
}

export default Task