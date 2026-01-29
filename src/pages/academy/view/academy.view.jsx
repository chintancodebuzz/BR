import React from "react";
import {
    Calendar,
    Clock,
    Users,
    Award,
    Star,
    ChevronRight,
    CheckCircle,
    TrendingUp,
    Zap,
} from "lucide-react";

import Skeleton from "../../../components/common/loading-skeletons";

const AcademyView = ({
    selectedCourse,
    setSelectedCourse,
    hoveredCard,
    setHoveredCard,
    courses,
    features,
    testimonials,
    loading
}) => {
    if (loading) {
        return (
            <div className="min-h-screen bg-[#FDFDFD] py-10 md:py-20 px-4 md:px-12 lg:px-24">
                <div className="space-y-20">
                    {/* Hero Skeleton */}
                    <div className="text-center space-y-6">
                        <Skeleton className="h-10 w-48 rounded-full mx-auto" />
                        <Skeleton className="h-16 w-1/2 rounded-2xl mx-auto" />
                        <Skeleton className="h-20 w-3/4 rounded-2xl mx-auto opacity-40" />
                    </div>
                    {/* Stats Skeleton */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
                        {[1, 2, 3, 4].map(i => (
                            <div key={i} className="h-20 md:h-24 bg-white border border-gray-100 rounded-2xl md:rounded-3xl p-3 md:p-6 flex items-center gap-2 md:gap-4">
                                <Skeleton className="w-10 h-10 md:w-12 md:h-12 rounded-xl" />
                                <div className="space-y-1 md:space-y-2 flex-1">
                                    <Skeleton className="h-5 md:h-6 w-1/2" />
                                    <Skeleton className="h-2 md:h-3 w-1/3 opacity-40" />
                                </div>
                            </div>
                        ))}
                    </div>
                    {/* Courses Skeleton */}
                    <div className="grid lg:grid-cols-3 gap-8">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="bg-white border border-gray-100 rounded-[32px] p-8 space-y-6 h-[500px]">
                                <Skeleton className="h-6 w-24 rounded-full" />
                                <Skeleton className="h-8 w-3/4" />
                                <div className="space-y-4">
                                    {[1, 2, 3, 4].map(j => <Skeleton key={j} className="h-4 w-1/2 opacity-40" />)}
                                </div>
                                <div className="pt-4"><Skeleton className="h-12 w-full rounded-xl" /></div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <section className="relative min-h-screen bg-[#FDFDFD] overflow-hidden">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                {/* Floating Nail Polish Bottles */}
                {[...Array(6)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute opacity-5 hidden md:block"
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

            <div className="relative mx-auto px-4 md:px-12 lg:px-24 py-10 md:py-20">
                {/* Hero Section */}
                <div className="text-center mb-16">
                    <div className="inline-block mb-4">
                        <span className="px-4 py-2 bg-linear-to-r from-[#501F08] to-[#9e5d61] text-white text-sm font-semibold rounded-full">
                            PREMIUM NAIL EDUCATION
                        </span>
                    </div>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#501F08] mb-4 md:mb-6 leading-tight">
                        BR NAILS
                        <span className="block text-xl md:text-3xl lg:text-4xl text-[#9e5d61] mt-1 md:mt-2">
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
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 mb-20">
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
                            <div className="flex items-center space-x-2 md:space-x-4">
                                <div className="p-2 md:p-3 rounded-xl bg-linear-to-r from-[#501F08]/10 to-[#9e5d61]/10 text-[#501F08] shrink-0">
                                    {stat.icon}
                                </div>
                                <div>
                                    <div className="text-lg md:text-3xl font-bold text-[#501F08] leading-tight">
                                        {stat.value}
                                    </div>
                                    <div className="text-[10px] md:text-sm text-gray-600 leading-tight">
                                        {stat.label}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Courses Section */}
                <div className="mb-20">
                    <div className="text-center mb-12">
                        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#333333] mb-4">
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
                                className={`relative group cursor-pointer transition-all duration-500 ${selectedCourse === index ? "md:scale-105 z-10" : ""
                                    }`}
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
                                            <div className="flex items-center space-x-2 text-gray-600 text-sm">
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
                                className="group relative bg-white/80 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-lg border border-white/50 transition-all duration-300 hover:shadow-xl hover:scale-[1.02]"
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
                                <div className="absolute top-2 right-4 text-[#501F08]/10 text-6xl font-serif">
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

export default AcademyView;
