"use client";

import * as React from "react";

import useScrollPosition from "@react-hook/window-scroll";

const ScrollWatcher = () => {
  const hasMounted = React.useRef(false);

  // check if is first mount
  React.useEffect(() => {
    hasMounted.current = true;
  });

  // show nav onScrollUp
  const prevScrollPos = React.useRef();
  const scrollY = useScrollPosition(); // defaults to 30fps
  const [navVisible, setNavVisible] = React.useState(true);
  React.useEffect(() => {
    const justLoaded =
      !hasMounted.current || typeof prevScrollPos.current === "undefined";
    const nearTop = scrollY < 100;
    const isScrollingUp = prevScrollPos?.current > scrollY;

    const shouldShow = justLoaded || nearTop || isScrollingUp;
    setNavVisible(shouldShow);

    if (hasMounted.current) {
      prevScrollPos.current = scrollY; // stash for next scroll
    }
  }, [scrollY]);

  React.useEffect(() => {
    if (!hasMounted.current) return; // no document in SSR

    document
      .querySelector("html")
      .style.setProperty(
        "--navTop",
        navVisible ? "0px" : "calc(0px - var(--navHeight))"
      );

    return () => {
      document.querySelector("html").style.setProperty("--navTop", "0px");
    };
  }, [navVisible]);

  return null;
};

export default ScrollWatcher;
