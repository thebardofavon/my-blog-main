// import React, { useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { doc, getDoc } from 'firebase/firestore';
// import { db } from '../firebase'; 
// import Comments from '../components/Comments.jsx';

// const Post = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [post, setPost] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchPost = async () => {
//       try {
//         const docRef = doc(db, 'posts', id); 
//         const docSnap = await getDoc(docRef);

//         if (docSnap.exists()) {
//           setPost(docSnap.data());
//         } else {
//           console.error('Post not found');
//         }
//       } catch (error) {
//         console.error('Error fetching post:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPost();
//   }, [id]);

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <p className="text-2xl font-bold text-gray-700">Loading post...</p>
//       </div>
//     );
//   }

//   if (!post) {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <p className="text-2xl font-bold text-red-500">Post not found</p>
//       </div>
//     );
//   }

//   return (
//     <div className="w-full min-h-screen bg-white rounded-lg mt-10">
//       <div className="w-full h-64 mb-6">
//         <img
//           src={'https://i.pinimg.com/736x/97/f1/b7/97f1b7aadb7cb7df20993d5d1e588946.jpg'} 
//           alt={post.title}
//           className="w-full h-full object-cover rounded-lg"
//         />
//       </div>

//       <div className="max-w-5xl mx-auto">
//         <h1 className="text-4xl font-bold text-gray-800 mb-2">{post.title}</h1>
//         <p className="text-sm text-gray-500 mb-6">{post.date}</p>

//         <div className="text-lg text-gray-700 leading-relaxed">
//           {post.content.split('#').map((paragraph, index) => (
//             <p key={index} className="mb-4">{paragraph}</p>
//           ))}
//         </div>

//         <div className="mt-10">
//           <button
//             onClick={() => navigate(-1)}
//             className="px-4 py-2 bg-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-300 transition mb-2"
//           >
//             Go Back
//           </button>
//         </div>
//         <Comments postId={id} />
//       </div>
//     </div>
//   );
// };

// export default Post;

import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase'; 
import Comments from '../components/Comments.jsx';

const Post = () => {
  const { id } = useParams();
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
      <div className="flex flex-col items-center justify-center min-h-screen">
        <p className="text-2xl font-bold text-red-500 mb-8">Post not found</p>
        <Link 
          to="/blog" 
          className="bg-brown-600 text-white px-4 py-2 rounded-lg hover:bg-brown-700 transition-colors"
        >
          Back to Blog
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="w-full h-64 mb-6">
          <img
            src={post.image || 'https://i.pinimg.com/736x/97/f1/b7/97f1b7aadb7cb7df20993d5d1e588946.jpg'} 
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="px-8 pb-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-3">{post.title}</h1>
            <p className="text-sm text-gray-500">{post.date}</p>
          </div>

          <div className="prose prose-lg max-w-none text-gray-700">
            {post.content.split('#').map((paragraph, index) => (
              <p key={index} className="mb-4">{paragraph}</p>
            ))}
          </div>

          <div className="mt-12 flex gap-4">
            <Link
              to="/blog"
              className="px-4 py-2 bg-brown-600 text-white font-medium rounded-lg hover:bg-brown-700 transition"
            >
              <i className="fas fa-arrow-left mr-2"></i> Back to Blog
            </Link>
            
            <Link
              to="/"
              className="px-4 py-2 bg-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-300 transition"
            >
              <i className="fas fa-home mr-2"></i> Back to Portfolio
            </Link>
          </div>
          
          <Comments postId={id} />
        </div>
      </div>
    </div>
  );
};

export default Post;