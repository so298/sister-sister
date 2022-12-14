import * as d3 from 'd3';
import { LatLngTuple } from 'leaflet';
import React, { useRef, FC, useEffect } from 'react';

import { CityLinkType } from '../../../../../static/types/cityLinkType';
import {
  MouseEventType,
  ZoomEventType,
} from '../../../../../static/types/eventTypes';
import { geoJsonDataType } from '../../../../../static/types/geoJsonDataType';
// import { worldGeoJsonUrl } from '../../../../../static/urls';

const World: FC = () => {
  // ###########################
  // recive links
  const link: CityLinkType[] = [];
  const source: LatLngTuple = [139, 35];
  const target: LatLngTuple = [2.3, 48];
  const topush: CityLinkType = {
    type: 'LineString',
    coordinates: [source, target],
  };
  link.push(topush);
  //   ##############################
  const Svg = useRef<SVGSVGElement>(null);
  const G = useRef<SVGGElement>(null);
  useEffect(() => {
    if (
      Svg.current !== null &&
      Svg.current !== undefined &&
      G.current !== null &&
      G.current !== undefined
    ) {
      const svg = d3.select(Svg.current);
      const g = d3.select(G.current);
      Promise.all([
        //d3.json(worldGeoJsonUrl), // World shape
        d3.json('/worldAndJapan.json'),
        d3.csv('./data.csv'), // Position of circles
      ]).then((initialize) => {
        const worldGeo = initialize[0] as geoJsonDataType;
        const width = 1440;
        const height = 920;
        const geoCenter: LatLngTuple = [0, 0];
        const geoScale = 300;

        const position1: LatLngTuple = [137.7261111111, 34.7108333333];

        const projection = d3
          .geoMercator()
          .center(geoCenter)
          .translate([width / 2, height / 2])
          .scale(geoScale);

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const path: any = d3.geoPath().projection(projection);

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const zoom: any = d3.zoom().scaleExtent([1, 8]).on('zoom', zoomed);

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

        // states.on('mouseover', handleMouseOver);

        g.append('path')
          .attr('fill', 'none')
          .attr('stroke', 'white')
          .attr('stroke-linejoin', 'round');

        g.selectAll('myPath')
          .data(link)
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

        function reset() {
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
            } else {
              console.error('error: no svg nodes exists');
            }
          }
          states.exit().remove();
          g.exit().remove();
        }

        function clicked(event: MouseEventType, d: any) {
          const [[x0, y0], [x1, y1]] = path.bounds(d);
          event.stopPropagation();
          states.transition().style('fill', null);
          d3.select(event.target).transition().style('fill', 'red');
          console.log(d.properties.nam_ja);
          svg
            .transition()
            .duration(750)
            .call(
              zoom.transform,
              d3.zoomIdentity
                .translate(width / 2, height / 2)
                .scale(
                  Math.min(
                    8,
                    0.9 / Math.max((x1 - x0) / width, (y1 - y0) / height),
                  ),
                )
                .translate(-(x0 + x1) / 2, -(y0 + y1) / 2),
              d3.pointer(event, svg.node()),
            );
        }

        function zoomed(event: ZoomEventType) {
          const { transform } = event;
          g.attr('transform', transform);
          g.attr('stroke-width', 1 / transform.k);
        }

        // #########################################
        function handleMouseOver(_: any, d: any) {
          // const id: any = states.nodes().indexOf(this : any);
          svg
            .append('text')
            // .attr('id', `pref-${id}`)
            .attr('y', 20)
            .text(`Prefecture : ${d.properties.nam_ja}`);
        }
        // function handleMouseOut(_: any, d: any) {
        // const id = states.nodes().indexOf(this);
        // d3.select(`#pref-${id}`).remove();
        // }
        // ##########################################

        return svg.node();
      });
    }
    [Svg, G];
  });

  return (
    <>
      <svg ref={Svg}>
        <g ref={G} />
      </svg>
    </>
  );
};

export default World;
