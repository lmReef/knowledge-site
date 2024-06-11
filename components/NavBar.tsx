import Link from "next/link";
import NavItem from "./NavItem";
import SearchBar from "./SearchBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBook,
  faBookmark,
  faFire,
  faHome,
  faShuffle,
} from "@fortawesome/free-solid-svg-icons";

export default function NavBar() {
  return (
    <>
      <div className="navbar fixed z-10 flex h-20 w-full items-center gap-2 bg-white bg-opacity-5 shadow-sm shadow-gray-900 backdrop-blur-md">
        <Link href="/">
          <div className="nav-logo h-full p-6 text-2xl">
            <FontAwesomeIcon icon={faBook} />
          </div>
        </Link>

        <NavItem link="/">
          <FontAwesomeIcon icon={faHome} />
          Home
        </NavItem>
        <NavItem link="/">
          <FontAwesomeIcon icon={faFire} />
          Popular
        </NavItem>
        <NavItem link="/">
          <FontAwesomeIcon icon={faShuffle} />
          Random
        </NavItem>

        <SearchBar />

        <div className="ml-auto">
          <NavItem link="/saved" className="px-6">
            <FontAwesomeIcon icon={faBookmark} className="text-xl" />
            Saved
          </NavItem>
        </div>
      </div>
      <span className="nav-spacer block h-20" />
    </>
  );
}
