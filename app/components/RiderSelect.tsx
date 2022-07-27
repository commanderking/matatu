import Avatar from "app/components/Avatar";
import type { Riders } from "app/models/rider.server";

type Props = {
  riders: Riders;
  // TODO: Update this to action
  onClick: any;
  selectedRiderId: string | null;
};

const RiderSelect = ({ riders, onClick, selectedRiderId }: Props) => {
  const Avatars = riders.map((rider) => {
    const isHighlighted = rider.id === selectedRiderId;
    return (
      <button className="p-1" key={rider.id} onClick={() => onClick(rider.id)}>
        <Avatar src={rider.profileSrc} isHighlighted={isHighlighted} />
      </button>
    );
  });

  return <div className="m-auto max-w-lg p-8">{Avatars}</div>;
};

export default RiderSelect;
