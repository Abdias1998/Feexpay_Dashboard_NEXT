import { useSelector } from 'react-redux';
import { useState } from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import Chatbot from '../common/Chatbot';

export default function MainLayout({ children }) {
  const isSidebarCollapsed = useSelector((state) => state.layout.isSidebarCollapsed);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleMobileMenuClick = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Sidebar isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
      <Navbar 
        onMobileMenuClick={handleMobileMenuClick} 
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />
      <div 
        className={`transition-all duration-300 ${isSidebarCollapsed ? 'lg:ml-20' : 'lg:ml-64'}`}
      >
        <main className="py-6">
          <div className={`mx-auto w-full px-4 sm:px-6 lg:px-8 ${isSidebarCollapsed ? 'max-w-[100%]' : 'max-w-[100%]'}`}>
            {children}
          </div>
        </main>
      </div>
      <Chatbot />
    </div>
  );
} 