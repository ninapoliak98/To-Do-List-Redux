import React from 'react'
import { useParams } from 'react-router-dom';
import { useGetListQuery } from '../../store/api/todo.api'
import List from '../../components/List'



function ListPage() {

  const { id } = useParams();
  const { data: list, isSuccess, isLoading, isError } = useGetListQuery(id)

  if (isSuccess && !list) {
    return <div>List does not exist</div>
  }

  if (isLoading) {
    return <div>Here should be spinner</div>
  }


  return (
    <div className='flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0 bg-[#F9F9FA]'>

      {isSuccess && <List listName={list.name} listId={list.id} />}

    </div>
  )
}

export default ListPage