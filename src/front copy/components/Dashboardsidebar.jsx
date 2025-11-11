import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { BiChevronLeft, BiChevronRight, BiPhotoAlbum } from "react-icons/bi";
import { FaRegNewspaper, FaShoppingBag, FaUsers, FaClipboardList, FaEnvelope, FaBook, FaHome } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";

const Dashboardsidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const location = useLocation();

  const menuItems = [
    { name: "Home", path: "/", icon: <FaHome /> },
    { name: "Dashboard", path: "/dashboard", icon: <MdDashboard /> },
    { name: "Blogs", path: "/dashboard/blogs", icon: <FaRegNewspaper /> },
    { name: "Products", path: "/dashboard/products", icon: <FaShoppingBag /> },
    { name: "Orders", path: "/dashboard/orders", icon: <FaClipboardList /> },
    { name: "Inquiries", path: "/dashboard/inquiries", icon: <FaEnvelope /> },
    { name: "Users", path: "/dashboard/users", icon: <FaUsers /> },
    { name: "My Kundlis", path: "/dashboard/kundlis", icon: <FaBook /> },
    { name: "Gallery", path: "/dashboard/gallery", icon: <BiPhotoAlbum /> },
  ];

  return (
    <div
      className={` transition-all duration-500 bg-linear-to-b from-black via-[#1a0e33] to-[#000000] text-white shadow-xl border-r border-[#3b2066] ${
        isOpen ? "w-[20%]" : "w-[6%]"
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-5 border-b border-[#3b2066]">
        <h2
          className={`text-2xl font-semibold text-yellow-400 tracking-wide transition-all duration-300 ${
            !isOpen && "opacity-0 hidden"
          }`}
        >
          AstroAdmin
        </h2>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-yellow-400 hover:text-white text-2xl"
        >
          {isOpen ? <BiChevronLeft /> : <BiChevronRight />}
        </button>
      </div>

      {/* Menu Items */}
      <ul className="mt-8 space-y-3 px-2">
        {menuItems.map((item) => {
          const active = location.pathname === item.path;
          return (
            <li key={item.name}>
              <Link
                to={item.path}
                className={`flex items-center gap-4 py-3 px-4 rounded-xl text-lg font-medium transition-all duration-300 ${
                  active
                    ? "bg-yellow-400 text-black shadow-md"
                    : "text-gray-300 hover:bg-yellow-500 hover:text-black"
                }`}
              >
                <span className="text-2xl">{item.icon}</span>
                {isOpen && <span>{item.name}</span>}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Dashboardsidebar;
