function formatDuration(duration) {
  // Convert to seconds
  const totalSeconds = Math.floor(duration);

  // Calculate minutes and remaining seconds
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  // Format minutes and seconds to always have two digits
  const formattedMinutes = String(minutes).padStart(2, "0");
  const formattedSeconds = String(seconds).padStart(2, "0");

  return `${formattedMinutes}:${formattedSeconds}`;
}

export { formatDuration };
