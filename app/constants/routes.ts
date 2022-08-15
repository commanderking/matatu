import {
  fieldToMpala,
  mpalaToFieldPath,
  mpalaToMtKenya,
} from "app/constants/paths";

const mpalaToFieldRoute = {
  id: 1,
  path: mpalaToFieldPath,
  startX: 729.9,
  startY: 358,
  startTextX: 729.9 - 60,
  startTextY: 358 + 40,
  endX: 120,
  endY: 400,
  endTextX: 120 - 60,
  endTextY: 400 + 40,
};

export const routesById: {
  [key: number]: typeof mpalaToFieldRoute;
} = {
  1: mpalaToFieldRoute,
  2: {
    id: 2,
    path: fieldToMpala,
    endX: 729.9,
    endY: 358,
    endTextX: 729.9 - 60,
    endTextY: 358 + 40,
    startX: 120,
    startY: 400,
    startTextX: 120 - 60,
    startTextY: 400 + 40,
  },
  101: {
    id: 101,
    path: mpalaToMtKenya,
    startX: 174.4 - 10,
    startY: 26.49,
    startTextX: 174.4 - 60,
    startTextY: 26.49 + 40,
    endX: 620,
    endY: 400,
    endTextX: 620 - 20,
    endTextY: 400 + 40,
  },
};
