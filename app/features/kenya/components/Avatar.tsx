type Props = {
  src: string;
  isHighlighted: boolean;
};

const Avatar = ({ src, isHighlighted }: Props) => {
  const ringClassNames = isHighlighted
    ? "ring-4 ring-rose-500"
    : "ring-2 ring-gray-300";
  return (
    <img
      className={`inline-block h-16 w-16 rounded-full p-1 ring-2 ${ringClassNames}`}
      src={src}
      alt="MIA"
    />
  );
};

export default Avatar;
