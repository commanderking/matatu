import { fieldToMpala, mpalaToFieldPath } from "app/constants/paths";

export const routesById = {
  1: {
    id: 1,
    path: `path("${mpalaToFieldPath}")`,
    startX: 729.9,
    startY: 358,
    startTextX: 729.9 - 60,
    startTextY: 358 + 40,
    endX: 120,
    endY: 400,
    endTextX: 120 - 60,
    endTextY: 400 + 40,
  },
  2: {
    id: 2,
    path: `path("${fieldToMpala}")`,
    endX: 729.9,
    endY: 358,
    endTextX: 729.9 - 60,
    endTextY: 358 + 40,
    startX: 120,
    startY: 400,
    startTextX: 120 - 60,
    startTextY: 400 + 40,
  },
};
