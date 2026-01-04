import React from "react";
import type {UseFormRegister} from "react-hook-form";

interface SelectFieldProps {
    label: string;
    name: string;
    options: { value: string; label: string }[];
    register: UseFormRegister<any>;
}

const SelectField: React.FC<SelectFieldProps> = ({ label, name, options, register }) => (
    <div className="mb-4">
        <label className="block text-sm font-semibold text-gray-700 mb-1">{label}</label>
        <select
            {...register(name)}
            className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
            {options.map((option) => (
                <option key={option.value} value={option.value}>{option.label}</option>
            ))}
        </select>
    </div>
);

export default SelectField;
