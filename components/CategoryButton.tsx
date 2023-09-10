"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { DEFAULT_PAGE } from "@/constants";
import { Cotegory } from "@/types";

const CategoryButton = (category: Cotegory) => {
  const router = useRouter();
  const initialRender = useRef(true);
  const [isSelected, setIsSelected] = useState(false);

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
      return;
    }

    if (isSelected) {
      router.push(`/?page=${DEFAULT_PAGE}&category=${category.id}`);
    } else {
      router.push("/");
    }
  }, [isSelected, category.id, router]);

  const handleClick = () => {
    setIsSelected(!isSelected);
  };

  return (
    <div className=" flex text-sm font-medium bg-white border border-gray-200 rounded-lg">
      <button
        onClick={handleClick}
        className=" px-4 py-2 text-white bg-blue-700 border-b border-gray-200 rounded-t-lg cursor-pointer dark:bg-blue-500"
      >
        {category.name}
      </button>
    </div>
  );
};

export default CategoryButton;
