export const svgHeight = 320;
export const svgWidth = 200;

export const seatXShift = 10;
export const driverFrontSeatYShift = 20;

export const vehicleWidth = 150;
export const vehicleFrontHeight = 100;
export const vehicleBaseHeight = 220;
export const vehicleBaseYOffset = vehicleFrontHeight - 10;
export const vehicleXStartPos = (svgWidth - vehicleWidth) / 2;

export const wheelWidth = 10;
export const wheelHeight = 40;

export const strokeSpacing = 2;

export const seatRowWidth = vehicleWidth - seatXShift * 2;
export const seatWidth = (seatRowWidth - 3 * strokeSpacing) / 3;
export const seatHeight = seatWidth;

export const rowOneOffset = 10;

export const rowTwoOffset = 10 + seatHeight;
export const rowThreeOffset = 20 + seatHeight * 2;

export const secondRow = {
  x: vehicleXStartPos + seatXShift,
  y: vehicleBaseYOffset + 2 * seatHeight,
  seatWidth: seatRowWidth,
  seatHeight,
};

export const thirdRow = {
  x: vehicleXStartPos + seatXShift,
  y: vehicleBaseYOffset + seatHeight * 3 + driverFrontSeatYShift,
  seatWidth: seatRowWidth,
  seatHeight,
};

const driverSeat = {
  id: "1-1",
  row: 1,
  seat: 1,
  x: vehicleXStartPos + vehicleWidth - seatWidth - seatXShift,
  y: vehicleBaseYOffset + driverFrontSeatYShift,
  seatWidth,
  seatHeight,
};

export const ToyotaPradoSeatPositions: { [key: string]: typeof driverSeat } = {
  "1-1": driverSeat,
  "1-2": {
    id: "1-2",
    row: 1,
    seat: 1,
    x: vehicleXStartPos + seatXShift,
    y: vehicleBaseYOffset + driverFrontSeatYShift,
    seatWidth,
    seatHeight,
  },
  "1-3": {
    id: "1-3",
    row: 1,
    seat: 3,
    x: vehicleXStartPos + vehicleWidth / 2 - seatWidth / 2,
    y: vehicleBaseYOffset + 35,
    seatWidth: 20,
    seatHeight: 20,
  },
};

export const redColorScale = [
  "#F8D2D0",
  "#F1A4A1",
  "#F07470",
  "#DC1C13",
  "#B0160F",
];
