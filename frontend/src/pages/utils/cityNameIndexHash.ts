import cityData from '../../data/prodCityData.json';
import { CityDataType } from '../static/types/cityDataType';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const dataObject: any = cityData;
const data: CityDataType[] = dataObject;
const cityNameIndexHash = new Map<string, number>();

data.forEach((d, index) => {
  cityNameIndexHash.set(d.cityName, index);
});

console.log({ cityNameIndexHash: cityNameIndexHash });
export default cityNameIndexHash;
