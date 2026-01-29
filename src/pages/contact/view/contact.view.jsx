import React from "react";
import { Mail, Phone, MapPin, Send, Clock } from "lucide-react";

import { ContactSkeleton } from "../../../components/common/loading-skeletons";

const ContactView = ({
    formData,
    isSubmitting,
    isSubmitted,
    handleChange,
    handleSubmit,
    contactInfo,
    loading
}) => {
    if (loading) {
        return (
            <div className="min-h-screen bg-[#FDFDFD] py-10 md:py-20 px-4 md:px-12 lg:px-24">
                <ContactSkeleton />
            </div>
        );
    }

    return (
        <section className="relative min-h-screen bg-[#FDFDFD] overflow-hidden">
            {/* Decorative Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                {/* Abstract shapes */}
                <div className="absolute top-10 left-10 w-72 h-72 bg-linear-to-r from-[#501F08]/5 to-[#9e5d61]/5 rounded-full blur-3xl"></div>
                <div className="absolute bottom-10 right-10 w-96 h-96 bg-linear-to-l from-[#501F08]/5 to-[#9e5d61]/5 rounded-full blur-3xl"></div>

                {/* Nail polish bottle silhouettes */}
                <div className="absolute top-1/4 -left-12 w-24 h-32 rotate-12 opacity-10">
                    <div className="w-8 h-32 bg-linear-to-b from-[#501F08] to-[#9e5d61] rounded-t-lg mx-auto"></div>
                </div>
                <div className="absolute bottom-1/4 -right-12 w-24 h-32 -rotate-12 opacity-10">
                    <div className="w-8 h-32 bg-linear-to-b from-[#9e5d61] to-[#501F08] rounded-t-lg mx-auto"></div>
                </div>
            </div>

            <div className="relative mx-auto px-4 md:px-12 lg:px-24 py-10 md:py-20">
                {/* Header */}
                <div className="text-center mb-16">
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#501F08] mb-4 ">
                        GET IN TOUCH
                    </h1>
                    <div className="relative inline-block">
                        <div className="w-72 h-1 bg-linear-to-r from-accent via-primary to-accent mx-auto rounded-full mb-12"></div>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Let's create something beautiful together. Reach out for
                            appointments, inquiries, or just to say hello!
                        </p>
                    </div>
                </div>

                <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
                    {/* Contact Information Cards */}
                    <div className="space-y-8">
                        <h2 className="text-3xl font-bold text-[#501F08] mb-8">
                            Contact Information
                            <div className="w-72 h-1 bg-linear-to-r from-[#501F08] to-[#8b3b14] rounded-full mx-auto lg:mx-0 mt-2"></div>
                        </h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            {contactInfo.map((item, index) => (
                                <div
                                    key={index}
                                    className="group relative overflow-hidden bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50 transition-all duration-300 hover:shadow-xl hover:scale-[1.02]"
                                >
                                    {/* Background gradient */}
                                    <div
                                        className={`absolute inset-0 bg-linear-to-br ${item.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                                    ></div>

                                    <div className="relative z-10">
                                        <div className="flex items-start space-x-4">
                                            <div
                                                className={`p-3 rounded-xl bg-white shadow-md ${item.iconColor}`}
                                            >
                                                {item.icon}
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-[#333333] mb-1">
                                                    {item.title}
                                                </h3>
                                                <p className="text-lg font-semibold text-[#501F08]">
                                                    {item.info}
                                                </p>
                                                <p className="text-sm text-gray-500 mt-1">
                                                    {item.subInfo}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Hover corner decoration */}
                                    <div className="absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2 border-[#501F08] rounded-tr-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                </div>
                            ))}
                        </div>

                        {/* Map Section */}
                        <div className="mt-8">
                            <div className="bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg border border-white/50">
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-[#333333] mb-4">
                                        Find Our Studio
                                    </h3>
                                    <div className="relative h-64 rounded-xl overflow-hidden bg-linear-to-br from-[#501F08]/20 to-[#9e5d61]/20">
                                        <iframe
                                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1420.1098848369754!2d72.88241215469087!3d21.234228767918406!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be04f44021583e9%3A0x1882008fffe955c2!2sBhojal%20Ram%20Chowk!5e0!3m2!1sen!2sin!4v1768969522561!5m2!1sen!2sin"
                                            width="100%"
                                            height="450"
                                            style={{ border: 0 }}
                                            allowFullScreen=""
                                            loading="lazy"
                                            referrerPolicy="no-referrer-when-downgrade"
                                        ></iframe>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 md:p-10 shadow-2xl border border-white/50">
                        <div className="text-center mb-8">
                            <h2 className="text-3xl font-bold text-[#333333] mb-2">
                                Send a Message
                            </h2>
                            <p className="text-gray-600">
                                We'll get back to you within 24 hours
                            </p>
                        </div>

                        {isSubmitted && (
                            <div className="mb-6 p-4 bg-linear-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl">
                                <p className="text-green-700 font-semibold text-center">
                                    ✅ Thank you! Your message has been sent successfully.
                                </p>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="relative">
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#501F08] focus:border-transparent transition-all"
                                        placeholder="Your Name"
                                    />
                                </div>

                                <div className="relative">
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#501F08] focus:border-transparent transition-all"
                                        placeholder="Email Address"
                                    />
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="relative">
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#501F08] focus:border-transparent transition-all"
                                        placeholder="Phone Number (Optional)"
                                    />
                                </div>

                                <div className="relative">
                                    <input
                                        type="text"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#501F08] focus:border-transparent transition-all"
                                        placeholder="Subject"
                                    />
                                </div>
                            </div>

                            <div className="relative">
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    rows="8"
                                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#501F08] focus:border-transparent transition-all resize-none"
                                    placeholder="Your Message..."
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full group relative px-8 py-2 bg-linear-to-r from-[#501F08] to-[#9e5d61] text-white rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <div className="relative flex items-center justify-center space-x-2">
                                    {isSubmitting ? (
                                        <>
                                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                            <span>Sending...</span>
                                        </>
                                    ) : (
                                        <>
                                            <span>Send Message</span>
                                            <Send className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" />
                                        </>
                                    )}
                                </div>
                            </button>
                        </form>

                        {/* Additional Info */}
                        <div className="mt-8 pt-8 border-t border-gray-200">
                            <p className="text-center text-gray-600">
                                For urgent inquiries, please call us directly at{" "}
                                <a
                                    href="tel:+15551234567"
                                    className="text-[#501F08] font-semibold hover:underline"
                                >
                                    +1 (555) 123-4567
                                </a>
                            </p>
                        </div>
                    </div>
                </div>

                {/* FAQ Section */}
                <div className="mt-20">
                    <h2 className="text-3xl font-bold text-center text-[#333333] mb-10">
                        Frequently Asked Questions
                    </h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            {
                                q: "How soon can I get an appointment?",
                                a: "We typically have availability within 48 hours.",
                            },
                            {
                                q: "Do you offer gift certificates?",
                                a: "Yes, available for purchase online or in-studio.",
                            },
                            {
                                q: "What's your cancellation policy?",
                                a: "24-hour notice required for cancellations.",
                            },
                            {
                                q: "Do you use vegan products?",
                                a: "Yes, we offer a full range of vegan options.",
                            },
                            {
                                q: "How long does a full set take?",
                                a: "Approximately 1.5 to 2 hours.",
                            },
                            {
                                q: "Do you do walk-ins?",
                                a: "Yes, based on availability. Booking ahead is recommended.",
                            },
                        ].map((faq, index) => (
                            <div
                                key={index}
                                className="group bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/50 hover:shadow-xl transition-all duration-300 cursor-pointer"
                            >
                                <h4 className="font-bold text-[#333333] mb-3 flex items-center justify-between">
                                    <span>{faq.q}</span>
                                    <span className="text-[#501F08] text-lg transform group-hover:rotate-45 transition-transform duration-300">
                                        +
                                    </span>
                                </h4>
                                <p className="text-gray-600 text-sm">{faq.a}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactView;
