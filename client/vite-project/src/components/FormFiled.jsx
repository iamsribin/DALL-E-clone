import React from "react";

const FormFiled = ({
  labelName,
  type,
  name,
  placeholder,
  value,
  handleChange,
  isSurpriseMe,
  handleSurpriseMe,
}) => {
  return (
    <div>
      <div className="flex items-center gap-2 mb-2 ">
        <label
          htmlFor={name}
          className="block text-sm font-medium text-gray-900"
        >
          {labelName}
          {isSurpriseMe && (
            <button
              type="button"
              onClick={handleSurpriseMe}
              className="font-semibold text-xs bg-[#ECECF1] py-1 px-2 rounded[5px] text-black"
            >
              surprise me
            </button>
          )}
        </label>
      </div>
      <input
        type={type}
        name={name}
        id={name}
        value={value}
        placeholder={placeholder}
        onChange={handleChange}
        required
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[4649ff] focus:border-[4649ff] outline-none bolck p-3 w-full"
      />
    </div>
  );
};

export default FormFiled;
