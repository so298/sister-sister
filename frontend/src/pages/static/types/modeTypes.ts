export const modeType = {
  Search: 'search',
  Tour: 'tour',
} as const;

export type ModeType = typeof modeType[keyof typeof modeType];
