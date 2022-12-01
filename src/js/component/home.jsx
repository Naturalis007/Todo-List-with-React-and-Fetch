import React, { useState } from "react";

import { useEffect } from "react";


export default function App() {
  const [lista, agregar] = useState([]);

  function putApi() {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify(lista);

    var requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(
      "https://assets.breatheco.de/apis/fake/todos/user/tamarasalas",
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  }

  useEffect(() => {
    fetch("https://assets.breatheco.de/apis/fake/todos/user/tamarasalas")
      .then((response) => response.json())
      .then((data) => agregar(data));
  }, []);

  useEffect(()=>{
	putApi();
  }, [lista]);

  return (
    <div className="App">
      <h1>Todo List</h1>
      <form
        onSubmit={(evento) => {
          evento.preventDefault();
		  agregar([...lista, {label:evento.target[0].value, done:false}]);
	  }}
      >
        <input type="text" placeholder="agregar tarea" />
      </form>
      {lista.map((elm, index) => {
        return <li key={index}>{elm.label} </li>;
      })}
      <p>Te faltan {lista.length} tareas por terminar</p>
    </div>
  );
}
