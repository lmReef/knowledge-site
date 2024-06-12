import Slider from "@/components/Slider";
import Layout from "@/components/layout";

export default function Home() {
  return (
    <Layout>
      <Slider
        title="Popular"
        url="https://en.wikipedia.org/w/rest.php/v1/search/page?q=submission-wrestling"
      />
    </Layout>
  );
}
