import { useEffect, useState } from "react";
import WikiCard from "./WikiCard";
import Slider from "react-slick";

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
        breakpoint: 768,
        settings: {
          arrows: false,
        },
      },
      {
        breakpoint: 1300,
        settings: {
          slidesToScroll: 1,
        },
      },
    ],
  };

  useEffect(() => {
    // shadows `url` so we can call it recursively if needed
    const handler = async (url: string) => {
      const filters = [
        "(disambiguation)",
        "Main_Page",
        "Special:",
        "Wikipedia:",
      ];

      const res = await fetch(url);
      const json = await res.json();

      if (json.query && !json.pages && json.query.pages) {
        json.pages = Object.values(json.query.pages);
      }
      if (json.pages) {
        setData(json.pages.filter((x: WikiData) => !x.invalidreason));
      } else if (json.items || json.query) {
        const items = json.query || json.items[0];
        if (items.articles || items.random) {
          const toProcess = items.articles || items.random;
          const articles = toProcess
            .filter(
              (x: WikiData) =>
                !filters.some((y) =>
                  x.article?.toLowerCase().includes(y.toLowerCase()),
                ),
            )
            .slice(0, limit)
            .map((x: WikiData) => {
              if (x.article) return x.article;
              else if (x.title) return x.title;
              return "";
            })
            .join("|");
          // the info we actually want, using titles from another response
          handler(
            `https://en.wikipedia.org/w/api.php?action=query&format=json&prop=description|pageimages&titles=${articles}&origin=*`,
          );
        }
      }
    };

    handler(url);
  }, []);

  return (
    <>
      <div className="slider-container w-full">
        <h2 className="slider-title text-2xl">{title}</h2>
        <Slider className="p-4" {...sliderSettings}>
          {data ? (
            data.map((x, key) => <WikiCard data={x} key={key} />)
          ) : (
            <p>Loading...</p>
          )}
        </Slider>
      </div>
    </>
  );
}
