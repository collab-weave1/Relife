import { useEffect, useRef } from "react"
import mapboxgl from "mapbox-gl"
import MapboxClient from "@mapbox/mapbox-sdk/services/directions"

mapboxgl.accessToken = "pk.eyJ1IjoiaGlqaWFuZ3RhbyIsImEiOiJjampxcjFnb3E2NTB5M3BvM253ZHV5YjhjIn0.WneUon5qFigfJRJ3oaZ3Ow"
const directionsClient = MapboxClient({ accessToken: mapboxgl.accessToken })

export const MapRoute = ({ userLocation, recyclerLocation, isDark }) => {
  const mapContainer = useRef(null)
  const mapRef = useRef(null)

  useEffect(() => {
    if (!userLocation || !recyclerLocation) return

    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: isDark ? "mapbox://styles/mapbox/dark-v10" : "mapbox://styles/mapbox/streets-v11",
      center: userLocation,
      zoom: 12,
    })

    mapRef.current = map
    map.addControl(new mapboxgl.NavigationControl())

    directionsClient
      .getDirections({
        profile: "driving",
        waypoints: [{ coordinates: userLocation }, { coordinates: recyclerLocation }],
        geometries: "geojson",
      })
      .send()
      .then((res) => {
        if (!res.body.routes || res.body.routes.length === 0) return

        const route = res.body.routes[0].geometry
        const routeCoords = route.coordinates
        const actualStart = routeCoords[0]
        const actualEnd = routeCoords[routeCoords.length - 1]

        map.on("load", () => {
          map.addSource("route", {
            type: "geojson",
            data: {
              type: "Feature",
              geometry: route,
            },
          })

          map.addLayer({
            id: "route",
            type: "line",
            source: "route",
            layout: {
              "line-join": "round",
              "line-cap": "round",
            },
            paint: {
              "line-color": isDark ? "#10B981" : "#3887be",
              "line-width": 5,
            },
          })

          const bounds = routeCoords.reduce(
            (bounds, coord) => bounds.extend(coord),
            new mapboxgl.LngLatBounds(routeCoords[0], routeCoords[0]),
          )
          map.fitBounds(bounds, { padding: 50 })
        })
      })
      .catch((err) => {
        console.error("Directions request failed:", err)
      })

    return () => map.remove()
  }, [userLocation, recyclerLocation, isDark])

  return (
    <div
      className="mt-6 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700"
      style={{ height: "400px" }}
      ref={mapContainer}
    ></div>
  )
}
