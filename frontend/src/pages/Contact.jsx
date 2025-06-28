import React, { useState, useEffect } from 'react';
import { Mail, MapPin, Phone, Facebook, Twitter, Instagram, Linkedin, Send, CheckCircle } from 'lucide-react';
import { toast } from 'react-toastify';

const ContactPage = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        message: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [focusedField, setFocusedField] = useState('');
    const [isVisible, setIsVisible] = useState(false);

    // Animation on mount
    useEffect(() => {
        setIsVisible(true);
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        toast.success("Request sent successfully!");

        // Simulate form submission
        setTimeout(() => {
            setIsSuccess(true);
            setFormData({ fullName: '', email: '', message: '' });
            setIsSubmitting(false);

            // Reset success state after 3 seconds
            setTimeout(() => {
                setIsSuccess(false);
            }, 3000);
        }, 1500);
    };

    const socialLinks = [
        { icon: Facebook, name: 'Facebook', color: 'hover:bg-blue-600' },
        { icon: Twitter, name: 'Twitter', color: 'hover:bg-sky-500' },
        { icon: Linkedin, name: 'LinkedIn', color: 'hover:bg-blue-700' },
        { icon: Instagram, name: 'Instagram', color: 'hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500' }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-teal-50 flex items-center justify-center p-4 relative overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-teal-200 to-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-pulse"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-teal-200 to-orange-200 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-pulse" style={{ animationDelay: '2s' }}></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-gradient-to-r from-green-200 to-teal-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse" style={{ animationDelay: '4s' }}></div>
            </div>

            <div className={`max-w-6xl w-full bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden border border-white/20 transform transition-all duration-1000 ${isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}>
                <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[700px]">

                    {/* Left Side - Image and Social */}
                    <div className="relative bg-gradient-to-br from-teal-100 via-orange-50 to-amber-50 p-8 flex flex-row justify-between overflow-hidden">
                        {/* Floating elements */}
                        <div className="absolute top-10 right-10 w-20 h-20 bg-white/20 rounded-full animate-bounce" style={{ animationDelay: '1s', animationDuration: '3s' }}></div>
                        <div className="absolute bottom-20 left-10 w-14 h-14 bg-white/30 rounded-full animate-bounce" style={{ animationDelay: '2s', animationDuration: '4s' }}></div>

                        <div className={`flex flex-row space-y-8 transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}>
                            {/* Social Media Icons */}
                            <div className="flex flex-col space-y-6">
                                {socialLinks.map((social, index) => (
                                    <div
                                        key={social.name}
                                        className={`w-12 h-12 bg-black rounded-full flex items-center justify-center hover:scale-110 transition-all duration-300 cursor-pointer group ${social.color} transform hover:rotate-12`}
                                        style={{ animationDelay: `${index * 200}ms` }}
                                    >
                                        <social.icon className="w-6 h-6 text-white group-hover:scale-110 transition-transform duration-200" />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Hero Image */}
                        <div className={`flex-1 flex items-center justify-center transform transition-all duration-1000 delay-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                            <div className="relative group">
                                <img
                                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
                                    alt="Contact us"
                                    className="w-80 h-96 object-cover rounded-2xl shadow-lg hover:scale-105 transition-transform duration-500 group-hover:shadow-2xl"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-2xl group-hover:from-black/40 transition-all duration-500"></div>

                                {/* Floating contact card */}
                                <div className="absolute -bottom-6 -right-6 bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-lg transform rotate-3 hover:rotate-0 transition-transform duration-300">
                                    <div className="text-sm text-gray-600">Get in touch</div>
                                    <div className="font-semibold text-gray-900">Let's connect!</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Side - Contact Form */}
                    <div className="p-8 lg:p-12 flex flex-col justify-center">
                        <div className={`max-w-md mx-auto w-full transform transition-all duration-1000 delay-700 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}>

                            {/* Header */}
                            <div className="mb-8">
                                <h1 className="text-4xl lg:text-5xl font-bold text-grey-900 mb-4 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                                    Contact Us
                                </h1>
                                <div className="w-16 h-1 bg-gradient-to-r from-teal-500 to-purple-500 rounded-full"></div>
                                <p className="text-gray-600 mt-4">We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>
                            </div>

                            {/* Success Message */}
                            {isSuccess && (
                                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center space-x-2 animate-pulse">
                                    <CheckCircle className="w-5 h-5 text-green-600" />
                                    <span className="text-green-800 font-medium">Message sent successfully! We'll get back to you soon.</span>
                                </div>
                            )}

                            {/* Contact Form */}
                            <div className="space-y-6 mb-8">
                                <div className="relative">
                                    <input
                                        type="text"
                                        name="fullName"
                                        value={formData.fullName}
                                        onChange={handleInputChange}
                                        onFocus={() => setFocusedField('fullName')}
                                        onBlur={() => setFocusedField('')}
                                        placeholder="Full Name"
                                        className="w-full px-0 py-3 text-lg bg-transparent border-0 border-b-2 border-gray-300 focus:border-blue-500 focus:outline-none transition-all duration-300 placeholder-gray-400"
                                        required
                                    />
                                    <div className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300 ${focusedField === 'fullName' ? 'w-full' : 'w-0'}`}></div>
                                </div>

                                <div className="relative">
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        onFocus={() => setFocusedField('email')}
                                        onBlur={() => setFocusedField('')}
                                        placeholder="E-mail"
                                        className="w-full px-0 py-3 text-lg bg-transparent border-0 border-b-2 border-gray-300 focus:border-blue-500 focus:outline-none transition-all duration-300 placeholder-gray-400"
                                        required
                                    />
                                    <div className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300 ${focusedField === 'email' ? 'w-full' : 'w-0'}`}></div>
                                </div>

                                <div className="relative">
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleInputChange}
                                        onFocus={() => setFocusedField('message')}
                                        onBlur={() => setFocusedField('')}
                                        placeholder="Message"
                                        rows="4"
                                        className="w-full px-0 py-3 text-lg bg-transparent border-0 border-b-2 border-gray-300 focus:border-blue-500 focus:outline-none transition-all duration-300 placeholder-gray-400 resize-none"
                                        required
                                    />
                                    <div className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300 ${focusedField === 'message' ? 'w-full' : 'w-0'}`}></div>
                                </div>

                                <button
                                    onClick={handleSubmit}
                                    disabled={isSubmitting}
                                    className="w-full bg-gradient-to-r from-gray-900 to-gray-700 hover:from-gray-800 hover:to-gray-600 text-white py-4 px-8 rounded-full text-lg font-medium transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl flex items-center justify-center space-x-2 group"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                            <span>Sending...</span>
                                        </>
                                    ) : (
                                        <>
                                            <span>Contact Us</span>
                                            <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
                                        </>
                                    )}
                                </button>
                            </div>

                            {/* Contact Info */}
                            <div className="space-y-4 text-gray-600">
                                <div className="group">
                                    <h3 className="text-xl font-semibold text-gray-900 mb-1">Contact</h3>
                                    <p className="flex items-center group-hover:text-blue-600 transition-colors duration-200">
                                        <Mail className="w-4 h-4 mr-2" />
                                        sameerkhan@gmail.com
                                    </p>
                                </div>

                                <div className="group">
                                    <h3 className="text-xl font-semibold text-gray-900 mb-1">Based in</h3>
                                    <p className="flex items-center group-hover:text-blue-600 transition-colors duration-200">
                                        <MapPin className="w-4 h-4 mr-2" />
                                        Bhopal , India
                                    </p>
                                </div>

                                <div className="group">
                                    <h3 className="text-xl font-semibold text-gray-900 mb-1">Phone</h3>
                                    <p className="flex items-center group-hover:text-blue-600 transition-colors duration-200">
                                        <Phone className="w-4 h-4 mr-2" />
                                        +91 9691709556
                                    </p>
                                </div>

                                {/* Social Icons Bottom */}
                                <div className="flex space-x-4 pt-4">
                                    {socialLinks.map((social, index) => (
                                        <div
                                            key={`bottom-${social.name}`}
                                            className={`w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-black hover:text-white transition-all duration-300 cursor-pointer hover:scale-110 transform hover:-translate-y-1`}
                                            style={{ transitionDelay: `${index * 50}ms` }}
                                        >
                                            <social.icon className="w-4 h-4" />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;