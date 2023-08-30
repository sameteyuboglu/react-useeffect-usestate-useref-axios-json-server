/* eslint-disable react/prop-types */
import axios from "axios";
import { useRef, useState } from "react";

const ListItem = ({ todo, todos, setTodos }) => {
  const editInput = useRef();
  const [isEditing, setIsEditing] = useState(false);
  const handleDelete = () => {
    axios.delete(`/todos/${todo.id}`).then(() => {
      const c = confirm("Are you sure? ");
      if (c) {
        const filtered = todos.filter((f) => f.id != todo.id);
        setTodos(filtered);
      }
    });
  };
  const handleEdit = () => {
    const updated = { ...todo, title: editInput.current.value };
    axios.put(`/todos/${todo.id}`, updated).then(() => {
      const filtered = todos.map((item) =>
        item.id === updated.id ? updated : item
      );
      setTodos(filtered);
      setIsEditing(false);
    });
  };
  const handleChange = () => {
    const updated = { ...todo, isDone: !todo.isDone };
    axios.put(`/todos/${todo.id}`, updated).then(() => {
      const filtered = todos.map((item) =>
        item.id === updated.id ? updated : item
      );
      setTodos(filtered);
    });
  };

  return (
    <>
      <li
        key={todo.id}
        className="d-flex list-group-item d-flex justify-content-between align-content-between"
      >
        <div>
          <input
            type="checkbox"
            checked={todo.isDone}
            className="form-check-input mx-1"
            onChange={handleChange}
          />
          <span>{todo.isDone ? "Done" : "Continues"}</span>
        </div>

        <span className="text-left">
          {isEditing ? (
            <div className="d-flex gap-2">
              <input
                type="text"
                className="form-control shadow"
                defaultValue={todo.title}
                ref={editInput}
              />
            </div>
          ) : (
            <span>{todo.title}</span>
          )}
        </span>
        <div className="btn-group">
          {isEditing ? (
            <>
              <button className="btn btn-success shadow" onClick={handleEdit}>
                Save
              </button>
              <button
                className="btn btn-info"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>
            </>
          ) : (
            <>
              <button
                className="btn btn-info"
                onClick={() => setIsEditing(true)}
              >
                Edit
              </button>
              <button className="btn btn-danger" onClick={handleDelete}>
                Delete
              </button>
            </>
          )}
        </div>
      </li>
    </>
  );
};
export default ListItem;
