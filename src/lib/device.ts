export function getDeviceInfo() {
  const ua = navigator.userAgent;
  if (/Windows/.test(ua)) return "Windows PC";
  if (/Mac/.test(ua)) return "Mac";
  if (/iPhone|iPad/.test(ua)) return "iOS Device";
  if (/Android/.test(ua)) return "Android Device";
  return "Unknown Device";
}
