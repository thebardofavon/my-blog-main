import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import "../App.css";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const postsCollection = collection(db, "posts");
        const postsSnapshot = await getDocs(postsCollection);
        const postsList = postsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPosts(postsList);
      } catch (error) {
        console.error("Error fetching posts: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-2xl font-bold text-gray-500">Loading...</p>
      </div>
    );
  }

  return (
    <div className="home px-4 sm:px-6 py-10">
      <div className="bg-[#e0d2c3] w-full sm:w-[90%] md:w-[60%] mx-auto flex justify-center items-center rounded-lg shadow-lg mb-10 p-4">
        <h1 className="text-center text-3xl font-bold text-black drop-shadow-lg hover:drop-shadow-2xl transition-shadow duration-400">
          {"computer science chronicles"}
        </h1>
      </div>

      <div className="flex justify-center">
        <div className="grid gap-14 sm:grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto sm:px-4">
          {posts.map((post) => (
            <div
              key={post.id}
              className="post-preview bg-white border border-brown-300 rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transform transition-transform duration-300 overflow-hidden"
              style={{ maxWidth: "400px" }}
            >
              <Link to={`/post/${post.id}`}>
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full object-cover"
                  style={{ height: "275px" }}
                />
                <div className="p-5">
                  <h2 className="text-xl font-bold text-brown-700 mb-2">
                      {post.title}
                  </h2>
                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                    {post.content.replaceAll('#','').substring(0, 120)}...
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500">{post.date}</span>
                    <span className="text-white bg-brown-500 hover:bg-brown-700 px-3 py-1 rounded transition-all">
                      Read More
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
