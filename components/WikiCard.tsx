import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "./Button";
import {
  faInfoCircle,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";
import SaveButton from "./SaveButton";
import styles from "./WikiCard.module.scss";
import { useState } from "react";

export default function WikiCard({ data }: { data: WikiData }) {
  const router = useRouter();
  const [imageLoaded, setImageLoaded] = useState(!data.thumbnail);

  const searchHandler = () => {
    if (router && data)
      router.push(
        `/search/${encodeURIComponent(data.title || data.matched_title || "home")}`,
      );
  };

  const infoHandler = () => {
    if (data) router.push(`/wiki/${data.title}`);
  };

  const imageLoadedHandler = () => {
    setImageLoaded(true);
  };

  // TODO: probably move this out of this component and process all the data as it's received
  // because sometimes the responses are slightly different
  if (data && data.thumbnail) {
    if (data.thumbnail.source) {
      data.thumbnail.url = data.thumbnail.source;
    }

    data.thumbnail.url = data.thumbnail.url.replace(/[0-9]+px/, "/300px");
  }

  return (
    <div
      className={`wiki-card m-auto flex h-full max-h-full w-80 max-w-80 flex-shrink-0 flex-col gap-2 rounded bg-white bg-opacity-5 p-4 pb-0 text-center ${styles["wiki-card"]}`}
    >
      {data && (
        <>
          <h3
            className={`overflow-hidden text-ellipsis whitespace-nowrap bg-[rgba(0,0,0,0)] text-xl transition-all ${imageLoaded || "animate-pulse rounded bg-[rgba(150,150,150,1)] text-[rgba(0,0,0,0)] opacity-20"}`}
          >
            {data.title}
          </h3>

          <p
            className={`flex flex-grow flex-col justify-center bg-[rgba(0,0,0,0)] transition-all ${imageLoaded || "animate-pulse rounded bg-[rgba(150,150,150,1)] text-[rgba(0,0,0,0)] opacity-20"}`}
          >
            {data.description}
          </p>

          {data.thumbnail && (
            // <div
            //   className={`flex flex-grow rounded-sm bg-[rgba(0,0,0,0)] transition-all duration-500 ${imageLoaded || "animate-pulse bg-[rgba(150,150,150,1)] text-[rgba(0,0,0,0)] opacity-20"}`}
            // >
            <img
              onLoad={imageLoadedHandler}
              src={`${data.thumbnail.url}`}
              className={`h-56 flex-grow rounded-sm object-cover opacity-100 transition-all duration-500 ${imageLoaded || "opacity-0"}`}
              alt={"thumbnail"}
            />
            // </div>
          )}

          <div
            className={`wiki-card-toolbar -mx-4 mt-2 flex pb-0 ${imageLoaded || "animate-pulse opacity-20"}`}
          >
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
        </>
      )}
    </div>
  );
}
