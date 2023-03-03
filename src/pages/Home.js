import React from "react";
import { Link, createSearchParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import Container from "../components/Container";

import { useFetchProductCategories } from "../fetch/productCategories";
import { S3_SERVER } from "../utils/constants";

const Home = () => {
  const { data } = useFetchProductCategories();
  const categories = data ?? [];
  console.log(categories);
  return (
    <>
      <Container class1="home-wrapper-1 py-5">
        <div className="row">
          <div className="col-6">
            <div className="main-banner position-relative ">
              <img
                src="images/main-banner-1.png"
                className="img-fluid rounded-3"
                alt="main banner"
              />
              <div className="main-banner-content position-absolute">
                <h4>100% NATURAL</h4>
                <h5>
                  TENDER COCONUT <br />
                  PUDDING.
                </h5>
                <p>Staring from ₹30 </p>
                <Link className="button">BUY NOW</Link>
              </div>
            </div>
          </div>
          <div className="col-6">
            <div className="d-flex flex-wrap gap-10 justify-content-between align-items-center">
              <div className="d-flex justify-content-between small-banner blue position-relative">
                <div className="small-banner-content">
                  <h4>Best Quality</h4>
                  <h5>Baby Cashew </h5>
                  <p>From ₹300.00</p>
                </div>

                <img
                  src="images/catbanner-01.png"
                  className="img-fluid rounded-3 catbanner"
                  alt="main banner"
                  height={150}
                />
              </div>
              <div className="d-flex justify-content-between small-banner red position-relative">
                <div className="small-banner-content ">
                  <h4>New Arrival</h4>
                  <h5>Chilli Powder</h5>
                  <p>From ₹140</p>
                </div>

                <img
                  src="images/catbanner-01.png"
                  className="img-fluid rounded-3 catbanner"
                  alt="main banner"
                />
              </div>
              <div className="d-flex justify-content-between small-banner green position-relative ">
                <div className="small-banner-content ">
                  <h4>Organic </h4>
                  <h5>Raisins</h5>
                  <p>From ₹200</p>
                </div>

                <img
                  src="images/catbanner-01.png"
                  className="img-fluid rounded-3 catbanner"
                  alt="main banner"
                />
              </div>
              <div className="d-flex justify-content-between small-banner orange position-relative ">
                <div className="small-banner-content ">
                  <h4>Imported </h4>
                  <h5>Cinnamon Rolls</h5>
                  <p>From ₹600</p>
                </div>

                <img
                  src="images/catbanner-01.png"
                  className="img-fluid rounded-3 catbanner"
                  alt="main banner"
                />
              </div>
            </div>
          </div>
        </div>
      </Container>
      <Container class1="home-wrapper-2 py-5">
        <div className="row">
          <div className="col-12">
            <div className="categories d-flex justify-content-between flex-wrap align-items-center">
              {categories.map((category) => (
                <Link to={`/products?category=[${category.CategoryID}]`}>
                  <div className="d-flex gap align-items-center">
                    <div>
                      <h6>{category.CategoryName}</h6>
                    </div>
                    <img
                      src={`${S3_SERVER}${category.CategoryName.split(" ").join(
                        ""
                      )}.jpg`}
                      alt="category"
                      height={150}
                    />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
        <div className="d-flex align-items-center justify-content-center">
          <Link to="/products">
            <span> View All Products</span>
          </Link>
        </div>
      </Container>

      <Container class1="famous-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-3">
            <div className="famous-card position-relative">
              <img
                src="images/catbanner-01.png"
                className="img-fluid"
                alt="famous"
                height={150}
              />
              <div className="famous-content position-absolute">
                <h5 className="text-dark">Premium</h5>
                <h6 className="text-dark">Cashews</h6>
                <p className="text-dark">All grades and varieties available</p>
              </div>
            </div>
          </div>
          <div className="col-3">
            <div className="famous-card position-relative">
              <img
                src="images/catbanner-01.png"
                className="img-fluid"
                alt="famous"
              />
              <div className="famous-content position-absolute">
                <h5 className="text-dark">Dry Fruits</h5>
                <h6 className="text-dark">Raisins</h6>
                <p className="text-dark">Top Quality</p>
              </div>
            </div>
          </div>
          <div className="col-3">
            <div className="famous-card position-relative">
              <img
                src="images/catbanner-01.png"
                className="img-fluid"
                alt="famous"
              />
              <div className="famous-content position-absolute">
                <h5 className="text-dark">Spices</h5>
                <h6 className="text-dark">Cinammon.</h6>
                <p className="text-dark">
                  Handpicked from Meghalaya, Vietnam and Kerala
                </p>
              </div>
            </div>
          </div>
          <div className="col-3">
            <div className="famous-card position-relative">
              <img
                src="images/catbanner-01.png"
                className="img-fluid"
                alt="famous"
              />
              <div className="famous-content position-absolute">
                <h5 className="text-dark">Spices</h5>
                <h6 className="text-dark">Cloves.</h6>
                <p className="text-dark">Premium handpicked</p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Home;
