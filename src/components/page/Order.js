import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Order = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [address, setAddress] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Lấy thông tin người dùng từ localStorage
  const user = JSON.parse(localStorage.getItem("user"));

  // Kiểm tra đăng nhập và quyền người dùng
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  // Lấy danh sách sản phẩm từ API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("https://ktpm-e9c1.onrender.com/api/products");
        setProducts(response.data);
      } catch (error) {
        console.error("❌ Lỗi khi lấy danh sách sản phẩm:", error);
        setMessage("Không thể tải danh sách sản phẩm. Vui lòng thử lại!");
      }
    };
    fetchProducts();
  }, []);

  // Gửi đơn hàng
  const handleOrder = async (e) => {
    e.preventDefault();

    // Kiểm tra các điều kiện nhập liệu
    if (!selectedProduct || quantity < 1 || !address.trim()) {
      setMessage("Vui lòng chọn sản phẩm, nhập số lượng hợp lệ và địa chỉ!");
      return;
    }

    setLoading(true); // Hiển thị trạng thái loading

    try {
      const response = await axios.post("https://api-ktpm-jfi8.onrender.com/api/orders", {
        userId: user._id,
        product: selectedProduct._id,
        quantity,
        address,
      });

      console.log("✅ Đơn hàng đã được đặt:", response.data);
      setMessage("🎉 Đặt hàng thành công!");
      setSelectedProduct(null);
      setQuantity(1);
      setAddress("");
    } catch (error) {
      console.error("❌ Lỗi khi đặt hàng:", error);
      if (error.response && error.response.data) {
        setMessage(`Lỗi: ${error.response.data.message || "Không thể đặt hàng. Vui lòng thử lại!"}`);
      } else {
        setMessage("Lỗi khi đặt hàng, vui lòng thử lại!");
      }
    }

    setLoading(false); // Ẩn trạng thái loading
  };

  return (
    <section id="order" className="container mt-4">
      <h2 className="text-center">Thanh toán</h2>

      {message && <p className={`alert ${message.includes("thành công") ? "alert-success" : "alert-danger"}`}>{message}</p>}

      <form onSubmit={handleOrder} className="p-4 border rounded shadow">
        {/* Chọn sản phẩm */}
        <div className="mb-3">
          <label htmlFor="product" className="form-label">Sản phẩm:</label>
          <select
            id="product"
            className="form-select"
            value={selectedProduct ? selectedProduct._id : ""}
            onChange={(e) => setSelectedProduct(products.find(p => p._id === e.target.value))}
            required
          >
            <option value="">-- Chọn sản phẩm --</option>
            {products.map((product) => (
              <option key={product._id} value={product._id}>
                {product.name} - {product.price.toLocaleString()} VNĐ
              </option>
            ))}
          </select>
        </div>

        {/* Nhập số lượng */}
        <div className="mb-3">
          <label htmlFor="quantity" className="form-label">Số lượng:</label>
          <input
            type="number"
            id="quantity"
            className="form-control"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            required
          />
        </div>

        {/* Địa chỉ giao hàng */}
        <div className="mb-3">
          <label id="address" htmlFor="address" className="form-label">Địa chỉ giao hàng:</label>
          <input
            type="text"
            id="address"
            className="form-control"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>

        {/* Hiển thị tổng giá tiền */}
        {selectedProduct && (
          <div className="mb-3">
            <strong>Tổng cộng: </strong> {selectedProduct.price * quantity} VNĐ
          </div>
        )}

        {/* Nút đặt hàng */}
        <button
          id="checkout-button"
          type="submit"
          className="btn btn-primary w-100"
          disabled={!selectedProduct || !address.trim() || loading}
        >
          {loading ? "⏳ Đang xử lý..." : "Đặt Hàng"}
        </button>
      </form>
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

export default Order;
