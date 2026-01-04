// src/components/common/Toast.tsx
import React from "react";

interface ToastProps {
    message: string;
    onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, onClose }) => {
    return (
        <div className="fixed bottom-5 right-5 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg animate-bounce z-50">
            {message}
            <button className="ml-3 font-bold" onClick={onClose}>×</button>
        </div>
    );
};
