import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase'; 
import Comments from '../components/Comments.jsx';

const Post = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const docRef = doc(db, 'posts', id); 
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setPost(docSnap.data());
        } else {
          console.error('Post not found');
        }
      } catch (error) {
        console.error('Error fetching post:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-2xl font-bold text-gray-700">Loading post...</p>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-2xl font-bold text-red-500">Post not found</p>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-white rounded-lg mt-10">
      <div className="w-full h-64 mb-6">
        <img
          src={'https://i.pinimg.com/736x/97/f1/b7/97f1b7aadb7cb7df20993d5d1e588946.jpg'} 
          alt={post.title}
          className="w-full h-full object-cover rounded-lg"
        />
      </div>

      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">{post.title}</h1>
        <p className="text-sm text-gray-500 mb-6">{post.date}</p>

        <div className="text-lg text-gray-700 leading-relaxed">
          {post.content.split('#').map((paragraph, index) => (
            <p key={index} className="mb-4">{paragraph}</p>
          ))}
        </div>

        <div className="mt-10">
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 bg-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-300 transition mb-2"
          >
            Go Back
          </button>
        </div>
        <Comments postId={id} />
      </div>
    </div>
  );
};

export default Post;
