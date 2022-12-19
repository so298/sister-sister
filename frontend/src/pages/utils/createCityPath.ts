import { LngLatTuple } from '../static/types/cityLinkType';

type Point = {
  x: number;
  y: number;
  z: number;
};

const eps = 1e-9;

export const createCityPath = (
  sourcePoint: LngLatTuple,
  targetPoint: LngLatTuple,
): LngLatTuple[] => {
  const sourceLongitude = sourcePoint[0];
  const targetLongitude = targetPoint[0];
  if (sourceLongitude * targetLongitude >= 0) {
    // if both point place in the same side
    return [sourcePoint, targetPoint];
  }

  const mid = calcMidLngLat(sourcePoint, targetPoint);

  const link: LngLatTuple[] = [sourcePoint, mid, targetPoint];
  return link;
};

const calcMidLngLat = (
  source: LngLatTuple,
  target: LngLatTuple,
): LngLatTuple => {
  const sourceCartesian = calcCartesian(source);
  const targetCartesian = calcCartesian(target);

  const normalVector = outerProd(sourceCartesian, targetCartesian);
  const u = normalVector.x;
  const v = normalVector.y;
  let w = normalVector.z;

  if (w == 0) w += eps;

  const midTheta = degToRad((source[0] + target[0]) / 2); // mid longitude
  const midPhi = Math.atan(
    -(u * Math.sin(midTheta) + v * Math.cos(midTheta)) / w,
  );

  const midLng = radToDeg(midTheta);
  const midLat = radToDeg(midPhi);

  return [midLng, midLat];
};

const calcCartesian = (lngLat: LngLatTuple): Point => {
  const theta = degToRad(lngLat[0]);
  const phi = degToRad(lngLat[1]);
  return {
    x: Math.sin(theta) * Math.cos(phi),
    y: Math.cos(theta) * Math.cos(phi),
    z: Math.sin(phi),
  };
};

const outerProd = (p1: Point, p2: Point): Point => {
  return {
    x: p1.y * p2.z - p1.z * p2.y,
    y: p1.z * p2.x - p1.x * p2.z,
    z: p1.x * p2.y - p1.y * p2.x,
  };
};

const degToRad = (deg: number): number => {
  return (Math.PI * deg) / 180;
};

const radToDeg = (rad: number): number => {
  return (180 * rad) / Math.PI;
};
