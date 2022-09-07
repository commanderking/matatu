import { TripMedia } from "app/types/vehicle";
type Props = {
  medium: TripMedia;
};

const TripMedia = ({ medium }: Props) => {
  if (medium.mediaType === "VIDEO") {
    return <video src={medium.src} autoPlay muted loop></video>;
  }

  if (medium.mediaType === "IMAGE") {
    return <img src={medium.src} />;
  }

  return null;
};

export default TripMedia;
