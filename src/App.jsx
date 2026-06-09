import { useState, useEffect } from 'react'
import './App.css'

const STORAGE_KEY = 'task-board-tasks'

function loadTasks() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved ? JSON.parse(saved) : []
  } catch {
    return []
  }
}

function nextId(tasks) {
  return tasks.length === 0 ? 1 : Math.max(...tasks.map((t) => t.id)) + 1
}

function App() {
  const [tasks, setTasks] = useState(loadTasks)
  const [inputValue, setInputValue] = useState('')

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
  }, [tasks])

  const addTask = () => {
    const text = inputValue.trim()
    if (!text) return
    setTasks([...tasks, { id: nextId(tasks), text, completed: false }])
    setInputValue('')
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') addTask()
  }

  const toggleTask = (id) => {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)))
  }

  const deleteTask = (id) => {
    setTasks(tasks.filter((t) => t.id !== id))
  }

  return (
    <div className="board">
      <h1 className="board-title">タスクボード</h1>

      <div className="input-row">
        <input
          className="task-input"
          type="text"
          placeholder="新しいタスクを入力..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button className="add-button" onClick={addTask}>
          追加
        </button>
      </div>

      {tasks.length === 0 ? (
        <p className="empty">タスクはまだありません</p>
      ) : (
        <ul className="task-list">
          {tasks.map((task) => (
            <li key={task.id} className={`task-item${task.completed ? ' completed' : ''}`}>
              <input
                type="checkbox"
                className="task-checkbox"
                checked={task.completed}
                onChange={() => toggleTask(task.id)}
              />
              <span className="task-text">{task.text}</span>
              <button className="delete-button" onClick={() => deleteTask(task.id)}>
                削除
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default App
