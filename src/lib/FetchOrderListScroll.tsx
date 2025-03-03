"use client";

export const FetchOrderListScroll = async (page: string, keyword: string) => {
  const params = new URLSearchParams();
  if (page && page.trim() !== "") params.set("page", page);
  if (keyword && keyword.trim() !== "") params.set("keyword", keyword);

  const res = await fetch(`/api/orders?${params.toString()}`, {
    method: "GET",
  });

  if (!res.ok) {
    const errorDetails = await res.text();
    throw new Error(`Failed to fetch orders ${errorDetails}`);
  }

  return res.json();
};
