import CartIcon from "../../icons/CartIcon";
// import SearchIcon from '../../icons/SearchIcon'
import { Button } from "../Button/Button";
import styles from "./header.module.css";
import Link from "next/link";
import { ToastPortal } from "../Toast/ToastPortal";
import { Toast } from "../Toast/Toast";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

const Header = () => {
  const router = useRouter();
  const [isMobileNavOpen, setMobileNavOpen] = useState(false);
  const [isToastActive, setIsToastActive] = useState(false);
  const [isToastVisible, setIsToastVisible] = useState(false);

  const topNav = [
    {
      url: "/category/new",
      title: "What’s new",
    },
    {
      url: "/category/furniture",
      title: "Furniture",
    },
    {
      url: "/category/accessories",
      title: "Accessories",
    },
  ];

  let mobileNavMaskclasses = [styles.mobileNavMask];
  let mobileNavclasses = [styles.mobileNav];

  if (isMobileNavOpen) {
    mobileNavclasses.push(styles.active);
    mobileNavMaskclasses.push(styles.active);
  }

  const openToast = () => {
    if (!isToastActive && !isToastVisible) {
      setTimeout(function () {
        setIsToastVisible(false);
        setTimeout(function () {
          setIsToastActive(false);
        }, 700);
      }, 3000);
      setIsToastActive(true);
      setIsToastVisible(true);
    }
  };

  useEffect(() => {
    const handleRouteChange = () => {
      if (isMobileNavOpen) setMobileNavOpen(false);
    };
    router.events.on("routeChangeStart", handleRouteChange);
    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
    };
  }, [isMobileNavOpen, router.events]);

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.leftContainer}>
          <Button onClick={() => setMobileNavOpen(!isMobileNavOpen)}>
            {isMobileNavOpen ? "Close" : "Menu"}
          </Button>
        </div>

        <div className={styles.brand}>
          <Link href={`/`}>Demo store.</Link>
        </div>

        <div className={styles.nav}>
          {topNav.map((navItem, i) => {
            return (
              <Link href={navItem.url} passHref key={i}>
                <Button as={"a"}>{navItem.title}</Button>
              </Link>
            );
          })}
        </div>
        <div className={styles.rightContainer}>
          {/* <Button
          onClick={() => {
            console.log('Search button click')
          }}
        >
          <SearchIcon />
        </Button> */}
          <Button
            onClick={() => {
              openToast();
            }}
          >
            <CartIcon />
          </Button>
        </div>
        <ToastPortal>
          {isToastActive && (
            <Toast
              message={"This is a demo store"}
              isVisible={isToastVisible}
            />
          )}
        </ToastPortal>
      </div>
      <div
        className={mobileNavMaskclasses.join(" ")}
        onClick={() => setMobileNavOpen(false)}
      />
      <nav className={mobileNavclasses.join(" ")}>
        {topNav.map((navItem, i) => {
          return (
            <Link href={navItem.url} passHref key={i}>
              <Button as={"a"}>{navItem.title}</Button>
            </Link>
          );
        })}
      </nav>
    </>
  );
};

export { Header };
