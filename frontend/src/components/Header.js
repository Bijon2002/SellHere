import { Link } from "react-router-dom";
import Search from "./Search";

export default function Header({ cartItems }) {


    return (
             <nav className="navbar row d-flex justify-content-between align-items-center">
      <div className="col-12 col-md-3">
        <div className="navbar-brand">
          <Link to="/"><img width="150px" src="./images/logo.png" />
          </Link>
          
        </div>
      </div>

      <Search />

      <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">
        <span id="cart" className="ml-3">Cart</span>
        <span className="ml-1" id="cart_count">{cartItems.length}</span>
      </div>
    </nav>
    )



}