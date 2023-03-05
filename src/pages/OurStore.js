import React, { useEffect, useState } from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import ProductCard from "../components/ProductCard";
import Container from "../components/Container";
import { useListProduct } from "../fetch/product";
import { useFetchProductCategories } from "../fetch/productCategories";
import { useSearchParams } from "react-router-dom";
import { productSubCategories } from "../utils/constants";

const constructListFilter = (category = "", products = "") => {
  let filter = "";
  if (category.length > 0) {
    filter = `category=${category.join(",")}`;
  }
  if (products.length > 0) {
    if (filter.length > 0) {
      filter = filter + `&subCategory=${products.join(",")}`;
    } else {
      filter = `subCategory=${products.join(",")}`;
    }
  }

  return filter;
};

const OurStore = () => {
  const [grid, setGrid] = useState(
    window.matchMedia("screen and (max-width: 768px)").matches ? 12 : 4
  );

  const smallScreen = window.matchMedia(
    "screen and (max-width: 768px)"
  ).matches;

  const [searchParams, setSearchParams] = useSearchParams();

  const { data: productCategories } = useFetchProductCategories({
    refetchOnWindowFocus: false,
  });

  const [selectedCategory, setCategory] = useState(
    JSON.parse(searchParams.get("category") ?? "[]")
  );

  const [selectedProducts, setSelectedProducts] = useState(
    JSON.parse(searchParams.get("subCategory") ?? "[]")
  );

  const { data, refetch } = useListProduct(
    constructListFilter(selectedCategory, selectedProducts)
  );

  useEffect(() => {
    refetch();
    setSearchParams({
      category: JSON.stringify(selectedCategory),
      subCategory: JSON.stringify(selectedProducts),
    });
  }, [selectedCategory, selectedProducts]);

  return (
    <>
      <Meta title={"Our Store"} />
      <BreadCrumb title="Our Store" />
      <Container class1="store-wrapper home-wrapper-2 py-5">
        <div className="row">
          <div className="col-3">
            <div className="filter-card mb-3">
              <h3 className="filter-title">Shop By Category</h3>
              <div>
                <ul className="ps-0">
                  {productCategories?.map(({ CategoryName, CategoryID }) => (
                    <option
                      key={CategoryID}
                      onClick={(e) =>
                        setCategory((prev) => {
                          const selected = JSON.parse(e.target.value);
                          if (prev.includes(selected)) {
                            const index = prev.indexOf(selected);
                            delete prev[index];

                            return [...prev].filter((f) => f);
                          } else {
                            return [...prev, JSON.parse(selected)];
                          }
                        })
                      }
                      value={CategoryID}
                      className={`${
                        selectedCategory.includes(CategoryID)
                          ? "selected-item-category"
                          : ""
                      }`}
                    >
                      {CategoryName}
                    </option>
                  ))}
                </ul>
              </div>
            </div>
            <div className="filter-card mb-3">
              <h3 className="filter-title">Shop By Products</h3>
              <div>
                <ul className="ps-0">
                  {productSubCategories?.map(({ name, id }) => (
                    <option
                      key={name}
                      onClick={(e) =>
                        setSelectedProducts((prev) => {
                          const selected = JSON.parse(e.target.value);
                          if (prev.includes(selected)) {
                            const index = prev.indexOf(selected);
                            delete prev[index];

                            return [...prev].filter((f) => f);
                          } else {
                            return [...prev, JSON.parse(selected)];
                          }
                        })
                      }
                      value={id}
                      className={`${
                        selectedProducts.includes(id)
                          ? "selected-item-category"
                          : ""
                      }`}
                    >
                      {name}
                    </option>
                  ))}
                </ul>
              </div>
            </div>
            <div className="filter-card mb-3">
              <h3 className="filter-title">Filter By</h3>
              <div>
                <h5 className="sub-title">Price</h5>
                <div className="d-flex flex-wrap align-items-center gap-10">
                  <div className="form-floating">
                    <input
                      type="number"
                      className="form-control min-form"
                      id="floatingInput"
                      placeholder="From"
                    />
                    <label htmlFor="floatingInput">min</label>
                  </div>
                  <div className="form-floating">
                    <input
                      type="number"
                      className="form-control min-form"
                      id="floatingInput1"
                      placeholder="To"
                    />
                    <label htmlFor="floatingInput1">max</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-9">
            <div className="filter-sort-grid mb-4">
              <div className="d-flex justify-content-between align-items-center">
                {!smallScreen && (
                  <div className="d-flex align-items-center gap-10">
                    <p className="mb-0 d-block" style={{ width: "100px" }}>
                      Sort By:
                    </p>
                    <select
                      name=""
                      defaultValue={"manula"}
                      className="form-control form-select"
                      id=""
                    >
                      <option value="manual">Featured</option>
                      <option value="best-selling">Best selling</option>
                      <option value="title-ascending">
                        Alphabetically, A-Z
                      </option>
                      <option value="title-descending">
                        Alphabetically, Z-A
                      </option>
                      <option value="price-ascending">
                        Price, low to high
                      </option>
                      <option value="price-descending">
                        Price, high to low
                      </option>
                    </select>
                  </div>
                )}
                <div className="d-flex align-items-center gap-10">
                  <p className="totalproducts mb-0">{data?.length} Products</p>
                  <div className="d-flex flex-wrap gap-10 align-items-center grid">
                    <img
                      onClick={() => {
                        setGrid(3);
                      }}
                      src="images/gr4.svg"
                      className="d-block img-fluid"
                      alt="grid"
                    />
                    <img
                      onClick={() => {
                        setGrid(4);
                      }}
                      src="images/gr3.svg"
                      className="d-block img-fluid"
                      alt="grid"
                    />
                    <img
                      onClick={() => {
                        setGrid(6);
                      }}
                      src="images/gr2.svg"
                      className="d-block img-fluid"
                      alt="grid"
                    />

                    <img
                      onClick={() => {
                        setGrid(12);
                      }}
                      src="images/gr.svg"
                      className="d-block img-fluid"
                      alt="grid"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="products-list pb-5">
              <div className="d-flex gap-10 flex-wrap">
                {(data ?? []).map((item) => (
                  <ProductCard grid={grid} data={item} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default OurStore;
