export type ColorCount = {
  color: string;
  count: number;
};

export type ToyotaPradoSeatIds =
  | "1-1"
  | "1-2"
  | "1-3"
  | "2-1"
  | "2-2"
  | "2-3"
  | "2-4"
  | "3-1"
  | "3-2"
  | "3-3";

export type Seating = {
  x: number;
  y: number;
  seatWidth: number;
  seatHeight: number;
};

export type Rider = {
  x: number;
  y: number;
  name: string;
  image: string;
  id: string;
};

export type TripSeatingConfig = {
  seating: Seating[];
  riders: Rider[];
};

export type SeatingColorCounts = {
  x: number;
  y: number;
} & ColorCount;
