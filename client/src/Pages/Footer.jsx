import { Twitter, Linkedin, Github, Mail, MapPin, Clock, Send } from "lucide-react";
import { useState } from "react";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const socialMedia = [
    {
      name: "Twitter",
      link: "https://x.com/neyuj_11",
      icon: <Twitter size={20} className="text-blue-500" />,
      hoverColor: "hover:bg-blue-500/10"
    },
    {
      name: "LinkedIn", 
      link: "https://www.linkedin.com/in/ujjwal-gaihre-9719ba289/",
      icon: <Linkedin size={20} className="text-blue-600" />,
      hoverColor: "hover:bg-blue-600/10"
    },
    {
      name: "Github",
      link: " https://github.com/ujjwal2061",
      icon: <Github size={20} className="text-gray-800" />,
      hoverColor: "hover:bg-gray-800/10"
    }
  ];

  const usefulLinks = [
    { linkName: "Privacy Policy", url: "#" },
    { linkName: "About Us", url: "#" },
    { linkName: "Contact Us", url: "#" },
    { linkName: "Terms & Conditions", url: "#" },
    { linkName: "Latest News", url: "#" }
  ];

  const handleSubscribe = () => {
    if (email.trim()) {
      setIsSubscribed(true);
      setEmail("");
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  return (
    <footer className="w-full bg-gradient-to-br from-slate-50 via-white to-slate-100 border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
        
          <div className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-gray-900 font-serif">Contact Info</h2>
            </div>
            <div className="space-y-4">
              <div className="flex items-start space-x-3 group">
                <MapPin className="text-gray-500 mt-1 group-hover:text-mycolor transition-colors duration-200" size={18} />
                <div>
                  <h3 className="font-semibold text-gray-900">Address</h3>
                  <p className="text-gray-600 text-sm">123 Business Street, Suite 100<br />New York, NY 10001</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3 group">
                <Mail className="text-gray-500 mt-1 group-hover:text-mycolor transition-colors duration-200" size={18} />
                <div>
                  <h3 className="font-semibold text-gray-900">Email</h3>
                  <p className="text-gray-600 text-sm">contact@example.com</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3 group">
                <Clock className="text-gray-500 mt-1 group-hover:text-mycolor transition-colors duration-200" size={18} />
                <div>
                  <h3 className="font-semibold text-gray-900">Working Hours</h3>
                  <p className="text-gray-600 text-sm">Mon - Fri: 9:00 AM - 6:00 PM<br />Sat: 10:00 AM - 4:00 PM</p>
                </div>
              </div>
            </div>
            <div className="space-y-3 p-2">
              <h3 className="font-semibold text-gray-900">Follow Us</h3>
              <div className="flex space-x-2">
                {socialMedia.map((social, idx) => (
                  <a
                    href={social.link}
                    key={idx}
                     target="_blank"
                    className={`p-3 rounded-full bg-white border border-gray-200 shadow-sm hover:shadow-md transform hover:scale-105 transition-all duration-200 ${social.hoverColor}`}
                    aria-label={social.name}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-gray-900 font-serif">Useful Links</h2>
            </div>
            <div className="space-y-3">
              {usefulLinks.map((link, idx) => (
                <a
                  href={link.url}
                  key={idx}
                  className="block text-gray-600 hover:text-mycolor font-medium transition-colors duration-200  transform"
                >
                  {link.linkName}
                </a>
              ))}
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-gray-900 font-serif">Newsletter</h2>
            </div>
            <div className="space-y-4">
              <p className="text-gray-600 text-sm leading-relaxed">
                Stay updated with our latest news, updates, and exclusive offers. Join our community today!
              </p>
              <div className="space-y-3">
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all duration-200"
                  />
                  <Mail className="absolute right-3 top-3.5 text-gray-400" size={16} />
                </div>
                
                <button
                  onClick={handleSubscribe}
                  disabled={isSubscribed}
                  className="w-full bg-mycolor cursor-pointer text-white py-3 px-6 rounded-lg font-semibold  transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  {isSubscribed ? (
                    <span className="text-green-200">✓ Subscribed!</span>
                  ) : (
                    <>
                      <Send size={16} />
                      <span>Subscribe</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
        
   
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-center md:text-left">
              <p className="text-gray-600 text-sm">
                © 2025 . All rights reserved.
              </p>
            </div>
            <div className="flex flex-wrap justify-center md:justify-end gap-4 text-sm">
              <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors duration-200">
                Privacy Policy
              </a>
              <span className="text-gray-300">|</span>
              <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors duration-200">
                Terms of Service
              </a>
              <span className="text-gray-300">|</span>
              <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors duration-200">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;