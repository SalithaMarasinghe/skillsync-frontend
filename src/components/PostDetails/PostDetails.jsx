import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

const PostDetails = () => {
  const { postId } = useParams(); // 🚨 Get post ID from route
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    // Simulate fetching post and comments from backend
    // Replace this with actual API calls
    fetchPostDetails(postId);
  }, [postId]);

  const fetchPostDetails = async (id) => {
    // Simulated example
    const fetchedPost = {
      id,
      author: "Code With Zosh",
      content: "twitter clone- full stack project with spring boot and react",
      image:
        "https://i.ytimg.com/vi/95yaGDZkGis/sddefault.jpg",
    };

    const fetchedComments = [
      { id: 1, author: "UserA", text: "This is amazing!" },
      { id: 2, author: "UserB", text: "Can't wait to try this." },
    ];

    setPost(fetchedPost);
    setComments(fetchedComments);
  };

  return (
    <section className="p-5">
      <div className={`z-50 flex items-center sticky top-0 bg-opacity-95`}>
        <KeyboardBackspaceIcon className="cursor-pointer" />
        <h1 className="py-5 text-xl font-bold opacity-90 ml-5">
          {post?.author}
        </h1>
      </div>

      {post && (
        <div className="my-4">
          <p className="mb-2">{post.content}</p>
          <img
            src={post.image}
            alt=""
            className="w-[28rem] border border-gray-400 p-5 rounded-md"
          />
        </div>
      )}

      <hr className="my-4" />

      <div>
        <h2 className="font-semibold text-lg mb-3">Comments</h2>
        {comments.map((comment) => (
          <div
            key={comment.id}
            className="border-b border-gray-200 py-2"
          >
            <p className="font-medium">{comment.author}</p>
            <p>{comment.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PostDetails;
