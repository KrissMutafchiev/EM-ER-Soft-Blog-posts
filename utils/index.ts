import { SERVER_HOST, ITEMS_PER_PAGE, DEFAULT_PAGE } from "@/constants";

export async function FetchPosts({
  term = '',
  category = '',
  page = 1,
  limit = 10,
}: {
  term?: string | null;
  category?: number | string;
  page: number;
  limit: number;
}) {
  const url = `${SERVER_HOST}/api/posts?query=search&page=${page}&limit=${limit}&term=${term}&category=${category}`;
  const headers: HeadersInit = {};
  // Set the required headers for the API request
  const response = await fetch(url, {
    headers: headers,
  });

  const result = await response.json();

  return result;
}

export async function FetchCategories() {
  const url = `${SERVER_HOST}/api/categories`;

  const headers: HeadersInit = {};

  // Set the required headers for the API request
  const response = await fetch(url, {
    headers: headers,
  });

  const result = await response.json();

  return result;
}
