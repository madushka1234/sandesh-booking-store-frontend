import './About.css';
import aboutImage from '../../../assets/bookShop.jpg';

const About = () => {
    return (
        <section className="about-section">
            <div className="about-wrapper">
                <div className="about-left">
                    <img src={"https://images.pexels.com/photos/19257690/pexels-photo-19257690.jpeg"} alt="About Us" />
                </div>
                <div className="about-right">
                    <h2 className="about-title">About Sandesh Bookstore</h2>
                    <p>
                        Welcome to <strong>Sandesh Bookstore</strong> — your one-stop destination for a world of knowledge, stories, and imagination.
                    </p>
                    <p>
                        Since 2025, we've been connecting readers with books they love. From fiction and non-fiction to children's books, study guides, and motivational reads, our curated collection brings joy to all kinds of readers.
                    </p>
                    <p>
                        We believe in delivering more than just books — we offer an experience. Enjoy fast delivery, secure payments, and friendly support as you build your personal library.
                    </p>
                    <button className="explore-button">Explore Our Collection</button>
                </div>
            </div>
        </section>
    );
};

export default About;
