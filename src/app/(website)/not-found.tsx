import { redirect } from "next/navigation";

/**
 * Redirect to home page.
 */
export default function Home() {
  redirect("/");
}
