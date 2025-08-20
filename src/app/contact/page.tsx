"use client";

import { useState } from 'react';
import Link from 'next/link';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim() || !email.trim() || !message.trim()) {
      alert('Please fill in all fields');
      return;
    }
    
    // Here you would normally send the form data to your backend
    alert('Your message has been sent! We will get back to you soon.');
    setName('');
    setEmail('');
    setMessage('');
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
      <div className="max-w-4xl mx-auto px-4 py-20 sm:px-6 lg:px-8">
        <div>
          <div className="mb-8">
            <Link href="/">
              <button className="border border-gray-700 text-gray-300 hover:bg-gray-800 px-4 py-2 rounded-md transition-colors">
                Back to Home
              </button>
            </Link>
          </div>
          
          <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Contact Us
          </h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700 p-8">
              <h2 className="text-2xl font-bold mb-4">Get in Touch</h2>
              <p className="text-gray-300 mb-6">
                Have questions or feedback? We&apos;d love to hear from you. Fill out the form and we&apos;ll get back to you as soon as possible.
              </p>
              
              <div className="space-y-4">
                <div>
                  <h3 className="font-bold text-lg mb-2">Email</h3>
                  <p className="text-gray-300">contact@aurora-ai.com</p>
                </div>
                
                <div>
                  <h3 className="font-bold text-lg mb-2">Support</h3>
                  <p className="text-gray-300">support@aurora-ai.com</p>
                </div>
                
                <div>
                  <h3 className="font-bold text-lg mb-2">Business Inquiries</h3>
                  <p className="text-gray-300">business@aurora-ai.com</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700 p-8">
              <h2 className="text-2xl font-bold mb-4">Send a Message</h2>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-gray-700 border border-gray-600 text-white rounded-lg p-3"
                    placeholder="Your name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-gray-700 border border-gray-600 text-white rounded-lg p-3"
                    placeholder="Your email"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Message</label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full bg-gray-700 border border-gray-600 text-white rounded-lg p-3 min-h-[120px]"
                    placeholder="Your message"
                  />
                </div>
                
                <button
                  type="submit"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 w-full py-3 rounded-lg font-medium"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}