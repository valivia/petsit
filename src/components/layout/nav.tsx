"use client"
import Link from "next/link";
import styles from "./nav.module.scss";
import dict from "@/dictionaries/en.json";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Session } from "next-auth";
import { VscBell, VscBellDot } from "react-icons/vsc";
import useSWR from "swr";
import { fetcher } from "@/lib/swr";

export const Nav = ({ session }: { session: Session | null }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { data, error, isLoading } = useSWR("/api/request", fetcher);

  console.log({ data, error, isLoading });

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


        {session &&
          <li className={styles.button}>
            <Link href={"/request"} aria-label="Requests">
              {data && data.length > 0 ? <VscBellDot /> : <VscBell />}
            </Link>
          </li>
        }

        {session ?
          <li className={styles.avatar}>
            <Link href={`/user/${session.user?.id}`} aria-label="">
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
