import { seatHeight, seatWidth, strokeSpacing } from "app/constants/vehicle";

type Props = {
  uniqueId: string;
  id: string;
  x: number;
  y: number;
  image: string;
  currentRiderId: string | null;
};

// Nice seat reference
// https://stackoverflow.com/questions/8976791/how-to-set-a-stroke-width1-on-only-certain-sides-of-svg-shapes

const Rider = ({ uniqueId, id, x, y, image, currentRiderId }: Props) => {
  const isCurrentRider = currentRiderId === id;
  const isFaded = currentRiderId !== null && currentRiderId !== id;

  const r = seatWidth / 2;

  const circleClassName = isCurrentRider
    ? `stroke-rose-700 stroke-${strokeSpacing}`
    : `stroke-black-700 stroke-${strokeSpacing}`;

  return (
    <g>
      {image && (
        <g>
          <clipPath id={`circleView-${uniqueId}`}>
            <circle cx={x + r} cy={y + r} r={r} />
          </clipPath>

          <circle className={circleClassName} cx={x + r} cy={y + r} r={r} />
          <image
            id={`profileImage-${image}`}
            x={x}
            y={y}
            href={image}
            width={seatWidth}
            height={seatHeight}
            preserveAspectRatio="none"
            clipPath={`url(#circleView-${uniqueId})`}
            opacity={isFaded ? 0.7 : 1}
            filter={`brightness(${isCurrentRider ? 1.3 : 1})`}
          />
        </g>
      )}
    </g>
  );
};

export default Rider;
