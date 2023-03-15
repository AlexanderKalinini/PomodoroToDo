import React from "react";
import classNames from "classnames";
import styles from "./break.css"


type TBreakSize = 4 | 8 | 12 | 16 | 20;
type TDisplays = "mobile" | "tablet" | "desktop";



interface IBreakProps {
  size: TBreakSize;
  tabletSize?: TBreakSize;
  mobileSize?: TBreakSize;
  desktopSize?: TBreakSize;
  inline?: boolean;
  top?: boolean;
}

export function Break(prop: IBreakProps) {
  const {
    inline = false,
    top = false,
    size,
    mobileSize,
    tabletSize,
    desktopSize,
  } = prop;
  return (
    <div
      className={classNames(
        styles[`s${size}`],
        { [styles[`mobile_s${mobileSize}`]]: mobileSize },
        { [styles[`tablet_s${tabletSize}`]]: tabletSize },
        { [styles[`descktop_s${desktopSize}`]]: desktopSize },
        { [styles.inline]: inline },
        { [styles.top]: top }
      )}
    ></div>
  );
}
