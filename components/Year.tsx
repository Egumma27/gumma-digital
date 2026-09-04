"use client";

import { useEffect, useState } from "react";

/* The page is statically exported, so the build year is baked into the markup.
   Update it on mount so a site built in December is still right in January. */
export default function Year({ buildYear }: { buildYear: number }) {
  const [year, setYear] = useState(buildYear);
  useEffect(() => setYear(new Date().getFullYear()), []);
  return <span>{year}</span>;
}
