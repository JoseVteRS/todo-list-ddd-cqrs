import React from 'react';

const MainLayout = ({ children }) => {
  return (
    <section className="dark:bg-gray-800 min-h-screen">
      <div className="container mx-auto">
        {children}
      </div>
    </section>
  );
};

export default MainLayout;
