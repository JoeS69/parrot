import React from "react";
import parrotUrl from "./parrot.webp";

const ParrotTextLogo = ({
  width,
  height,
  className,
}: {
  width?: number | string;
  height?: number | string;
  className?: string;
}) => {
  return (
    <img
      src={parrotUrl}
      width={width}
      height={height}
      className={className}
      alt="Parrot logo"
    />
  );
};

export default ParrotTextLogo;
