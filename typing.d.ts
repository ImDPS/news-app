type DataEntry = {
  author: string | null;
  category: string;
  country: string;
  description: string;
  image:string | null;
  language: string;
  published_at: string;
  source: string;
  title: string;
  uri: string;
}

type Article = {
  
}

type Pagination = {
  count: Int;
  limit: Int;
  offset: Int;
  total: Int;
}

type NewsResponse = {
  pagination: Pagination;
  data: DataEntry[];
}

type Category = 
  | "General"
  | "Business"
  | "Entertainment"
  | "Health"
  | "Science"
  | "Sports"
  | "Technology";