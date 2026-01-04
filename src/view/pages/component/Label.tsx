import "./Label.css";
import { FaTruck, FaRegMoneyBillAlt, FaBookOpen } from "react-icons/fa";

const Label = () => {
    return (
        <section className="label-container" aria-label="Site Features">
            <div className="label">
        <span className="label-icon">
          <FaTruck />
          Islandwide Delivery
        </span>
            </div>

            <div className="label">
        <span className="label-icon">
          <FaBookOpen />
          Best way to read
        </span>
            </div>

            <div className="label">
        <span className="label-icon">
          <FaRegMoneyBillAlt />
          Best price
        </span>
            </div>
        </section>
    );
};

export default Label;
