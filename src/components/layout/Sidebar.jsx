import { NavLink } from "react-router-dom";
import { FiLogOut, FiX } from "react-icons/fi";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import Logo from "../../assets/20260623_190852.png";
import Logo2 from "../../assets/20260623_191023.png"

function Sidebar({ links, isOpen = false, onClose = () => {} }) {
  const { logout } = useAuth();

  return (
    <>
      <button
        type="button"
        className={`student-sidebar-backdrop${isOpen ? " is-visible" : ""}`}
        aria-label="Close navigation menu"
        tabIndex={isOpen ? 0 : -1}
        onClick={onClose}
      />
      <aside id="student-navigation" className={`student-sidebar${isOpen ? " is-open" : ""}`} aria-label="Main navigation">
        <button
          type="button"
          className="student-sidebar-close"
          onClick={onClose}
          aria-label="Close navigation menu"
        >
          <FiX aria-hidden="true" />
        </button>
      <Link to="/" className="bx-nav-brand-group">
        <img src={Logo} alt="" className="bx-nav-logo d-lg-flex d-none" />
        <img src={Logo2} alt="" className="bx-nav-logo2 d-lg-none d-sm-flex" />
        {/* <span className="bx-nav-brand-text student-sidebar-brand-copy">Benedex</span> */}
      </Link>

      <nav className="student-sidebar-nav" aria-label="Student navigation">
        {links.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            end={link.path === "/student" || link.path === "/instructor" || link.path === "/admin"}
            onClick={onClose}
            className={({ isActive }) =>
              `student-sidebar-link${isActive ? " is-active" : ""}`
            }
          >
            <span className="student-sidebar-icon" aria-hidden="true">
              {link.icon}
            </span>
            <span className="student-sidebar-label">{link.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="student-sidebar-footer">
        <button
          type="button"
          className="student-sidebar-logout"
          onClick={logout}
          aria-label="Sign out"
        >
          <span className="student-sidebar-icon" aria-hidden="true">
            <FiLogOut />
          </span>
          <span className="student-sidebar-label">Logout</span>
        </button>
      </div>
      </aside>
    </>
  );
}

export default Sidebar;