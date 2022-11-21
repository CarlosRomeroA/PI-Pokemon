import "../landingPage/LandingPage.css";
import { Link } from "react-router-dom";

const LandingPage = () => {
    return (
        <div class="fondo">
            <div class="divLamding">
                <Link to="/home">
                <button data-text="Awesome" class="button">
                    <span class="actual-text">&nbsp;START&nbsp;</span>
                    <span class="hover-text" aria-hidden="true">&nbsp;START&nbsp;</span>
                </button>
                </Link>
            </div>
        </div>
    )
}

export default LandingPage;