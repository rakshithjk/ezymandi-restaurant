import React from "react";
import { NavLink, Link } from "react-router-dom";
import user from "../images/user.svg";
import cart from "../images/cart.svg";
import menu from "../images/menu.svg";
import { useCart } from "react-use-cart";
import { useFetchProductCategories } from "../fetch/productCategories";
import SelectSearch from "react-select-search";
import { useNavigate } from "react-router-dom";

import { useGetCurrentUser } from "../fetch/login";
import "./selector.css";
import { API_SERVER } from "../utils/constants";

const Header = () => {
  const { cartTotal } = useCart();
  const { data } = useFetchProductCategories();
  const { data: currentUser } = useGetCurrentUser({});

  const navigate = useNavigate();
  return (
    <>
      <header className="header-top-strip py-3">
        <div className="container-xxl">
          <div className="row">
            <div className="col-6">
              <p className="text-white mb-0">Free Shipping Over 5kg</p>
            </div>
            <div className="col-6">
              <p className="text-end text-white mb-0">
                In case of queries, call / whatsapp{"    "}
                <a className="text-white" href="tel:+91 8264954234">
                  +91 6360747479
                </a>
              </p>
            </div>
          </div>
        </div>
      </header>
      <header className="header-upper py-3">
        <div className="container-xxl">
          <div className="row align-items-center">
            <div className="col-3">
              <h2>
                <Link to="/" className="text-white">
                  Ezy Mandi
                </Link>
              </h2>
            </div>
            <div className="col-4">
              <div className="input-group">
                <SelectSearch
                  onChange={(search) => navigate(`/product/${search}`)}
                  getOptions={(query) => {
                    return new Promise((resolve, reject) => {
                      fetch(`${API_SERVER}/products?search=${query}`)
                        .then((response) => response.json())
                        .then((resp) => {
                          resolve(
                            resp.map(({ ProductID, ProductName }) => ({
                              value: ProductID,
                              name: ProductName,
                            }))
                          );
                        })
                        .catch(reject);
                    });
                  }}
                  search
                  placeholder="Search"
                />
              </div>
            </div>
            <div className="col-4">
              <div className="header-upper-links flex-wrap d-flex align-items-center justify-content-around">
                <div>
                  <Link
                    to="/login"
                    className="d-flex align-items-center gap-10 text-white"
                  >
                    <img src={user} alt="user" />
                    <p className="mb-0">{currentUser ? "Account" : "Log in"}</p>
                  </Link>
                </div>
                <div>
                  <Link
                    to="/cart"
                    className="d-flex align-items-center gap-10 text-white"
                  >
                    <img src={cart} alt="cart" />
                    <div className="d-flex flex-column gap-10">
                      <p className="mb-0">₹ {cartTotal}</p>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <header className="header-bottom py-3">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <div className="menu-bottom d-flex flex-wrap align-items-center gap-30">
                <div>
                  <div className="dropdown">
                    <button
                      className="btn btn-secondary dropdown-toggle bg-transparent border-0 gap-15 d-flex align-items-center"
                      type="button"
                      id="dropdownMenuButton1"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <img src={menu} alt="" />
                      <span className="me-5 d-inline-block">
                        Shop Categories
                      </span>
                    </button>
                    <ul
                      className="dropdown-menu"
                      aria-labelledby="dropdownMenuButton1"
                    >
                      {data?.map((category) => (
                        <li>
                          <Link
                            className="dropdown-item text-white"
                            to={`/products?category=[${category.CategoryID}]`}
                          >
                            {category.CategoryName}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="menu-links">
                  <div className="d-flex align-items-center gap-15 flex-wrap">
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="/products">Our Store</NavLink>
                    <NavLink to="/contact">Contact</NavLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
