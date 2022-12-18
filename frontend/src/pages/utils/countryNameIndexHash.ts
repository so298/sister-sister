import cityData from '../../data/prodCityData.json';
import { CityDataType } from '../static/types/cityDataType';

const dataObject: any = cityData;
const data: CityDataType[] = dataObject;
const countryNameIndexHash = new Map<string, number[]>();

data.forEach((d, index) => {
  const temp: number[] | undefined = countryNameIndexHash.get(d.country);
  if (typeof temp === 'undefined') {
    countryNameIndexHash.set(d.country, [index]);
  } else {
    temp.push(index);
    countryNameIndexHash.set(d.country, [index]);
  }
});

console.log({ countryNameIndexHash: countryNameIndexHash });
export default countryNameIndexHash;
