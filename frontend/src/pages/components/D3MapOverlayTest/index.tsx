import { Text, Box } from '@mantine/core';
import * as d3 from 'd3';
import { LatLngTuple } from 'leaflet';
import { FC, useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer, Popup, Marker } from 'react-leaflet';

export const D3MapOverlayTest: FC = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [isInitialRender, setIsInitialRender] = useState(true);

  useEffect(() => {
    if (!isInitialRender) return;
    setIsInitialRender(false);

    (async () => {
      const svg = d3.select(svgRef.current);
    })();
  }, []);

  const pos: LatLngTuple = [40, 140];

  return (
    <>
      <Text>D3 map overlay test</Text>
      <Box sx={{ width: '960px', height: '600px' }}>
        <MapContainer center={pos} zoom={12} style={{width: "960px", height: "600px"}}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={pos}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        </MapContainer>
      </Box>
    </>
  );
};
