import React from "react";
import type {UseFormRegister} from "react-hook-form";

interface InputFieldProps {
    label: string;
    name: string;
    placeholder?: string;
    type?: string;
    register: UseFormRegister<any>;
}

const InputField: React.FC<InputFieldProps> = ({ label, name, placeholder, type = "text", register }) => (
    <div className="mb-4">
        <label className="block text-sm font-semibold text-gray-700 mb-1">{label}</label>
        {
            type === "textarea" ? (
                <textarea
                    {...register(name)}
                    placeholder={placeholder}
                    className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            ) : (
                <input
                    type={type}
                    {...register(name)}
                    placeholder={placeholder}
                    className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            )
        }
    </div>
);

export default InputField;
