import { ReactNode } from "react";

interface FormInputProps {
  icon: ReactNode;
  type: string;
  placeholder: string;
  value: string;
  onChange: (val: string) => void;
  rightIcon?: ReactNode;
}

export const FormInput = ({ icon, type, placeholder, value, onChange, rightIcon }: FormInputProps) => (
  <div className="relative mb-4 border-b border-gray-300 py-2 flex items-center gap-3">
    <span className="text-gray-400">{icon}</span>
    <input
      type={type}
      placeholder={placeholder}
      className="w-full bg-transparent focus:outline-none text-sm text-black"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
    {rightIcon && <span className="text-gray-400 cursor-pointer">{rightIcon}</span>}
  </div>
);