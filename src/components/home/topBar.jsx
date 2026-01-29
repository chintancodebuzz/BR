import { useSelector } from "react-redux";

export default function TopBar() {
  const { headlines } = useSelector((state) => state.home);

  const staticSlogans = [
    "Last up to 4 weeks each wear",
    "Handcrafted by nail techs using gel",
    "Salon quality in under 10 min",
    "Zero nail damage & reusable for life",
    "BUY 2 GET 1 FREE",
  ];

  const displaySlogans = headlines && headlines.length > 0
    ? headlines.map(h => h.text)
    : staticSlogans;

  return (
    <div className="fixed top-0 left-0 w-full z-50 bg-[#501F08] overflow-hidden whitespace-nowrap">
      <div className="flex w-max animate-marquee">
        {[...displaySlogans, ...displaySlogans].map((text, i) => (
          <span
            key={i}
            className="text-white px-6 py-1 text-sm md:text-[14px] font-light"
          >
            {text}
          </span>
        ))}
      </div>
    </div>
  );
}
