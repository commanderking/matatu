import { seatHeight, seatWidth, strokeSpacing } from "app/constants/vehicle";

type Props = {
  id?: string;
  x: number;
  y: number;
  image: string;
};

// Nice seat reference
// https://stackoverflow.com/questions/8976791/how-to-set-a-stroke-width1-on-only-certain-sides-of-svg-shapes

const Rider = ({ id, x, y, image }: Props) => {
  return (
    <g>
      {image && (
        <g>
          <clipPath id={`circleView-${id}`}>
            <circle
              cx={x + seatWidth / 2}
              cy={y + seatHeight / 2}
              r={seatWidth / 2}
            />
          </clipPath>

          <circle
            className={`fill-white stroke-rose-700 stroke-${strokeSpacing}`}
            cx={x + seatWidth / 2}
            cy={y + seatHeight / 2}
            r={seatWidth / 2}
          />
          <image
            id={`profileImage-${image}`}
            x={x}
            y={y}
            href={image}
            width={seatWidth}
            height={seatHeight}
            preserveAspectRatio="none"
            clipPath={`url(#circleView-${id})`}
          />
        </g>
      )}
    </g>
  );
};

export default Rider;