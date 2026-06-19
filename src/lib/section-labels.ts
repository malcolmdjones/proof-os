export function getSectionLabel(pathname: string): string {
  if (pathname.startsWith("/brand")) return "Brand";
  if (pathname.startsWith("/dashboard")) return "Dash";
  return "Cal";
}
