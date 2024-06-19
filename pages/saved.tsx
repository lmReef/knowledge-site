import WikiCard from "@/components/WikiCard";
import Layout from "@/components/layout";
import { getSaved } from "@/scripts/LocalStorage";
import { useEffect, useState } from "react";

export default function SavedPage() {
  const [content, setContent] = useState<WikiData[]>([]);

  useEffect(() => {
    const saved = getSaved();

    Promise.all(
      saved.map(async (item: string) => {
        const limit = 1;
        const res = await fetch(
          `https://en.wikipedia.org/w/rest.php/v1/search/page?q=${item}&limit=${limit}`,
        );
        const json: WikiResponse = await res.json();

        return json.pages[0];
      }),
    ).then((json) => {
      json.reverse();
      setContent(json);
    });
  }, []);

  return (
    <Layout>
      <div className="search-page flex w-full flex-row flex-wrap gap-8">
        {content ? (
          content.map((x: WikiData, key: number) => {
            return <WikiCard key={key} data={x} />;
          })
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </Layout>
  );
}
