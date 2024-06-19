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
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function NavBar() {
  const router = useRouter();
  const [randomClicked, setRandomClicked] = useState(false);
  const [currentPage, setCurrentPage] = useState(router.pathname);

  const randomHandler = () => {
    setRandomClicked(true);

    fetch(
      "https://en.wikipedia.org/w/api.php?action=query&format=json&list=random&formatversion=2&rnnamespace=0&rnfilterredir=nonredirects&rnlimit=1&origin=*",
    )
      .then((res) => res.json())
      .then((json) =>
        router.push("/search/" + json.query.random[0].title.replace(" ", "_")),
      );
  };

  useEffect(() => {
    setCurrentPage(router.pathname);
  }, [router.pathname]);

  return (
    <>
      <div className="navbar fixed z-10 flex h-20 w-full items-center gap-2 bg-white bg-opacity-5 shadow-sm shadow-gray-900 backdrop-blur-md">
        <Link href="/">
          <div className="nav-logo h-full p-6 text-2xl">
            <FontAwesomeIcon icon={faBook} />
          </div>
        </Link>

        <NavItem link="/" currentPage={currentPage}>
          <FontAwesomeIcon icon={faHome} />
          Home
        </NavItem>
        <NavItem link="/popular" currentPage={currentPage}>
          <FontAwesomeIcon icon={faFire} />
          Popular
        </NavItem>
        <NavItem onclick={randomHandler} currentPage={currentPage}>
          {randomClicked ? (
            <FontAwesomeIcon icon={faSpinner} className="animate-spin" />
          ) : (
            <FontAwesomeIcon icon={faShuffle} />
          )}
          Random
        </NavItem>

        <SearchBar />

        <NavItem
          link="/saved"
          className="px-6"
          currentPage={currentPage}
          align="right"
        >
          <FontAwesomeIcon icon={faBookmark} className="text-xl" />
          Saved
        </NavItem>
      </div>
      <span className="nav-spacer block h-20" />
    </>
  );
}
