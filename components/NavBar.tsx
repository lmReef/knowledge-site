import Link from "next/link";
import NavItem from "./NavItem";
import SearchBar from "./SearchBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook, faBookmark } from "@fortawesome/free-solid-svg-icons";

export default function NavBar() {
  return (
    <>
      <div className="navbar fixed flex h-20 w-full items-center gap-2 bg-white bg-opacity-5 shadow-sm shadow-gray-900 backdrop-blur-md">
        <Link href="/">
          <div className="nav-logo h-full p-6 text-2xl">
            <FontAwesomeIcon icon={faBook} />
          </div>
        </Link>

        <NavItem link="/">Home</NavItem>
        <NavItem link="/">Browse</NavItem>

        <SearchBar />

        <div className="ml-auto">
          <NavItem link="/saved">
            Saved <FontAwesomeIcon icon={faBookmark} className="ml-4 text-xl" />
          </NavItem>
        </div>
      </div>
      <span className="nav-spacer block h-20" />
    </>
  );
}
