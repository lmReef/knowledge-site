import Slider from "@/components/Slider";
import Layout from "@/components/layout";

export default function Home() {
  // get yesterdays date because wikipedia doesnt do same day data
  let date = new Date();
  date = new Date(date.setDate(date.getDate() - 1));

  return (
    <Layout>
      <Slider
        title="Popular"
        url={`https://wikimedia.org/api/rest_v1/metrics/pageviews/top/en.wikipedia.org/all-access/${date.getFullYear()}/${date.getMonth().toString().padStart(2, "0")}/${date.getDate().toString().padStart(2, "0")}`}
      />
    </Layout>
  );
}
