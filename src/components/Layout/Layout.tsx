import React from "react";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      {/* <Navbar /> */}
      <main> {children} </main>
    </>
  );
};

export default Layout;