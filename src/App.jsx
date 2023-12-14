import { useState } from "react"
import AddTodo from "./components/AddTodo/AddTodo"
import Header from "./components/Header/Header"
import TodoList from "./components/TodoList/TodoList"
import { v4 as uuid } from 'uuid';
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useEffect } from "react";
import { TodosContext } from './context';

function App() {
  const [todos, setTodos] = useState(() => {
    if (typeof localStorage !== 'undefined') {
      const storedTodos = localStorage.getItem('todos');
      return storedTodos !== null ? JSON.parse(storedTodos) : [];
    } else {
      return [];
    }
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  const addTodo = (text) => {
    if (text) {
      // const newTodo = {
      //   text,
      //   complete: false,
      //   id: uuid()
      // };
      // setTodos([
      //   ...todos,
      //   newTodo
      // ]);
      setTodos(currentTodos => {
        return [
          ...currentTodos,
          {
            text,
            complete: false,
            id: uuid()
          }
        ]
      })
    }
  }

  const toggleTodo = (id) => {
    // const newTodos = todos.map(todo => {
    //   if (todo.id === id) {
    //     todo.complete = !todo.complete;
    //   }
    //   return todo;
    // });
    // setTodos(newTodos);
    setTodos(currentTodos => {
      return currentTodos.map(todo => {
        if (todo.id === id) {
          todo.complete = !todo.complete;
        }
        return todo;
      })
    });
  }

  const removeTodo = (id) => {
    // const newTodos = todos.filter(todo => todo.id !== id);
    // setTodos(newTodos);
    setTodos(currentTodos => {
      return currentTodos.filter(todo => todo.id !== id);
    });
  }

  useEffect(() => {
    if (loading) {
      setTimeout(function () {
        setLoading(false);
      }, 1000);
    }
  }, []);

  useEffect(() => {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('todos', JSON.stringify(todos));
    }
  }, [todos]);

  return (
    <TodosContext.Provider value={{ loading, searchQuery, setSearchQuery, todos, addTodo, toggleTodo, removeTodo }}>
      <Header />
      <div className="container">
        {loading ?
          <div className="loading-spinner"><AiOutlineLoading3Quarters /></div> : (
            <>
              {!searchQuery && <AddTodo />}
              <TodoList />
            </>
          )
        }
      </div>
    </TodosContext.Provider>
  )
}

export default App
