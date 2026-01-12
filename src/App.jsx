import React, { useState, useEffect } from "react";

export default function App() {
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem("todos");
    return saved ? JSON.parse(saved) : [];
  });

  const [input, setInput] = useState("");

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newTodo = {
      id: Date.now(),
      text: input.trim(),
      completed: false,
    };

    setTodos([...todos, newTodo]);
    setInput("");
  };

  const toggleComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Card */}
        <div className="bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-200">
          {/* Header */}
          <div className="bg-linear-to-r from-indigo-600 to-indigo-700 px-6 py-8 text-white">
            <h1 className="text-3xl font-bold tracking-tight">TO DO LIST</h1>
            <p className="mt-2 text-indigo-100 opacity-90">
              {todos.length} {todos.length === 1 ? "task" : "tasks"}
            </p>
          </div>

          {/* Input Form */}
          <form
            onSubmit={addTodo}
            className="p-6 border-b border-gray-200 bg-gray-50/40"
          >
            <div className="flex gap-3">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="What needs to be done?"
                className="flex-1 px-4 py-3 rounded-lg border border-gray-300 
                         focus:outline-none focus:ring-2 focus:ring-indigo-500 
                         focus:border-indigo-500 transition-all duration-200
                         placeholder:text-gray-400 text-gray-800 shadow-sm"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-indigo-600 text-white font-medium 
                         rounded-lg hover:bg-indigo-700 active:bg-indigo-800 
                         transition-colors duration-200 shadow-sm
                         focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Add
              </button>
            </div>
          </form>

          {/* Todo List */}
          <div className="divide-y divide-gray-100">
            {todos.length === 0 ? (
              <div className="py-16 text-center text-gray-500">
                <p className="text-lg">No tasks yet. Add your first task!</p>
              </div>
            ) : (
              todos.map((todo) => (
                <div
                  key={todo.id}
                  className="group flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition-colors duration-150"
                >
                  <div className="flex items-center gap-4 flex-1 min-w-0">
                    <button
                      onClick={() => toggleComplete(todo.id)}
                      className={`shrink-0 w-6 h-6 rounded-full border-2 transition-all duration-200 flex items-center justify-center
                        ${
                          todo.completed
                            ? "bg-green-500 border-green-500 text-white"
                            : "border-gray-300 hover:border-indigo-400"
                        }`}
                    >
                      {todo.completed && (
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={3}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      )}
                    </button>

                    <span
                      className={`flex-1 truncate text-gray-800 transition-all duration-200 ${
                        todo.completed
                          ? "line-through text-gray-400"
                          : "font-medium"
                      }`}
                    >
                      {todo.text}
                    </span>
                  </div>

                  <button
                    onClick={() => deleteTodo(todo.id)}
                    className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 
                             focus:opacity-100 focus:text-red-500 transition-all duration-200 p-1 rounded-full
                             hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-200"
                    aria-label="Delete task"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Footer hint */}
        <p className="mt-6 text-center text-sm text-gray-500">
          Tasks are saved in your browser • Refresh won't delete them
        </p>
      </div>
    </div>
  );
}