import Layout from "@/components/layout";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface CustomData {
  desc: string[];
  image: string;
}

export default function InfoPage() {
  const router = useRouter();
  const query = router.query.slug || null;
  const [mainData, setMainData] = useState<CustomData | null>(null);
  const [content, setContent] = useState<WikiData[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        `https://en.wikipedia.org/w/rest.php/v1/page/${query}/with_html`,
      );
      const json: any = await res.json();
      const html = document.createElement("html");
      html.innerHTML = json.html;

      const descElements: NodeListOf<HTMLElement> = html.querySelectorAll(
        "body > section:first-child > p",
      );
      const descText: string[] = Array.from(descElements).map((x) =>
        x.innerText?.replace(/\[[0-9]+\]/gi, ""),
      );

      const imgElement: HTMLImageElement | null = html.querySelector(
        ".image-section img, .mw-file-description img, img.mw-file-element",
      );
      const img = imgElement?.src || "";

      setMainData({
        desc: descText,
        image: img,
      });
    };

    if (query) fetchData();
  }, [router]);

  return (
    <Layout>
      <div className="info-page flex w-full flex-row flex-wrap gap-8">
        <h1 className="text-2xl">{query}</h1>
        {mainData?.desc ? (
          <div className="flex gap-8">
            <div className="">
              {mainData.desc.map((x, key) => (
                <p key={key}>{x}</p>
              ))}
            </div>
            <img src={mainData.image} className="flex-grow" />
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </Layout>
  );
}
