import AllPosts from "./pages/AllPosts"
import SinglePost from "./pages/SinglePost"
import Form from "./pages/Form"
import {useState, useEffect} from "react"
import {Route, Switch} from "react-router-dom"
function App() {
  /////////////////
  // Style Objects
  /////////////////
  const h1 = {
    textAlign: "center",
    margin: "10px"
  }
  /////////////////////
  // State & Other Variables
  /////////////////////
  const url = "https://todos-rails-api-ma.herokuapp.com/todos/"

  const [posts, setPosts] = useState([])
  /////////////////
  // Functions
  /////////////////
  const getTodos = async () => {
    const response = await fetch(url)
    const data = await response.json()
    setPosts(data)
  }
  /////////////////
  // useEffects
  /////////////////
  useEffect(() => {getTodos()}, [])
  return (
    <div className="App">
      <h1 style={h1}>My Todo List</h1>
      <Switch>
        <Route
          exact
          path="/"
          render={(rp) => <AllPosts {...rp} posts={posts} />}
        />
        <Route
          path="/post/:id"
          render={(rp) => <SinglePost {...rp} posts={posts} />}
        />
        <Route path="/new" render={(rp) => <Form {...rp} />} />
        <Route path="/edit" render={(rp) => <Form {...rp} />} />
      </Switch>
    </div>
  );
}


export default App;
