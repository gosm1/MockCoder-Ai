import Agent from '@/components/Agent';
import Sidebar from '@/components/Sidebar';
import { getCurrentUser } from '@/lib/actions/auth.action';
import React from 'react';

const page = async () => {

  const user = await getCurrentUser();
  return (
    <main className="bg-[#0f0f0f] text-white min-h-screen overflow-x-hidden">
      <Sidebar />
      
      <Agent userName={user?.name!} userId={user?.id!} type="interview"  />
    
    </main>
  );
};

export default page;
