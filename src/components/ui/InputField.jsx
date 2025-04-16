import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const InputField = ({ label, value, setValue, symbol = "€", isException = false }) => {
  const [inputValue, setInputValue] = useState(value !== 0 ? value : "");

  useEffect(() => {
    if (value === 0) {
      setInputValue("");
    } else {
      setInputValue(value.toString());
    }
  }, [value]);

  const handleChange = (e) => {
    let val = e.target.value;

    if (isException) {
      // N'autorise que les lettres, espaces et tirets (ajuste selon tes besoins)
      val = val.replace(/[^a-zA-ZÀ-ÿ\s-]/g, "");
    } else {
      // Autoriser uniquement les chiffres, virgules et points
      val = val.replace(/[^0-9.,]/g, "");
    }

    setInputValue(val);

    if (isException) {
      setValue(val);
    }
  };

  const handleBlur = () => {
    if (!isException) {
      let parsed = parseFloat(inputValue.replace(",", "."));
      setValue(isNaN(parsed) ? 0 : parsed);
      setInputValue(isNaN(parsed) ? "0" : parsed.toString());
    } else {
      setValue(inputValue);
    }
  };

  const handleFocus = (e) => {
    if (inputValue === "0") {
      setInputValue("");
    }
  };

  return (
    <div className="flex-1 relative">
      <Label>{label}</Label>
      <div className="relative">
        <Input
          type="text"
          value={inputValue}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className="pr-10 leading-none"
        />
        {symbol && (
          <span className="absolute right-3 top-0 h-full flex items-center text-gray-500">
            {symbol}
          </span>
        )}
      </div>
    </div>
  );
};

export default InputField;
