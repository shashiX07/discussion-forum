import React, { useState, useEffect } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Segoe UI', sans-serif;
  }

  body {
    height: auto;
    background: #0f172a;
    color: #f8fafc;
  }
`;

const ForumContainer = styled.div`
  max-width: 1200px;
  margin: 2rem auto;
  padding: 0 1rem;
`;

const LogoTitleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const AccountIcon = styled.div`
  position: absolute;
  left: 1rem;
  cursor: pointer;
  svg {
    width: 32px;
    height: 32px;
    fill: #ff6b6b;
    transition: all 0.3s ease;
    
    &:hover {
      fill: #ff4757;
      transform: scale(1.1);
    }
  }
`;

const Header = styled.header`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 2rem;
  padding: 1rem 0;
  border-bottom: 2px solid #1e293b;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  background: linear-gradient(45deg, #ff6b6b, #ff4757);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const CreatePostButton = styled.button`
  background: #ff6b6b;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  position: absolute;
  right: 1rem;
  
  &:hover {
    background: #ff4757;
    transform: translateY(-2px);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
`;

const PostCard = styled.div`
  background: #1e293b;
  border-radius: 12px;
  margin-bottom: 1.5rem;
  padding: 1.5rem;
  transition: all 0.3s ease;
  border: 1px solid #334155;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }
`;

const PostHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  cursor: pointer;
`;

const PostTitle = styled.h3`
  font-size: 1.25rem;
  color: #f8fafc;
`;

const PostMeta = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

const LikeButton = styled.button`
  background: none;
  border: none;
  color: ${props => props.liked ? '#ff6b6b' : '#94a3b8'};
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 6px;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    color: #ff6b6b;
  }
`;

const DeleteButton = styled.button`
  background: none;
  border: none;
  color: #ff6b6b;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 6px;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    color: #ff4757;
  }
`;

const CommentSection = styled.div`
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid #334155;
`;

const CommentCard = styled.div`
  background: #0f172a;
  padding: 1rem;
  border-radius: 8px;
  margin: 0.5rem 0;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1rem;
`;

const Input = styled.input`
  padding: 0.75rem;
  border: 1px solid #334155;
  background: #1e293b;
  color: white;
  border-radius: 8px;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: #ff6b6b;
  }
`;

const TextArea = styled.textarea`
  padding: 0.75rem;
  border: 1px solid #334155;
  background: #1e293b;
  color: white;
  border-radius: 8px;
  font-size: 1rem;
  min-height: 50px;
  resize: vertical;

  &:focus {
    outline: none;
    border-color: #ff6b6b;
  }
`;

const SubmitButton = styled.button`
  background: #ff6b6b;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  align-self: flex-start;
  transition: all 0.3s ease;

  &:hover {
    background: #ff4757;
    transform: translateY(-2px);
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: #1e293b;
  padding: 2rem;
  border-radius: 12px;
  width: 90%;
  max-width: 600px;
`;

const Username = styled.div`
  font-size: 0.875rem;
  color: #94a3b8;
  margin-bottom: 0.25rem;
`;

function ForumPage() {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newPost, setNewPost] = useState({ title: '', description: '' });
  const [newComment, setNewComment] = useState('');
  const [userIP, setUserIP] = useState('');
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('https://api.ipify.org?format=json')
      .then(response => {
        const ip = response.data.ip;
        setUserIP(ip);
        const octets = ip.split('.');
        const generatedUsername = `User_${octets.slice(-2).join('_')}`;
        setUsername(generatedUsername);
      })
      .catch(() => {
        const fallbackUsername = `User_${Math.floor(Math.random() * 1000)}`;
        setUsername(fallbackUsername);
      });

    axios.get('https://forumapi-fm8x.onrender.com/posts?_sort=createdAt&_order=desc')
      .then(response => {
        setPosts(response.data);
      })
      .catch(error => {
        console.error('Error fetching posts:', error);
      });
  }, []);

  const handleCreatePost = (e) => {
    e.preventDefault();
    if (!newPost.title || !newPost.description) return;

    const post = {
      id: uuidv4(),
      ...newPost,
      comments: [],
      likes: 0,
      likedBy: [],
      username,
      createdAt: new Date().toISOString(),
    };

    axios.post('https://forumapi-fm8x.onrender.com/posts', post)
      .then(response => {
        setPosts([response.data, ...posts]);
        setShowCreateModal(false);
        setNewPost({ title: '', description: '' });
      })
      .catch(error => {
        console.error('Error creating post:', error);
      });
  };

  const handleAddComment = (postId, e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const comment = {
      id: uuidv4(),
      text: newComment,
      username,
      createdAt: new Date().toISOString(),
    };

    const postToUpdate = posts.find(post => post.id === postId);
    const updatedComments = [comment, ...postToUpdate.comments];

    axios.patch(`https://forumapi-fm8x.onrender.com/posts/${postId}`, { comments: updatedComments })
      .then(response => {
        const updatedPosts = posts.map(post =>
          post.id === postId ? { ...post, comments: response.data.comments } : post
        );
        setPosts(updatedPosts);
        setNewComment('');
      })
      .catch(error => {
        console.error('Error adding comment:', error);
      });
  };

  const handleLikePost = (postId) => {
    const postToUpdate = posts.find(post => post.id === postId);
    const isLiked = postToUpdate.likedBy.includes(userIP);

    const updatedLikes = isLiked ? postToUpdate.likes - 1 : postToUpdate.likes + 1;
    const updatedLikedBy = isLiked
      ? postToUpdate.likedBy.filter(ip => ip !== userIP)
      : [...postToUpdate.likedBy, userIP];

    axios.patch(`https://forumapi-fm8x.onrender.com/posts/${postId}`, { 
      likes: updatedLikes,
      likedBy: updatedLikedBy 
    })
      .then(response => {
        const updatedPosts = posts.map(post =>
          post.id === postId ? { ...post, likes: response.data.likes, likedBy: response.data.likedBy } : post
        );
        setPosts(updatedPosts);
      })
      .catch(error => {
        console.error('Error liking/unliking post:', error);
      });
  };

  const handleDeletePost = (postId) => {
    axios.delete(`https://forumapi-fm8x.onrender.com/posts/${postId}`)
      .then(() => {
        const updatedPosts = posts.filter(post => post.id !== postId);
        setPosts(updatedPosts);
      })
      .catch(error => {
        console.error('Error deleting post:', error);
      });
  };

  return (
    <>
      <GlobalStyle />
      <ForumContainer>
        <Header>
          <AccountIcon onClick={() => {
            if (!userIP || !username) {
              alert('Please wait while we load your account information');
              return;
            }
            navigate('/account', { state: { userIP, username, posts } });
          }}>
            <svg viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
            </svg>
          </AccountIcon>

          <LogoTitleContainer>
            <Title>Topics</Title>
          </LogoTitleContainer>
          <CreatePostButton onClick={() => setShowCreateModal(true)}>
            + Create New Post
          </CreatePostButton>
        </Header>

        {Array.isArray(posts) && posts
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) // Sort posts by createdAt
          .map(post => {
          const isLiked = post.likedBy.includes(userIP);
          const isOwner = post.username === username;
          return (
            <PostCard key={post.id}>
              <PostHeader onClick={() => setSelectedPost(selectedPost === post.id ? null : post.id)}>
                <div>
                  <Username>Posted by {post.username}</Username>
                  <PostTitle>{post.title}</PostTitle>
                </div>
                <PostMeta>
                  {isOwner && (
                    <LikeButton 
                      liked={isLiked}
                      onClick={(e) => { e.stopPropagation(); handleLikePost(post.id); }}
                    >
                      ♥ {post.likes}
                    </LikeButton>
                  )}
                  {isOwner && (
                    <DeleteButton 
                      onClick={(e) => { e.stopPropagation(); handleDeletePost(post.id); }}
                    >
                      🗑️
                    </DeleteButton>
                  )}
                </PostMeta>
              </PostHeader>

              {selectedPost === post.id && (
                <>
                  <p>{post.description}</p>

                  <CommentSection>
                    <Form onSubmit={(e) => handleAddComment(post.id, e)}>
                      <TextArea
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Write a comment..."
                      />
                      <SubmitButton type="submit">Post Comment</SubmitButton>
                    </Form>

                    {post.comments.map(comment => (
                      <CommentCard key={comment.id}>
                        <Username>{comment.username}</Username>
                        <p>{comment.text}</p>
                      </CommentCard>
                    ))}
                  </CommentSection>
                </>
              )}
            </PostCard>
          )
        })}
      </ForumContainer>

      {showCreateModal && (
        <ModalOverlay onClick={() => setShowCreateModal(false)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <h2>Create New Post</h2>
            <Form onSubmit={handleCreatePost}>
              <Input
                value={newPost.title}
                onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                placeholder="Post Title"
              />
              <TextArea
                value={newPost.description}
                onChange={(e) => setNewPost({ ...newPost, description: e.target.value })}
                placeholder="Post Description"
              />
              <SubmitButton type="submit">Create Post</SubmitButton>
            </Form>
          </ModalContent>
        </ModalOverlay>
      )}
    </>
  );
}

export default ForumPage;