import cityData from '../../data/prodCityData.json';
import { CityDataType } from '../static/types/cityDataType';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const dataObject: any = cityData;
const data: CityDataType[] = dataObject;
const countryPrefectureNameIndexHash = new Map<string, number[]>();

data.forEach((d, index) => {
  if (d.country === 'Japan') {
    const temp: number[] | undefined = countryPrefectureNameIndexHash.get(
      d.prefecture,
    );
    if (typeof temp === 'undefined') {
      countryPrefectureNameIndexHash.set(d.prefecture, [index]);
    } else {
      temp.push(index);
      countryPrefectureNameIndexHash.set(d.prefecture, temp);
    }
  } else {
    const temp: number[] | undefined = countryPrefectureNameIndexHash.get(
      d.country,
    );
    if (typeof temp === 'undefined') {
      countryPrefectureNameIndexHash.set(d.country, [index]);
    } else {
      temp.push(index);
      countryPrefectureNameIndexHash.set(d.country, temp);
    }
  }
});

console.log({ countryPrefectureNameIndexHash: countryPrefectureNameIndexHash });
export default countryPrefectureNameIndexHash;
