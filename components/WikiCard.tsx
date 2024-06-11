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

  useEffect(() => {
    const setImage = async () => {
      // console.log(await fetch(""));
    };
    setImage();
  }, []);

  return (
    <div
      className={`wiki-card m-auto flex max-h-full w-80 max-w-80 flex-col gap-2 rounded bg-white bg-opacity-5 p-4 pb-0 text-center ${styles["wiki-card"]}`}
    >
      <h3 className="text-xl">{data.title}</h3>

      <p>{data.description}</p>
      {data.thumbnail && (
        <img
          src={`https:${data.thumbnail.url}`}
          className="h-56 max-h-56 flex-shrink rounded-sm object-cover"
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
