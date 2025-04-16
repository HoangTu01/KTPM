import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user")); // Lấy thông tin user
  const [searchTerm, setSearchTerm] = useState("");

  // Xử lý tìm kiếm
  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;
    navigate(`/search?query=${encodeURIComponent(searchTerm)}`);
  };

  // Xử lý đăng xuất
  const handleLogout = () => {
    localStorage.removeItem("user"); // Xóa thông tin user
    navigate("/login"); // Chuyển về trang đăng nhập
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
      <Link className="navbar-brand" to="/">
        <img src="https://nhainonline.vn/wp-content/uploads/2023/05/tai-mau-logo-shop-nuoc-hoa.jpg?v=1696668053" alt="Logo" style={{ height: "50px", width: "auto" }} />
        </Link>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">Trang Chủ</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/products">Sản Phẩm</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/checkout">Giỏ Hàng</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/order">Đơn Hàng</Link>
            </li>
          </ul>

          {/* Ô tìm kiếm */}
          <form className="d-flex me-3" onSubmit={handleSearch}>
            <input
            id="seacrh"
              className="form-control me-2"
              type="search"
              placeholder="Tìm kiếm sản phẩm..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="btn btn-primary" type="submit" style={{marginRight:"40px",width:"200px"}}>Tìm Kiếm</button>
          </form>

          {/* Tài khoản người dùng */}
          <ul className="navbar-nav">
            {user ? (
              <>
                <li className="nav-item">
                  <span className="nav-link">👤 {user.name}</span>
                </li>
                <li className="nav-item">
                  <button className="btn btn-primary" onClick={handleLogout}>Đăng Xuất</button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link id="login" className="nav-link" to="/login">Đăng Nhập</Link>
                </li>
                <li className="nav-item">
                  <Link id="register" className="nav-link" to="/register">Đăng Ký</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
