function convertToMinutes(duration: string) {
  const timePattern = /PT(?:(\d+)H)?(?:(\d+)M)?/;
  const matches = duration.match(timePattern);

  const hours = matches?.[1] ? parseInt(matches[1], 10) : 0;
  const minutes = matches?.[2] ? parseInt(matches[2], 10) : 0;

  return hours * 60 + minutes;
}

export default convertToMinutes;
