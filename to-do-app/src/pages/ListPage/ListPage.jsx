import React from 'react'

// import List from '../../components/List.jsx'
import { useGetListQuery } from '../../store/api/todo.api'
import List from '../../components/List'

function ListPage() {


  const id = window.location.pathname.split('/').pop()
  const { data: list, isSuccess, isLoading } = useGetListQuery(id)


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