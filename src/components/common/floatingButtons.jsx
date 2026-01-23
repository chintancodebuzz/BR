import { useEffect, useState } from "react";
import { FaWhatsapp, FaArrowUp } from "react-icons/fa";

export default function FloatingButtons() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowTop(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="fixed bottom-6 right-6 flex flex-col gap-4 z-50">
      {/* WhatsApp Button */}
      <a
        href="https://wa.me/919999999999" // <-- replace with your WhatsApp number
        target="_blank"
        rel="noopener noreferrer"
        className="w-12 h-12 flex items-center justify-center rounded-full bg-[#25d366] text-[#F6E6D6] shadow-lg hover:scale-110 transition-all duration-300"
      >
        <FaWhatsapp size={28} />
      </a>

      {/* Scroll to Top Button */}
      {showTop && (
        <button
          onClick={scrollToTop}
          className="w-12 h-12 flex items-center justify-center rounded-full bg-[#F6E6D6] text-[#501F08] shadow-lg hover:scale-110 transition-all duration-300"
        >
          <FaArrowUp size={22} />
        </button>
      )}
    </div>
  );
}
