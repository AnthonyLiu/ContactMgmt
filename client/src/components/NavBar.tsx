import { NavLink, NavLinkProps } from "react-router-dom";
import { useAppSelector } from "src/store/hooks";
import styles from "./NavBar.module.css";

export default function NavBar() {
  const { isAuth, user } = useAppSelector((state) => state.user);

  const navLinkClass: NavLinkProps["className"] = ({ isActive }) =>
    isActive ? "active" : "inactive";

  const logoutClass: NavLinkProps["className"] = ({ isActive }) =>
    (isActive ? "active logout" : "inactive")


  return (
    <nav className='nav'>
      {isAuth ? (
        <div>
          <NavLink className={`${navLinkClass} ${styles.navItem}`} to='/home'>
            Home
          </NavLink>
          <NavLink className={`${navLinkClass} ${styles.navItem}`} to='/my-profile'>
            {user?.username}
          </NavLink>
          <NavLink
            className={`${logoutClass} ${styles.navItem}`}
            to='/logout'>
            Logout
          </NavLink>
        </div>
      ) : (
        <div>
            <NavLink className={`${navLinkClass} ${styles.navItem}`} to='/home'>
              Home
          </NavLink>
          <NavLink className={`${navLinkClass} ${styles.navItem}`} to='/login'>
            Login
          </NavLink>
          <NavLink className={`${navLinkClass} ${styles.navItem}`} to='/register'>
            Register
          </NavLink>
        </div>
      )}
    </nav>
  );
}
