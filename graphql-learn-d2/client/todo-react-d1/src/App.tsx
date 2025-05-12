import './App.css'

import { useQuery, gql } from '@apollo/client';
import type { Todo } from './types/todo';

const GET_TODOS = gql`
  query GetTodos {
    todos {
      id
      title
      completed
      user {
        id
        name
        phone
        website
        company {
          name
          catchPhrase
          bs
        }
      }
    }
  }
`

const GET_USER = gql`
  query GetUser($id: ID!) {
    user(id: $id) {
      id
      name
      phone
      website
      company {
        name
        catchPhrase
        bs
      }
    }
  }
`

function App() {
  const { loading, error, data } = useQuery(GET_TODOS);
  const { loading: userLoading, error: userError, data: userData } = useQuery(GET_USER, {
    variables: { id: 1 }
  });

  if (loading || userLoading) return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );

  if (error || userError) return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        Error: {error?.message || userError?.message}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">Todo List</h1>
        <div className="space-y-4">

          <div className='bg-white rounded-lg shadow-md p-4 flex items-center justify-between hover:shadow-lg transition-shadow'>
            <h1 className='text-gray-800 font-bold'>USER</h1>
            <div className='flex items-center space-x-4'>
              <p className='text-gray-600'>{userData.user.name}</p>
              <p className='text-gray-600'>{userData.user.company.name}</p>
            </div>
          </div>


          <div className='bg-white rounded-lg shadow-md p-4 flex items-center justify-between hover:shadow-lg transition-shadow'>
            <h1 className='text-gray-800 font-bold'>TODO</h1>
          </div>
          {data.todos.map((todo: Todo) => (
            <div
              key={todo.id}
              className="bg-white rounded-lg shadow-md p-4 flex items-center justify-between hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center space-x-4">
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${todo.completed
                  ? 'bg-green-500 border-green-500'
                  : 'border-gray-300'
                  }`}>
                  {todo.completed && (
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
                <span className={`text-lg ${todo.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
                  {todo.title}
                </span>
              </div>
              <p>
                <div className="text-gray-500 text-sm">
                  {todo.user?.name} - {todo.user?.company?.name}

                </div>
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default App
