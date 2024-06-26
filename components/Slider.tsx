import { useEffect, useState } from "react";
import WikiCard from "./WikiCard";
import Slider from "react-slick";
import { getWikiRecursive } from "@/scripts/MediaWiki";
import { breakpoints } from "@/scripts/Breakpoints";

export default function CustomSlider({
  title,
  url,
  limit = 50,
}: {
  title: string;
  url: string;
  limit?: number;
}) {
  const [data, setData] = useState<WikiData[] | null>(null);

  const sliderSettings = {
    speed: 350,
    slidesToScroll: 3,
    initialSlide: 0,
    variableWidth: true,
    infinite: false,
    arrows: true,
    responsive: [
      {
        breakpoint: breakpoints.md,
        settings: {
          arrows: false,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: breakpoints.xl,
        settings: {
          slidesToScroll: 1,
        },
      },
    ],
  };

  useEffect(() => {
    getWikiRecursive(url, limit).then((x) => setData(x));
  }, [url, limit]);

  return (
    <>
      {data && (
        <div className="slider-container w-full">
          <h2 className="slider-title text-2xl">{title}</h2>
          <Slider className="p-4" {...sliderSettings}>
            {data.map((x, key) => (
              <WikiCard data={x} key={key} />
            ))}
          </Slider>
        </div>
      )}
    </>
  );
}
