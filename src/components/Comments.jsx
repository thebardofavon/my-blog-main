import React, { useState, useEffect } from 'react';
import { collection, addDoc, query, where, getDocs, orderBy, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';

const Comments = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Fetch comments for this post
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const commentsQuery = query(
          collection(db, "comments"),
          where("postId", "==", postId),
          orderBy("createdAt", "desc")
        );
        
        const commentsSnapshot = await getDocs(commentsQuery);
        const commentsList = commentsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        
        setComments(commentsList);
      } catch (error) {
        console.error("Error fetching comments: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, [postId]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!newComment.trim() || !name.trim()) {
      return;
    }
    
    setSubmitting(true);
    
    try {
      // Add new comment to Firestore
      const commentData = {
        postId,
        name: name.trim(),
        content: newComment.trim(),
        createdAt: serverTimestamp()
      };
      
      await addDoc(collection(db, "comments"), commentData);
      
      // Add the new comment to the local state (optimistic update)
      setComments([
        {
          id: Date.now().toString(), // Temporary ID
          ...commentData,
          createdAt: new Date() // Local timestamp for optimistic update
        },
        ...comments
      ]);
      
      // Clear the form
      setName('');
      setNewComment('');
      
      // Keep the name for future comments
    } catch (error) {
      console.error("Error adding comment: ", error);
      alert("Failed to post comment. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  // Format date for display
  const formatDate = (date) => {
    if (!date) return '';
    
    // For Firestore timestamps
    if (typeof date.toDate === 'function') {
      date = date.toDate();
    }
    
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <div className="mt-10 bg-brown-50 rounded-lg p-6 shadow-md">
      <h2 className="text-2xl font-bold text-brown-700 mb-6">Comments</h2>
      
      {/* Comment Form */}
      <form onSubmit={handleSubmit} className="mb-8">
        <div className="mb-4">
          <label htmlFor="name" className="block text-brown-600 mb-2">Name</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            className="w-full px-4 py-2 rounded-lg border border-brown-300 focus:outline-none focus:ring-2 focus:ring-brown-500"
            required
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="comment" className="block text-brown-600 mb-2">Comment</label>
          <textarea
            id="comment"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Share your thoughts..."
            rows="4"
            className="w-full px-4 py-2 rounded-lg border border-brown-300 focus:outline-none focus:ring-2 focus:ring-brown-500"
            required
          />
        </div>
        
        <button
          type="submit"
          disabled={submitting}
          className="px-6 py-2 bg-brown-600 text-white rounded-lg hover:bg-brown-700 transition-colors focus:outline-none focus:ring-2 focus:ring-brown-500 focus:ring-offset-2 disabled:opacity-50 hover-brown"
        >
          {submitting ? 'Posting...' : 'Post Comment'}
        </button>
      </form>
      
      {/* Comments List */}
      <div className="space-y-6">
        {loading ? (
          <p className="text-center text-brown-500">Loading comments...</p>
        ) : comments.length === 0 ? (
          <p className="text-center text-brown-500">No comments yet. Be the first to share your thoughts!</p>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className="bg-white p-4 rounded-lg shadow border border-brown-200">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-brown-700">{comment.name}</h3>
                <span className="text-xs text-brown-400">{formatDate(comment.createdAt)}</span>
              </div>
              <p className="text-gray-700">{comment.content}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Comments;