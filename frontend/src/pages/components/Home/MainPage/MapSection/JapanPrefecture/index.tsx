import * as d3 from 'd3';
import React, { useRef, FC, useEffect } from 'react';
import * as topojson from 'topojson';

const JapanPrefecture: FC = () => {
  const Svg = useRef<SVGSVGElement>(null);
  const G = useRef<SVGGElement>(null);
  useEffect(() => {
    let svg: d3.Selection<SVGSVGElement, any, any, any>;
    let g: any;
    if (
      Svg.current !== null &&
      Svg.current !== undefined &&
      G.current !== null &&
      G.current !== undefined
    ) {
      svg = d3.select<SVGSVGElement, any>(Svg.current);
      g = d3.select<SVGGElement, any>(G.current);
      d3.json('japan.topojson').then((data: any) => {
        const japan: any = topojson.feature(data, data.objects.japan);

        const width = 1440;
        const height = 920;
        const geoCenter: [number, number] = [137, 34];
        const geoScale = 1000;

        const zahyou1 = [137.7261111111, 34.7108333333];

        const projection: any = d3
          .geoMercator()
          .center(geoCenter)
          .translate([width / 2, height / 2])
          .scale(geoScale);

        const path: any = d3.geoPath().projection(projection);

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
          .data(japan.features)
          .join('path')
          .on('click', clicked)
          .attr('d', path);

        states.append('title').text((d: any) => d.properties.name);

        g.append('path')
          .attr('fill', 'none')
          .attr('stroke', 'white')
          .attr('stroke-linejoin', 'round')
          .attr(
            'd',
            path(
              topojson.mesh(
                data,
                data.objects.japan,
                (a: any, b: any) => a !== b,
              ),
            ),
          );

        states.exit().remove();
        g.exit().remove();

        const circles = g
          .append('circle')
          .attr('fill', '#0088DD')
          .attr('stroke', 'white')
          .attr('r', 2)
          .attr('cx', projection(zahyou1)[0])
          .attr('cy', projection(zahyou1)[1]);
        const txt = g
          .append('text')
          .text('Hamamatsu')
          .attr('font-size', 2)
          .attr('x', projection(zahyou1)[0])
          .attr('y', projection(zahyou1)[1] + 3);

        svg.call(zoom);

        function reset() {
          states.transition().style('fill', null);
          if (svg.node() != null) {
            const nodes: any = svg.node();
            svg
              .transition()
              .duration(750)
              .call(
                zoom.transform,
                d3.zoomIdentity,
                d3.zoomTransform(nodes).invert([width / 2, height / 2]),
              );
          }
          states.exit().remove();
          g.exit().remove();
        }

        function clicked(event: React.MouseEvent<HTMLInputElement>, d: any) {
          const [[x0, y0], [x1, y1]] = path.bounds(d);
          event.stopPropagation();
          states.transition().style('fill', null);
          d3.select<any, any>(event.target).transition().style('fill', 'red');
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

        function zoomed(event: any) {
          const { transform } = event;
          g.attr('transform', transform);
          g.attr('stroke-width', 1 / transform.k);
        }

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

export default JapanPrefecture;
