import React, { useState } from 'react'
import { useAddTaskMutation } from '../store/api/todo.api'
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function CreateTask({ listId }) {

  const initialData = {
    task: '',
    listId: listId,
    isComplete: false,
  }

  const [showModal, setShowModal] = useState(false);
  const [task, setTask] = useState(initialData)
  const [addTask] = useAddTaskMutation()

  const createTask = async (e) => {
    try {
      e.preventDefault()
      await addTask(task)
      setTask(initialData)
    } catch (error) {
      console.error(error.message);
    }
  }

  return (
    <form
      className='flex w-full justify-center mb-10 mt-10'>
      <button
        onClick={createTask}
        type='submit'
        className='appearance-none'
      >
        <FontAwesomeIcon icon={faPlus} size="xl" style={{ color: "#3f525f", }} />
      </button>

      <input
        type="text"
        value={task.task}
        onChange={e => setTask({ ...task, task: e.target.value })}
        placeholder='create new task...'
        className='ml-5  text-gray-600 w-full  focus:ring-shark-500 focus:border-shark-500 bg-transparent rounded h-11 border-none' />

    </form>
  )
}

export default CreateTask