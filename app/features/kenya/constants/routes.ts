import {
  eagleScoutToMpala,
  fieldToMpala,
  fieldToSegera,
  mpalaToEagleScout,
  mpalaToFieldPath,
  mpalaToMtKenya,
  mtKenyaToNanyuki,
  nanyukiToMpala,
  segeraToMpala,
  mpalaToTalisman,
} from "~/features/kenya/constants/paths";

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
  102: {
    id: 102,
    path: mtKenyaToNanyuki,
    startX: 715 - 10,
    startY: 296.6,
    startTextX: 715 - 60,
    startTextY: 296.6 + 40,
    endX: 88,
    endY: 230,
    endTextX: 88 - 20,
    endTextY: 230 + 40,
  },
  103: {
    id: 103,
    path: nanyukiToMpala,
    startX: 538.7,
    startY: 400.7,
    startTextX: 538.7 - 60,
    startTextY: 400.7 + 40,
    endX: 300,
    endY: 35,
    endTextX: 300 - 20,
    endTextY: 35 + 40,
  },
  10: {
    id: 10,
    path: mpalaToEagleScout,
    startX: 399,
    startY: 394.1,
    startTextX: 399.394 - 60,
    startTextY: 394.1 + 40,
    endX: 395,
    endY: 85,
    endTextX: 395 - 20,
    endTextY: 85 + 40,
  },
  11: {
    id: 11,
    path: eagleScoutToMpala,
    startX: 409.5 - 10,
    startY: 100.8,
    startTextX: 409.5 - 60,
    startTextY: 100.8 + 40,
    endX: 399 - 10,
    endY: 394.1,
    endTextX: 399 - 20,
    endTextY: 394.1 + 40,
  },
  3: {
    id: 3,
    path: fieldToSegera,
    startX: 566.2 - 10,
    startY: 378.1,
    startTextX: 566.2 - 30,
    startTextY: 378.1 + 40,
    endX: 380 - 10,
    endY: 35,
    endTextX: 380 - 20,
    endTextY: 35 + 40,
  },
  4: {
    id: 4,
    path: segeraToMpala,
    startX: 286.3 - 10,
    startY: 51.09,
    startTextX: 286.3 - 30,
    startTextY: 51.09 + 40,
    endX: 485 - 10,
    endY: 220,
    endTextX: 485 - 20,
    endTextY: 220 + 40,
  },
  200: {
    id: 200,
    path: mpalaToTalisman,
    startX: 394.6 - 10,
    startY: 37.04 - 10,
    startTextX: 394.6 - 60,
    startTextY: 37.04 - 10,
    endX: 350 - 10,
    endY: 400,
    endTextX: 350 - 20,
    endTextY: 400 + 40,
  },
};

// 394.6 37.04