const modeType = {
  Map: 'map',
  Tour: 'tour',
} as const;

export type ModeType = typeof modeType[keyof typeof modeType];
