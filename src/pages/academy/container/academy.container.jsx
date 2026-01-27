import React, { useState, useEffect } from "react";
import AcademyView from "../view/academy.view";
import { Award, Shield, TrendingUp, BookOpen } from "lucide-react";

const AcademyContainer = () => {
    const [selectedCourse, setSelectedCourse] = useState(0);
    const [hoveredCard, setHoveredCard] = useState(null);
    const [loading, setLoading] = useState(false);

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
        <AcademyView
            selectedCourse={selectedCourse}
            setSelectedCourse={setSelectedCourse}
            hoveredCard={hoveredCard}
            setHoveredCard={setHoveredCard}
            courses={courses}
            features={features}
            testimonials={testimonials}
            loading={loading}
        />
    );
};

export default AcademyContainer;
