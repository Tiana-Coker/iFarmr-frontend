import React, { useState, useEffect, useRef } from 'react';
import { format, parse, isValid, addMonths, subMonths, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays } from 'date-fns';
import { ChevronLeft, ChevronRight, CalendarDays } from 'lucide-react';


const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const years = Array.from({ length: 101 }, (_, i) => 1950 + i); // Years from 1950 to 2050

const CustomDate = ({onDateChange}) => {
  const [selectedDate, setSelectedDate] = useState(new Date()); // Start with the current date
  const [currentMonth, setCurrentMonth] = useState(new Date()); // Start with the current month
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [hoveredDate, setHoveredDate] = useState(null);
  const [inputValue, setInputValue] = useState(format(new Date(), 'yyyy-MM-dd')); // Input starts with the current date
  const [showMonthYearPicker, setShowMonthYearPicker] = useState(false); // Toggle for month/year picker
  const datePickerRef = useRef(null);

  const days = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

  // Get all days to display including faded previous/next month days
  const getCalendarDays = () => {
    const startOfCurrentMonth = startOfMonth(currentMonth);
    const endOfCurrentMonth = endOfMonth(currentMonth);
    const startDate = startOfWeek(startOfCurrentMonth); // Start of the week for the current month's first day
    const endDate = endOfWeek(endOfCurrentMonth); // End of the week for the current month's last day

    const dates = [];
    let day = startDate;
    while (day <= endDate) {
      dates.push(day);
      day = addDays(day, 1);
    }
    return dates;
  };

  // Toggle the date picker visibility
  const toggleDatePicker = () => setShowDatePicker(!showDatePicker);

  // Handle date selection
  const handleDateSelect = (day) => {
    setSelectedDate(day);
    setInputValue(format(day, 'yyyy-MM-dd'));
    setShowDatePicker(false);

    // Pass the selected date to the parent
    if (onDateChange) {
      onDateChange(day);
    }
  };

  // Navigate months
  const handlePrevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));
  const handleNextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));

  // Handle input change and navigate to the entered date's month
  const handleInputChange = (e) => {
    setInputValue(e.target.value);

    const parsedDate = parse(e.target.value, 'yyyy-MM-dd', new Date());
    if (isValid(parsedDate)) {
      setSelectedDate(parsedDate);
      setCurrentMonth(parsedDate);
    }
  };

  // Close the date picker when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (datePickerRef.current && !datePickerRef.current.contains(event.target)) {
        setShowDatePicker(false);
        setShowMonthYearPicker(false); // Close the month/year picker if it's open
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [datePickerRef]);

  // Toggle month/year picker
  const toggleMonthYearPicker = () => setShowMonthYearPicker(!showMonthYearPicker);

  // Handle month/year change starting from the current month and year
  const handleMonthChange = (month) => {
    const newDate = new Date(currentMonth);
    newDate.setMonth(month);
    setCurrentMonth(newDate);
    setShowMonthYearPicker(false);
  };

  const handleYearChange = (year) => {
    const newDate = new Date(currentMonth);
    newDate.setFullYear(year);
    setCurrentMonth(newDate);
    setShowMonthYearPicker(false);
  };

  return (
    <div className="relative  " ref={datePickerRef}>
      {/* Input field that accepts manual input with the calendar icon on the right */}
      <div tabindex="0" className="flex items-center  px-2 py-1.5 rounded-lg appearance-none  font-light bg-gray-100  focus:outline-none focus:ring-0 focus:ring-green-700 ">
        <input
          type="text"
          readOnly
          value={inputValue}
          onChange={handleInputChange}
          placeholder="yyyy-MM-dd"
          className="w-full text-black text-sm cursor-pointer outline-none bg-gray-100" // Accept user input
        />
        <CalendarDays
          className="ml-2 right-2 text-gray-600 w-4 h-4  cursor-pointer"
          onClick={toggleDatePicker} // Toggle calendar on icon click
        />
      </div>

      {/* Date picker dropdown */}
      {showDatePicker && (
        <div className="absolute top-12 left-0 w-52 bg-white shadow-lg p-2 rounded-lg z-50">
          <div className="flex justify-between items-center mb-4">
            <button type='button' onClick={handlePrevMonth} className="p-2">
              <ChevronLeft className="text-black h-4 w-4" /> {/* Previous Month */}
            </button>
            
            {/* Display current month and year, clickable to show the picker */}
            <span
              className="font-semibold text-sm  text-black cursor-pointer"
              onClick={toggleMonthYearPicker} // Toggle month/year picker
            >
              {format(currentMonth, 'MMMM yyyy')}
            </span>
            
            <button type='button' onClick={handleNextMonth} className="p-2">
              <ChevronRight className="text-black h-4 w-4" /> {/* Next Month */}
            </button>
          </div>

          {/* Month/Year picker dropdown */}
          {showMonthYearPicker && (
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <h4 className="text-center text-black  text-sm font-semibold">Months</h4>
                <ul className="overflow-y-auto h-32">
                  {months.map((month, index) => (
                    <li
                      key={month}
                      onClick={() => handleMonthChange(index)}
                      className={`cursor-pointer hover:bg-green-300  font-extralight text-xs text-black px-8 py-1 rounded ${currentMonth.getMonth() === index ? 'font-bold' : ''}`}
                    >
                      {month}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-center text-black text-sm  font-semibold">Years</h4>
                <ul className="overflow-y-auto h-32">
                  {years.map((year) => (
                    <li
                      key={year}
                      onClick={() => handleYearChange(year)}
                      className={`cursor-pointer hover:bg-green-300 font-extralight text-xs text-black px-9 py-1 rounded ${currentMonth.getFullYear() === year ? 'font-bold' : ''}`}
                    >
                      {year}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Days of the week */}
          {!showMonthYearPicker && (
            <div className="grid grid-cols-7  text-xs text-center mb-2">
              {days.map((day, index) => (
                <span key={index} className="text-gray-500">
                  {day}
                </span>
              ))}

              {/* Display days with faded previous and upcoming month days */}
              {getCalendarDays().map((day) => {
                const isCurrentMonth = day.getMonth() === currentMonth.getMonth();
                return (
                  <button
                    key={day}
                    onClick={() => handleDateSelect(day)}
                    onMouseEnter={() => setHoveredDate(day)}
                    onMouseLeave={() => setHoveredDate(null)}
                    className={`w-6 h-6 flex items-center justify-center rounded-full cursor-pointer 
                      ${hoveredDate && format(hoveredDate, 'yyyy-MM-dd') === format(day, 'yyyy-MM-dd') ? 'bg-green-300' : ''}
                      ${isCurrentMonth ? 'text-black' : 'text-gray-400'}
                      ${format(selectedDate, 'yyyy-MM-dd') === format(day, 'yyyy-MM-dd') ? 'bg-[rgba(32,78,81,1)] text-white' : ''}
                    `}
                  >
                    {format(day, 'd')}
                  </button>
                );
              })}
            </div>
          )}

          {/* Cancel and Apply buttons */}
          <div className="flex justify-between mt-4">
            <button
              onClick={toggleDatePicker}
              className="px-2 py-1 text-xs text-black bg-gray-300 rounded-md hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              onClick={() => handleDateSelect(selectedDate)}
              className="px-2 py-1 text-xs text-white bg-[rgba(32,78,81,1)] rounded-md hover:bg-green-800"
            >
              Apply
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomDate;
