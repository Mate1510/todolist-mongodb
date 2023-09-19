"use client";

import axios from "axios";
import { useState, useEffect } from "react";

export default function Home() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState({
    title: "",
    description: "",
    status: "false",
  });
  const [editingTodo, setEditingTodo] = useState(null);

  useEffect(() => {
    axios.get("/api/todos").then((response) => {
      setTodos(response.data);
    });
  }, [todos]);

  const addTodo = () => {
    axios.post("/api/todos", newTodo).then((response) => {
      setTodos([...todos, response.data]);
      setNewTodo({ title: "", description: "", status: "false" });
    });
  };

  const startEditing = (todo) => {
    setEditingTodo(todo);
  };

  const stopEditing = () => {
    setEditingTodo(null);
  };

  const updateTodo = () => {
    axios.put(`/api/todos/${editingTodo._id}`, editingTodo).then(() => {
      setTodos(
        todos.map((todo) => (todo._id === editingTodo._id ? editingTodo : todo))
      );
      stopEditing();
    });
  };

  const deleteTodo = (id) => {
    axios.delete(`/api/todos/${id}`).then(() => {
      setTodos(todos.filter((todo) => todo._id !== id));
    });
  };

  return (
    <div className="container flex flex-col items-center mx-auto p-10 gap-10">
      <h1 className="text-4xl mb-4">Lista de Tarefas</h1>

      <div className="p-10 bg-gray-200 border-2 border-black rounded-lg mb-4 flex flex-col gap-5">
        <h3 className="font-medium text-lg">Crie sua Tarefa</h3>

        <div className="flex items-center gap-5">
          <input
            type="text"
            placeholder="Nome"
            className="px-2 py-1 rounded-lg"
            value={newTodo.title}
            onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })}
          />
          <input
            type="text"
            placeholder="Descrição"
            className="px-2 py-1 rounded-lg"
            value={newTodo.description}
            onChange={(e) =>
              setNewTodo({ ...newTodo, description: e.target.value })
            }
          />
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
            onClick={addTodo}
          >
            Adicionar
          </button>
        </div>
      </div>

      {editingTodo && (
        <div className="modal border rounded-lg p-5 flex flex-col gap-5">
          <h3 className="font-medium text-lg">Editar Tarefa</h3>

          <div className="flex gap-3">
            <input
              type="text"
              placeholder="Nome"
              className="border px-2 py-1 rounded-lg"
              value={editingTodo.title}
              onChange={(e) =>
                setEditingTodo({ ...editingTodo, title: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Descrição"
              className="border px-2 py-1 rounded-lg"
              value={editingTodo.description}
              onChange={(e) =>
                setEditingTodo({ ...editingTodo, description: e.target.value })
              }
            />

            <div className="flex gap-3">
              <button
                className="bg-purple-500 text-white px-4 py-2 rounded-lg"
                onClick={updateTodo}
              >
                Editar
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-lg"
                onClick={stopEditing}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      <ul className="flex flex-col gap-5 items-center w-3/5">
        {todos.map((todo) => (
          <li
            key={todo._id}
            className="flex flex-row gap-5 border rounded-lg p-5 w-full items-center justify-between"
          >
            <div className="flex flex-col gap-2">
              <h3>
                <strong>Nome:</strong> {todo.title}
              </h3>
              <h3>
                <strong>Descrição:</strong> {todo.description}
              </h3>
            </div>
            <div className="flex gap-3">
              <button
                className="bg-purple-500 text-white px-4 py-2 rounded-lg"
                onClick={() => startEditing(todo)}
              >
                Editar
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-lg"
                onClick={() => deleteTodo(todo._id)}
              >
                Excluir
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
