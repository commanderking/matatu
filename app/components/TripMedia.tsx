import { TripMedia as TripMediaType } from "app/types/vehicle";
type Props = {
  medium: TripMediaType;
};

const TripMedia = ({ medium }: Props) => {
  if (medium.mediaType === "VIDEO") {
    return <video src={medium.src} autoPlay muted loop></video>;
  }

  if (medium.mediaType === "IMAGE") {
    return <img src={medium.src} alt={`Photo from ${medium.date}`} />;
  }

  return null;
};

export default TripMedia;
