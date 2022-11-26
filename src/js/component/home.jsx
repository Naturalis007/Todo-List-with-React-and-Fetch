// import React, {useState} from "react";

// //create your first component
// const Home = () => {
// 	const [cosas, nueva] = useState (["Estar en la playa cuando hace frio", "Ver series de Netflix", "Tomar café de grano"]);
// 	const [input, setInput] = useState("");
// 	return (
// 		<div className="text-center">

// 			<h1>Cosas que me hacen feliz:</h1>
// 			<input placeholder="Escribe aquí" value={input} onChange={(event)=>{setInput(event.target.value) } } />
// 			<button onClick={()=>{
// 				nueva([...cosas, input])
// 				setInput("")
// 				}} >Agregar</button>

// 			{cosas.map((value,index,arr)=>{
// 				return <li key={index}>{value} <button>X</button> </li>
// 			})}

// 		</div>
// 	);
// };

// export default Home;

import React, { useState } from "react";

import { useEffect } from "react";

/*
export default function App() {
  const [lista, setLista] = useState([]);

//   function getGoT(){
//     fetch("https://thronesapi.com/api/v2/Characters")
//     	.then(response=>response.json())
//     	.then(data=>console.log(data));
//   }

  useEffect(()=>{
    fetch("https://pokeapi.co/api/v2/pokemon")
    	.then(response=>response.json())
    	.then(data=>setLista(data.results));

  },[])

  return (
    <div className='App'>
      <h1>Hello</h1>
      {lista.map((value,index)=>{
	  	return <li>{value.name}</li>
	  })}
    </div>
  )
}


// function App() {
//   return (
//     <div className="App">
//       <h1>HOLA MUNDO!</h1>
//     </div>
//   );
// }


// export default App; 
*/

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
      "https://assets.breatheco.de/apis/fake/todos/user/naturalis",
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  }

  useEffect(() => {
    fetch("https://assets.breatheco.de/apis/fake/todos/user/naturalis")
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
      <p>Te falta {lista.length} tareas por terminar</p>
    </div>
  );
}
