import { Twitter, Linkedin, Github, Mail, MapPin, Clock, Send, Shield, UserCheck } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";

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
    <footer className="w-full bg-gradient-to-br from-slate-100 via-white to-slate-200 border-gray-200">
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
                  className="block  px-3 w-44 t hover:text-mycolor font-medium transition-colors duration-200  transform"
                >
                  <span className="hover:text-mycolor text-gray-600"> {link.linkName}</span> 
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
        
   
        {/* Admin Portal Section */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex flex-col items-center space-y-6">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center justify-center gap-2">
                <Shield className="text-blue-600" size={20} />
                Admin Portal
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                Access the administrative dashboard to manage books, users, and store operations
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link 
                  to="/admin-login"
                  className="inline-flex items-center gap-2  text-black px-6 py-2.5 rounded-lg font-medium   border-1 border-mycolor "
                >
                  <UserCheck size={16} />
                  Admin Login
                </Link>
                <Link 
                  to="/admin-signup"
                  className="inline-flex items-center gap-2 bg-mycolor text-white px-6 py-2.5 rounded-lg font-medium  transform hover:scale-105 transition-all duration-200 shadow-md hover:shadow-lg"
                >
                  <Shield size={16} />
                  Admin Register
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-center md:text-left">
              <p className="text-gray-600 text-sm">
                © 2025 BookStore. All rights reserved.
              </p>
            </div>
            <div className="flex flex-wrap justify-center md:justify-end gap-4 text-sm">
              <a href="#" className="text-gray-600 hover:text-mycolor transition-colors duration-200 font-medium">
                Privacy Policy
              </a>
              <span className="text-gray-300">|</span>
              <a href="#" className="text-gray-600 hover:text-mycolor transition-colors duration-200 font-medium">
                Terms of Service
              </a>
              <span className="text-gray-300">|</span>
              <a href="#" className="text-gray-600 hover:text-mycolor transition-colors duration-200 font-medium">
                Cookie Policy
              </a>
              <span className="text-gray-300">|</span>
              <a href="#" className="text-gray-600 hover:text-mycolor transition-colors duration-200 font-medium">
                Support
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;