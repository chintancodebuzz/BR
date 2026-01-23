import React from "react";
import logo from "../../assets/logos/favicon.png";
import { Link } from "react-router-dom";
import { Sparkles, Award, Heart, ArrowRight } from "lucide-react";

const About = () => {
  const features = [
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: "Premium Quality",
      description: "Handpicked products for exceptional results",
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: "Expert Crafted",
      description: "Professional-grade nail care solutions",
    },
    {
      icon: <Heart className="w-6 h-6" />,
      title: "Customer Love",
      description: "Trusted by thousands of beauty enthusiasts",
    },
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#fdf9f7] via-white to-[#fdf9f7] py-20">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#501F08]/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#501F08]/5 rounded-full blur-3xl"></div>

      <div className="relative mx-auto px-6 md:px-12 lg:px-24">
        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* LEFT CONTENT */}
          <div className="space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#501F08]/10 rounded-full border border-[#501F08]/20">
              <Sparkles className="w-4 h-4 text-[#501F08]" />
              <span className="text-sm font-semibold text-[#501F08]">
                Premium Nail Care Brand
              </span>
            </div>

            {/* Brand Title */}
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-4">
                Welcome to{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#501F08] to-[#8b3b14]">
                  BR Nails
                </span>
              </h1>
              <div className="w-24 h-1.5 bg-gradient-to-r from-[#501F08] to-[#8b3b14] rounded-full"></div>
            </div>

            {/* Description */}
            <div className="space-y-4">
              <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
                Elevating beauty through premium nail artistry and professional
                care. We bring luxury, creativity, and confidence to every
                detail.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Discover a world where innovation meets style, and every nail
                tells a story of perfection, passion, and bold self-expression.
              </p>
            </div>

            {/* Features Grid */}
            {/* <div className="grid sm:grid-cols-3 gap-4 pt-4">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="group p-4 bg-white rounded-xl border border-gray-100 hover:border-[#501F08]/30 hover:shadow-lg transition-all duration-300"
                >
                  <div className="w-12 h-12 bg-[#501F08]/10 rounded-lg flex items-center justify-center text-[#501F08] mb-3 group-hover:scale-110 transition-transform">
                    {feature.icon}
                  </div>
                  <h3 className="font-bold text-gray-900 mb-1">{feature.title}</h3>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div> */}

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 pt-4">
              <Link
                to="/products"
                className="group px-8 py-3.5 bg-[#501F08] text-white rounded-xl font-semibold hover:bg-[#3a1606] transition-all shadow-lg shadow-[#501F08]/25 hover:shadow-[#501F08]/40 flex items-center gap-2"
              >
                Explore Collection
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/academy"
                className="relative group px-8 py-3 overflow-hidden rounded-xl bg-transparent border-2 border-[#501F08] text-[#501F08] font-semibold transition-all duration-300 hover:text-white"
              >
                <span className="relative z-10">Learn Nail Art</span>
                <div className="absolute inset-0 bg-[#501F08] transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
              </Link>
            </div>
          </div>

          {/* RIGHT LOGO */}
          <div className="relative flex items-center justify-end">
            {/* Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#501F08]/20 to-transparent rounded-full blur-3xl"></div>

            {/* Logo Container */}
            <div className="relative group">
              {/* Rotating Border */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#501F08] to-[#8b3b14] rounded-full blur-xl opacity-50 group-hover:opacity-75 transition-opacity"></div>

              {/* Logo Card */}
              <div className="relative bg-white rounded-3xl p-8 shadow-2xl border border-gray-100 group-hover:scale-105 transition-transform duration-500">
                <img
                  src={logo}
                  alt="BR Nails Logo"
                  className="w-64 md:w-80 lg:w-96 object-contain animate-float"
                />
              </div>

              {/* Decorative Dots */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-[#501F08]/10 rounded-full"></div>
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-[#8b3b14]/10 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Accent Bar */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#501F08] via-[#8b3b14] to-[#501F08]"></div>

      {/* Animation Keyframes */}
      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default About;
