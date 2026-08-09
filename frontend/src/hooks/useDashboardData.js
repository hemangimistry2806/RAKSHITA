import { useCallback, useEffect, useState } from "react";
import { healthApi } from "../api/health";
import { locationApi } from "../api/location";
import { deviceApi } from "../api/device";
import { emergencyApi } from "../api/emergency";
import {
  mockLatestHealth,
  mockHealthReadings,
  mockLocation,
  mockDevice,
  mockEmergencyEvents
} from "../api/mock";

// Loads dashboard data from the real API, falling back to demo data when the
// backend is unreachable. Returns combined dashboard state + refresh.
export default function useDashboardData() {
  const [state, setState] = useState({
    health: null,
    readings: [],
    location: null,
    devices: [],
    events: [],
    loading: true,
    error: null,
    offline: false
  });

  const load = useCallback(async () => {
    setState((s) => ({ ...s, loading: true, error: null }));
    let offline = false;

    const safeFetch = async (fn, mock) => {
      try {
        return await fn();
      } catch {
        offline = true;
        return mock;
      }
    };

    const [healthRes, readingsRes, locationRes, deviceRes, eventsRes] = await Promise.all([
      safeFetch(() => healthApi.latest(), mockLatestHealth),
      safeFetch(() => healthApi.readings({ limit: 24 }), mockHealthReadings),
      safeFetch(() => locationApi.latest(), mockLocation),
      safeFetch(() => deviceApi.list(), mockDevice),
      safeFetch(() => emergencyApi.list(), mockEmergencyEvents)
    ]);

    setState({
      health: healthRes.reading,
      readings: readingsRes.readings || [],
      location: locationRes.location,
      devices: deviceRes.devices || [],
      events: eventsRes.events || [],
      loading: false,
      error: null,
      offline
    });
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return { ...state, reload: load };
}
