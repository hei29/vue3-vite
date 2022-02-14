<template>
  <div id="leaflet-map"></div>
</template>

<script setup lang="ts">
  import * as L from 'leaflet';
  import 'leaflet/dist/leaflet.css';
  import 'proj4leaflet';

  import {onMounted, ref} from "vue";

  onMounted(() => {
    initMap();
  })
  let map:any = ref(null)

  const initMap = () => {
    const mapDom:any = document.querySelector('#leaflet-map');
    map = L.map(mapDom, {
      minZoom: 1,
      zoomSnap: 0.01,
      zoomControl: false, // 缩放控制按钮
      attributionControl: false, // 地图携带文本
      crs: L.CRS.EPSG3857
    }).setView([34, 112], 7)
    addTileLayer();
  }

  const addTileLayer = () => {
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoieHl0YW8iLCJhIjoiY2tuazNqeGlhMDFoeDJ2bW9pY3RsYWlzbiJ9.pcB4Lh8GMNvJGn8dZM-4SQ', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: 'mapbox/streets-v11',
      tileSize: 512,
      zoomOffset: -1,
      accessToken: 'your.mapbox.access.token'
    }).addTo(map)
  }
</script>

<style scoped lang="less">
  #leaflet-map {
    width: 100%;
    height: 40VH;
  }
</style>
