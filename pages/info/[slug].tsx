import SaveButton from "@/components/SaveButton";
import Layout from "@/components/layout";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function InfoPage() {
  const router = useRouter();
  const query = router.query.slug || null;
  const [wikiHtml, setWikiHtml] = useState<HTMLElement | null>(null);

  const title =
    typeof query === "string"
      ? query.replace("_", " ")
      : query
        ? query[0].replace("_", " ")
        : "";

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        `https://en.wikipedia.org/w/rest.php/v1/page/${query}/with_html`,
      );
      const json: any = await res.json();
      const html = document.createElement("html");
      html.innerHTML = json.html;

      // clean the html
      // remove links from images
      (
        Array.from(html.querySelectorAll("a:has(>img)")) as HTMLImageElement[]
      ).forEach((x) => x.attributes.removeNamedItem("href"));

      // fix hardcoded styles
      Array.from(html.querySelectorAll("*[style*='background']")).forEach(
        (x) => {
          x.setAttribute(
            "style",
            x
              .getAttribute("style")
              ?.replace(
                /background(:|.*?:)(.*?)(;|$)/gim,
                "background$1: #444444$3",
              ) || "",
          );
        },
      );

      setWikiHtml(html);
    };

    if (query) fetchData();
  }, [router]);

  return (
    <Layout>
      <div className="info-page flex w-full flex-col gap-6 px-24">
        <div className="title flex gap-6">
          <h1 className="text-4xl">{title}</h1>
          <SaveButton title={title} className="px-4" />
        </div>
        {wikiHtml ? (
          <div
            className="wiki-body text-gray-300"
            dangerouslySetInnerHTML={{
              __html: wikiHtml.querySelector("body")?.innerHTML || "",
            }}
          />
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </Layout>
  );
}
