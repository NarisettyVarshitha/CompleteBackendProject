import React from "react";
import axios from "axios";

import { useNavigate } from "react-router-dom";





const CreatePost = () => {
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();//to prevent the default form submission behavior shouldnt reload the page

        const formData = new FormData(e.target);//e.target is the form element
        //formData is an object that can be used to construct key/value pairs representing form fields and their values, which can be sent using XMLHttpRequest or the Fetch API.
        axios.post("http://localhost:3000/create-post", formData)
        .then((res) => {
            navigate("/feed");
            alert("Post created successfully");
        })

    }




  return (
    <section className="create-post-section">
      <h1>Create Post</h1>
      <form onSubmit={handleSubmit}>
        <input type="file" name="image" accept="image/*" />
        <input
          type="text"
          name="caption"
          placeholder="Enter caption"
          required
        />
        <button type="submit">Create Post</button>
      </form>
    </section>
  );
};

export default CreatePost;
