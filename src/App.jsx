/* eslint-disable react/no-unescaped-entities */
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import ListItem from "./components/listItem";
import { v4 } from "uuid";

//Set axios base url
axios.defaults.baseURL = "http://localhost:3030";

function App() {
  const todoTitle = useRef("");
  const [todo, setTodo] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (e.target[0].value === "") {
      alert("Please Enter Value");
      return;
    }
    const newTodo = {
      id: v4(),
      title: e.target[0].value,
      isDone: false,
      date: new Date(),
    };
    axios.post("/todos", newTodo).then(() => {
      setTodo([...todo, newTodo]);
      todoTitle.current.value = "";
    });
  };

  /*
   axios request we will change defaults
   timeout:5000 set miliseconds value
  */
  useEffect(() => {
    axios.get("/todos", { timeout: 5000 }).then(
      (res) => {
        setTodo(res.data);
      },
      (err) => {
        console.log("axios error", err);
      }
    );
  }, []);
  return (
    <>
      <div className="container my-5">
        <h2 className="text-center">TODO's</h2>
        <form onSubmit={handleSubmit} className="d-flex gap-3 my-4">
          <input type="text" className="form-control" ref={todoTitle} />
          <button className="btn btn-primary">Save</button>
        </form>
        {!todo && <h3>Loading</h3>}

        <ul className="list-group list-group-flush my-5">
          {todo?.map((x) => (
            <ListItem key={x.id} todo={x} todos={todo} setTodos={setTodo} />
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;
