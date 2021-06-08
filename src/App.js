import AllPosts from "./pages/AllPosts"
import SinglePost from "./pages/SinglePost"
import Form from "./pages/Form"
import {useState, useEffect} from "react"
import {Route, Switch, Link} from "react-router-dom"
function App(props) {
  /////////////////
  // Style Objects
  /////////////////
  const h1 = {
    textAlign: "center",
    margin: "10px"
  };

  const button = {
    backgroundColor: "navy",
    display: "block",
    margin: "auto"
  }
  /////////////////////
  // State & Other Variables
  /////////////////////
  const url = "https://todos-rails-api-ma.herokuapp.com/todos/"

  const [posts, setPosts] = useState([])

  // emply table
  const nullTodo = {
    subject: "",
    details: ""
  }
  // this is for updating so the app know what I want to update(target). then add a function to set this state gettargettodo
  const [targetTodo, setTargetTodo] = useState(nullTodo)
  /////////////////
  // Functions
  /////////////////
  const getTodos = async () => {
    const response = await fetch(url)
    const data = await response.json()
    setPosts(data)
  }

  const addTodos = async (newTodo) => {
    await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type":"application/json"
      },
      body: JSON.stringify(newTodo)
    })
    getTodos()
  }
  const getTargetTodo = (todo) => {
    setTargetTodo(todo)
    props.history.push("/edit")
  }
  const updateTodo = async (todo) => {
    await fetch(url + todo.id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(todo)
    })
    getTodos()
  }
  
  const deleteTodo = async (todo) => {
    await fetch(url + todo.id, {
      method: "delete"
    })
    getTodos()
    props.history.push("/")
  }
  /////////////////
  // useEffects
  /////////////////
  useEffect(() => {getTodos()}, [])
  return (
    <div className="App">
      <h1 style={h1}>My Todo List</h1>
      <Link to="/new"><button style={button}>Create New Todo</button></Link>
      <Switch>
        <Route
          exact
          path="/"
          render={(rp) => <AllPosts {...rp} posts={posts} />}
        />
          <Route
          path="/post/:id"
          render={(rp) => <SinglePost 
            {...rp} 
            posts={posts}
            edit={getTargetTodo} 
            deleteTodo={deleteTodo}
            />}
        />
       <Route path="/new" render={(rp) => <Form
         {...rp} 
         initialTodo={nullTodo}
         handleSubmit={addTodos}
         buttonLabel="create todo"
         />} />
         <Route path="/edit" render={(rp) => <Form 
        {...rp} 
        initialTodo={targetTodo}
        handleSubmit={updateTodo}
        buttonLabel="update todo"
        />} />
      </Switch>
    </div>
  );
}


export default App;
