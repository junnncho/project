export function getYouTubeVideoId(url: string) {
  // YouTube URL 형식들
  const patterns = [
    /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/,
    /^([a-zA-Z0-9_-]{11})$/,
  ];

  for (let i = 0; i < patterns.length; i++) {
    const match = url.match(patterns[i]);
    if (match) {
      return match[1]; // 첫 번째 캡처 그룹이 YouTube Video ID
    }
  }

  // 일치하는 패턴이 없을 경우
  return null;
}
