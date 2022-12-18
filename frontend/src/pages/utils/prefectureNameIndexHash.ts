import cityData from '../../data/prodCityData.json';
import { CityDataType } from '../static/types/cityDataType';

const dataObject: any = cityData;
const data: CityDataType[] = dataObject;
const prefectureNameIndexHash = new Map<string, number[]>();

data.forEach((d, index) => {
  if (d.country === 'Japan') {
    const temp: number[] | undefined = prefectureNameIndexHash.get(
      d.prefecture,
    );
    if (typeof temp === 'undefined') {
      prefectureNameIndexHash.set(d.prefecture, [index]);
    } else {
      temp.push(index);
      prefectureNameIndexHash.set(d.prefecture, [index]);
    }
  }
});

console.log({ prefectureNameIndexHash: prefectureNameIndexHash });
export default prefectureNameIndexHash;
