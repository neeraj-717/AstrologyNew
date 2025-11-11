import React, { useState } from "react";

const IndexForm = () => {
    const [formData, setFormData] = useState({
        name: "",
        price: "",
        oldPrice: "",
        role: "",
        image: "",
        imageId: "",
    });

    // Handle Input Change
    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData({
            ...formData,
            [name]: files ? files[0] : value,
        });
    };

    // Submit Handler
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form Submitted:", formData);
        alert("Form submitted successfully!");
    };

    return (
        <div className="w-full md:w-[80%] mx-auto bg-gray-50 min-h-screen py-10 px-6">
            <form
                onSubmit={handleSubmit}
                className="bg-white shadow-lg rounded-2xl p-8 max-w-2xl mx-auto"
            >
                {/* Name */}
                <div className="mb-5">
                    <label className="block text-gray-700 font-medium mb-2">
                        Name
                    </label>
                    <input
                        type="text"
                        name="name"
                        placeholder="Enter name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-400 focus:outline-none"
                        required
                    />
                </div>

                {/* Price */}
                <div className="mb-5">
                    <label className="block text-gray-700 font-medium mb-2">
                        Price
                    </label>
                    <input
                        type="number"
                        name="price"
                        placeholder="Enter price"
                        value={formData.price}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-400 focus:outline-none"
                        required
                    />
                </div>

                {/* Old Price */}
                <div className="mb-5">
                    <label className="block text-gray-700 font-medium mb-2">
                        Old Price
                    </label>
                    <input
                        type="number"
                        name="oldPrice"
                        placeholder="Enter old price"
                        value={formData.oldPrice}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-400 focus:outline-none"
                    />
                </div>

                {/* Role */}
                <div className="mb-5">
                    <label className="block text-gray-700 font-medium mb-2">
                        Benifits
                    </label>
                    <input
                        type="text"
                        name="role"
                        placeholder="Enter role"
                        value={formData.role}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-400 focus:outline-none"
                    />
                </div>

                {/* Image Upload */}
                <div className="mb-5">
                    <label className="block text-gray-700 font-medium mb-2">
                        Upload Image
                    </label>
                    <input
                        type="file"
                        name="image"
                        accept="image/*"
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-400 focus:outline-none"
                    />
                </div>
                {/* Submit Button */}
                <div className="flex justify-center mt-8">
                    <button
                        type="submit"
                        className="bg-orange-500 text-white px-8 py-2 rounded-full font-semibold hover:bg-orange-600 duration-300 shadow-md"
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
};

export default IndexForm;
