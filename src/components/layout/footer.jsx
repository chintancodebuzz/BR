import Insta from "../../assets/footer/insta.svg";
import Twitter from "../../assets/footer/twitter.svg";
import Facebook from "../../assets/footer/facebook.svg";
import Linkedin from "../../assets/footer/linkedin.svg";
import Call from "../../assets/footer/call.svg";
import Mail from "../../assets/footer/mail.svg";
import Location from "../../assets/footer/location.svg";
import White_log from "../../assets/footer/white_logo.svg";

export default function Footer() {
  const socialIcons = [Insta, Twitter, Facebook, Linkedin];

  return (
    <footer className="bg-[#501F08] text-white">
      <div className="mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-24 py-10 lg:py-14">
        {/* Mobile First: Single Column, Tablet: 2 Columns, Desktop: 4 Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
          {/* Logo + About - Full width on mobile, spans 2 columns on tablet */}
          <div className="sm:col-span-2 lg:col-span-1 flex flex-col items-center sm:items-start text-center sm:text-left">
            <div className="mb-4">
              <img
                src={White_log}
                alt="GlamNails Logo"
                width={100}
                height={120}
                className="w-20 h-auto sm:w-24 md:w-28"
              />
            </div>

            <p className="text-md text-gray-200 max-w-xs sm:max-w-sm mb-4 sm:mb-6 text-balance">
              At GlamNails, we believe that your nails are more than just an
              accessory — they are a canvas for self-expression, creativity, and
              ultimate glamour.
            </p>

            {/* Social Icons */}
            <div className="flex justify-center sm:justify-start space-x-3">
              {socialIcons.map((icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center hover:scale-110 transition-all duration-300"
                  aria-label={`Follow us on ${
                    ["Instagram", "Twitter", "Facebook", "LinkedIn"][i]
                  }`}
                >
                  <img src={icon} alt="" className="w-6 h-6 sm:w-8 sm:h-8" />
                </a>
              ))}
            </div>
          </div>

          {/* Information */}
          <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
            <h3 className="text-xl font-semibold mb-4 text-white">
              Information
            </h3>
            <ul className="space-y-2.5 text-md text-gray-200">
              {["Home", "About Us", "Services", "Our Team", "Portfolio"].map(
                (item, i) => (
                  <li key={i}>
                    <a
                      href="#"
                      className="hover:text-white transition-colors duration-200 block py-1"
                    >
                      {item}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Opening Hours */}
          <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
            <h3 className="text-xl font-semibold mb-4 text-white">
              Opening Hours
            </h3>
            <ul className="space-y-2.5 text-md text-gray-200">
              <li className="py-1">Monday–Friday: 09:00–19:00</li>
              <li className="py-1">Saturday: 10:00–17:00</li>
              <li className="py-1">Sunday: 10:00–16:00</li>
            </ul>
          </div>

          {/* Contact */}
          <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
            <h3 className="text-xl font-semibold mb-4 text-white">Contact</h3>
            <ul className="space-y-3 text-md text-gray-200">
              <li className="flex flex-col sm:flex-row sm:items-center gap-2 py-1">
                <div className="flex items-center justify-center sm:justify-start gap-2">
                  <img
                    src={Location}
                    alt="Location icon"
                    className="w-6 h-6 sm:w-8 sm:h-8 shrink-0"
                  />
                  <span className="sm:hidden">Address:</span>
                </div>
                <span className="sm:mt-0.5">
                  1448 Alpha Avenue
                  <br />
                  Jacksonville, USA
                </span>
              </li>
              <li className="flex flex-col sm:flex-row sm:items-center gap-2 py-1">
                <div className="flex items-center justify-center sm:justify-start gap-2">
                  <img
                    src={Call}
                    alt="Phone icon"
                    className="w-6 h-6 sm:w-8 sm:h-8 shrink-0"
                  />
                  <span className="sm:hidden">Phone:</span>
                </div>
                <span className="sm:mt-0.5">904-248-2558</span>
              </li>
              <li className="flex flex-col sm:flex-row sm:items-center gap-2 py-1">
                <div className="flex items-center justify-center sm:justify-start gap-2">
                  <img
                    src={Mail}
                    alt="Email icon"
                    className="w-6 h-6 sm:w-8 sm:h-8 shrink-0"
                  />
                  <span className="sm:hidden">Email:</span>
                </div>
                <span className="sm:mt-0.5 break-all">nailart@yahoo.com</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
