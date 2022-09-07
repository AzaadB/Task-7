import { Link } from "react-router-dom";//importing Link from react-roter-dom//

const Navbar = () => {//Navbar fuction//
    return (//below linking to the homepage//
        <header>
            <div className="container">
                <Link to="/">
                    <h1>Cars</h1>
                </Link>
                <Link to="/Old">
                <button>Old</button>
                </Link>
            </div>
        </header>
    )
}
export default Navbar;//exporting component so it can be used anywhere.//