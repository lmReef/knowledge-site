import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "./Button";
import {
  faBookmark as faBookmarkSolid,
  faHandPointUp,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";
import { addToSaved, getSaved, removeFromSaved } from "@/scripts/LocalStorage";
import { useEffect, useState } from "react";
import { faBookmark as faBookmarkRegular } from "@fortawesome/free-regular-svg-icons";

export default function WikiCard({ data }: { data: WikiData }) {
  const router = useRouter();
  const [isSaved, setIsSaved] = useState(false);

  const searchHandler = () => {
    if (router)
      router.push(
        `/search/${encodeURIComponent(data.title || data.matched_title || "home")}`,
      );
  };

  const saveHandler = () => {
    if (!isSaved) addToSaved(data.title);
    else removeFromSaved(data.title);

    setIsSaved(!isSaved);
  };

  const infoHandler = () => {
    router.push(`/info/${data.title}`);
  };

  useEffect(() => {
    setIsSaved(getSaved().includes(data.title));
  }, []);

  return (
    <div className="wiki-card m-auto flex h-fit w-80 max-w-80 flex-col gap-2 rounded bg-white bg-opacity-5 p-4 pb-0 text-center">
      <h3 className="text-xl">{data.title}</h3>

      <p>{data.description}</p>
      {data.thumbnail && (
        <img src={`https:${data.thumbnail.url}`} className="rounded-sm" />
      )}

      <div className="wiki-card-toolbar -mx-4 mt-2 flex pb-0">
        <Button
          onClick={searchHandler}
          className="flex-grow rounded-l rounded-r-none"
        >
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </Button>

        <Button onClick={infoHandler} className="flex-grow rounded-none">
          <FontAwesomeIcon icon={faHandPointUp} />
        </Button>

        <Button
          onClick={saveHandler}
          className="flex-grow rounded-l-none rounded-r"
        >
          {isSaved ? (
            <FontAwesomeIcon icon={faBookmarkSolid} />
          ) : (
            <FontAwesomeIcon icon={faBookmarkRegular} />
          )}
        </Button>
      </div>
    </div>
  );
}
