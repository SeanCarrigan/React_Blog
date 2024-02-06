import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import api from "./api/posts";

import DataContext from "./context/DataContext";

const NewPost = () => {
  const [postTitle, setPostTitle] = useState("");
  const [postBody, setPostBody] = useState("");
  const { posts, setPosts } = useContext(DataContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    // preventDefault prevents the browser from performing the default form submission behavior, which involves navigating to a new page or triggering a full-page reload.
    e.preventDefault();

    console.log("postTitle:", postTitle);
    console.log("postBody:", postBody);

    const id = posts.length
      ? `${parseInt(posts[posts.length - 1].id, 10) + 1}`
      : "1";
    const datetime = format(new Date(), "MMMM dd, yyyy pp");
    // create a new post object
    const newPost = {
      id: id,
      title: postTitle,
      datetime,
      body: postBody,
    };
    console.log("newPost:", newPost);
    try {
      const response = await api.post("/posts", newPost);
      // create new array with all prev posts and newly created post
      const allPosts = [...posts, newPost];
      // console.log("allPost:", allPosts);
      setPosts(allPosts);
      // after creating a new post, reset postTitle and postBody to "" and navigate back to home screen
      setPostTitle("");
      setPostBody("");
      navigate("/");
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  };

  return (
    <main className="NewPost">
      <h2>New Post</h2>
      <form className="newPostForm" onSubmit={handleSubmit}>
        <label htmlFor="postTitle">Title:</label>
        <input
          id="postTitle"
          type="text"
          required
          value={postTitle}
          onChange={(e) => setPostTitle(e.target.value)}
        />
        <label htmlFor="postBody">Post:</label>
        <textarea
          id="postBody"
          required
          value={postBody}
          onChange={(e) => setPostBody(e.target.value)}
        />
        {/* onClick is not needed on button. since type="submit" and it is inside a form with onSubmit handleSubmit will be called when button is clicked */}
        <button type="submit">Submit</button>
      </form>
    </main>
  );
};

export default NewPost;
