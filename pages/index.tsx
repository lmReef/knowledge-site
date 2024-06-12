import Slider from "@/components/Slider";
import Layout from "@/components/layout";
import { getSaved } from "@/scripts/LocalStorage";

export default function Home() {
  // popular slider data
  // get yesterdays date because wikipedia doesnt do same day data
  let date = new Date();
  date = new Date(date.setDate(date.getDate() - 1));

  // saved slider data
  const savedTitlesQuery = getSaved().slice(0, 50).join("|");

  return (
    <Layout>
      <div className="slider-section flex w-full flex-col gap-6">
        <Slider
          title="Popular"
          url={`https://wikimedia.org/api/rest_v1/metrics/pageviews/top/en.wikipedia.org/all-access/${date.getFullYear()}/${date.getMonth().toString().padStart(2, "0")}/${date.getDate().toString().padStart(2, "0")}`}
        />
        <Slider
          title="Random"
          url={`https://en.wikipedia.org/w/api.php?action=query&format=json&list=random&formatversion=2&rnnamespace=0&rnfilterredir=nonredirects&rnlimit=50&origin=*`}
        />
        <Slider
          title="Saved"
          url={`https://en.wikipedia.org/w/api.php?action=query&format=json&prop=description|pageimages&titles=${savedTitlesQuery}&origin=*`}
        />
      </div>
    </Layout>
  );
}
