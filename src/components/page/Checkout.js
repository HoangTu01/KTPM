import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";


const Checkout = () => {
  const [cart, setCart] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Lấy thông tin giỏ hàng từ localStorage
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  // Xóa sản phẩm khỏi giỏ hàng
  const removeFromCart = (index) => {
    const newCart = cart.filter((_, i) => i !== index);
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  // Xử lý thanh toán
  const handleCheckout = async () => {
    if (cart.length === 0) {
      setMessage("❌ Giỏ hàng trống, không thể thanh toán!");
      return;
    }

    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      navigate("/login");
      return;
    }

    const orderData = {
      userId: user._id,
      items: cart.map((item) => ({
        productId: item._id,
        quantity: item.quantity,
      })),
    };

    setLoading(true); // Bật trạng thái loading khi bắt đầu thanh toán

    try {
      console.log("📡 Gửi request đến API:", orderData);
      const response = await axios.post("https://api-ktpm-jfi8.onrender.com/api/orders", orderData);

      console.log("✅ Đơn hàng đã được đặt:", response.data);
      setMessage("🎉 Đặt hàng thành công!");

      // Xóa giỏ hàng sau khi đặt hàng thành công
      localStorage.removeItem("cart");
      setCart([]);

      // Chuyển sang trang order sau 1.5s
      setTimeout(() => navigate("/order"), 1500);
    } catch (error) {
      console.error("❌ Lỗi khi đặt hàng:", error);
      if (error.response && error.response.data) {
        setMessage(`Lỗi: ${error.response.data.message || "Không thể đặt hàng. Vui lòng thử lại!"}`);
      } else {
        setMessage("Đặt hàng thất bại, vui lòng thử lại!");
      }
    }

    setLoading(false); // Tắt trạng thái loading
  };

  return (
    <section id="checkout" className="container mt-4">
      <h2>🛒 Giỏ hàng của bạn</h2>

      {message && <p className={`alert ${message.includes("thành công") ? "alert-success" : "alert-danger"}`}>{message}</p>}

      {cart.length === 0 ? (
        <p>🛍️ Giỏ hàng trống!</p>
      ) : (
        <div>
<ul className="list-group">
  {cart.map((item, index) => (
    <li key={index} className="list-group-item d-flex align-items-center">
      <img
        src={item.imageUrl}
        alt={item.name}
        className="img-thumbnail me-3"
        style={{ width: "80px", height: "80px" }}
      />
      <div className="flex-grow-1">
        <h5 className="mb-1">{item.name}</h5>
        <p className="mb-1">Giá: {item.price.toLocaleString()} VNĐ</p>
        <p className="mb-1">Dung Tích: {item.size}</p> {/* Display the selected size */}
        <p className="mb-0">Số lượng: {item.quantity}</p>
      </div>
      <button className="btn btn-danger btn-sm" onClick={() => removeFromCart(index)}>🗑️ Xóa</button>
    </li>
  ))}
</ul>

          <button
            className="btn btn-success mt-3"
            onClick={handleCheckout}
            disabled={loading}
          >
            {loading ? "⏳ Đang xử lý..." : "✅ Thanh toán"}
          </button>
        </div>
      )}


<footer className="footer bg-dark text-white py-5" style={{marginTop:250}}>
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

export default Checkout;
