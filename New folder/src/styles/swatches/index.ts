import deepBlue from "./deep-blue.json";
import teal from "./teal.json";
import emerald from "./emerald.json";
import amber from "./amber.json";

export const swatches = { deepBlue, teal, emerald, amber } as const;
export type SwatchId = keyof typeof swatches;

export type Swatch = (typeof swatches)[SwatchId];
