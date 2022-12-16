import * as d3 from 'd3';
import { LatLngTuple } from 'leaflet';
import React, { useRef, FC, useEffect, useMemo, useState } from 'react';

import dummyData from '../../../../../../data/dummyData.json';
import { CityDataType } from '../../../../../static/types/cityDataType';
import { CityLinkType } from '../../../../../static/types/cityLinkType';
import {
  MouseEventType,
  ZoomEventType,
} from '../../../../../static/types/eventTypes';
import { useWindowSize } from '../../../../../utils/GetWindowSize';
import cityNameIndexHash from '../../../../../utils/cityNameIndexHash';
import { useSearchModeState } from '../../../Provider/hooks/useSearchModeState';
// import { worldGeoJsonUrl } from '../../../../../static/urls';

const data: CityDataType[] = dummyData;

const ZOOM_EXTENT = 20;

const World: FC = () => {
  const {
    sourceCityName,
    setSourceCityName,
    targetCityNames,
    selectedCard,
    setSelectedCard,
  } = useSearchModeState();
  const [width, height] = useWindowSize();
  const geoCenter: LatLngTuple = [0, 0];
  const geoScale = 300;

  const position1: LatLngTuple = [137.7261111111, 34.7108333333];

  const [geoData, setGeoData] = useState<unknown[]>([]);
  const dataFetchDone = useRef(false);
  const renderDone = useRef(false);

  const projection = d3
    .geoMercator()
    .center(geoCenter)
    .translate([width / 2, height / 2])
    .scale(geoScale);

  const linkList: CityLinkType[] = useMemo(() => {
    const link: CityLinkType[] = [];
    if (sourceCityName !== undefined) {
      const sourceCityIndex = cityNameIndexHash.get(sourceCityName);
      if (typeof sourceCityIndex !== 'undefined') {
        const sourceCityInfo: CityDataType = data[sourceCityIndex];
        const source: LatLngTuple = [
          sourceCityInfo.position.longitude,
          sourceCityInfo.position.latitude,
        ];
        targetCityNames?.forEach((d) => {
          const targetCityIndex = cityNameIndexHash.get(d);
          if (typeof targetCityIndex !== 'undefined') {
            const targetCityInfo: CityDataType = data[targetCityIndex];
            const target: LatLngTuple = [
              targetCityInfo.position.longitude,
              targetCityInfo.position.latitude,
            ];
            const topush: CityLinkType = {
              type: 'LineString',
              coordinates: [source, target],
            };
            link.push(topush);
          }
        });
      } else return [];
    }
    return link;
  }, [targetCityNames]);

  const Svg = useRef<SVGSVGElement>(null);
  const G = useRef<SVGGElement>(null);

  useEffect(() => {
    console.log({ sourceCityName });
  }, [sourceCityName]);

  // load geo data
  useEffect(() => {
    if (!dataFetchDone.current) {
      console.log('data fetch');
      d3.json('./worldAndJapan.json').then((data: any) => {
        setGeoData(() => {
          console.log(data);
          dataFetchDone.current = true;
          return data;
        });
      });
    }
  }, []);

  useEffect(() => {
    if (
      Svg.current !== null &&
      Svg.current !== undefined &&
      G.current !== null &&
      G.current !== undefined &&
      dataFetchDone.current &&
      !renderDone.current
    ) {
      renderDone.current = true;

      const svg = d3.select(Svg.current);
      const g = d3.select(G.current);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const worldGeo = geoData as any;

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const path: any = d3.geoPath().projection(projection);

      const reset = () => {
        states.transition().style('fill', null);
        if (svg.node() != null) {
          const nodes = svg.node();
          if (nodes) {
            svg
              .transition()
              .duration(750)
              .call(
                zoom.transform,
                d3.zoomIdentity,
                d3.zoomTransform(nodes).invert([width / 2, height / 2]),
              );
            setSelectedCard(undefined);
          } else {
            console.error('error: no svg nodes exists');
          }
        }
        states.exit().remove();
        g.exit().remove();
      };

      const clicked = (event: MouseEventType, d: any) => {
        const [[x0, y0], [x1, y1]] = path.bounds(d);
        event.stopPropagation();
        states.transition().style('fill', null);
        d3.select(event.target).transition().style('fill', 'red');
        // set sourceCity
        if (d.properties.nam_ja !== undefined) {
          setSourceCityName(d.properties.nam_ja);
        }
        svg
          .transition()
          .duration(750)
          .call(
            zoom.transform,
            d3.zoomIdentity
              .translate(width / 2, height / 2)
              .scale(
                Math.min(
                  ZOOM_EXTENT,
                  0.9 / Math.max((x1 - x0) / width, (y1 - y0) / height),
                ),
              )
              .translate(-(x0 + x1) / 2, -(y0 + y1) / 2),
            d3.pointer(event, svg.node()),
          );
        svg.call(zoom);
      };

      const zoomed = (event: ZoomEventType) => {
        const { transform } = event;
        g.attr('transform', transform);
        g.attr('stroke-width', 1 / transform.k);
      };

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const zoom: any = d3
        .zoom()
        .scaleExtent([1, ZOOM_EXTENT])
        .on('zoom', zoomed);

      svg
        .attr('width', width)
        .attr('height', height)
        .attr('viewBox', [0, 0, width, height])
        .on('click', reset);

      const states = g
        .attr('fill', '#444')
        .attr('cursor', 'pointer')
        .selectAll('path')
        .data(worldGeo.features)
        .join('path')
        .on('click', clicked)
        .attr('d', path);

      g.append('path')
        .attr('fill', 'none')
        .attr('stroke', 'white')
        .attr('stroke-linejoin', 'round');

      g.selectAll('myPath')
        .data(linkList)
        .join('path')
        .attr('d', (d) => path(d))
        .style('fill', 'none')
        .style('stroke', '#69b3a2')
        .style('stroke-width', 2);

      states.exit().remove();
      g.exit().remove();

      const point1Projction = projection(position1);

      if (point1Projction) {
        // circle
        g.selectAll('circle').remove();
        g.selectAll('text').remove();

        g.append('circle')
          .attr('fill', '#0088DD')
          .attr('stroke', 'white')
          .attr('r', 2)
          .attr('cx', point1Projction[0])
          .attr('cy', point1Projction[1]);
        // text
        g.append('text')
          .text('Hamamatsu')
          .attr('font-size', 2)
          .attr('x', point1Projction[0])
          .attr('y', point1Projction[1] + 3);
      }

      svg.call(zoom);
    }
  }, [
    geoData,
    height,
    linkList,
    position1,
    projection,
    setSelectedCard,
    setSourceCityName,
    width,
  ]);

  useEffect(() => {
    if (
      Svg.current !== null &&
      Svg.current !== undefined &&
      G.current !== null &&
      G.current !== undefined &&
      selectedCard !== undefined
    ) {
      const svg = d3.select(Svg.current);
      const g = d3.select(G.current);
      const states = g
        .attr('fill', '#444')
        .attr('cursor', 'pointer')
        .selectAll('path');

      const zoom: any = d3
        .zoom()
        .scaleExtent([1, ZOOM_EXTENT])
        .on('zoom', (event: ZoomEventType) => {
          const { transform } = event;
          g.attr('transform', transform);
          g.attr('stroke-width', 1 / transform.k);
        });
      const centerOfClickedIndex = cityNameIndexHash.get(selectedCard);
      const centerOfClicked = centerOfClickedIndex
        ? projection([
            data[centerOfClickedIndex].position.longitude,
            data[centerOfClickedIndex].position.latitude,
          ])
        : undefined;

      console.log(centerOfClicked);
      states.transition().style('fill', null);
      centerOfClicked !== undefined &&
        centerOfClicked !== null &&
        svg
          .transition()
          .duration(750)
          .call(
            zoom.transform,
            d3.zoomIdentity
              .translate(width / 2, height / 2)
              .scale(1)
              .translate(-centerOfClicked[0], -centerOfClicked[1]),
          );
      svg.call(zoom);
    }
  }, [selectedCard]);

  return (
    <>
      <svg ref={Svg}>
        <g ref={G} />
      </svg>
    </>
  );
};

export default World;
