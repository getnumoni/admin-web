"use client";

import { ExternalLink, Facebook, Globe, Instagram, Linkedin, MessageCircle, Music, Twitter } from "lucide-react";

interface SocialMediaLinksProps {
  facebook?: string | null;
  instagram?: string | null;
  twitter?: string | null;
  linkedin?: string | null;
  snapchat?: string | null;
  website?: string | null;
  tiktok?: string | null;
}

export default function SocialMediaLinks({
  facebook,
  instagram,
  twitter,
  linkedin,
  snapchat,
  website,
  tiktok,
}: SocialMediaLinksProps) {
  const socialLinks = [
    {
      name: "Website",
      url: website,
      icon: Globe,
      color: "text-blue-600 hover:text-blue-700",
    },
    {
      name: "Facebook",
      url: facebook,
      icon: Facebook,
      color: "text-blue-600 hover:text-blue-700",
    },
    {
      name: "Instagram",
      url: instagram,
      icon: Instagram,
      color: "text-pink-600 hover:text-pink-700",
    },
    {
      name: "Twitter",
      url: twitter,
      icon: Twitter,
      color: "text-sky-500 hover:text-sky-600",
    },
    {
      name: "LinkedIn",
      url: linkedin,
      icon: Linkedin,
      color: "text-blue-700 hover:text-blue-800",
    },
    {
      name: "TikTok",
      url: tiktok,
      icon: Music,
      color: "text-black hover:text-gray-800",
    },
    {
      name: "Snapchat",
      url: snapchat,
      icon: MessageCircle,
      color: "text-yellow-500 hover:text-yellow-600",
    },
  ].filter((link) => link.url !== null && link.url !== undefined && link.url.trim() !== "");

  if (socialLinks.length === 0) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="mb-6 pb-4 border-b border-gray-200">
        <h3 className="text-lg font-bold text-gray-900">Social Media & Links</h3>
      </div>

      <div className="flex flex-wrap gap-4">
        {socialLinks.map((link) => {
          const IconComponent = link.icon;
          return (
            <a
              key={link.name}
              href={link.url!}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors ${link.color} hover:bg-gray-50`}
            >
              <IconComponent className="h-5 w-5" />
              <span className="text-sm font-medium">{link.name}</span>
              <ExternalLink className="h-3 w-3" />
            </a>
          );
        })}
      </div>
    </div>
  );
}

