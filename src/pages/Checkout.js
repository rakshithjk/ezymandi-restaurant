import React from "react";
import watch from "../images/watch.jpg";
import Container from "../components/Container";
import { useCart } from "react-use-cart";

const Checkout = () => {
  const { items, removeItem, cartTotal, updateItemQuantity } = useCart();

  return (
    <>
      <Container class1="checkout-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-7">
            <div className="checkout-left-data">
              <h3 className="website-name">EzyMandi</h3>
              <nav
                style={{ "--bs-breadcrumb-divider": ">" }}
                aria-label="breadcrumb"
              >
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">Order</li>
                  &nbsp; /&nbsp;
                  <li
                    className="breadcrumb-ite total-price active"
                    aria-current="page"
                  >
                    Confirmation
                  </li>
                </ol>
              </nav>
              <h4 className="title total">Contact Information</h4>
              <p className="user-details total">
                Navdeep Dahiya (monud0232@gmail.com)
              </p>
            </div>
            Order confirmed
            <br />
            We will contact you and confirm the delivery shortly
          </div>
          <div className="col-5">
            <div className="checkout-items-page">
              {items.map(({ id, itemTotal, price, quantity, ...rest }) => {
                const { ProductName, ProductWeight, ProductImage } = rest[0];

                return (
                  <div className="border-bottom py-4">
                    <div className="d-flex gap-10 mb-2 align-align-items-center">
                      <div className="w-75 d-flex gap-10">
                        <div className="w-25 position-relative">
                          <span
                            style={{ top: "-10px", right: "2px" }}
                            className="badge bg-secondary text-white rounded-circle p-2 position-absolute"
                          >
                            {quantity}
                          </span>
                          <img
                            className="img-fluid"
                            src={ProductImage}
                            alt="product"
                          />
                        </div>
                        <div>
                          <h5 className="total-price">{ProductName}</h5>
                          <p className="total-price">
                            Quantity: {ProductWeight}
                          </p>
                        </div>
                      </div>
                      <div className="flex-grow-1">
                        <h5 className="total">₹ {itemTotal}</h5>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="border-bottom py-4">
              <div className="d-flex justify-content-between align-items-center">
                <p className="total">Subtotal excluding GST</p>
                <p className="total-price">₹ {cartTotal}</p>
              </div>
              <div className="d-flex justify-content-between align-items-center">
                <p className="mb-0 total">Shipping</p>
                <p className="mb-0 total-price">
                  Porter charges for orders less than 5kg
                </p>
              </div>
            </div>
            <div className="d-flex justify-content-between align-items-center border-bootom py-4">
              <h4 className="total">Total</h4>
              <h5 className="total-price">₹ {cartTotal}</h5>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Checkout;
