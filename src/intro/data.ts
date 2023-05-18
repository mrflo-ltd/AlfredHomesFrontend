export const getVideoUrl = (videoPath: string, isMobile: boolean) => {
  const videoParams =
    '&badge=0&title=0&autopause=0&autoplay=1&player_id=0&app_id=58479';
  return `${videoPath}${videoParams}&muted=${isMobile ? 1 : 0}`;
};
