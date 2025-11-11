import React, { useEffect, useState } from 'react'
import footerbg from "../../Front/assest/imgs/footer-bg.jpg"
import logo from '../../Front/assest/imgs/logo.webp';
import { FaLocationDot } from 'react-icons/fa6'
import { IoCall, IoCallOutline } from 'react-icons/io5'
import { IoIosSend, IoMdMail } from 'react-icons/io'
import { FaArrowUp, FaWhatsapp } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import axios from 'axios'

const Footer = () => {
    const [visible, setVisible] = useState(false);
    const [recentPosts, setRecentPosts] = useState([]);

    useEffect(() => {
        const handleScroll = () => setVisible(window.scrollY > 200);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        // Fetch recent blog posts
        const fetchRecentPosts = async () => {
            try {
                const response = await axios.get('https://astrologyb.onrender.com/api/blog');
                console.log('Blog response:', response.data);
                setRecentPosts(response.data.slice(0, 2)); // Get latest 2 posts
            } catch (error) {
                console.error('Error fetching recent posts:', error);
                setRecentPosts([]);
            }
        };
        fetchRecentPosts();
    }, []);

    const scrollToTop = () => {
        const scrollDuration = 800;
        const scrollStep = -window.scrollY / (scrollDuration / 15);

        const smoothScroll = () => {
            if (window.scrollY !== 0) {
                window.scrollBy(0, scrollStep);
                requestAnimationFrame(smoothScroll);
            }
        };

        requestAnimationFrame(smoothScroll);
    };
    const phoneNumber = "9414237095";
    const message = "Hello, I visited your site and want to know more!";
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    return (
        <>

            <div className='fixed bottom-20 z-50 right-10'>
                <Link to={url}><FaWhatsapp size={50} className='bg-green-600 p-1 rounded-xl text-white animate-bounce' /></Link>
                <Link className='flex items-center gap-2.5 animate-bounce text-2xl' to={`tel:${phoneNumber}`}><IoCallOutline size={50} className='bg-green-600 p-1 rounded-xl text-white mt-5 ' /> Call ?</Link>
            </div>
            {visible && (
                <button
                    onClick={scrollToTop}
                    className="z-50 fixed bottom-5 right-5 bg-red-600 text-white px-4 py-2 rounded-full shadow-lg hover:bg-black transition duration-300 flex items-center gap-2"
                >
                    <FaArrowUp /> Top
                </button>
            )}
            <footer className="relative px-10 py-10 text-white bg-cover bg-center" style={{ backgroundImage: `url(${footerbg})` }} >
                <div className="absolute inset-0 bg-black/70"></div>
                <div className="relative z-10 flex flex-wrap justify-between">
                    <div className="w-full my-2 md:w-[30%] mb-6 md:mb-0">
                        <img src={logo} alt="Footer Logo" className='mb-4' />
                        <p className="flex items-center gap-3 hover:text-yellow-600 duration-500">
                            <FaLocationDot size={50} />
                            <span>Shree Ram Bhawan 13,14, Arihent Vatika, Opp. Shyam Nagar, New Sangner Road Near Mahatma Jyoti Rao Phule Mahila College Sodala-19, Jaipur, Rajasthan, INDIA</span>
                        </p>
                        <p className="flex items-center gap-3 hover:text-yellow-600 duration-500">
                            <IoCall />
                            <span>+919414237095</span>
                        </p>
                        <p className="flex items-center gap-3 hover:text-yellow-600 duration-500">
                            <IoMdMail />
                            <span>ptpurshotam@gmail.com </span>
                        </p>
                    </div>
                    <div className="w-full my-2 md:w-[20%]">
                        <h2 className='text-2xl'>Quick Links</h2>
                        <ul>
                            <li className='my-3 hover:text-yellow-600 duration-500'><Link to="/">Home</Link></li>
                            <li className='my-3 hover:text-yellow-600 duration-500'><Link to="/knowmore">About Us</Link></li>
                            <li className='my-3 hover:text-yellow-600 duration-500'><Link to="/Blog">Blog</Link></li>
                            <li className='my-3 hover:text-yellow-600 duration-500'><Link to="/jap">Jap</Link></li>
                            <li className='my-3 hover:text-yellow-600 duration-500'><Link to="/inquiryform">Appointment</Link></li>
                            
                        </ul>
                    </div>
                    <div className="w-full my-2 md:w-[20%]">
                        <h2 className='text-2xl'>Recent Post</h2>
                        {recentPosts.length > 0 ? (
                            recentPosts.map((post) => (
                                <Link key={post._id} to="/Blog" className='block mb-4 hover:text-yellow-600 transition duration-300'>
                                    {post.imageUrl && (
                                        <img src={post.imageUrl} alt={post.title} className='w-15 h-12 object-cover rounded' />
                                    )}
                                    <p className='text-sm py-2 cursor-pointer'>{post.title}</p>
                                </Link>
                            ))
                        ) : (
                            <div>
                                <div className='mb-4'>
                                    <div className='w-15 h-12 bg-gray-600 rounded mb-2'></div>
                                    <p className='text-sm py-2'>Latest Astrology Insights</p>
                                    <p className='text-xs text-gray-300'>Coming Soon</p>
                                </div>
                                <div className='mb-4'>
                                    <div className='w-15 h-12 bg-gray-600 rounded mb-2'></div>
                                    <p className='text-sm py-2'>Spiritual Guidance</p>
                                    <p className='text-xs text-gray-300'>Coming Soon</p>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="w-full my-2 md:w-[30%]">
                        <h2 className='text-2xl'>
                            Subscribe
                        </h2>
                        <div className=" items-center rounded-full w-full my-5 shadow-md">
                            <form action="" className='flex'>
                                <input
                                    type="email"
                                    placeholder="Email..."
                                    className=" bg-white px-4 py-2 text-gray-700 focus:outline-none rounded-l-full"
                                />
                                <button
                                    className=" px-4 py-2  bg-orange-400  text-white flex items-center justify-center rounded-br-full rounded-tr-full">
                                    <IoIosSend size={25} />
                                </button>
                            </form>
                            <div className='flex gap-2 items-baseline mt-5'>
                                <input type="checkbox" /><span>I agree that my submitted data is being collected and stored.</span>
                            </div>
                        </div>

                    </div>
                </div>
                <div className='border-t border-white  text-center pt-7  '>
                    <p className='text-white inset-2'>Copyright © 2025 Astrology. All Right Reserved.</p>
                </div>
            </footer>
        </>
    )
}

export default Footer
