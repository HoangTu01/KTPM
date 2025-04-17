import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./css/Home.css";

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("https://ktpm-e9c1.onrender.com/api/products");
        setProducts(response.data.slice(0, 4)); // Lấy 4 sản phẩm đầu tiên
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <section id="home" className="container mt-4">
      <h1 className="text-center">Chào mừng đến với Nước Hoa Cao Cấp</h1>
      <p className="text-center">Tìm kiếm và mua các hiệu nước hoa chất lượng cao tại đây.</p>

      {/* Bootstrap Carousel */}
      <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel" data-bs-interval="3000">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img className="d-block w-100" src="https://orchard.vn/wp-content/uploads/2018/04/dior-sauvage-edp_banner-scaled.jpg" alt="First slide" />
          </div>
          <div className="carousel-item">
            <img className="d-block w-100" src="https://cdn.vuahanghieu.com/unsafe/1200x0/left/top/smart/filters:quality(90)/https://admin.vuahanghieu.com/upload/news/2020/03/nhung-mui-huong-nuoc-hoa-dior-nam-chinh-hang-loi-cuon-phai-dep-nhat-18032020171010.png" alt="Second slide" />
          </div>
          <div className="carousel-item">
            <img className="d-block w-100" src="https://huongthom24h.com/wp-content/uploads/2023/10/banner-1.jpeg" alt="Third slide" />
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      {/* Sản phẩm nổi bật */}
      <div className="mt-5">
        <h2 className="text-center">Sản Phẩm Nổi Bật</h2>
        <div className="row">
          {products.map((product) => (
            <div className="col-md-3 mb-4" key={product._id}>
              <div className="card">
                <img src={product.imageUrl} className="card-img-top" alt={product.name} />
                <div className="card-body">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text">Giá: {product.price} VNĐ</p>
                  <Link to={`/product/${product.name}`} className="btn btn-primary">Xem Chi Tiết</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="footer bg-dark text-white py-5">
        <div className="container">
          <div className="row">
            <div className="col-md-3">
              <h5>Về Chúng Tôi</h5>
              <p>Nước Hoa Cao Cấp là cửa hàng chuyên cung cấp các sản phẩm nước hoa chính hãng với chất lượng cao.</p>
            </div>
            <div className="col-md-3">
              <h5>Liên Hệ</h5>
              <ul className="list-unstyled">
                <li>123 Nguyễn Văn Linh, Đà Nẵng, Việt Nam</li>
                <li>456 Lê Duẩn, Đà Nẵng, Việt Nam</li>
                <li>GỌI ĐẶT MUA: 1900 0129 (9:00 - 21:00)</li>
              </ul>
            </div>
            <div className="col-md-3">
              <h5>Theo Dõi Chúng Tôi</h5>
              <ul className="list-unstyled">
                <li><p >Facebook</p></li>
                <li><p >Instagram</p></li>
                <li><p >YouTube</p></li>
              </ul>
            </div>
            <div className="col-md-3">
              <h5>Đăng Ký Nhận Tin</h5>
              <form>
                <div className="mb-3">
                  <input type="email" className="form-control" placeholder="Nhập email của bạn" aria-label="Email" aria-describedby="button-addon2" />
                </div>
                <button className="btn btn-primary" type="button" id="button-addon2">Gửi</button>
              </form>
            </div>
          </div>
          <div className="text-center mt-4">
            <p>&copy; 2013-2025 Nước Hoa Cao Cấp. All Rights Reserved.</p>
          </div>
        </div>
      </footer>
    </section>
  );
};

export default Home;
