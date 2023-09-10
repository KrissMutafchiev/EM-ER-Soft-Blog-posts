// "use client";

import React from "react";
import clsx from "clsx";
import { PostCard, SearchBar, CategoryButton } from "@/components";
import { Post, Cotegory } from "@/types";
import { DEFAULT_PAGE, ITEMS_PER_PAGE } from "@/constants";
import { FetchPosts, FetchCategories } from "@/utils";
import Link from "next/link";

const Blog = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const page =
    typeof searchParams?.page === "string"
      ? Number(searchParams.page)
      : DEFAULT_PAGE;

  const limit =
    typeof searchParams?.limit === "string"
      ? Number(searchParams.limit)
      : ITEMS_PER_PAGE;

  const search =
    typeof searchParams?.search === "string" ? searchParams.search : undefined;

  const category =
    typeof searchParams?.category === "string"
      ? Number(searchParams.category)
      : undefined;

  const categories: Array<Cotegory> = await FetchCategories();
  const posts: Array<Post> = await FetchPosts({
    page,
    limit,
    term: search,
    category,
  });
  return (
    <div className="blog">
      <div className="bg-gray-100 min-h-screen flex justify-center items-center">
        <div className="max-w-4xl w-full p-4 ">
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 ">
            {/* Left Column */}
            <div className="flex space-x-2.5 ">
              <SearchBar search={search} />
              <div className="flex">
                <Link
                  href={{
                    pathname: `/`,
                    query: {
                      ...(search || category ? { search, category } : {}),
                      page: page > 1 ? page - 1 : 1,
                    },
                  }}
                  className={clsx(
                    "rounded border bg-gray-100 px-3 py-1 text-sm text-gray-800",
                    page <= 1 && "pointer-events-none opacity-50"
                  )}
                >
                  {" "}
                  <svg
                    className="w-3.5 h-3.5 mr-2"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 10"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 5H1m0 0 4 4M1 5l4-4"
                    />
                  </svg>
                  Prev
                </Link>
                <Link
                  href={{
                    pathname: `/`,
                    query: {
                      ...(search || category ? { search, category } : {}),
                      page: page + 1,
                    },
                  }}
                  className="rounded border bg-gray-100 px-3 py-1 text-sm text-gray-800"
                >
                  <svg
                    className="w-3.5 h-3.5 ml-2"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 10"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M1 5h12m0 0L9 1m4 4L9 9"
                    />
                  </svg>
                  Next
                </Link>
              </div>
            </div>
            {/* Right Column */}
            <div className="flex">
              {categories.map((category: Cotegory) => (
                <CategoryButton {...category} key={category.id} />
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post: Post) => (
              <PostCard {...post} key={post.id} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
