import { useState, useEffect, useRef, useMemo } from "react";
import { ChevronDown, Search, Check } from "lucide-react";
import { countryCodes } from "../../constants/countryCodes";
import {
  AsYouType,
  parsePhoneNumber,
  validatePhoneNumberLength,
} from "libphonenumber-js";
import ReactCountryFlag from "react-country-flag";

const NewPhoneInput = ({
  value = "",
  onChange,
  error,
  touched,
  disabled = false,
  label,
  name,
  placeholder = "Mobile Number",
  className = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef(null);
  const inputRef = useRef(null);

  const findCountryFromValue = (phoneValue) => {
    if (!phoneValue) return countryCodes.find((c) => c.code === "IN");

    try {
      const phoneNumber = parsePhoneNumber(phoneValue);
      if (phoneNumber && phoneNumber.country) {
        const found = countryCodes.find((c) => c.code === phoneNumber.country);
        if (found) return found;
      }
    } catch (e) {
      // Ignore parsing errors and fallback to manual matching
    }

    const sortedCodes = [...countryCodes].sort(
      (a, b) => b.dial_code.length - a.dial_code.length,
    );
    const found = sortedCodes.find((c) => {
      const mainPrefix = c.dial_code.split(",")[0].trim();
      return phoneValue.startsWith(mainPrefix.replace(/-/g, ""));
    });

    return found || countryCodes.find((c) => c.code === "IN");
  };

  const [selectedCountry, setSelectedCountry] = useState(() =>
    findCountryFromValue(value),
  );

  const getLocalNumber = (fullValue, country) => {
    if (!fullValue) return "";

    try {
      const prefix = country.dial_code.split(",")[0].trim().replace(/-/g, "");
      if (fullValue.startsWith(prefix)) {
        const rawLocal = fullValue.slice(prefix.length);
        return new AsYouType(country.code).input(rawLocal);
      }
    } catch (e) {}

    return fullValue;
  };

  const [localNumber, setLocalNumber] = useState(() =>
    getLocalNumber(value, selectedCountry),
  );

  useEffect(() => {
    if (value) {
      const newCountry = findCountryFromValue(value);
      if (newCountry.code !== selectedCountry.code) {
        setSelectedCountry(newCountry);
      }
      const prefix = newCountry.dial_code
        .split(",")[0]
        .trim()
        .replace(/-/g, "");
      if (value.startsWith(prefix)) {
        setLocalNumber(value.slice(prefix.length));
      } else {
        setLocalNumber(value);
      }
    } else {
      setLocalNumber("");
    }
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredCountries = useMemo(() => {
    return countryCodes.filter(
      (country) =>
        country.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        country.dial_code.includes(searchTerm) ||
        country.code.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [searchTerm]);

  const handleCountrySelect = (country) => {
    setSelectedCountry(country);
    setIsOpen(false);
    setSearchTerm("");

    const prefix = country.dial_code.split(",")[0].trim().replace(/-/g, "");
    const newValue = prefix + localNumber;
    if (onChange) {
      onChange(newValue);
    }

    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handlePhoneChange = (e) => {
    const userInput = e.target.value.replace(/[^0-9]/g, "");

    const prefix = selectedCountry.dial_code
      .split(",")[0]
      .trim()
      .replace(/-/g, "");

    const fullValue = prefix + userInput;

    if (selectedCountry.code === "IN" && userInput.length > 10) {
      return;
    }
    const lengthStatus = validatePhoneNumberLength(
      fullValue,
      selectedCountry.code,
    );
    if (lengthStatus === "TOO_LONG") {
      return;
    }

    const formattedLocal = new AsYouType(selectedCountry.code).input(userInput);
    setLocalNumber(formattedLocal);
    onChange?.(fullValue);
  };

  const displayDialCode = selectedCountry.dial_code.split(",")[0].trim();

  return (
    <div className={`relative group ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}

      <div className="relative">
        <div
          className={`flex items-center w-full bg-white border rounded-xl transition-all duration-200 ${
            touched && error
              ? "border-red-300 focus-within:ring-2 focus-within:ring-red-200"
              : disabled
                ? "border-transparent bg-gray-50!"
                : "border-gray-300 focus-within:ring-2 focus-within:ring-[#501F08] focus-within:border-transparent"
          }`}
        >
          <button
            type="button"
            onClick={() => !disabled && setIsOpen(!isOpen)}
            className={`flex items-center gap-2 px-3 py-2.5 transition-colors rounded-l-lg border-r border-gray-200 shrink-0 ${
              disabled ? "cursor-default! disabled:bg-gray-50" : "cursor-pointer"
            }`}
            disabled={disabled}
          >
            <ReactCountryFlag
              countryCode={selectedCountry.code}
              svg
              style={{
                width: "1.5em",
                height: "1.5em",
              }}
              title={selectedCountry.name}
            />
            <ChevronDown
              className={`w-3 h-3 text-gray-400 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
            />
          </button>

          <div className="pl-3 text-gray-500 disabled:bg-gray-50! font-medium text-sm select-none shrink-0">
            {displayDialCode}
          </div>

          <input
            ref={inputRef}
            type="tel"
            name={name}
            value={localNumber}
            onChange={handlePhoneChange}
            placeholder={placeholder}
            disabled={disabled}
            className="w-full py-2.5 px-2 bg-transparent border-none focus:ring-0 text-sm text-gray-900 placeholder-gray-400 disabled:text-gray-500 disabled:bg-gray-50 outline-none"
          />
        </div>
      </div>

      {touched && error && (
        <p className="text-red-500 text-xs mt-1 ml-1">{error}</p>
      )}

      {isOpen && !disabled && (
        <div
          ref={dropdownRef}
          className="absolute z-50 top-full left-0 mt-2 w-80 max-h-80 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-200"
        >
          <div className="p-3 bg-gray-50 border-b border-gray-100 sticky top-0 z-10">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search country..."
                className="w-full pl-9 pr-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#501F08]/20 focus:border-[#501F08]"
                autoFocus
              />
            </div>
          </div>

          <div className="overflow-y-auto flex-1 p-1 scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent">
            {filteredCountries.length > 0 ? (
              filteredCountries.map((country) => (
                <button
                  key={country.code}
                  type="button"
                  onClick={() => handleCountrySelect(country)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm transition-colors ${
                    selectedCountry.code === country.code
                      ? "bg-[#501F08]/5 text-[#501F08] font-medium"
                      : "hover:bg-gray-50 text-gray-700"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <ReactCountryFlag
                      countryCode={country.code}
                      svg
                      style={{
                        width: "1.2em",
                        height: "1.2em",
                      }}
                      className="shrink-0"
                      title={country.name}
                    />
                    <span className="truncate text-left">{country.name}</span>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-gray-400 text-xs">
                      {country.dial_code.split(",")[0]}
                    </span>
                    {selectedCountry.code === country.code && (
                      <Check className="w-4 h-4 text-[#501F08]" />
                    )}
                  </div>
                </button>
              ))
            ) : (
              <div className="p-4 text-center text-gray-500 text-sm">
                No results found
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NewPhoneInput;
