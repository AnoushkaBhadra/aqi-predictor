import type { AqiData } from "./types"

export async function fetchAqiData(): Promise<AqiData> {
  const response = await fetch("http://192.168.137.1:5000/predict")

  if (!response.ok) {
    throw new Error("Failed to fetch AQI data")
  }

  const result = await response.json()

  return {
    location: "Kolkata",
    current: {
      value: result.current_aqi,  // Use the current AQI from DB
      timestamp: new Date().toISOString()
    },
    pm25: {
      value: 0 // Still placeholder, update if backend sends more info
    },
    pm10: {
      value: result.predicted_aqi // Put predicted AQI here for now
    }
  }
}
