import React from 'react';
import { TodoCounter } from '../TodoCounter';
import { TodoSearch } from '../TodoSearch';
import { TodoList } from '../TodoList';
import { TodoItem } from '../TodoItem';
import { CreateTodoButton } from '../CreateTodoButtom';
import { useLocalStorage  } from './useLocalStorage';

/*const defaultTodos = [
  { text: 'Cortar cebolla', completed: true },
  { text: 'Tomar curso', completed: false },
  { text: 'Llorar con la llorona', completed: false },
  { text: 'Terminar curso', completed: false },
  { text: 'Estado derivados', completed: true },
];*/

//localStorage.setItem('TODOS_V1', JSON.stringify(defaultTodos);
//localStorage.removeItem('TODOS_V1');


function App() {
   const [todos, saveTodos] = useLocalStorage('TODOS_V1', []);
   const [searchValue, setSearchValue] = React.useState('');


  const completedTodos = todos.filter(todo => !!todo.completed).length;
  const totalTodos = todos.length;

  const searchedTodos = todos.filter(
    (todo) => { 
    const todoText = todo.text.toLocaleLowerCase();
    const searchText = searchValue.toLocaleLowerCase();

    return   todoText.includes(searchText);
  } 
  );


  const completeTodo = (text) => {
    const newTodos = [...todos];
    const todoIndex = newTodos.findIndex(
      (todo) => todo.text === text   
    );
    newTodos[todoIndex].completed = true;
    saveTodos(newTodos);
  };

  const deleteTodo = (text) => {
    const newTodos = [...todos];
    const todoIndex = newTodos.findIndex(
      (todo) => todo.text === text   
    );
    newTodos.splice(todoIndex, 1);
    saveTodos(newTodos);
  };

  return (
    <React.Fragment>

      <TodoCounter completed={completedTodos} total={totalTodos} />
      <TodoSearch
        searchValue={searchValue}
        setSearchValue={setSearchValue}
      />

      <TodoList>
        {searchedTodos.map(todo => (
          <TodoItem
            key={todo.text}
            text={todo.text}
            completed={todo.completed}
            onComplete={() => completeTodo(todo.text)}
            onDelete={() => deleteTodo(todo.text)}

          />
        ))}
      </TodoList>

      <CreateTodoButton />
    </React.Fragment>
  );
}

export default App;
