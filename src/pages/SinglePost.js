import React from "react";
import {Link} from "react-router-dom"
const SinglePost = ({posts, match, edit,deleteTodo}) => {
    // Getting the id and displaying the right post
    const id = parseInt(match.params.id)
    const post = posts.find((post) => post.id === id)
    /////////////////////////
    // Style Object
    //////////////////////////
    const div = {
        textAlign: "center",
        border: "3px solid green",
        width: "80%",
        margin: "30px auto"
    }
  return post ?  <div style={div}>
      {/* when refresh the page */}
      <h1>{post.subject}</h1>
      <h2>{post.details}</h2>
      <button onClick={() => edit(post)}>Edit</button>
      <button onClick={() => deleteTodo(post)}>Delete</button>
      <Link to="/">
          <button>Go Back</button>
      </Link>
  </div> : null  
//   :null after refreshing return the same page
};
export default SinglePost;