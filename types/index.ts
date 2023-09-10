export interface Post {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  imageUrl: string;
  categories: number[];
}

export interface Cotegory {
  id: number;
  name: string;
  slug: string;
}
