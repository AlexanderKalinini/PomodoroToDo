import classNames from "classnames";
import React from "react";
import styles from "./text.module.css";

export enum EColor {
  black = "black",
  orange = "orang",
  green = "green",
  white = "white",
  grayF4 = "grayF4",
  greyF3 = "greyF3",
  greyD9 = "greyD9",
  greyC4 = "greyC4",
  grey99 = "grey99",
  grey66 = "grey66",
}
type TSize = 28 | 20 | 16 | 14 | 12 | 10;
type TDisplays = "mobile" | "tablet" | "desktop";

interface ITextProps {
  As?: "span" | "h1" | "h2" | "h3" | "h4" | "p" | "div";
  children?: React.ReactNode;
  size: TSize;
  mobileSize?: TSize;
  tabletSize?: TSize;
  desktopSize?: TSize;
  color?: EColor;
  bold?: boolean;
}

export function Text({
  As = "span",
  color = EColor.black,
  children,
  size,
  mobileSize,
  tabletSize,
  desktopSize,
  bold,
}: ITextProps) {
  const classes = classNames(
    styles[`s${size}`],
    { [styles[`m${mobileSize}`]]: mobileSize },
    { [styles[`t${tabletSize}`]]: tabletSize },
    { [styles[`d${desktopSize}`]]: desktopSize },
    styles[color],
    { [styles.bold]: bold }
  );

  return <As className={classes}>{children}</As>;
}
