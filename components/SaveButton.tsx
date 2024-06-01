import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark as faBookmarkRegular } from "@fortawesome/free-regular-svg-icons";
import { faBookmark as faBookmarkSolid } from "@fortawesome/free-solid-svg-icons";
import Button from "./Button";
import { useEffect, useState } from "react";
import { addToSaved, getSaved, removeFromSaved } from "@/scripts/LocalStorage";

export default function SaveButton({
  title,
  className,
}: {
  title: string;
  className?: string;
}) {
  const [isSaved, setIsSaved] = useState(false);

  const saveHandler = () => {
    if (!isSaved) addToSaved(title);
    else removeFromSaved(title);

    setIsSaved(!isSaved);
  };

  useEffect(() => {
    setIsSaved(getSaved().includes(title));
  }, [title]);

  return (
    <Button
      onClick={saveHandler}
      className={`rounded ${className}`}
      tooltip={isSaved ? "Remove from Saved" : "Add to Saved"}
    >
      {isSaved ? (
        <FontAwesomeIcon icon={faBookmarkSolid} />
      ) : (
        <FontAwesomeIcon icon={faBookmarkRegular} />
      )}
    </Button>
  );
}
