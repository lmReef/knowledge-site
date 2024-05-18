import Link from "next/link";
import NavItem from "./NavItem";
import SearchBar from "./SearchBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook } from "@fortawesome/free-solid-svg-icons";

export default function NavBar() {
  return (
    <>
      <div className="navbar fixed flex h-20 w-full items-center gap-2 bg-white bg-opacity-5 shadow-sm shadow-gray-900 backdrop-blur-sm">
        <Link href="/">
          <div className="nav-logo h-full p-6 text-2xl">
            <FontAwesomeIcon icon={faBook} />
          </div>
        </Link>

        <NavItem text="Home" link="/" />
        <NavItem text="Browse" link="/" />

        <SearchBar />
      </div>
      <span className="nav-spacer block h-20" />
    </>
  );
}
