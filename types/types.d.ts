interface WikiData {
  id: number;
  key: string;
  title: string;
  article?: string;
  excerpt: string;
  matched_title: string | null;
  description: string;
  thumbnail: {
    duration: number | null;
    height: number;
    width: number;
    mimetype: string;
    url: string;
    source?: string;
  } | null;
  invalidreason?: string;
}

interface WikiResponse {
  pages: WikiData[];
  items?: [
    {
      articles: WikiData[];
    },
  ];
}
