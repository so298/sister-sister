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

  const [geoData, setGeoData] = useState<unknown[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [geoPath, setGeoPath] = useState<any>(null);
  const dataFetchDone = useRef(false);
  const renderDone = useRef(false);

  const svgElemRef = useRef<SVGSVGElement>(null);
  const gElemRef = useRef<SVGGElement>(null);

  const [svg, setSvg] = useState<any>(null);
  const [g, setG] = useState<any>(null);
  const sisterPath = useRef<any>(null);

  useEffect(() => {
    setSvg(d3.select(svgElemRef.current));
    setG(d3.select(gElemRef.current));
  }, []);

  const projection = useMemo(() => {
    const initialCenter: LatLngTuple = [0, 0];
    const initialScale = 300;
    return d3
      .geoMercator()
      .center(initialCenter)
      .translate([width / 2, height / 2])
      .scale(initialScale);
  }, [width, height]);

  const linkList: CityLinkType[] = useMemo(() => {
    console.log('link update');
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

  // set projection
  useEffect(() => {
    setGeoPath(() => d3.geoPath().projection(projection));
  }, [projection]);

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

  // set topology data (called once initial)
  useEffect(() => {
    if (dataFetchDone.current && !renderDone.current && geoPath && g && svg) {
      renderDone.current = true;

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const worldGeo = geoData as any;

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const path = geoPath;

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

        if (sisterPath.current) {
          sisterPath.current.attr('opacity', 0);
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

      states.exit().remove();
      g.exit().remove();

      svg.call(zoom);
    }
  }, [
    g,
    geoData,
    geoPath,
    height,
    linkList,
    projection,
    setSelectedCard,
    setSourceCityName,
    svg,
    width,
  ]);

  // draw sister sity path
  useEffect(() => {
    if (geoPath && g) {
      if (!sisterPath.current) {
        sisterPath.current = g.selectAll('sisterPath');
      }

      console.log('remove');
      sisterPath.current = sisterPath.current
        .data(linkList)
        .join('path')
        .attr('opacity', 1)
        .attr('d', (d: any) => geoPath(d))
        .style('fill', 'none')
        .style('stroke', '#69b3a2')
        .style('stroke-width', 2);
    }
  }, [geoPath, linkList]);

  useEffect(() => {
    if (
      svgElemRef.current !== null &&
      svgElemRef.current !== undefined &&
      gElemRef.current !== null &&
      gElemRef.current !== undefined &&
      selectedCard !== undefined
    ) {
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
      <svg ref={svgElemRef}>
        <g ref={gElemRef} />
      </svg>
    </>
  );
};

export default World;
