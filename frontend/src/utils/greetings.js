export const getTimeOfDayGreeting = () => {
  const hour = new Date().getHours();

  if (hour < 12) {
    return { 
      text: "Good Morning", 
      icon: "weather-sunset-up" 
    };
  } else if (hour < 17) {
    return { 
      text: "Good Afternoon", 
      icon: "weather-sunny" 
    };
  } else {
    return { 
      text: "Good Evening", 
      icon: "weather-night" 
    };
  }
};