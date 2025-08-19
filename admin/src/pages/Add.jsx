import React, { useState, useEffect } from "react";
import { assets } from "../assets/assets";
import axios from "axios"; 
import { backendUrl } from '../App'
import { toast } from "react-toastify";

const Add = () => {
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);
  const [image4, setImage4] = useState(null);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Men");
  const [subCategory, setSubCategory] = useState("Topwear");
  const [bestseller, setBestseller] = useState(false);
  const [sizes, setSizes] = useState([]);

  const handleSizeClick = (size) => {
    if (sizes.includes(size)) {
      setSizes(sizes.filter((s) => s !== size));
    } else {
      setSizes([...sizes, size]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Token nai! Please login again.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("bestseller", bestseller);
      formData.append("sizes", JSON.stringify(sizes));

      image1 && formData.append("image1", image1);
      image2 && formData.append("image2", image2);
      image3 && formData.append("image3", image3);
      image4 && formData.append("image4", image4);

      const response = await axios.post(backendUrl + "/api/product/add", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          token: token,
        },
      });

      if (response.data.success) {
        toast.success(response.data.message);
        setName('')
        setDescription('')
        setImage1(false)
        setImage2(false)
        setImage3(false)
        setImage4(false)
        setPrice('')
      } else {
        toast.error(response.data.message)
      }

    } catch (error) {
      console.error("Error submitting form:", error.response?.data || error.message);
      toast.error(error.message)
    }
  };

  useEffect(() => {
    return () => {
      image1 && URL.revokeObjectURL(image1);
      image2 && URL.revokeObjectURL(image2);
      image3 && URL.revokeObjectURL(image3);
      image4 && URL.revokeObjectURL(image4);
    };
  }, [image1, image2, image3, image4]);

  return (
    <form
      className="flex flex-col w-full items-start gap-3"
      onSubmit={handleSubmit}
    >
      <div>
        <p className="mb-2">Upload Image</p>
        <div className="flex gap-2">
          <label htmlFor="image1">
            <img
              className="w-20"
              src={image1 ? URL.createObjectURL(image1) : assets.upload_area}
              alt=""
            />
            <input
              onChange={(e) => setImage1(e.target.files[0])}
              type="file"
              id="image1"
              hidden
              accept="image/*"
            />
          </label>
          <label htmlFor="image2">
            <img
              className="w-20"
              src={image2 ? URL.createObjectURL(image2) : assets.upload_area}
              alt=""
            />
            <input
              onChange={(e) => setImage2(e.target.files[0])}
              type="file"
              id="image2"
              hidden
              accept="image/*"
            />
          </label>
          <label htmlFor="image3">
            <img
              className="w-20"
              src={image3 ? URL.createObjectURL(image3) : assets.upload_area}
              alt=""
            />
            <input
              onChange={(e) => setImage3(e.target.files[0])}
              type="file"
              id="image3"
              hidden
              accept="image/*"
            />
          </label>
          <label htmlFor="image4">
            <img
              className="w-20"
              src={image4 ? URL.createObjectURL(image4) : assets.upload_area}
              alt=""
            />
            <input
              onChange={(e) => setImage4(e.target.files[0])}
              type="file"
              id="image4"
              hidden
              accept="image/*"
            />
          </label>
        </div>
      </div>

      <div className="w-full">
        <p>Product Name</p>
        <input
          className="w-full max-w-[500px] px-3 py-2 my-2"
          type="text"
          placeholder="Type here"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="w-full">
        <p>Product Description</p>
        <textarea
          className="w-full max-w-[500px] px-3 py-2 my-2"
          placeholder="Write content here"
          required
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-2 w-full sm:gap-8">
        <div>
          <p className="mb-2">Product Category</p>
          <select
            className="w-full px-3 py-2"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="Women">Women</option>
            <option value="Men">Men</option>
            <option value="Kids">Kids</option>
          </select>
        </div>

        <div>
          <p className="mb-2">Sub Category</p>
          <select
            className="w-full px-3 py-2"
            value={subCategory}
            onChange={(e) => setSubCategory(e.target.value)}
          >
            <option value=" Topwear">Topwear</option>
            <option value="Bottomwear">Bottomwear</option>
            <option value="Winterwear">Winterwear</option>
          </select>
        </div>

        <div>
          <p className="mb-2">Product Price</p>
          <input
            className="w-full px-3 py-2 sm:w-[120px]"
            type="number"
            placeholder="350"
            required
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
      </div>

      <div>
        <p className="mb-2">Product size</p>
        <div className="flex gap-3">
          {["S", "M", "L", "XL", "XXL","XXXL"].map((size) => (
            <p
              key={size}
              className={`px-3 py-1 cursor-pointer rounded 
              ${sizes.includes(size) ? "bg-pink-200 " : "bg-slate-200 text-black"}`}
              onClick={() => handleSizeClick(size)}
            >
              {size}
            </p>
          ))}
        </div>
      </div>

      <div className="flex gap-2 mt-2">
        <input
          type="checkbox"
          id="bestseller"
          checked={bestseller}
          onChange={(e) => setBestseller(e.target.checked)}
        />
        <label className="cursor-pointer" htmlFor="bestseller">
          Add to Bestseller
        </label>
      </div>

      <button
        className="w-28 py-2 mt-4 text-white bg-black rounded cursor-pointer"
        type="submit"
      >
        ADD
      </button>
    </form>
  );
};

export default Add;
