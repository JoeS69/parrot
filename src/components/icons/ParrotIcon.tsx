import parrotIcon from "./parrot-icon.webp";

const ParrotIcon = ({
  width,
  height,
}: {
  width?: number | string;
  height?: number | string;
}) => (
  <img
    src={parrotIcon}
    width={width || 126}
    height={height || 135}
    alt="Parrot"
  />
);

export default ParrotIcon;
