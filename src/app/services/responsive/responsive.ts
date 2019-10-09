export enum SizeMode {
  MOBILE,
  TABLET,
  DESKTOP
}

export function detectSizeMode(windowWidth): SizeMode {
  return windowWidth > 1024 ? SizeMode.DESKTOP : windowWidth > 512 ? SizeMode.TABLET : SizeMode.MOBILE;
}
