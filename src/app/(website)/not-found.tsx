"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

/**
 * Redirect to home page on 404.
 */
export default function NotFound() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/");
  }, [router]);

  return null;
}