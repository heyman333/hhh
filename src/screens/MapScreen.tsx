import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { View, Text, Button } from 'react-native';
import NaverMapView, {
  Circle,
  Marker,
  Path,
  Polyline,
  Polygon,
} from 'react-native-nmap';

function MapScreen() {
  const P0 = { latitude: 37.564362, longitude: 126.977011 };
  const P1 = { latitude: 37.565051, longitude: 126.978567 };
  const P2 = { latitude: 37.565383, longitude: 126.976292 };

  return (
    <NaverMapView
      style={{ width: '100%', height: '100%' }}
      showsMyLocationButton={true}
      center={{ ...P0, zoom: 16 }}
      onTouch={(e) => console.warn('onTouch', JSON.stringify(e.nativeEvent))}
      onCameraChange={(e) => console.warn('onCameraChange', JSON.stringify(e))}
      onMapClick={(e) => console.warn('onMapClick', JSON.stringify(e))}
    />
  );
}

export default MapScreen;
