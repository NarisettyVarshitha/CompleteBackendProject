import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

const Feed = () => {
  const [posts, setPosts] = useState([
    {
      _id: "1",
      image:
        "https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGFuZGF8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
      caption: "Beautiful view of the mountains",
    },
  ]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/posts")
      .then((res) => {
        setPosts(res.data.posts);
        console.log(res.data);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
      });
  }, []);

  return (
    <section className="feed-section">
      {posts.length > 0 ? (
        posts.map((post) => (
          <div key={post._id} className="post-card">
            <img src={post.image} alt="Post Image" className="post-image" />
            <p className="post-caption">{post.caption}</p>
          </div>
        ))
      ) : (
        <p>No posts available.</p>
      )}
    </section>
  );
};

export default Feed;
