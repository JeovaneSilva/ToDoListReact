import React, { useState } from 'react';
import { FaTrash, FaRegEdit } from "react-icons/fa";

const Todo = ({ todo, removeTodo, completeTodo,editTodo }) => {

  const [editing, setEditing] = useState(false);
  const [editedText, setEditedText] = useState(todo.text);
  const [editedCategory, setEditedCategory] = useState(todo.category);

  const handleEdit = () => {
    setEditing(true);
  };

  const handleSave = () => {
    editTodo(todo.id, editedText, editedCategory);
    setEditing(false);
  };

  const handleCancel = () => {
    // Reverter para os valores originais do todo
    setEditedText(todo.text);
    setEditedCategory(todo.category);
    setEditing(false);
  };

  return (
    <div className="todo" style={{textDecoration: todo.isCompleted ? "line-through" : ""}}>
        {editing ? (
          <div>
            <input
              type="text"
              value={editedText}
              onChange={(e) => setEditedText(e.target.value)}
            />
             <select value={editedCategory}  onChange={(e) => setEditedCategory(e.target.value)}>
                <option value="">Selecione uma categoria</option>
                <option value="Pessoal">Pessoal</option>
                <option value="Estudos">Estudos</option>
            </select>
            <button className='confirmarEdit' onClick={handleSave}>Confirmar</button>
            <button className='cancelarEdit' onClick={handleCancel}>Cancelar</button>
          </div>
        ) : (
          <div className="content">
            <p>{todo.text}</p>
            <p className="category">({todo.category})</p>
          </div>
        )}

        <div>
          {!editing && (
            <>
              <button className='complete' onClick={() => completeTodo(todo.id) }>Completar</button>
              <button className='editar' onClick={handleEdit}><FaRegEdit className='iconEdit' /></button>
              <button className='remove' onClick={() => removeTodo(todo.id)}><FaTrash className="iconLixo" /></button>
            </>
          )}
        </div>
    </div>
  )
}

export default Todo