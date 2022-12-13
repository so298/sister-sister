/* eslint-disable @typescript-eslint/no-explicit-any */

export type MouseEventType = {
  target: string;
  stopPropagation: () => void;
};

export type ZoomEventType = {
  transform: any;
};
