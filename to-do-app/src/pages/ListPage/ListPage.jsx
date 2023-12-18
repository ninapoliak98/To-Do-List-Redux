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
    <div>
      {isSuccess && <List listName={list.name} listId={list.id} />}

    </div>
  )
}

export default ListPage