import { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex min-h-screen flex-col justify-between bg-white dark:bg-gray-800">
      <Header />
      <main className="mx-auto max-w-screen-xl">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
