type Props = {
  src: string;
  isHighlighted: boolean;
};

const Avatar = ({ src, isHighlighted }: Props) => {
  const ringcolor = isHighlighted ? "ring-rose-500" : "ring-gray-300";
  return (
    <img
      className={`inline-block h-16 w-16 rounded-full p-1 ring-2 ${ringcolor}`}
      src={src}
      alt="MIA"
    />
  );
};

export default Avatar;
