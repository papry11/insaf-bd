import React, { useState, useEffect } from "react";
import { assets } from "../assets/assets";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";

// Modernized Add component — keeps your state shape & function names
export default function Add() {
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);
  const [image4, setImage4] = useState(null);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [bestseller, setBestseller] = useState(false);
  const [sizes, setSizes] = useState([]);

  // Dynamic Category States
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");

  // Loading & UI states
  const [loadingCategories, setLoadingCategories] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Load category list
  useEffect(() => {
    const fetchCategory = async () => {
      setLoadingCategories(true);
      try {
        const res = await axios.get(backendUrl + "/api/category/list");
        if (res.data.success) {
          setCategories(res.data.categories);

          // auto select first category
          if (res.data.categories.length > 0) {
            setCategory(res.data.categories[0].name);
          }
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoadingCategories(false);
      }
    };

    fetchCategory();
  }, []);

  const handleSizeClick = (size) => {
    if (sizes.includes(size)) {
      setSizes(sizes.filter((s) => s !== size));
    } else {
      setSizes([...sizes, size]);
    }
  };

  // Add new category from Add Page
  const addNewCategory = async () => {
    if (!newCategory.trim()) return toast.error("Enter category name");

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        backendUrl + "/api/category/add",
        { name: newCategory },
        { headers: { token } }
      );

      if (response.data.success) {
        toast.success("Category Added");

        // Update dropdown instantly
        setCategories([...categories, { name: newCategory }]);
        setCategory(newCategory);
        setNewCategory("");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const handleImageClear = (index) => {
    if (index === 0) setImage1(null);
    if (index === 1) setImage2(null);
    if (index === 2) setImage3(null);
    if (index === 3) setImage4(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Token missing. Please login again.");
      return;
    }

    try {
      setSubmitting(true);
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("bestseller", bestseller);
      formData.append("sizes", JSON.stringify(sizes));

      image1 && formData.append("image1", image1);
      image2 && formData.append("image2", image2);
      image3 && formData.append("image3", image3);
      image4 && formData.append("image4", image4);

      const response = await axios.post(
        backendUrl + "/api/product/add",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            token: token,
          },
        }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        setName("");
        setDescription("");
        setPrice("");
        setSizes([]);
        setBestseller(false);

        setImage1(null);
        setImage2(null);
        setImage3(null);
        setImage4(null);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error.response?.data || error.message);
      toast.error(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  // small helper for rendering preview src safely
  const previewSrc = (file) => (file ? URL.createObjectURL(file) : null);

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-3xl mx-auto bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-lg"
    >
      <h2 className="text-2xl font-semibold mb-4">Add New Product</h2>

      {/* IMAGE UPLOAD */}
      <div className="mb-6">
        <p className="text-sm text-slate-600 mb-3">Product images (up to 4)</p>
        <div className="grid grid-cols-4 gap-3 sm:grid-cols-2">
          {[image1, image2, image3, image4].map((img, index) => (
            <div
              key={index}
              className="relative rounded-lg border border-dashed border-slate-200 p-2 flex flex-col items-center justify-center bg-slate-50/60"
            >
              <label
                htmlFor={`image${index + 1}`}
                className="cursor-pointer w-full h-full flex flex-col items-center justify-center gap-2"
              >
                {img ? (
                  <img
                    src={previewSrc(img)}
                    alt={`preview-${index}`}
                    className="w-full h-40 object-cover rounded"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center gap-2 py-6">
                    <img src={assets.upload_area} alt="upload" className="w-12 h-12" />
                    <span className="text-sm text-slate-500">Click to upload</span>
                  </div>
                )}
                <input
                  id={`image${index + 1}`}
                  accept="image/*"
                  type="file"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (!file) return;
                    if (index === 0) setImage1(file);
                    if (index === 1) setImage2(file);
                    if (index === 2) setImage3(file);
                    if (index === 3) setImage4(file);
                  }}
                />
              </label>

              {img && (
                <div className="absolute top-2 right-2 flex gap-1">
                  <button
                    type="button"
                    onClick={() => handleImageClear(index)}
                    className="bg-white/90 px-2 py-1 rounded-md text-sm shadow-sm"
                  >
                    Remove
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* NAME */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-slate-700">Product Name</label>
        <input
          className="mt-2 w-full px-4 py-3 rounded-lg  border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#b47ab1]"
          type="text"
          placeholder="Type product name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      {/* DESCRIPTION */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-slate-700">Product Description</label>
        <textarea
          className="mt-2 w-full px-4 py-3 rounded-lg border min-h-[100px] resize-vertical focus:outline-none focus:ring-2 focus:ring-[#b47ab1]"
          placeholder="Write content here"
          required
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      {/* CATEGORY + PRICE */}
      <div className="flex flex-col sm:flex-row gap-4 mb-4">
        <div className="flex-1">
          <label className="block text-sm font-medium text-slate-700">Product Category</label>
          <div className="flex gap-2 mt-2">
            <select
              className="flex-1 px-4 py-3 rounded-lg border focus:outline-none"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {loadingCategories ? (
                <option>Loading...</option>
              ) : (
                categories.map((cat, index) => (
                  <option key={cat._id || index} value={cat.name}>
                    {cat.name}
                  </option>
                ))
              )}
            </select>

            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Add New Category"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                className="px-3 py-3 rounded-lg border w-32 sm:w-40"
              />
              <button
                onClick={addNewCategory}
                type="button"
                className="px-4 py-3 rounded-lg bg-[#b47ab1] text-white hover:bg-[#9b5fa0] transition"
              >
                Add
              </button>
            </div>
          </div>
        </div>

        <div className="sm:w-[160px]">
          <label className="block text-sm font-medium text-slate-700">Product Price</label>
          <input
            className="mt-2 w-full px-4 py-3 rounded-lg border focus:outline-none"
            type="number"
            placeholder="350"
            required
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
      </div>

      {/* SIZE */}
      <div className="mb-4">
        <p className="text-sm font-medium text-slate-700 mb-2">Product sizes</p>
        <div className="flex flex-wrap gap-3">
          {["S", "M", "L", "XL", "XXL", "XXXL"].map((size) => (
            <button
              type="button"
              key={size}
              onClick={() => handleSizeClick(size)}
              className={`px-4 py-2 rounded-full border text-sm transition border border-gray-300 ${
                sizes.includes(size)
                  ? "bg-[#b47ab1] text-white border-transparent"
                  : "bg-white text-slate-700"
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* BESTSELLER */}
      <div className="flex items-center gap-3 mb-6">
        <input
          type="checkbox"
          id="bestseller"
          checked={bestseller}
          onChange={(e) => setBestseller(e.target.checked)}
          className="h-4 w-4 rounded"
        />
        <label className="cursor-pointer text-sm" htmlFor="bestseller">
          Add to Bestseller
        </label>
      </div>

      {/* SUBMIT BTN */}
      <div className="flex items-center justify-between gap-4">
        <button
          type="submit"
          disabled={submitting}
          className={`px-6 py-3 rounded-lg text-white font-medium transition transform duration-200 ease-in-out shadow-sm ${
            submitting
              ? "bg-slate-300 cursor-not-allowed"
              : "bg-[#b47ab1] hover:scale-[1.02] hover:bg-[#9b5fa0]"
          }`}
        >
          {submitting ? "Adding..." : "Add Product"}
        </button>
      </div>
    </form>
  );
}
