import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "./Button";
import {
  faInfoCircle,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import SaveButton from "./SaveButton";
import styles from "./WikiCard.module.scss";

export default function WikiCard({ data }: { data: WikiData }) {
  const router = useRouter();

  const searchHandler = () => {
    if (router)
      router.push(
        `/search/${encodeURIComponent(data.title || data.matched_title || "home")}`,
      );
  };

  const infoHandler = () => {
    router.push(`/info/${data.title}`);
  };

  if (data.thumbnail) {
    if (data.thumbnail.source) {
      data.thumbnail.url = data.thumbnail.source;
    }

    data.thumbnail.url = data.thumbnail.url.replace(/[0-9]+px/, "/300px");
  }

  return (
    <div
      className={`wiki-card m-auto flex h-full max-h-full w-80 max-w-80 flex-shrink-0 flex-col gap-2 rounded bg-white bg-opacity-5 p-4 pb-0 text-center ${styles["wiki-card"]}`}
    >
      <h3 className="overflow-hidden text-ellipsis whitespace-nowrap text-xl">
        {data.title}
      </h3>

      <p className="flex flex-grow flex-col justify-center">
        {data.description}
      </p>
      {data.thumbnail && (
        <img
          src={`${data.thumbnail.url}`}
          className="h-56 flex-grow rounded-sm object-cover"
        />
      )}

      <div className="wiki-card-toolbar -mx-4 mt-2 flex pb-0">
        <Button
          onClick={searchHandler}
          className="flex-grow rounded-l rounded-r-none"
          tooltip="Search"
        >
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </Button>

        <Button
          onClick={infoHandler}
          className="flex-grow rounded-l-none rounded-r-none"
          tooltip="More Info"
        >
          <FontAwesomeIcon icon={faInfoCircle} className="text-lg" />
        </Button>

        <SaveButton
          title={data.title}
          className="flex-grow rounded-l-none rounded-r"
        />
      </div>
    </div>
  );
}
