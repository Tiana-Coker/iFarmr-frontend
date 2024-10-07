// Helper function to format date
const formatDate = (date: Date) => {
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'long' });
    const year = date.getFullYear();
  
    // Add suffix for day
    const suffix = day === 1 || day === 21 || day === 31 ? 'st' 
                 : day === 2 || day === 22 ? 'nd'
                 : day === 3 || day === 23 ? 'rd'
                 : 'th';
  
    return `${day}${suffix} ${month} ${year}`;
  };
  
  // Function to format the due date
export const formatDueDate = (dueDate: string) => {
    const today = new Date();
    const due = new Date(dueDate);
  
    // Calculate difference in time and convert to days
    const diffInTime = due.getTime() - today.getTime();
    const diffInDays = Math.ceil(diffInTime / (1000 * 3600 * 24));
  
    if (diffInDays === 1) {
      return "Due Tomorrow";
    } else if (diffInDays > 1 && diffInDays < 32) {
      return `Due in ${diffInDays} Days`;
    } else if (diffInDays >= 32) {
      return `Due on ${formatDate(due)}`;
    } else {
      return `Past Due`;
    }
  };