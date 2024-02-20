import React, { useState } from 'react'
import { useCreateListMutation } from '../store/api/todo.api'
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'



const initialData = {
  name: ''
}

const CreateList = () => {
  const [listName, setListName] = useState(initialData)
  const [createList] = useCreateListMutation()

  const addList = async (e) => {
    try {
      e.preventDefault();
      await createList(listName)
      setListName(initialData)
    } catch (error) {
      console.error(error.message);
    }
  }

  return (
    <div>
      <form className='flex w-full justify-center mb-10 mt-10'>

        <button onClick={addList} type='submit'
          className='appearance-none'
        ><FontAwesomeIcon icon={faPlus} size="xl" style={{ color: "#3f525f", }} /></button>
        <input type="text"
          value={listName.name}
          onChange={e => setListName({ ...listName, name: e.target.value })}
          className=' ml-5  text-gray-600 w-full focus:ring-shark-500 focus:border-shark-500  bg-transparent rounded h-11 border-none'
          placeholder='add new list...'
        />

      </form>
    </div>
  )
}

export default CreateList