import React from 'react'
import downlod from "../../Front/assest/imgs/download.png"
import bg10 from "../..//Front/assest/imgs/bg10.jpg"
import { FaStarOfDavid } from 'react-icons/fa';
import shape from "../../Front/assest/imgs/shape.svg"
import Pressimg from "../../Front/assest/imgs/Pressimg1.jpeg"
import Pressimg2 from "../../Front/assest/imgs/Pressimg2.jpeg"
import Pressimg3 from "../../Front/assest/imgs/Pressimg3.jpeg"
import Pressimg4 from "../../Front/assest/imgs/Pressimg4.jpeg"
import { motion } from "framer-motion";

const Press = () => {
    return (
        <>
            <div className="section-8 pt-20 pb-30 text-center text-white relative overflow-hidden" style={{ backgroundImage: `url(${bg10})`, backgroundSize: '100%' }}>
                <div className="absolute inset-0 bg-black/70"></div>
                <motion.div
                    initial={{ scale: 1.3, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="relative z-10">
                    <h2 className='text-2xl'>Press Release</h2>
                    <p className="flex text-xs mt-3 justify-center items-center cursor-pointer">
                        Home <FaStarOfDavid className="mx-2" />Press Release
                    </p>
                </motion.div>
            </div>
            <div className='w-full  h-[100px] rotate-180 mt-[-90px]' style={{ backgroundImage: `url(${shape})`, }}></div>
            <div className=' overflow-hidden text-center'>
                <motion.div
                    initial={{ scale: 1.3, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <div>
                        <img src={downlod} alt="" className='m-auto my-10' />
                    </div>
                    <p className='md:mx-50'>
                        Stay updated with our latest news, astrological insights, and celestial events.
                    </p>
                </motion.div>
            </div>
            <div className="text-center overflow-hidden md:text-start section-10 max-w-5xl mx-auto my-16 px-6">
                <motion.div
                    initial={{ scale: 1.3, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="grid md:grid-cols-2 gap-8 items-center">
                    <img src={Pressimg4} className="m-auto rounded-2xl shadow-lg w-[350px] h-[350px]" alt="" />
                    <div>
                        <p className="text-sm text-orange-500 font-semibold mb-2">
                            OCT 27, 2025
                        </p>
                        <h2 className="text-3xl font-bold mb-4 text-gray-900">
                            Astrology Experts Reveal Powerful Alignments for November 2025
                        </h2>
                        <p className="text-gray-600 mb-4 leading-relaxed">
                            Our team of Vedic astrologers announces the most significant planetary
                            transitions of the month, guiding you to align your energy with the
                            cosmos for better opportunities and balance.
                        </p>
                    </div>
                </motion.div>
            </div>
            <div className="overflow-hidden section-11 max-w-6xl mx-auto px-6 pb-16">
                <h2 className="text-2xl font-bold text-center mb-10 text-gray-900">
                    Recent Press Releases
                </h2>
                <motion.div
                    initial={{ x: -200, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    viewport={{ once: true, amount: 0.2 }}
                    className="w-full md:flex justify-around">
                    <div className="bg-white rounded-2xl my-10 md:my-0 md:w-[30%] shadow-lg overflow-hidden hover:-translate-y-2 transition">
                        <img src={Pressimg2} className="m-auto rounded-2xl shadow-lg h-[230px] w-full" alt="" />
                        <div className="p-5">
                            <p className="text-sm text-orange-500 font-semibold mb-1">
                                OCT 20, 2025
                            </p>
                            <h3 className="text-lg font-bold mb-2">
                                Full Moon Brings New Energy in Aries
                            </h3>
                            <p className="text-gray-600 text-sm mb-3">
                                Astrologers share how this full moon can open new opportunities for
                                bold decisions and courage.
                            </p>
                        </div>
                    </div>
                    <div className="bg-white rounded-2xl my-10 md:my-0 md:w-[30%] shadow-lg overflow-hidden hover:-translate-y-2 transition">
                        <img src={Pressimg3} className="m-auto rounded-2xl shadow-lg h-[230px] w-full" alt="" />
                        <div className="p-5">
                            <p className="text-sm text-orange-500 font-semibold mb-1">
                                SEP 15, 2025
                            </p>
                            <h3 className="text-lg font-bold mb-2">
                                Planetary Changes Impacting Career Paths
                            </h3>
                            <p className="text-gray-600 text-sm mb-3">
                                Jupiter’s movement may bring transformation in professional
                                lives—here’s how to use it for growth.
                            </p>
                        </div>
                    </div>
                    <div className="bg-white rounded-2xl my-10 md:my-0 md:w-[30%] shadow-lg overflow-hidden hover:-translate-y-2 transition">
                        <img src={Pressimg} className="m-auto rounded-2xl shadow-lg h-[230px] w-full" alt="" />
                        <div className="p-5">
                            <p className="text-sm text-orange-500 font-semibold mb-1">
                                AUG 29, 2025
                            </p>
                            <h3 className="text-lg font-bold mb-2">
                                Rahu &amp; Ketu Transits: What It Means for You
                            </h3>
                            <p className="text-gray-600 text-sm mb-3">
                                The lunar nodes are changing signs—astrologers explain the effect on
                                relationships and finances.
                            </p>
                        </div>
                    </div>
                </motion.div>
                <motion.div
                    initial={{ x: 200, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    viewport={{ once: true, amount: 0.2 }}
                    className="w-full mt-10 md:flex justify-around">
                    <div className="bg-white rounded-2xl my-10 md:my-0 md:w-[30%] shadow-lg overflow-hidden hover:-translate-y-2 transition">
                        <img src={Pressimg2} className="m-auto rounded-2xl shadow-lg h-[230px] w-full" alt="" />
                        <div className="p-5">
                            <p className="text-sm text-orange-500 font-semibold mb-1">
                                OCT 20, 2025
                            </p>
                            <h3 className="text-lg font-bold mb-2">
                                Full Moon Brings New Energy in Aries
                            </h3>
                            <p className="text-gray-600 text-sm mb-3">
                                Astrologers share how this full moon can open new opportunities for
                                bold decisions and courage.
                            </p>
                        </div>
                    </div>
                    <div className="bg-white rounded-2xl my-10 md:my-0 md:w-[30%] shadow-lg overflow-hidden hover:-translate-y-2 transition">
                        <img src={Pressimg3} className="m-auto rounded-2xl shadow-lg h-[230px] w-full" alt="" />
                        <div className="p-5">
                            <p className="text-sm text-orange-500 font-semibold mb-1">
                                SEP 15, 2025
                            </p>
                            <h3 className="text-lg font-bold mb-2">
                                Planetary Changes Impacting Career Paths
                            </h3>
                            <p className="text-gray-600 text-sm mb-3">
                                Jupiter’s movement may bring transformation in professional
                                lives—here’s how to use it for growth.
                            </p>
                        </div>
                    </div>
                    <div className="bg-white rounded-2xl my-10 md:my-0 md:w-[30%] shadow-lg overflow-hidden hover:-translate-y-2 transition">
                        <img src={Pressimg} className="m-auto rounded-2xl shadow-lg h-[230px] w-full" alt="" />
                        <div className="p-5">
                            <p className="text-sm text-orange-500 font-semibold mb-1">
                                AUG 29, 2025
                            </p>
                            <h3 className="text-lg font-bold mb-2">
                                Rahu &amp; Ketu Transits: What It Means for You
                            </h3>
                            <p className="text-gray-600 text-sm mb-3">
                                The lunar nodes are changing signs—astrologers explain the effect on
                                relationships and finances.
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </>
    )
}

export default Press
