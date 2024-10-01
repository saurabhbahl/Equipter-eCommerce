interface InputFieldProps {
  label?: string;
  type: string;
  id: string;
  name: string;
  placeholder?:string,
  required?: boolean;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField = ({label,  type,  id,  name,  required = false,  value,  onChange,placeholder}: InputFieldProps) => {
  return (
    <div className={`${label?"mb-4":""}`}>
      <label htmlFor={id} className="block font-medium text-custom-gray">
        {label}
      </label>
      <input
        type={type}
        id={id}
        name={name}
        required={required}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="mt-1 font-arial text-xs block w-full p-2 border border-inset border-custom-gray-200 outline-none py-1 px-3 h-10"
      />
    </div>
  );
};

export default InputField;
