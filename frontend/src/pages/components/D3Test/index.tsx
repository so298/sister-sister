import { Text } from '@mantine/core';
import * as d3 from 'd3';
import { Feature } from 'geojson';
import React, {
  useRef,
  FC,
  RefObject,
  Component,
  useState,
  useEffect,
} from 'react';
import * as topojson from 'topojson';
import { Topology } from 'topojson-specification';

import input from './data/japan.json';

export interface InputCsvType {
  Prefecture: string;
  Population: number;
  FoodProduction: number;
  ClothingProduction: number;
  FurnitureProduction: number;
}
//const svg = useRef<SVGSVGElement>;
const D3Test: FC = () => {
  //const draw = (svg: d3.Selection<SVGSVGElement, Feature[], null, undefined>) => {
  const width = 800;
  const height = 800;
  //console.log(input);
  //const populationHash = new Map<string, number>();
  const [svg, setSvg] = useState(
    d3
      .select('body')
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .attr('y', 40),
  );
  const [loading, setLoading] = useState(true);

  //const color = d3.scaleLinear().domain([500, 14000]).range([255, 0]);

  // d3.csv<InputCsvType>(".data/Japan2015Data.csv").then(function (data) {
  //   data.forEach<InputCsvType>(function (d:InputCsvType) {

  //     if (d != undefined && d != null){
  //       populationHash.set(d.Prefecture,d.Population)
  //     };
  //   });
  //   showMap();
  // });
  // showMap();
  // function showMap() {
  useEffect(() => {
    d3.json<Topology>('.data/japan.json').then((data: any) => {
      if (data == undefined || data == null) {
        return;
      }
      setLoading(false);
      console.log(data);
      const japan: any = topojson.feature(data, data.objects.japan);
      console.log(japan);
      const projection: d3.GeoProjection = d3
        .geoMercator()
        .center([137, 34])
        .translate([width / 2, height / 2])
        .scale(1500);

      const path: any = d3.geoPath().projection(projection);
      console.log(japan);
      svg
        .selectAll('path')
        .data(japan)
        .enter()
        .append('path')
        .attr('d', path)
        // .attr("fill", function (d) {
        //   return (
        //     "rgb(255," +
        //     Math.floor(color(populationHash[d.properties.nam_ja])) +
        //     ",   " +
        //     Math.floor(color(populationHash[d.properties.nam_ja])) +
        //     ")"
        //   );
        // })
        .attr('stroke', '#333333')
        .attr('stroke-width', 0.5);
    });
  });
  //}
  //};

  //draw(svg);

  //   const svg = d3
  //     .select('body')
  //     .append('svg')
  //     .attr('width', 500)
  //     .attr('height', 500);

  //   svg.append('text').attr('x', 100).attr('y', 100).text('Hello d3js');

  //   svg.append('circle').attr('r', 30).attr('cx', 60).attr('cy', 50);

  return (
    <>
      <Text>D3Test</Text>
    </>
  );
};

export default D3Test;
