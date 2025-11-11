import React, { useState, useEffect } from 'react';
import logo from '../../Front/assest/imgs/logo.webp';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { IoMenu } from 'react-icons/io5';
import { RxCross2 } from 'react-icons/rx';
import { motion } from "framer-motion";
import { FaCartPlus, FaUser, FaSignOutAlt, FaCog } from 'react-icons/fa';
import { useCart } from '../../context/CartContext';
import { userService } from '../../services/userService';

const Header = () => {
  const [Togelmenu, setTogelmenu] = useState(false);
  const [serviceOpen, setServiceOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  
  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await userService.getProfile();
          setUser(response.user);
        } catch (error) {
          console.error('Failed to fetch user data:', error);
          // If token is invalid, clear it
          localStorage.removeItem('token');
          localStorage.removeItem('user');
        }
      }
    };
    
    fetchUserData();
  }, []);

  const closeAllMenus = () => {
    setTogelmenu(false);
    setServiceOpen(false);
    setUserMenuOpen(false);
  };
  
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    navigate('/');
    closeAllMenus();
  };

  const { cartItems } = useCart();
  const cartlength = cartItems.length;

  // Check if current path is a service page
  const isServiceActive = () => {
    const servicePaths = [
      '/astrologyconsultation', '/jap', '/yagya', '/newbornastrology',
      '/drishti', '/mantrahealing', '/poojaservice', '/vastushastra', '/luckystonechart'
    ];
    return servicePaths.includes(location.pathname);
  };

  const serviceItems = [
    { name: "Astrology Consultation", link: "/astrologyconsultation" },
    { name: "Jap", link: "/jap" },
    { name: "YAGYA (HOMAM)", link: "/yagya" },
    { name: "Newborn Astrology", link: "/newbornastrology" },
    { name: "Drishti", link: "/drishti" },
    { name: "Mantra Healing", link: "/mantrahealing" },
    { name: "Pooja Service", link: "/poojaservice" },
    { name: "Vastu Shastra", link: "/vastushastra" },
    { name: "Lucky Stone Chart", link: "/luckystonechart" },
  ];

  const getMenuItems = () => {
    const baseItems = [
      { name: "Home", link: '/' },
      { name: "Know More", link: '/knowmore' },
      { name: "Photo Gallery", link: '/gallery' },
      { name: "Our Services", link: '/services', dropdown: true },
      { name: "Press Release", link: '/Press' },
      { name: "Product", link: '/product' },
      { name: "Blog", link: '/Blog' },
      { name: "Inquiry Form", link: '/inquiryform' },
    ];
    
    if (user) {
      // Add user-specific items
      baseItems.push(
        { name: "Kundli", link: '/kundli' },
        {
          name: (
            <div className="relative z-50">
              <FaCartPlus className="text-xl" />
              {cartlength > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
                  {cartlength}
                </span>
              )}
            </div>
          ),
          link: '/cart',
        }
      );
    } else {
      // Add login/register for non-authenticated users
      baseItems.push(
        { name: "Login", link: '/login' },
        { name: "Register", link: '/register' }
      );
    }
    
    return baseItems;
  };

  return (
    <>
      <header className="bg-black fixed z-50 text-white w-full">
        <div className="flex items-center justify-between px-6 py-4">
          <Link to="/">
            <img src={logo} alt="Logo" className="w-20 md:w-[200px] h-auto" />
          </Link>
          <nav className="hidden md:flex relative items-center">
            {getMenuItems().map((item, i) =>
              item.dropdown ? (
                <div
                  key={i}
                  className="relative group"
                  onMouseEnter={() => setServiceOpen(true)}
                  onMouseLeave={() => setServiceOpen(false)}
                >
                  <button className={`py-2 px-3 rounded text-sm transition duration-300 flex items-center gap-1 ${
                    isServiceActive() ? 'bg-red-500 text-white' : 'hover:bg-red-500'
                  }`}>
                    {item.name}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 mt-px"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {serviceOpen && (
                    <div className="absolute top-full left-0 bg-white text-black rounded-md shadow-lg mt-1 min-w-[180px]">
                      {serviceItems.map((sub, j) => (
                        <Link
                          key={j}
                          to={sub.link}
                          onClick={closeAllMenus}
                          className="block px-4 py-2 text-sm hover:bg-gray-100"
                        >
                          {sub.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={i}
                  to={item.link}
                  onClick={closeAllMenus}
                  className={`py-2 px-3 rounded text-sm transition duration-300 ${
                    location.pathname === item.link 
                      ? 'bg-red-500 text-white' 
                      : 'hover:bg-red-500'
                  }`}
                >
                  {item.name}
                </Link>
              )
            )}
            
            {/* User Menu for authenticated users */}
            {user && (
              <div 
                className="relative ml-4"
                onMouseEnter={() => setUserMenuOpen(true)}
                onMouseLeave={() => setUserMenuOpen(false)}
              >
                <button className="flex items-center gap-2 hover:bg-red-500 py-2 px-3 rounded text-sm transition duration-300">
                  <FaUser className="text-lg" />
                  <span>{user.name}</span>
                </button>
                {userMenuOpen && (
                  <div className="absolute top-full right-0 bg-white text-black rounded-md shadow-lg mt-1 min-w-[180px]">
                    <Link
                      to={user.role === 'admin' ? '/admin-dashboard' : '/user-dashboard'}
                      onClick={closeAllMenus}
                      className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-100"
                    >
                      {user.role === 'admin' ? <FaCog /> : <FaUser />}
                      {user.role === 'admin' ? 'Admin Dashboard' : 'My Dashboard'}
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm hover:bg-gray-100 text-red-600"
                    >
                      <FaSignOutAlt />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </nav>
          <button
            className="md:hidden text-3xl"
            onClick={() => setTogelmenu(!Togelmenu)}
          >
            {Togelmenu ? <RxCross2 /> : <IoMenu />}
          </button>
        </div>
        {Togelmenu && (
          <motion.nav
            className="md:hidden bg-white text-black w-full absolute z-50 left-0 shadow-lg"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <ul className="flex flex-col text-center">
              {getMenuItems().map((item, i) => (
                <li key={i} className="border-b border-gray-200">
                  {item.dropdown ? (
                    <>
                      <button
                        onClick={() => setServiceOpen(!serviceOpen)}
                        className={`w-full py-3 font-medium transition ${
                          isServiceActive() ? 'bg-red-500 text-white' : 'hover:bg-gray-100'
                        }`}
                      >
                        {item.name}
                      </button>
                      {serviceOpen && (
                        <ul className="bg-gray-50 text-sm">
                          {serviceItems.map((sub, j) => (
                            <li key={j} className="border-t border-gray-200">
                              <Link
                                to={sub.link}
                                onClick={closeAllMenus}
                                className="block py-2 hover:bg-gray-100"
                              >
                                {sub.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </>
                  ) : (
                    <Link
                      to={item.link}
                      onClick={closeAllMenus}
                      className={`block py-3 transition ${
                        location.pathname === item.link 
                          ? 'bg-red-500 text-white' 
                          : 'hover:bg-gray-100'
                      }`}
                    >
                      {item.name}
                    </Link>
                  )}
                </li>
              ))}
              
              {/* Mobile User Menu */}
              {user && (
                <>
                  <li className="border-b border-gray-200">
                    <Link
                      to={user.role === 'admin' ? '/admin-dashboard' : '/user-dashboard'}
                      onClick={closeAllMenus}
                      className="flex items-center justify-center gap-2 py-3 hover:bg-gray-100 transition"
                    >
                      {user.role === 'admin' ? <FaCog /> : <FaUser />}
                      {user.role === 'admin' ? 'Admin Dashboard' : 'My Dashboard'}
                    </Link>
                  </li>
                  <li className="border-b border-gray-200">
                    <button
                      onClick={handleLogout}
                      className="flex items-center justify-center gap-2 w-full py-3 hover:bg-gray-100 transition text-red-600"
                    >
                      <FaSignOutAlt />
                      Logout
                    </button>
                  </li>
                </>
              )}
            </ul>
          </motion.nav>
        )}
      </header>
    </>
  );
};

export default Header;