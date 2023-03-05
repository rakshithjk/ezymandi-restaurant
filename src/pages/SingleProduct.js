import React, { useState } from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import ProductCard from "../components/ProductCard";
import ReactImageZoom from "react-image-zoom";
import { Link, useParams } from "react-router-dom";
import Container from "../components/Container";
import { useFetchProduct, useFetchSimilarProduct } from "../fetch/product";
import { useCart } from "react-use-cart";

const SingleProduct = () => {
  const { id } = useParams();
  const { addItem } = useCart();

  const [quantity, SetQuantity] = useState(1);

  const { data } = useFetchProduct(id, { enabled: !!id });

  const { data: similarProducts } = useFetchSimilarProduct(
    data?.[0].productSubCategory,
    {
      enabled: !!data?.[0].productSubCategory,
    }
  );

  console.log("data?.[0]", similarProducts, similarProducts?.len);

  const { ProductName, ProductPrice, ProductWeight, ProductImage, ProductID } =
    data?.[0] ?? {};

  const props = {
    width: 594,
    height: 400,
    zoomWidth: 600,

    img: ProductImage ?? "images/frame-1.png",
  };

  const closeModal = () => {};
  return (
    <>
      <Meta title={"Product Name"} />
      <BreadCrumb title="Product Name" />
      <Container class1="main-product-wrapper  home-wrapper-2">
        <div className="row">
          <div className="col-sm-6">
            <div className="main-product-image">
              <div>
                <ReactImageZoom {...props} />
              </div>
            </div>
          </div>
          <div className="col-sm-6">
            <div className="main-product-details">
              <div className="border-bottom">
                <h3 className="title">{ProductName}</h3>
              </div>
              <div className="border-bottom py-3">
                <p className="price">₹ {ProductPrice}</p>
              </div>
              <div className=" py-3">
                <div className="d-flex gap-10 flex-column mt-2 mb-3">
                  <h3 className="product-heading">
                    Quantity : {ProductWeight} kg
                  </h3>
                </div>
                <div className="d-flex flex-wrap align-items-center gap-15 flex-row mt-2 mb-3">
                  <h3 className="product-heading">Quantity :</h3>
                  <div className="">
                    <input
                      type="number"
                      name=""
                      min={1}
                      max={10}
                      className="form-control"
                      style={{ width: "70px" }}
                      id=""
                      value={quantity}
                      onChange={(e) => {
                        SetQuantity(JSON.parse(e.target.value));
                      }}
                    />
                  </div>
                  <div className="d-flex align-items-center gap-30 ">
                    <button
                      className="button border-0"
                      data-bs-toggle="modal"
                      data-bs-target="#staticBackdrop"
                      type="button"
                      onClick={() => {
                        addItem(
                          {
                            ...data,

                            id: ProductID,
                            price: ProductPrice,
                          },
                          quantity
                        );
                      }}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
                <div className="d-flex gap-10 flex-column  my-3">
                  <h3 className="product-heading">Shipping & Returns :</h3>
                  <p className="product-data">
                    Free shipping available on all orders!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
      <Container class1="description-wrapper py-1 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <h4>Description</h4>
            <div className="bg-white p-3">
              <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Tenetur nisi similique illum aut perferendis voluptas, quisquam
                obcaecati qui nobis officia. Voluptatibus in harum deleniti
                labore maxime officia esse eos? Repellat?
              </p>
            </div>
          </div>
        </div>
      </Container>
      {similarProducts?.length > 0 && (
        <Container class1="popular-wrapper py-5 home-wrapper-2">
          <div className="row">
            <div className="col-12">
              <h3 className="section-heading">Our Simlar Products</h3>
            </div>
          </div>
          <div className="row">
            {similarProducts?.map((item) => (
              <ProductCard data={item} />
            ))}
          </div>
        </Container>
      )}

      <div
        className="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered ">
          <div className="modal-content">
            <div className="modal-header py-0 border-0">
              <button
                type="button"
                className="btn-close p-5 "
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body py-0">
              <div className="d-flex align-items-center">
                <div className="flex-grow-1 w-50">
                  <img
                    src={ProductImage ?? ""}
                    className="img-fluid"
                    alt="product imgae"
                  />
                </div>
                <div className="d-flex flex-column p-5 flex-grow-1 w-50">
                  <h6 className="mb-3">{ProductName}</h6>
                  <p className="mb-1">Quantity: {quantity}</p>
                </div>
              </div>
            </div>
            <div className="modal-footer border-0 py-0 justify-content-center gap-30">
              <Link type="button" to="/cart" data-bs-dismiss="modal">
                <button className="button" data-bs-dismiss="modal">
                  View My Cart
                </button>
              </Link>
            </div>
            <div className="d-flex justify-content-center py-3">
              <Link
                className="text-dark"
                to="/products"
                data-bs-dismiss="modal"
                onClick={() => {
                  closeModal();
                }}
              >
                Continue To Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleProduct;
