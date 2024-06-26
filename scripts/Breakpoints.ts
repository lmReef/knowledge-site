/// from tailwind
export const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
};

export function isMobile() {
  if (typeof screen === "undefined") return false;
  else return screen.width <= breakpoints.md;
}
