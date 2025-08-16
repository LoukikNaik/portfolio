import React, { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';

const Contact = () => {
  const form = useRef();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [status, setStatus] = useState({
    submitting: false,
    submitted: false,
    error: null
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ submitting: true, submitted: false, error: null });

    try {
      const result = await emailjs.sendForm(
        'service_pjlbldg',
        'template_p8bjje7',
        form.current,
        'V8Uff6QdIjswMjmgt'
      );

      if (result.text === 'OK') {
        setStatus({
          submitting: false,
          submitted: true,
          error: null
        });
        
        // Reset form
        setFormData({ name: '', email: '', message: '' });

        // Reset success message after 5 seconds
        setTimeout(() => {
          setStatus(prev => ({ ...prev, submitted: false }));
        }, 5000);
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      setStatus({
        submitting: false,
        submitted: false,
        error: 'Failed to send message. Please try again later.'
      });
      console.error('EmailJS Error:', error);
    }
  };

  return (
    <section id="contact" className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-bold text-center text-on-glass mb-16">
          Get In Touch
        </h2>
        <div className="max-w-2xl mx-auto">
          <div className="glass-strong rounded-3xl p-8 md:p-12">
            {status.submitted && (
              <div className="mb-8 p-4 glass rounded-2xl text-green-300 border border-green-400/20">
                ✨ Thank you for your message! I'll get back to you soon.
              </div>
            )}
            {status.error && (
              <div className="mb-8 p-4 glass rounded-2xl text-red-300 border border-red-400/20">
                ❌ {status.error}
              </div>
            )}
            <form ref={form} onSubmit={handleSubmit} className="space-y-8">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-on-glass mb-3"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  disabled={status.submitting}
                  className="w-full px-6 py-4 glass rounded-2xl focus:ring-2 focus:ring-sky-500 focus:border-sky-500 text-on-glass placeholder-gray-500 dark:placeholder-white/50 disabled:opacity-50 border border-white/20 transition-all duration-300"
                  placeholder="Your Name"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-on-glass mb-3"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  disabled={status.submitting}
                  className="w-full px-6 py-4 glass rounded-2xl focus:ring-2 focus:ring-sky-500 focus:border-sky-500 text-on-glass placeholder-gray-500 dark:placeholder-white/50 disabled:opacity-50 border border-white/20 transition-all duration-300"
                  placeholder="your.email@example.com"
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-on-glass mb-3"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  disabled={status.submitting}
                  rows="6"
                  className="w-full px-6 py-4 glass rounded-2xl focus:ring-2 focus:ring-sky-500 focus:border-sky-500 text-on-glass placeholder-gray-500 dark:placeholder-white/50 disabled:opacity-50 border border-white/20 transition-all duration-300 resize-none"
                  placeholder="Your message here..."
                ></textarea>
              </div>
              <button
                type="submit"
                disabled={status.submitting}
                className="w-full bg-gradient-to-r from-sky-400 to-cyan-500 text-white py-4 px-8 rounded-2xl hover:from-sky-300 hover:to-cyan-400 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center font-semibold text-lg shadow-lg hover:shadow-xl hover:scale-105"
              >
                {status.submitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending Message...
                  </>
                ) : '💬 Send Message'}
              </button>
            </form>
          </div>
        </div>
      </div>
      
      {/* Floating decorative elements */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-slate-400/10 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-32 h-32 bg-sky-400/10 rounded-full blur-xl animate-pulse delay-2000"></div>
    </section>
  );
};

export default Contact; 