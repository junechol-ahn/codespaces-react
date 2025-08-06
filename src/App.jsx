import './App.css';
import { addTask, removeTask, completeTask } from './store/tasks';
import { addEmployee, removeEmployee } from './store/employees';
import store from './store/configureStore';
import { LoremIpsum } from 'lorem-ipsum';
import axios from 'axios';

const lorem = new LoremIpsum({
  sentencesPerParagraph: {
    max: 8,
    min: 4
  },
  wordsPerSentence: {
    max: 16,
    min: 4
  }
});

store.subscribe(()=> {
  console.log("employees: ", store.getState().employees)
  console.log("tasks: ", store.getState().tasks)
})

function handleAddTask() {
  store.dispatch(addTask({task:lorem.generateWords(4)}))
}

function handleRemoveTask() {
  const tasks = store.getState().tasks
  if (tasks.length > 0) {
    store.dispatch(removeTask({id: tasks[0].id}))
  }
}

function handleCompleteTask() {
  const tasks = store.getState().tasks
  if (tasks.length > 0) {
    store.dispatch(completeTask({id: tasks[0].id}))
  }
}

const handleAddEmployee = () => {
  const name = lorem.generateWords(2)
  store.dispatch( addEmployee({name}) )
}

const handleRemoveEmployee = () => {
  const employees = store.getState().employees
  if (employees.length > 0) {
    store.dispatch( removeEmployee({id: employees[0].id}))
  }
}

const handleTestErrorLogger = () => {
  store.dispatch( {type: 'SHOW_ERROR', payload: {error: 'Server Error'}})
}

const gettingTasks = async () => {
  const response = await axios.get('https://bug-free-chainsaw-x9jrg7wgqrw36g7-5000.app.github.dev/api/tasks')
  console.log(response)
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          GitHub Codespaces <span className="heart">♥️</span> React
        </p>
        <p className="small">
          Edit <code>src/App.jsx</code> and save to reload.
        </p>
        <p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </p>
      </header>
      <div>
        <button onClick={handleAddTask}>Add Task</button>
      </div>
      <div>
        <button onClick={handleCompleteTask}>Task Completed</button>
      </div>
      <div>
        <button onClick={handleRemoveTask}>Remove Task</button>
      </div>
      <hr />
      <div>
        <button onClick={handleAddEmployee}>Add Employee</button>
      </div>
      <div>
        <button onClick={handleRemoveEmployee}>Remove Employee</button>
      </div>
                  
                  <div>
        <button onClick={handleTestErrorLogger}>Test errorLogger</button>
      </div>
      <div className="spacer"></div>
      <div>
        <button onClick={gettingTasks}>API: get</button>
      </div>
    </div>
  );
}

export default App;
