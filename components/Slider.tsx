import { useEffect, useState } from "react";
import WikiCard from "./WikiCard";
import Slider from "react-slick";

export default function CustomSlider({
  title,
  url,
}: {
  title: string;
  url: string;
}) {
  const [data, setData] = useState<WikiData[] | null>(null);

  const sliderSettings = {
    speed: 700,
    slidesToScroll: 3,
    initialSlide: 0,
    variableWidth: true,
    infinite: false,
    responsive: [
      {
        breakpoint: 1300,
        settings: {
          slidesToScroll: 1,
        },
      },
    ],
  };

  useEffect(() => {
    const filters = ["(disambiguation)"]; // to filter out junk items
    const limit = 20;
    fetch(url + `&limit=${limit}`)
      .then((res) => res.json())
      .then((json) => setData(json.pages));
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
