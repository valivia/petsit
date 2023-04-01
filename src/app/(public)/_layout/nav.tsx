"use client"
import Link from "next/link";
import styles from "./nav.module.scss";
import dict from "@/dictionaries/en.json";
import Image from "next/image";
import { useState, useEffect } from "react";

export const Nav = ({ session }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    function handleScroll() {
      const scrollTop = window.pageYOffset;
      if (scrollTop > 0) setIsScrolled(true);
      else setIsScrolled(false);
    }

    document.addEventListener('scroll', handleScroll);
    return () => { document.removeEventListener('scroll', handleScroll) };
  }, []);


  return (
    <nav className={styles.main} data-is_scrolled={isScrolled}>
      <ul className={styles.list}>

        {/* Home */}
        <li className={styles.button}>
          <Link href={"/"} aria-label="Home">
            {dict.navigation.home}
          </Link>
        </li>

        <div className={styles.spacer}></div>

        {session ?
          <li className={styles.avatar}>
            <Link href={"/"} aria-label="">
              <Image src={session.user?.image || ""} alt="" fill />
            </Link>
          </li>
          :
          <li>
            <Link href={"/api/auth/signin"} aria-label="Login">
              {dict.navigation.login}
            </Link>
          </li>
        }

      </ul>
    </nav>
  );
};
