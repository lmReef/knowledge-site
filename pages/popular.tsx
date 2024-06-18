import WikiCard from "@/components/WikiCard";
import Layout from "@/components/layout";
import { getWikiRecursive } from "@/scripts/MediaWiki";
import { useEffect, useState } from "react";

export default function PopularPage() {
  const [content, setContent] = useState<WikiData[] | null>(null);

  useEffect(() => {
    // get yesterdays date because wikipedia doesnt do same day data
    let date = new Date();
    date = new Date(date.setDate(date.getDate() - 1));

    getWikiRecursive(
      `https://wikimedia.org/api/rest_v1/metrics/pageviews/top/en.wikipedia.org/all-access/${date.getFullYear()}/${date.getMonth().toString().padStart(2, "0")}/${date.getDate().toString().padStart(2, "0")}`,
    ).then((x) => setContent(x));
  }, []);

  return (
    <Layout>
      <div className="popular-page flex w-full flex-row flex-wrap gap-8">
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
