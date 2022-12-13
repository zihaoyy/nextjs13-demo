import React from 'react'
import { Todo } from '../../../typings'

type PageProps = {
  params: {
    todoId: string
  }
}

const fetchTodo = async (todoId: string) => {
  const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${todoId}`, {
    // server-side caching: 'no-cache', client-side caching: 'force-cache', ssg caching: next: { revalidate: 60 }
    next: { revalidate: 60 }
  })
  const todo: Todo = await response.json()
  return todo
}

async function TodoPage({ params: { todoId } }: PageProps) {
  const todo = await fetchTodo(todoId)
  return (
    <div className="p-10 bg-yellow-200 border-2 m-2 shadow-lg">
      <p>
        #{todo.id}: {todo.title}
      </p>
      <p>
        Completed: {todo.completed ? 'Yes' : 'No'}
      </p>
      <p className='border-t border-black mt-5 text-right'>
        By User: {todo.userId}
      </p>
    </div>
  )
}

export default TodoPage

export async function generateStaticParams() {
  const response = await fetch('https://jsonplaceholder.typicode.com/todos/')
  const todos: Todo[] = await response.json()
  // for this DEMO, we are only prebuilding the first 10 pages to avoid being rate limited by the API
  const trimedTodos = todos.slice(0, 10)
  return trimedTodos.map((todo) => ({ todoId: todo.id.toString() }))
}