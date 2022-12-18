import cityData from '../../data/prodCityData.json';
import { CityDataType } from '../static/types/cityDataType';

const dataObject: any = cityData;
const data: CityDataType[] = dataObject;
const cityNameIndexHash = new Map<string, number>();

data.forEach((d, index) => {
  cityNameIndexHash.set(d.cityName, index);
});

console.log({ cityNameIndexHash });
export default cityNameIndexHash;
