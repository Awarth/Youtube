function formatTimeAgo(createdAt) {
    const now = new Date();
    const createdDate = new Date(createdAt);
    const diffInSeconds = Math.floor((now - createdDate) / 1000);
  
    const secondsInMinute = 60;
    const secondsInHour = 60 * secondsInMinute;
    const secondsInDay = 24 * secondsInHour;
    const secondsInMonth = 30 * secondsInDay;
    const secondsInYear = 12 * secondsInMonth;
  
    if (diffInSeconds < secondsInMinute) {
      return `${diffInSeconds} seconds ago`;
    } else if (diffInSeconds < secondsInHour) {
      const minutes = Math.floor(diffInSeconds / secondsInMinute);
      return `${minutes} ${minutes === 1 ? "minute" : "minutes"} ago`;
    } else if (diffInSeconds < secondsInDay) {
      const hours = Math.floor(diffInSeconds / secondsInHour);
      return `${hours} ${hours === 1 ? "hour" : "hours"} ago`;
    } else if (diffInSeconds < secondsInMonth) {
      const days = Math.floor(diffInSeconds / secondsInDay);
      return `${days} ${days === 1 ? "day" : "days"} ago`;
    } else if (diffInSeconds < secondsInYear) {
      const months = Math.floor(diffInSeconds / secondsInMonth);
      return `${months} ${months === 1 ? "month" : "months"} ago`;
    } else {
      const years = Math.floor(diffInSeconds / secondsInYear);
      return `${years} ${years === 1 ? "year" : "years"} ago`;
    }
  }
  
  export default formatTimeAgo;
  