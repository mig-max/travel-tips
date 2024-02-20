import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
  return (
    <div className="footer">
      <footer className="h-10 flex items-center gap-8 bg-orange-500 bg-opacity-50">
        <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
          <span className="text-sm text-[black] sm:text-center dark:text-[black]">
            © 2024{" "}
            <Link
              to={"https://github.com/mig-max"}
              aclassName="hover:underline"
            >
              Mig-Max
            </Link>
            . All Rights Reserved.
          </span>

          <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-[black]  dark:text-[black] sm:mt-0">
            <li>
              <Link to={"/about"} className="hover:underline me-4 md:me-6">
                About
              </Link>
            </li>
            <li>
              <Link to={"/contact"} className="hover:underline me-4 md:me-6">
                Contact
              </Link>
            </li>

            <li>
              <Link to={"*"} className="hover:underline me-4 md:me-6">
                Licensing
              </Link>
            </li>
          </ul>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
