import cityData from '../../data/cityData.json';
import { CityDataType } from '../static/types/cityDataType';

const data: CityDataType[] = cityData;
const cityNameIndexHash = new Map<string, number>();

data.forEach((d, index) => {
  cityNameIndexHash.set(d.cityName, index);
});

console.log({ cityNameIndexHash });
export default cityNameIndexHash;
