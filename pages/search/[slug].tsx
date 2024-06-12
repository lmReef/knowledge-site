import WikiCard from "@/components/WikiCard";
import Layout from "@/components/layout";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function SearchPage() {
  const router = useRouter();
  const query = router.query.slug || null;
  const [content, setContent] = useState<WikiData[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const filters = ["(disambiguation)"]; // to filter out junk items
      const limit = 12;
      const res = await fetch(
        `https://en.wikipedia.org/w/rest.php/v1/search/page?q=${query}&limit=${limit}`,
      );
      const json: WikiResponse = await res.json();

      setContent(
        json.pages.filter(
          (page: WikiData) =>
            !filters.some((filter) => page.title.includes(filter)),
        ),
      );
    };

    if (query) fetchData();
  }, [router, query]);

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
