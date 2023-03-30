import styles from "./layout.module.scss";
import type { Metadata } from "next/types";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <nav>navbar</nav>
      {children}
      <footer>footer</footer>
    </>
  );
}

export const metadata: Metadata = {
  title: "petsit",
  description: "",
};
