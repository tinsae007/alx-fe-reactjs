import React from 'react';
import UserProfile from './UserProfile';
function MainContent() {
  return (
   <main style={{ backgroundColor: '#f4f4f4', padding: '20px' }}>
     <UserProfile name="Alice" age={28} bio="Traveler and food lover" />
        <UserProfile name="Bob" age={34} bio="Loves mountains and hiking" />
      <p>I love to visit New York, Paris, and Tokyo.</p>
    </main>
  );
}

export default MainContent;
