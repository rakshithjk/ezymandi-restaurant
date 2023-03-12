import React from "react";
import { Link, useLocation } from "react-router-dom";
import addcart from "../images/add-cart.svg";
import view from "../images/view.svg";

const ProductCard = (props) => {
  const { grid, data = {} } = props;
  const location = useLocation();

  return (
    <>
      <div
        className={` ${
          location.pathname == "/products" ? `gr-${grid}` : "col-3"
        } `}
      >
        <Link
          to={`${`/product/${data.ProductID}`}`}
          className="product-card position-relative"
        >
          <div className="product-image">
            <img
              src={data.ProductImage}
              className="img-fluid"
              alt="product image"
            />
          </div>
          <div className="product-details">
            <h6 className="brand">{data.ProductName}</h6>

            <p className="price">₹ {data.ProductPrice}</p>
          </div>
          <div className="action-bar position-absolute">
            <div className="d-flex flex-column gap-15">
              <button className="border-0 bg-transparent">
                <img src={view} alt="view" />
              </button>
              <button className="border-0 bg-transparent">
                <img src={addcart} alt="addcart" />
              </button>
            </div>
          </div>
        </Link>
      </div>
    </>
  );
};

export default ProductCard;
