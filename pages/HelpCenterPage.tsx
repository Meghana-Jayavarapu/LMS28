import React, { useState } from 'react';

const faqs = [
    {
        question: "How do I enroll in a course?",
        answer: "To enroll in a course, simply navigate to the 'Courses' page, find a course you're interested in, and click the 'View Course' button. On the course detail page, you'll see an 'Enroll Now' button. Click it, and you'll be enrolled!"
    },
    {
        question: "How do I track my progress?",
        answer: "You can track your progress on your 'Dashboard' page, which shows all your enrolled courses and your completion percentage for each. On a specific course's detail page, you can see which lessons you have completed."
    },
    {
        question: "How do I reset my password?",
        answer: "You can change your password from the 'Settings' page. You will need to enter your current password and then your new password."
    },
    {
        question: "What is the Study Buddy?",
        answer: "The Study Buddy is an AI-powered assistant available within each course. You can ask it questions about the lesson content, and it will provide helpful explanations to support your learning."
    }
];

const HelpCenterPage: React.FC = () => {
    const [openFaq, setOpenFaq] = useState<number | null>(null);
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [formMessage, setFormMessage] = useState('');

    const toggleFaq = (index: number) => {
        setOpenFaq(openFaq === index ? null : index);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({...prev, [e.target.name]: e.target.value}));
    };

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // In a real app, this would send the data to a support backend.
        console.log("Support request submitted:", formData);
        setFormMessage("Your message has been sent! We'll get back to you shortly.");
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setFormMessage(''), 5000);
    };

    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">Help Center</h1>
            
            <div className="bg-base p-8 rounded-2xl shadow-xl mb-12">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Frequently Asked Questions</h2>
                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div key={index} className="border-b border-gray-200 pb-4">
                            <button onClick={() => toggleFaq(index)} className="w-full text-left flex justify-between items-center">
                                <span className="font-semibold text-lg text-gray-800">{faq.question}</span>
                                <span className="text-2xl font-thin">{openFaq === index ? '-' : '+'}</span>
                            </button>
                            {openFaq === index && (
                                <div className="mt-2 text-gray-600">
                                    {faq.answer}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
            
            <div className="bg-base p-8 rounded-2xl shadow-xl">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Contact Support</h2>
                <p className="text-center text-gray-600 mb-6">Still have questions? Fill out the form below and our team will get back to you.</p>
                {formMessage && <div className="bg-green-100 text-green-800 p-4 rounded-lg mb-6 text-center">{formMessage}</div>}
                <form onSubmit={handleFormSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder="Your Name" required className="w-full p-3 border rounded-lg" />
                        <input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="Your Email" required className="w-full p-3 border rounded-lg" />
                    </div>
                    <textarea name="message" value={formData.message} onChange={handleInputChange} placeholder="Your Message" rows={5} required className="w-full p-3 border rounded-lg" />
                    <button type="submit" className="w-full bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-800 transition-colors">
                        Send Message
                    </button>
                </form>
            </div>
        </div>
    );
};

export default HelpCenterPage;
