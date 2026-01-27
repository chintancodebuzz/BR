import React, { useState, useEffect } from "react";
import ContactView from "../view/contact.view";
import { Mail, Phone, MapPin, Clock } from "lucide-react";

const ContactContainer = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate API call
        setTimeout(() => {
            setIsSubmitting(false);
            setIsSubmitted(true);
            setFormData({
                name: "",
                email: "",
                phone: "",
                subject: "",
                message: "",
            });

            // Reset success message after 5 seconds
            setTimeout(() => {
                setIsSubmitted(false);
            }, 5000);
        }, 1500);
    };

    const contactInfo = [
        {
            icon: <Phone className="w-6 h-6" />,
            title: "Phone Number",
            info: "+1 (555) 123-4567",
            subInfo: "Mon-Sat, 9AM-7PM",
            color: "from-[#501F08]/10 to-[#9e5d61]/10",
            iconColor: "text-[#501F08]",
        },
        {
            icon: <Mail className="w-6 h-6" />,
            title: "Email Address",
            info: "hello@brnails.com",
            subInfo: "Response within 24 hours",
            color: "from-[#9e5d61]/10 to-[#501F08]/10",
            iconColor: "text-[#9e5d61]",
        },
        {
            icon: <MapPin className="w-6 h-6" />,
            title: "Studio Location",
            info: "123 Beauty Street",
            subInfo: "New York, NY 10001",
            color: "from-[#501F08]/10 to-[#9e5d61]/10",
            iconColor: "text-[#501F08]",
        },
        {
            icon: <Clock className="w-6 h-6" />,
            title: "Working Hours",
            info: "Mon - Sat: 9AM - 7PM",
            subInfo: "Sunday: 10AM - 5PM",
            color: "from-[#9e5d61]/10 to-[#501F08]/10",
            iconColor: "text-[#9e5d61]",
        },
    ];

    return (
        <ContactView
            formData={formData}
            isSubmitting={isSubmitting}
            isSubmitted={isSubmitted}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            contactInfo={contactInfo}
            loading={loading}
        />
    );
};

export default ContactContainer;
