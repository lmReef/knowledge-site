"use client";
import { useEffect, useRef, useState } from "react";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import { isMobile } from "@/scripts/Breakpoints";

export default function SearchBar() {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [expanded, setExpanded] = useState(false);

  const searchHandler = () => {
    if (expanded) {
      router.push(
        `/search/${encodeURIComponent(inputRef.current?.value || "NZ")}`,
      );
    } else {
      setExpanded(true);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 10);
    }
  };

  useEffect(() => {
    setExpanded(!isMobile());

    document.addEventListener("keypress", (event) => {
      if (event.code === "Slash") {
        event.preventDefault();
        inputRef.current?.focus();
      }
    });
  }, []);

  useEffect(() => {
    if (inputRef.current && isMobile()) {
      inputRef.current.onblur = () => {
        setExpanded(false);
      };
    }
  }, [inputRef]);

  return (
    <form onSubmit={searchHandler} className="ml-auto">
      <div className="search-bar relative flex items-center text-gray-950">
        <input
          ref={inputRef}
          className={`search-input absolute h-8 -translate-x-full rounded p-3 pr-8 ${!expanded ? "w-0 opacity-0" : ""}`}
          type="text"
          placeholder="/ Search"
          disabled={!expanded}
        />
        <div
          className={`search-button absolute right-0 flex h-full cursor-pointer items-center p-2 transition-all hover:-translate-y-0.5`}
          onClick={searchHandler}
        >
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            className="text-[var(--custom-primary)]"
          />
        </div>
      </div>
    </form>
  );
}
