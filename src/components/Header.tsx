import React, { useState } from 'react';
import { Menu, X, Cpu } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleNavClick = (sectionId: string) => {
    setIsMenuOpen(false);
    
    // If we're on a service detail page, go back to home first
    if (window.location.hash.startsWith('#service/')) {
      window.location.hash = '';
      setTimeout(() => {
        window.location.hash = sectionId;
      }, 100);
    } else {
      window.location.hash = sectionId;
    }
  };

  const handleBookCall = () => {
    setIsMenuOpen(false);
    // Scroll to contact section
    handleNavClick('#contact');
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-sm border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div 
            className="flex items-center space-x-3 cursor-pointer"
            onClick={() => handleNavClick('')}
          >
            <div className="p-1.5 sm:p-2 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-lg">
              <Cpu className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
            </div>
            <div>
              <span className="text-lg sm:text-xl font-bold text-white">Daniel Schley</span>
              <div className="text-xs sm:text-xs text-cyan-400 font-medium">AI Ops Expert</div>
            </div>
          </div>
          
          <nav className="hidden lg:flex space-x-6 xl:space-x-8">
            <button 
              onClick={() => handleNavClick('#about')}
              className="text-gray-300 hover:text-cyan-400 transition-colors text-sm xl:text-base"
            >
              About
            </button>
            <button 
              onClick={() => handleNavClick('#services')}
              className="text-gray-300 hover:text-cyan-400 transition-colors text-sm xl:text-base"
            >
              AI Solutions
            </button>
            <button 
              onClick={() => handleNavClick('#ai-portfolio')}
              className="text-gray-300 hover:text-cyan-400 transition-colors text-sm xl:text-base"
            >
              Portfolio
            </button>
            <button 
              onClick={() => handleNavClick('#blog')}
              className="text-gray-300 hover:text-cyan-400 transition-colors text-sm xl:text-base"
            >
              Blog
            </button>
            <button 
              onClick={() => handleNavClick('#results')}
              className="text-gray-300 hover:text-cyan-400 transition-colors text-sm xl:text-base"
            >
              Results
            </button>
            <button 
              onClick={() => handleNavClick('#contact')}
              className="text-gray-300 hover:text-cyan-400 transition-colors text-sm xl:text-base"
            >
              Contact
            </button>
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
              <button 
                onClick={() => handleNavClick('#about')}
                className="block w-full text-left px-3 py-2 text-gray-300 hover:text-cyan-400 transition-colors"
              >
                About
              </button>
              <button 
                onClick={() => handleNavClick('#services')}
                className="block w-full text-left px-3 py-2 text-gray-300 hover:text-cyan-400 transition-colors"
              >
                AI Solutions
              </button>
              <button 
                onClick={() => handleNavClick('#ai-portfolio')}
                className="block w-full text-left px-3 py-2 text-gray-300 hover:text-cyan-400 transition-colors"
              >
                Portfolio
              </button>
              <button 
                onClick={() => handleNavClick('#blog')}
                className="block w-full text-left px-3 py-2 text-gray-300 hover:text-cyan-400 transition-colors"
              >
                Blog
              </button>
              <button 
                onClick={() => handleNavClick('#results')}
                className="block w-full text-left px-3 py-2 text-gray-300 hover:text-cyan-400 transition-colors"
              >
                Results
              </button>
              <button 
                onClick={() => handleNavClick('#contact')}
                className="block w-full text-left px-3 py-2 text-gray-300 hover:text-cyan-400 transition-colors"
              >
                Contact
              </button>
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
    </header>
  );
};

export default Header;