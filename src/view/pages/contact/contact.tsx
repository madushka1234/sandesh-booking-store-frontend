import '../contact/contact.css';
import { useState } from 'react';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // 👉 Handle form logic here (e.g., send to backend or email API)
        alert('Message sent successfully!');
        setFormData({ name: '', email: '', message: '' });
    };

    return (
        <section className="contact-section">
            <div className="contact-wrapper">
                <div className="contact-left">
                    <h2 className="contact-title">Contact Us</h2>
                    <p className="contact-subtext">
                        Got questions, feedback, or just want to say hello? We’d love to hear from you.
                    </p>
                    <form onSubmit={handleSubmit} className="contact-form">
                        <input
                            type="text"
                            name="name"
                            placeholder="Your Name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="email"
                            name="email"
                            placeholder="Your Email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                        <textarea
                            name="message"
                            placeholder="Your Message"
                            rows="5"
                            value={formData.message}
                            onChange={handleChange}
                            required
                        ></textarea>
                        <button type="submit" className="contact-button">Send Message</button>
                    </form>
                </div>

                <div className="contact-right">
                    <h3>Store Information</h3>
                    <p><strong>Address:</strong> 123 Book Street, Galle, Sri Lanka</p>
                    <p><strong>Email:</strong> info@Sandeshbooks.lk</p>
                    <p><strong>Phone:</strong> +94 77 263 9000</p>
                    <p><strong>Hours:</strong> Mon – Sat: 9:00 AM – 6:00 PM</p>
                </div>
            </div>
        </section>
    );
};

export default Contact;
