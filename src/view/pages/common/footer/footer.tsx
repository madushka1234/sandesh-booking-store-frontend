
import footerLogo from '../../../../assets/footer-logo.png';
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            {/* Top Section */}
            <div className="footer-top">
                {/* Left: Logo + Nav */}
                <div className="footer-left">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                        <img src={footerLogo} alt="Logo" className="footer-logo" />
                        <h2 style={{ fontSize: '20px' }}>Sandesh Books</h2>
                    </div>
                    <ul className="footer-nav">
                        <li><a href="#">Home</a></li>
                        <li><a href="#">Services</a></li>
                        <li><a href="#">About Us</a></li>
                        <li><a href="#">Contact</a></li>
                    </ul>
                </div>

                {/* Right: Newsletter */}
                <div className="footer-right">
                    <p className="newsletter-text">
                        Subscribe to our newsletter to receive the latest updates, news, and offers!
                    </p>
                    <div className="newsletter-form">
                        <input type="email" placeholder="Enter your email" className="newsletter-input" />
                        <button className="newsletter-button">Subscribe</button>
                    </div>
                </div>
            </div>

            {/* Bottom Section */}
            <div className="footer-bottom">
                <p className="privacy-links">
                    Privacy Policy
                    Terms of Service
                </p>
                <div className="social-icons">
                    <a href="#"><FaFacebook size={20} /></a>
                    <a href="#"><FaTwitter size={20} /></a>
                    <a href="#"><FaInstagram size={20} /></a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
