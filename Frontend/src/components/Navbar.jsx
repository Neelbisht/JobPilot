
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const updateUser = () => {
      const token = sessionStorage.getItem("token");
      const savedUser = sessionStorage.getItem("user");

      if (token && savedUser) {
        try {
          setUser(JSON.parse(savedUser));
        } catch {
          sessionStorage.removeItem("token");
          sessionStorage.removeItem("user");
          setUser(null);
        }
      } else {
        setUser(null);
      }
    };

    updateUser();

    window.addEventListener("authChange", updateUser);

    return () => {
      window.removeEventListener("authChange", updateUser);
    };
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");

    setUser(null);
    setMenuOpen(false);

    window.dispatchEvent(new Event("authChange"));
    navigate("/login");
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className="sticky top-0 z-50 border-b bg-white shadow-sm">
      <div className="flex h-20 items-center justify-between px-6">

        {/* Logo */}
        <Link
          to="/"
          onClick={closeMenu}
          className="text-2xl font-bold text-black"
        >
          JobPilot
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-6 md:flex">
          <Link to="/" className="hover:text-cyan-500">
            Home
          </Link>

          <Link to="/jobs" className="hover:text-cyan-500">
            Jobs
          </Link>

          <Link to="/internships" className="hover:text-cyan-500">
            Internships
          </Link>

          <Link to="/about" className="hover:text-cyan-500">
            About
          </Link>
        </div>

        {/* Desktop Buttons */}
        <div className="hidden items-center gap-5 md:flex">
          {user ? (
            <>
              <span className="text-sm text-slate-700">
                Hi, {user.name}
              </span>

              <Link to="/profile" className="hover:text-cyan-500">
                Profile
              </Link>

              <button
                type="button"
                onClick={handleLogout}
                className="rounded-lg bg-cyan-600 px-4 py-2 text-white hover:bg-cyan-700"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-cyan-500">
                Login
              </Link>

              <Link
                to="/register"
                className="rounded-lg bg-cyan-600 px-4 py-2 text-white hover:bg-cyan-700"
              >
                Register
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-2xl md:hidden"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile Navigation */}
      {menuOpen && (
        <div className="flex flex-col gap-4 border-t bg-white p-5 md:hidden">
          <Link to="/" onClick={closeMenu}>
            Home
          </Link>

          <Link to="/jobs" onClick={closeMenu}>
            Jobs
          </Link>

          <Link to="/internships" onClick={closeMenu}>
            Internships
          </Link>

          <Link to="/about" onClick={closeMenu}>
            About
          </Link>

          {user ? (
            <>
              <span className="text-sm text-slate-700">
                Hi, {user.name}
              </span>

              <Link to="/profile" onClick={closeMenu}>
                Profile
              </Link>

              <button
                type="button"
                onClick={handleLogout}
                className="rounded-lg bg-cyan-600 px-4 py-2 text-center text-white hover:bg-cyan-700"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" onClick={closeMenu}>
                Login
              </Link>

              <Link
                to="/register"
                onClick={closeMenu}
                className="rounded-lg bg-cyan-600 px-4 py-2 text-center text-white"
              >
                Register
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;



