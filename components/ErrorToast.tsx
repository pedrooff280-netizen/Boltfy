
import React, { useEffect, useState } from 'react';
import { AlertCircle, X } from 'lucide-react';

interface ErrorToastProps {
    message: string;
    onClose: () => void;
    duration?: number;
}

const ErrorToast: React.FC<ErrorToastProps> = ({ message, onClose, duration = 5000 }) => {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false);
            setTimeout(onClose, 300); // Wait for fade-out animation
        }, duration);

        return () => clearTimeout(timer);
    }, [duration, onClose]);

    return (
        <div className={`fixed bottom-6 right-6 z-[200] transition-all duration-300 transform-gpu ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="bg-slate-950 border border-wine-500/50 rounded-2xl p-4 shadow-2xl shadow-wine-900/40 flex items-center gap-4 min-w-[300px] backdrop-blur-xl">
                <div className="w-10 h-10 bg-wine-500/10 rounded-xl flex items-center justify-center text-wine-500">
                    <AlertCircle className="w-6 h-6" />
                </div>
                <div className="flex-1">
                    <p className="text-[10px] font-bold text-wine-500 uppercase tracking-widest mb-1">Atenção</p>
                    <p className="text-xs text-slate-200 font-medium leading-relaxed">{message}</p>
                </div>
                <button
                    onClick={() => {
                        setIsVisible(false);
                        setTimeout(onClose, 300);
                    }}
                    className="text-slate-500 hover:text-white transition-colors"
                >
                    <X className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
};

export default ErrorToast;
