import React, { useState } from 'react';
import { Menu, X, Cpu } from 'lucide-react'; // Removed useLocation
import SchedulingModal from './SchedulingModal';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showScheduling, setShowScheduling] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    setIsMenuOpen(false);
    
    // Smooth scroll to section
    const element = document.getElementById(sectionId);
    if (element) {
      const headerHeight = 64; // Height of fixed header
      const elementPosition = element.offsetTop - headerHeight;
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
  };

  const handleBookCall = () => {
    setIsMenuOpen(false);
    setShowScheduling(true);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-sm border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div 
            className="flex items-center space-x-3 cursor-pointer"
          >
            <a href="#top" onClick={(e) => handleNavClick(e, 'top')} className="flex items-center space-x-3">
              <div className="p-1.5 sm:p-2 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-lg">
                <Cpu className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
              </div>
              <div>
                <span className="text-lg sm:text-xl font-bold text-white">Daniel Schley</span>
                <div className="text-xs sm:text-xs text-cyan-400 font-medium">AI Ops Expert</div>
              </div>
            </a>
          </div>
          
          <nav className="hidden lg:flex space-x-6 xl:space-x-8">
            <a
              href="#about"
              onClick={(e) => handleNavClick(e, 'about')}
              className={`transition-colors text-sm xl:text-base text-gray-300 hover:text-cyan-400`}
            >
              About
            </a>
            <a
              href="#services"
              onClick={(e) => handleNavClick(e, 'services')}
              className={`transition-colors text-sm xl:text-base text-gray-300 hover:text-cyan-400`}
            >
              AI Solutions
            </a>
            <a
              href="#ai-portfolio"
              onClick={(e) => handleNavClick(e, 'ai-portfolio')}
              className={`transition-colors text-sm xl:text-base text-gray-300 hover:text-cyan-400`}
            >
              Portfolio
            </a>
            <a
              href="#blog"
              onClick={(e) => handleNavClick(e, 'blog')}
              className={`transition-colors text-sm xl:text-base text-gray-300 hover:text-cyan-400`}
            >
              Blog
            </a>
            <a
              href="#results"
              onClick={(e) => handleNavClick(e, 'results')}
              className={`transition-colors text-sm xl:text-base text-gray-300 hover:text-cyan-400`}
            >
              Results
            </a>
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, 'contact')}
              className={`transition-colors text-sm xl:text-base text-gray-300 hover:text-cyan-400`}
            >
              Contact
            </a>
          </nav>

          <div className="hidden lg:flex">
            <button 
              onClick={handleBookCall}
              className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-4 xl:px-6 py-2 rounded-lg font-semibold hover:from-cyan-600 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 text-sm xl:text-base"
            >
              <span className="hidden xl:inline">Book AI Consultation</span>
              <span className="xl:hidden">Book Call</span>
            </button>
          </div>

          <div className="lg:hidden">
            <button onClick={toggleMenu} className="text-gray-300 hover:text-white">
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="lg:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-slate-800 rounded-lg mt-2 mx-2">
              <a
                href="#about"
                onClick={(e) => handleNavClick(e, 'about')}
                className="block w-full text-left px-3 py-2 text-gray-300 hover:text-cyan-400 transition-colors"
              >
                About
              </a>
              <a
                href="#services"
                onClick={(e) => handleNavClick(e, 'services')}
                className="block w-full text-left px-3 py-2 text-gray-300 hover:text-cyan-400 transition-colors"
              >
                AI Solutions
              </a>
              <a
                href="#ai-portfolio"
                onClick={(e) => handleNavClick(e, 'ai-portfolio')}
                className="block w-full text-left px-3 py-2 text-gray-300 hover:text-cyan-400 transition-colors"
              >
                Portfolio
              </a>
              <a
                href="#blog"
                onClick={(e) => handleNavClick(e, 'blog')}
                className="block w-full text-left px-3 py-2 text-gray-300 hover:text-cyan-400 transition-colors"
              >
                Blog
              </a>
              <a
                href="#results"
                onClick={(e) => handleNavClick(e, 'results')}
                className="block w-full text-left px-3 py-2 text-gray-300 hover:text-cyan-400 transition-colors"
              >
                Results
              </a>
              <a
                href="#contact"
                onClick={(e) => handleNavClick(e, 'contact')}
                className="block w-full text-left px-3 py-2 text-gray-300 hover:text-cyan-400 transition-colors"
              >
                Contact
              </a>
              <button 
                onClick={handleBookCall}
                className="w-full mt-4 bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-4 py-2 rounded-lg font-semibold hover:from-cyan-600 hover:to-purple-700 transition-all duration-200"
              >
                Book AI Consultation
              </button>
            </div>
          </div>
        )}
      </div>
      
      <SchedulingModal 
        isOpen={showScheduling} 
        onClose={() => setShowScheduling(false)} 
      />
    </header>
  );
};

export default Header;