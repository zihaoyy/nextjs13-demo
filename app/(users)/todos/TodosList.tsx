import Link from 'next/link'
import React from 'react'
import { Todo } from '../../../typings'

const fechaTodos = async () => {
  // timeout for random number of seconds between 1 and 5
  const timeout = Math.floor(Math.random() * 5 + 1) * 1000
  await new Promise((resolve) => setTimeout(resolve, timeout))

  const response = await fetch('https://jsonplaceholder.typicode.com/todos/')
  const todos: Todo[] = await response.json()
  return todos
}

async function TodosList() {
  const todos = await fechaTodos()

  return (
    <>
      {todos.map((todo) => (
        <p key={todo.id}>
          <Link href={`/todos/${todo.id}`}>Todo: {todo.id}</Link>
        </p>
      ))}
    </>
  )
}

export default TodosList