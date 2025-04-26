import Agent from '@/components/Agent';
import Sidebar from '@/components/Sidebar';
import React from 'react';

const page = () => {
  return (
    <main className="bg-[#0f0f0f] text-white min-h-screen overflow-x-hidden">
      <Sidebar />
      
      <Agent userName="you" userId="user1" type="generate" />
    
    </main>
  );
};

export default page;
