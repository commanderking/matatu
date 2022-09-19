import { TripMedia as TripMediaType } from "~/features/kenya/types/vehicle";
type Props = {
  medium: TripMediaType;
};

const TripMedia = ({ medium }: Props) => {
  if (medium.mediaType === "VIDEO") {
    return (
      <video className="m-auto" src={medium.src} autoPlay muted loop></video>
    );
  }

  if (medium.mediaType === "IMAGE") {
    return (
      <img
        className="m-auto"
        src={medium.src}
        alt={`Photo from ${medium.date}`}
      />
    );
  }

  return null;
};

export default TripMedia;
