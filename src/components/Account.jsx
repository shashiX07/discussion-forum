import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';

const AccountContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background: #0f172a;
  padding: 2rem;
`;

const BackButton = styled.button`
  background: #ff6b6b;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  margin-bottom: 2rem;
  transition: all 0.3s ease;

  &:hover {
    background: #ff4757;
    transform: translateY(-2px);
  }
`;

const AccountHeader = styled.div`
  color: #f8fafc;
  text-align: center;
  margin-bottom: 2rem;
`;

const LargeAccountIcon = styled.div`
  width: 100px;
  height: 100px;
  margin: 0 auto 1rem;
  cursor: default;
  
  svg {
    width: 100%;
    height: 100%;
    fill: #ff6b6b;
  }
`;

const UserInfo = styled.div`
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
  color: #f8fafc;
`;

const UserPosts = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
`;

const UserPostCard = styled.div`
  background: #1e293b;
  border-radius: 12px;
  width: 1100px;
  padding: 1.5rem;
  border: 1px solid #334155;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }

  h3 {
    color: #f5f5f5; /* white-smoke */
  }

  p {
    color: #f5f5f5; /* white-smoke */
  }
`;

const PostDate = styled.div`
  font-size: 0.875rem;
  color: #94a3b8;
  margin-bottom: 0.5rem;
`;

function Account() {
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location || {};
  const { userIP = '', username = '', posts = [] } = state || {};

  // Handle direct access without state
  if (!state) {
    navigate('/');
    return null;
  }

  const userPosts = posts
    .filter(post => post.username === username)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  return (
    <AccountContainer>
      <BackButton onClick={() => navigate('/')}>← Back to Forum</BackButton>
      
      <AccountHeader>
        <LargeAccountIcon>
          <svg viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
          </svg>
        </LargeAccountIcon>
        <UserInfo>Username: {username}</UserInfo>
        <UserInfo>IP Address: {userIP}</UserInfo>
      </AccountHeader>

      <h2 style={{ color: 'white' }}>Your Posts ({userPosts.length})</h2>
      <UserPosts>
        {userPosts.map(post => (
          <UserPostCard key={post.id}>
            <PostDate>
              Posted on {new Date(post.createdAt).toLocaleDateString()} at{' '}
              {new Date(post.createdAt).toLocaleTimeString()}
            </PostDate>
            <h3>{post.title}</h3>
            <p>{post.description}</p>
            <div style={{ marginTop: '1rem', color: '#94a3b8' }}>
              ♥ {post.likes} Likes • {post.comments.length} Comments
            </div>
          </UserPostCard>
        ))}
        
        {userPosts.length === 0 && (
          <div style={{ textAlign: 'center', color: '#94a3b8' }}>
            No posts created yet.
          </div>
        )}
      </UserPosts>
    </AccountContainer>
  );
}

export default Account;