export function getIsMediaVideo(url: string) {
  const _url = url.toLowerCase();
  if (_url.endsWith("mp4")) return true;
  if (_url.endsWith("mov")) return true;
}
