import React from 'react';
import { Linkedin, Twitter, Mail, ExternalLink } from 'lucide-react';

const SocialFooter = () => {
  const socialLinks = [
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/danielschley/',
      icon: Linkedin,
      color: 'hover:text-blue-400',
    },
    {
      name: 'Twitter/X',
      url: 'https://x.com/AIOpsExpert',
      icon: Twitter,
      color: 'hover:text-cyan-400',
    },
    {
      name: 'Email',
      url: 'mailto:contact@aiopsexpert.com',
      icon: Mail,
      color: 'hover:text-red-400',
    },
  ];

  return (
    <footer className="bg-slate-950 border-t border-slate-800 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-8">
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#about" className="hover:text-cyan-400 transition-colors">About</a></li>
              <li><a href="#services" className="hover:text-cyan-400 transition-colors">Services</a></li>
              <li><a href="#blog" className="hover:text-cyan-400 transition-colors">Blog</a></li>
              <li><a href="#contact" className="hover:text-cyan-400 transition-colors">Contact</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold text-lg mb-4">Resources</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#ai-portfolio" className="hover:text-cyan-400 transition-colors">Portfolio</a></li>
              <li><a href="#tech-stack" className="hover:text-cyan-400 transition-colors">Tech Stack</a></li>
              <li><a href="/services" className="hover:text-cyan-400 transition-colors">Services</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold text-lg mb-4">Connect With Me</h3>
            <div className="flex gap-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                    className={`text-gray-400 transition-all duration-300 hover:scale-125 ${social.color}`}
                  >
                    <Icon className="w-6 h-6" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            © 2026 Daniel Schley - AI Operations Expert. All rights reserved.
          </p>
          <div className="flex gap-4 text-sm text-gray-500">
            <a href="/privacy-policy" className="hover:text-cyan-400 transition-colors">Privacy Policy</a>
            <a href="/terms-of-service" className="hover:text-cyan-400 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default SocialFooter;
