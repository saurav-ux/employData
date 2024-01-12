import React from 'react'
import employeeData from '../dataa.json'
const Empdata = () => {


// Function to check if a date is within a specific range
function isDateInRange(date, startDate, endDate) {
    return date >= startDate && date <= endDate;
}

// Function to filter employees based on the given conditions
function filterEmployees(data) {
    let filteredData = [];

    for (let i = 0; i < data.length; i++) {
        let employee = data[i];

        // Convert time strings to Date objects for easier comparison
        let timeIn = new Date(employee["Time"]);
        let timeOut = new Date(employee["Time Out"]);

        // Check condition a: worked for 7 consecutive days
        let consecutiveDaysCount = 1; // Include the current day
        for (let j = i + 1; j < data.length; j++) {
            let nextEmployee = data[j];
            let nextTimeIn = new Date(nextEmployee["Time"]);

            // Check if the next day's time in is within 24 hours of the current day's time out
            if (isDateInRange(nextTimeIn, timeOut, new Date(timeOut.getTime() + 24 * 60 * 60 * 1000))) {
                consecutiveDaysCount++;
            } else {
                break; // Break the loop if not consecutive
            }
        }

        if (consecutiveDaysCount >= 7) {
            filteredData.push(employee);
        }

        // Check condition b: less than 10 hours between shifts but greater than 1 hour
        if (i < data.length - 1) {
            let nextEmployee = data[i + 1];
            let nextTimeIn = new Date(nextEmployee["Time"]);

            let hoursBetweenShifts = (nextTimeIn - timeOut) / (60 * 60 * 1000);

            if (hoursBetweenShifts > 1 && hoursBetweenShifts < 10) {
                filteredData.push(employee);
                filteredData.push(nextEmployee);
            }
        }

        // Check condition c: worked for more than 14 hours in a single shift
        let hoursWorked = (timeOut - timeIn) / (60 * 60 * 1000);

        if (hoursWorked > 14) {
            filteredData.push(employee);
        }
    }

    return filteredData;
}

// Apply the filter
let result = filterEmployees(employeeData);
console.log(result);

                    
  return (
    <div>
      Saurav Anand
    </div>
  )
}

export default Empdata
