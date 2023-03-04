import React from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import watch from "../images/watch.jpg";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import Container from "../components/Container";
import { useCart } from "react-use-cart";

const Cart = () => {
  const { items, removeItem, cartTotal, updateItemQuantity } = useCart();

  return (
    <>
      <Meta title={"Cart"} />
      <BreadCrumb title="Cart" />
      <Container class1="cart-wrapper home-wrapper-2 py-5">
        <div className="row">
          <div className="col-12">
            <div className="cart-header py-3 d-flex justify-content-between align-items-center">
              <h4 className="cart-col-1">Product</h4>
              <h4 className="cart-col-2">Price</h4>
              <h4 className="cart-col-3">Quantity</h4>
              <h4 className="cart-col-4">Total</h4>
            </div>
            {items.map(({ id, itemTotal, price, quantity, ...rest }) => {
              const { ProductName, ProductWeight, ProductImage, ProductID } =
                rest[0];
              return (
                <div className="cart-data py-3 mb-2 d-flex justify-content-between align-items-center">
                  <div className="cart-col-1 gap-15 d-flex align-items-center">
                    <div className="w-25">
                      <img
                        src={ProductImage}
                        className="img-fluid"
                        alt="product image"
                      />
                    </div>
                    <div className="w-75">
                      <p>{ProductName}</p>
                      <p>{ProductWeight}</p>
                    </div>
                  </div>
                  <div className="cart-col-2">
                    <h5 className="price">₹ {price}</h5>
                  </div>
                  <div className="cart-col-3 d-flex align-items-center gap-15">
                    <div>
                      <input
                        className="form-control"
                        type="number"
                        name=""
                        min={1}
                        max={100}
                        id={ProductName}
                        value={quantity}
                        onChange={(e) => {
                          updateItemQuantity(ProductID, e.target.value);
                        }}
                      />
                    </div>
                    <div>
                      <button
                        onClick={() => removeItem(ProductID)}
                        className="bg-transparent border-0"
                      >
                        <AiFillDelete className="text-danger " />
                      </button>
                    </div>
                  </div>
                  <div className="cart-col-4">
                    <h5 className="price">₹ {itemTotal}</h5>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="col-12 py-2 mt-4">
            <div className="d-flex justify-content-between align-items-baseline">
              <Link to="/products" className="button">
                Continue To Shopping
              </Link>
              <div className="d-flex flex-column align-items-end">
                <h4>SubTotal: ₹ {cartTotal}</h4>
                <p>All Prices excluding Taxes and Shipping.</p>
                <Link to="/checkout" className="button">
                  Checkout
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Cart;
