import React from 'react';
import { Linkedin, Twitter, Mail, Copy, Check } from 'lucide-react';
import { useState } from 'react';

interface SocialShareProps {
  title?: string;
  description?: string;
  url?: string;
}

const SocialShareButtons: React.FC<SocialShareProps> = ({
  title = "Check out this amazing content from Daniel Schley - AI Operations Expert",
  description = "Transform your operations with intelligent AI solutions.",
  url = typeof window !== 'undefined' ? window.location.href : 'https://aiopsexpert.com',
}) => {
  const [copied, setCopied] = useState(false);

  const encodeURL = (str: string) => encodeURIComponent(str);

  const shareLinks = [
    {
      name: 'LinkedIn',
      icon: Linkedin,
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURL(url)}`,
      color: 'bg-blue-600 hover:bg-blue-700',
    },
    {
      name: 'Twitter',
      icon: Twitter,
      url: `https://twitter.com/intent/tweet?text=${encodeURL(title)}&url=${encodeURL(url)}`,
      color: 'bg-cyan-600 hover:bg-cyan-700',
    },
    {
      name: 'Email',
      icon: Mail,
      url: `mailto:?subject=${encodeURL(title)}&body=${encodeURL(description)}%0A%0A${encodeURL(url)}`,
      color: 'bg-red-600 hover:bg-red-700',
    },
  ];

  const handleCopyLink = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex gap-3 items-center flex-wrap">
      <span className="text-sm font-medium text-gray-300">Share:</span>
      {shareLinks.map((social) => {
        const Icon = social.icon;
        return (
          <a
            key={social.name}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Share on ${social.name}`}
            className={`p-2 rounded-lg text-white transition-all duration-300 hover:scale-110 ${social.color}`}
          >
            <Icon className="w-5 h-5" />
          </a>
        );
      })}
      <button
        onClick={handleCopyLink}
        className="p-2 rounded-lg text-white bg-gray-700 hover:bg-gray-600 transition-all duration-300 hover:scale-110"
        aria-label="Copy link"
      >
        {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
      </button>
    </div>
  );
};

export default SocialShareButtons;
