import { Text, Box } from '@mantine/core';
import * as d3 from 'd3';
import { LatLngTuple } from 'leaflet';
import { FC, useEffect, useRef } from 'react';
import {
  MapContainer,
  TileLayer,
  Popup,
  Marker,
  Pane,
} from 'react-leaflet';

export const D3MapOverlayTest: FC = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const isInitialRender = useRef(true);

  useEffect(() => {
    if (!isInitialRender.current) return;
    isInitialRender.current = false;

    (async () => {
      const data = await d3.csv('./temp.csv');
      console.log(data);

      const svg = d3
        .select(svgRef.current)
        .attr('width', 5000)
        .attr('height', 5000);
      const circle = svg
        .selectAll('circle')
        .data(data)
        .enter()
        .append('circle');
      circle
        .attr('cx', (d, i) => i * 100 + 50)
        .attr('cy', (d, i) => i * 20 + 250)
        .attr('r', () => {
          return 20;
        })
        .attr('fill', (d, i) => `rgb(255, ${i * 40}, ${i * 40})`)
        .attr('stroke', 'black');
    })();
  }, []);

  const pos: LatLngTuple = [40, 140];

  return (
    <>
      <Text>D3 map overlay test</Text>
      <Box sx={{ width: '960px', height: '600px' }}>
        <MapContainer
          center={pos}
          zoom={4}
          style={{ width: '960px', height: '600px' }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={pos}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
          <Pane
            name="pane-test"
            pane="overlayPane"
            style={{ width: '960px', height: '600px' }}
          >
            <svg ref={svgRef}>
              <rect
                x="100"
                y="100"
                width="30"
                height="30"
                stroke="black"
                fill="transparent"
                strokeWidth="5"
              />
            </svg>
          </Pane>
        </MapContainer>
      </Box>
    </>
  );
};
