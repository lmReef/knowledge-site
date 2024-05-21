interface WikiData {
  id: number;
  key: string;
  title: string;
  excerpt: string;
  matched_title: string | null;
  description: string;
  thumbnail: {
    duration: number | null;
    height: number;
    width: number;
    mimetype: string;
    url: string;
  } | null;
}

interface WikiResponse {
  pages: WikiData[];
}
