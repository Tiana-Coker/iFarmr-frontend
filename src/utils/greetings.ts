// greetings.ts

export const getGreeting = (): string => {
    const currentHour = new Date().getHours();
    let greeting = '';
  
    if (currentHour >= 5 && currentHour < 12) {
      greeting = 'Good Morning';
    } else if (currentHour >= 12 && currentHour < 17) {
      greeting = 'Good Afternoon';
    } else if (currentHour >= 17 && currentHour < 21) {
      greeting = 'Good Evening';
    } else {
      greeting = 'Hello'; // Or 'Good Night' if preferred
    }
  
    return greeting;
  };
  