"use client";
import { useEffect, useRef } from "react";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";

export default function SearchBar() {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  const searchHandler = () => {
    router.push(
      `/search/${encodeURIComponent(inputRef.current?.value || "NZ")}`,
    );
  };

  useEffect(() => {
    document.addEventListener("keypress", (event) => {
      if (event.code === "Slash") {
        event.preventDefault();
        inputRef.current?.focus();
      }
    });
  }, []);

  return (
    <form onSubmit={searchHandler}>
      <div className="search-bar relative flex items-center text-gray-950">
        <input
          ref={inputRef}
          className="search-input h-8 rounded p-3 pr-8"
          type="text"
          placeholder="/ Search"
        />
        <div
          className="search-button absolute right-0 flex h-full cursor-pointer items-center p-2 transition-all hover:-translate-y-0.5"
          onClick={searchHandler}
        >
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </div>
      </div>
    </form>
  );
}
