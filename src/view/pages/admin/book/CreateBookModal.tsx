import React, { useState } from "react";
import {backendApi} from "../../../../../api.ts";
 // adjust path as needed

interface Props {
    onClose: () => void;
}

const CreateBookModal: React.FC<Props> = ({ onClose }) => {
    const [form, setForm] = useState({
        title: "",
        author: "",
        description: "",
        category: "",
        price: "",
        photo: "",
    });

    const [photoFile, setPhotoFile] = useState<File | null>(null);

    const handleChange = ( e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setPhotoFile(e.target.files[0]);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {


            try {
                if (photoFile) {
                    const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
                    if (!allowedTypes.includes(photoFile.type)) {
                        alert("Invalid image format. Please upload a JPEG, PNG, or JPG file.");
                        return;
                    }
                    const formData = new FormData();
                    formData.append("photo", photoFile);

                    const uploadRes = await backendApi.post("/files/book", formData, {
                        headers: {
                            "Content-Type": "multipart/form-data"
                        }
                    });
                    form.photo = uploadRes.data.filename;
                }
            } catch (err) {
                alert("Image upload failed.");
            }

            console.log(form)

            const response = await backendApi.post("/admin/book/add", form);

            if (response.status === 201) {
                alert("Book created successfully.");
                onClose();
            } else {
                alert("Book creation failed.");
            }
        } catch (err: any) {
            if (err.response) {
                console.error("Error:", err.response.data);
                alert("Error: " + JSON.stringify(err.response.data));
            } else {
                console.error("Unknown error:", err);
                alert("An unexpected error occurred.");
            }
        }
    };

    return (
        <div className="fixed inset-0 bg-white bg-opacity-70 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-200">
                <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
                    Add New Book
                </h2>
                <form onSubmit={handleSubmit} className="space-y-5">
                    <input
                        name="title"
                        value={form.title}
                        onChange={handleChange}
                        placeholder="Title"
                        required
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                    />
                    <input
                        name="author"
                        value={form.author}
                        onChange={handleChange}
                        placeholder="Author"
                        required
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                    />
                    <select
                        name="category"
                        value={form.category}
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                    >
                        <option value="" disabled>
                            Select Category
                        </option>
                        <option value="fiction">Fiction</option>
                        <option value="non-fiction">Non-fiction</option>
                        <option value="biography">Biography</option>
                        <option value="science">Science</option>
                        <option value="history">History</option>
                        {/* Add more categories as needed */}
                    </select>
                    <input
                        name="price"
                        value={form.price}
                        onChange={handleChange}
                        placeholder="Price (USD)"
                        type="number"
                        min="0"
                        step="0.01"
                        required
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                    />
                    <textarea
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        placeholder="Description"
                        rows={4}
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition resize-none"
                    />
                    <label
                        htmlFor="photo-upload"
                        className="block cursor-pointer rounded-lg border-2 border-dashed border-gray-300 px-4 py-6 text-center text-gray-500 hover:border-blue-400 hover:text-blue-600 transition"
                    >
                        {photoFile ? photoFile.name : "Click to upload book cover photo"}
                        <input
                            id="photo-upload"
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="hidden"
                        />
                    </label>

                    <div className="flex justify-end space-x-4 pt-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-5 py-2 rounded-md border border-gray-300 text-gray-600 hover:bg-gray-100 transition"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-6 py-2 rounded-md bg-green-600 text-white hover:bg-green-700 transition"
                        >
                            Add Book
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateBookModal;
