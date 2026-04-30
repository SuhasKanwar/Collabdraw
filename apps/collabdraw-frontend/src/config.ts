const isBrowser = typeof window !== "undefined";

export const HTTP_BACKEND_URL = process.env.NEXT_PUBLIC_HTTP_BACKEND_URL 
  || (isBrowser ? `http://${window.location.hostname}:9090` : "http://localhost:9090");

export const WS_BACKEND_URL = process.env.NEXT_PUBLIC_WS_BACKEND_URL 
  || (isBrowser ? `ws://${window.location.hostname}:8080` : "ws://localhost:8080");