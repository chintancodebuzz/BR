import React, { useState } from "react";
import {
  Calendar,
  Clock,
  Users,
  Award,
  Star,
  Play,
  ChevronRight,
  CheckCircle,
  BookOpen,
  TrendingUp,
  Shield,
  Zap,
} from "lucide-react";

const Academy = () => {
  const [selectedCourse, setSelectedCourse] = useState(0);
  const [hoveredCard, setHoveredCard] = useState(null);

  const courses = [
    {
      id: 1,
      title: "Beginner Nail Art",
      level: "Beginner",
      duration: "4 Weeks",
      sessions: "8 Sessions",
      price: "$299",
      originalPrice: "$399",
      students: "245",
      rating: "4.9",
      features: [
        "Basic Techniques",
        "Tools & Materials",
        "Color Theory",
        "Practice Kit",
      ],
      color: "bg-linear-to-r from-[#501F08]/10 to-[#9e5d61]/10",
      badge: "Most Popular",
      badgeColor: "bg-linear-to-r from-[#501F08] to-[#9e5d61]",
    },
    {
      id: 2,
      title: "Advanced Gel Techniques",
      level: "Advanced",
      duration: "6 Weeks",
      sessions: "12 Sessions",
      price: "$499",
      originalPrice: "$599",
      students: "187",
      rating: "4.8",
      features: [
        "Gel Application",
        "3D Art",
        "Crystal Designs",
        "Professional Kit",
      ],
      color: "bg-linear-to-r from-[#9e5d61]/10 to-[#501F08]/10",
      badge: "Trending",
      badgeColor: "bg-linear-to-r from-[#9e5d61] to-[#501F08]",
    },
    {
      id: 3,
      title: "Professional Masterclass",
      level: "Pro",
      duration: "8 Weeks",
      sessions: "16 Sessions",
      price: "$799",
      originalPrice: "$999",
      students: "132",
      rating: "5.0",
      features: [
        "Business Setup",
        "Client Management",
        "Advanced Art",
        "Certification",
      ],
      color: "bg-linear-to-r from-[#501F08]/10 via-[#9e5d61]/10 to-[#501F08]/10",
      badge: "Certified",
      badgeColor: "bg-linear-to-r from-amber-500 to-orange-600",
    },
  ];

  const features = [
    {
      icon: <Award className="w-8 h-8" />,
      title: "Certified Instructors",
      description: "Learn from industry experts with 10+ years experience",
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Lifetime Access",
      description: "Access course materials and updates forever",
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Career Support",
      description: "Job placement assistance and business guidance",
    },
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: "Hands-on Training",
      description: "Practical sessions with professional tools",
    },
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Former Student",
      text: "The academy transformed my hobby into a career. I now run my own successful nail studio!",
      rating: 5,
      avatar: "SJ",
    },
    {
      name: "Maria Gonzalez",
      role: "Professional Nail Artist",
      text: "The advanced techniques I learned here doubled my client base in just 3 months.",
      rating: 5,
      avatar: "MG",
    },
    {
      name: "Lisa Chen",
      role: "Salon Owner",
      text: "The business training was invaluable. My revenue increased by 300% after implementing their strategies.",
      rating: 5,
      avatar: "LC",
    },
  ];

  return (
    <section className="relative min-h-screen bg-[#FDFDFD] overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating Nail Polish Bottles */}
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute opacity-5"
            style={{
              top: `${20 + i * 15}%`,
              left: i % 2 === 0 ? `${5 + i * 8}%` : `${85 - i * 8}%`,
              transform: `rotate(${i * 15}deg)`,
            }}
          >
            <div className="w-8 h-32 bg-linear-to-b from-[#501F08] to-[#9e5d61] rounded-t-lg"></div>
          </div>
        ))}

        {/* Gradient Orbs */}
        <div className="absolute top-10 right-1/4 w-96 h-96 bg-linear-to-r from-[#501F08]/5 to-[#9e5d61]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 left-1/4 w-96 h-96 bg-linear-to-l from-[#501F08]/5 to-[#9e5d61]/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative mx-auto px-6 md:px-12 lg:px-24 py-20">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <span className="px-4 py-2 bg-linear-to-r from-[#501F08] to-[#9e5d61] text-white text-sm font-semibold rounded-full">
              PREMIUM NAIL EDUCATION
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-[#501F08] mb-6 tracking-tighter leading-tight">
            BR NAILS
            <span className="block text-4xl md:text-5xl lg:text-6xl text-[#9e5d61] mt-2">
              ACADEMY
            </span>
          </h1>
          <div className="relative inline-block">
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Transform your passion into a profession with our comprehensive
              nail art courses taught by industry experts
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {[
            {
              value: "500+",
              label: "Graduates",
              icon: <Users className="w-6 h-6" />,
            },
            {
              value: "98%",
              label: "Success Rate",
              icon: <TrendingUp className="w-6 h-6" />,
            },
            {
              value: "4.9/5",
              label: "Rating",
              icon: <Star className="w-6 h-6" />,
            },
            {
              value: "50+",
              label: "Techniques",
              icon: <Zap className="w-6 h-6" />,
            },
          ].map((stat, index) => (
            <div
              key={index}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50 transition-all duration-300 hover:shadow-xl hover:scale-[1.02]"
            >
              <div className="flex items-center space-x-4">
                <div className="p-3 rounded-xl bg-linear-to-r from-[#501F08]/10 to-[#9e5d61]/10 text-[#501F08]">
                  {stat.icon}
                </div>
                <div>
                  <div className="text-3xl font-bold text-[#501F08]">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Courses Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-[#333333] mb-4">
              Master the Art of Nails
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Choose from our carefully curated courses designed for every skill
              level
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {courses.map((course, index) => (
              <div
                key={course.id}
                className={`relative group cursor-pointer transition-all duration-500 ${selectedCourse === index ? "scale-105 z-10" : ""
                  }`}
                // onMouseEnter={() => setHoveredCard(course.id)}
                // onMouseLeave={() => setHoveredCard(null)}
                onClick={() => setSelectedCourse(index)}
              >
                {/* Card Background */}
                <div
                  className={`absolute inset-0 rounded-3xl ${course.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                ></div>

                {/* Main Card */}
                <div className="relative bg-white/90 backdrop-blur-sm rounded-3xl overflow-hidden shadow-2xl border border-white/50 h-full">
                  {/* Badge */}
                  {course.badge && (
                    <div className="absolute top-4 right-4 z-10">
                      <span
                        className={`${course.badgeColor} text-white px-4 py-1.5 rounded-full text-xs font-bold shadow-lg`}
                      >
                        {course.badge}
                      </span>
                    </div>
                  )}

                  {/* Course Header */}
                  <div className="p-8">
                    <div className="mb-4">
                      <span className="px-3 py-1 bg-[#501F08]/10 text-[#501F08] text-sm font-semibold rounded-full">
                        {course.level}
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold text-[#333333] mb-4">
                      {course.title}
                    </h3>

                    {/* Course Details */}
                    <div className="space-y-3 mb-6">
                      <div className="flex items-center space-x-2 text-gray-600">
                        <Calendar className="w-4 h-4" />
                        <span>{course.duration}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-gray-600">
                        <Clock className="w-4 h-4" />
                        <span>{course.sessions}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-gray-600">
                        <Users className="w-4 h-4" />
                        <span>{course.students} Students</span>
                      </div>
                      <div className="flex items-center space-x-2 text-gray-600">
                        <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                        <span>{course.rating} Rating</span>
                      </div>
                    </div>

                    {/* Features */}
                    <div className="space-y-2 mb-8">
                      {course.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span className="text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>

                    {/* Price */}
                    <div className="mb-6">
                      <div className="flex items-baseline space-x-2">
                        <span className="text-4xl font-bold text-[#501F08]">
                          {course.price}
                        </span>
                        <span className="text-lg text-gray-500 line-through">
                          {course.originalPrice}
                        </span>
                      </div>
                    </div>

                    {/* Enroll Button */}
                    <button className="w-full group relative px-6 py-4 bg-linear-to-r from-[#501F08] to-[#9e5d61] text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                      <span className="relative z-10">Enroll Now</span>
                      <div className="absolute inset-0 bg-linear-to-r from-[#9e5d61] to-[#501F08] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="absolute top-1/2 -translate-y-1/2 right-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 translate-x-4 transition-all duration-300">
                        <ChevronRight className="w-5 h-5" />
                      </div>
                    </button>
                  </div>
                </div>

                {/* Hover Effects */}
                {hoveredCard === course.id && (
                  <div className="absolute -inset-4 rounded-3xl border-2 border-transparent bg-linear-to-r from-[#501F08] via-[#9e5d61] to-[#501F08] opacity-30 animate-spin-slow"></div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Features Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-[#333333] mb-4">
              Why Choose Our Academy?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Experience education that goes beyond the classroom
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group relative bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/50 transition-all duration-300 hover:shadow-xl hover:scale-[1.02]"
              >
                <div className="mb-4">
                  <div className="p-4 rounded-xl bg-linear-to-r from-[#501F08]/10 to-[#9e5d61]/10 text-[#501F08] inline-block">
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-[#333333] mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>

                {/* Hover Arrow */}
                <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <ChevronRight className="w-5 h-5 text-[#501F08]" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Video Preview */}
        {/* <div className="mb-20">
          <div className="bg-linear-to-r from-[#501F08]/10 via-[#9e5d61]/10 to-[#501F08]/10 rounded-3xl p-12 relative overflow-hidden">
            <div className="relative z-10 text-center">
              <h2 className="text-4xl font-bold text-[#333333] mb-6">
                See Our Classes in Action
              </h2>
              <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                Get a sneak peek into our interactive learning environment
              </p>
              <button className="group relative inline-flex items-center px-8 py-4 bg-linear-to-r from-[#501F08] to-[#9e5d61] text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                <div className="relative flex items-center space-x-3">
                  <div className="relative">
                    <div className="absolute inset-0 bg-white/20 rounded-full scale-150 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <Play className="w-6 h-6 fill-white ml-1" />
                  </div>
                  <span>Watch Academy Tour</span>
                </div>
                <div className="absolute inset-0 bg-linear-to-r from-[#9e5d61] to-[#501F08] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            </div>

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-linear-to-r from-[#501F08]/5 to-[#9e5d61]/5 rounded-full blur-2xl"></div>
          </div>
        </div> */}

        {/* Testimonials */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-[#333333] mb-4">
              Success Stories
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Hear from our graduates who transformed their careers
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="relative group bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/50 transition-all duration-300 hover:shadow-xl"
              >
                {/* Quote Mark */}
                <div className="absolute top-6 right-6 text-[#501F08]/20 text-6xl font-serif">
                  "
                </div>

                <div className="mb-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-linear-to-r from-[#501F08] to-[#9e5d61] rounded-full flex items-center justify-center text-white font-bold">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <h4 className="font-bold text-[#333333]">
                        {testimonial.name}
                      </h4>
                      <p className="text-sm text-gray-500">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                </div>

                <p className="text-gray-700 mb-6 italic">{testimonial.text}</p>

                {/* Stars */}
                <div className="flex space-x-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 text-amber-500 fill-amber-500"
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        {/* <div className="text-center">
          <div className="bg-linear-to-r from-[#501F08] to-[#9e5d61] rounded-3xl p-12 relative overflow-hidden">
            <div className="relative z-10">
              <h2 className="text-4xl font-bold text-white mb-6">
                Ready to Start Your Journey?
              </h2>
              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                Join hundreds of successful nail artists who began their career
                with us
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="px-8 py-4 bg-white text-[#501F08] rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                  Schedule a Consultation
                </button>
                <button className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-xl font-semibold hover:bg-white/10 transition-all duration-300 hover:scale-105">
                  Download Course Brochure
                </button>
              </div>
            </div>

            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-2xl"></div>
          </div>
        </div> */}
      </div>

      {/* Add custom animation */}
      <style jsx global>{`
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default Academy;
