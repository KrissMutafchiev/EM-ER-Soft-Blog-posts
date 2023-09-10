import React from "react";
import Image from "next/image";
import { Post } from "@/types";

const PostCard = (postData: Post) => {
  return (
    <div className="post">
      <div className="max-w-lg mx-auto hover:translate-y-2">
        <div className="bg-white shadow-md border border-gray-200 rounded-lg max-w-sm mb-5">
          <Image
            src={postData.imageUrl}
            alt="post-image"
            className="rounded-t-lg w-full"
            width={150}
            height={1}
          />
          <div className="p-5">
            <h5 className="text-gray-900 font-bold text-lg h-14 tracking-tight mb-2">
              {postData.title}
            </h5>
            <div className="bg-yellow-500 text-white py-1 px-2 mt-2 rounded-md h-14">
              {postData.slug}
            </div>
            <p className="font-normal text-gray-700 mb-3 h-36">
              {postData.excerpt}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PostCard;
