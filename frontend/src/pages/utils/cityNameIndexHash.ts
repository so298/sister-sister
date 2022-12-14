import dummyData from '../../data/dummyData.json';
import { CityDataType } from '../static/types/cityDataType';

const data: CityDataType[] = dummyData;
const cityNameIndexHash = new Map<string, number>();

data.forEach((d, index) => {
  cityNameIndexHash.set(d.cityName, index);
});

console.log({ cityNameIndexHash });
export default cityNameIndexHash;
