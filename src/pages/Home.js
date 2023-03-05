import React from "react";
import { Link } from "react-router-dom";
import Container from "../components/Container";

import { useFetchProductCategories } from "../fetch/productCategories";
import { S3_SERVER } from "../utils/constants";

const Home = () => {
  const { data } = useFetchProductCategories();
  const categories = data ?? [];

  return (
    <>
      <Container class1="home-wrapper-1 py-5">
        <div className="row">
          <div className="col-sm-6">
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
          <div className="col-sm-6">
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
                  src="images/catbanner-02.png"
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
                  src="images/catbanner-03.png"
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
                  src="images/catbanner-04.png"
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
                <Link
                  key={category.CategoryID}
                  to={`/products?category=[${category.CategoryID}]`}
                >
                  <div className="d-flex gap align-items-center flex-wrap">
                    <div>
                      <h6>{category.CategoryName}</h6>
                    </div>
                    <img
                      src={`${S3_SERVER}${category.CategoryName.split(" ").join(
                        ""
                      )}.png`}
                      alt="category"
                      height={150}
                    />
                  </div>
                </Link>
              ))}
            </div>
            <div className="categories d-flex align-items-center justify-content-center">
              <Link to="/products">
                <span> View All Products</span>
              </Link>
            </div>
          </div>
        </div>
      </Container>

      <Container class1="famous-wrapper py-5 home-wrapper-2">
        <div className="d-flex flex-wrap  justify-content-between align-items-center">
          <div className="famous-card position-relative">
            <div className="famous-content position-absolute">
              <h5>Premium</h5>
              <h6>Cashews</h6>
              <p>All grades and varieties available</p>
            </div>
            <img
              src="images/famous-1.png"
              className="img-fluid "
              alt="famous"
              height={150}
            />
          </div>

          <div className="famous-card position-relative">
            <img src="images/famous-2.png" className="img-fluid" alt="famous" />
            <div className="famous-content position-absolute">
              <h5 className="text-dark">Dry Fruits</h5>
              <h6 className="text-dark">Raisins</h6>
              <p className="text-dark">Top Quality</p>
            </div>
          </div>

          <div className="famous-card position-relative">
            <img src="images/famous-3.png" className="img-fluid" alt="famous" />
            <div className="famous-content position-absolute">
              <h5 className="text-dark">Spices</h5>
              <h6 className="text-dark">Cinammon.</h6>
              <p className="text-dark">
                Handpicked from Meghalaya, Vietnam and Kerala
              </p>
            </div>
          </div>

          <div className="famous-card position-relative">
            <img src="images/famous-4.png" className="img-fluid" alt="famous" />
            <div className="famous-content position-absolute">
              <h5 className="text-dark">Spices</h5>
              <h6 className="text-dark">Cloves.</h6>
              <p className="text-dark">
                Organic handpicked from Madagascar,Sri Lanka and Kerala
              </p>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Home;
