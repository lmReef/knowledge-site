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

  const iframeHelper = (obj: any) => {
    obj.style.height =
      obj.contentWindow.document.documentElement.scrollHeight + "px";
  };

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        `https://en.wikipedia.org/w/rest.php/v1/page/${query}/with_html`,
      );
      const json: any = await res.json();
      const html = document.createElement("html");
      html.innerHTML = json.html;

      // clean the html
      const stylesheet: HTMLLinkElement | null = html.querySelector(
        "link[rel='stylesheet']",
      );
      if (stylesheet) {
        const url = new URL(stylesheet.href);
        stylesheet.href =
          "http://en.wikipedia.org" +
          stylesheet.href.replace(/^.*?(\/w\/)/, "$1");
      }

      Array.from(
        html.querySelectorAll("base, .nv-view, .nv-talk, .nv-edit"),
      )?.forEach((x) => x.remove());

      // remove links from images
      Array.from(html.querySelectorAll("a:has(>img)")).forEach(
        (x: HTMLElement) => x.attributes.removeNamedItem("href"),
      );

      // fix hardcoded styles
      Array.from(html.querySelectorAll("*[style*='color:']"))?.forEach((x) => {
        if (x.style?.color) x.style.color = "";
      });
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
      <div className="info-page flex w-full flex-col gap-6">
        <div className="title flex gap-6">
          <h1 className="text-4xl">{title}</h1>
          <SaveButton title={title} className="h-12 w-12 self-center px-4" />
        </div>
        {wikiHtml ? (
          <div
            className="wiki-body h-full w-full text-gray-300"
            dangerouslySetInnerHTML={{
              __html: wikiHtml.innerHTML || "",
            }}
          />
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </Layout>
  );
}
