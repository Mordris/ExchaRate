import axios from "axios";
import { toast } from "react-toastify";

// Set up the base URL for the API
const API_KEY = process.env.REACT_APP_API_KEY;

// Define the interval for requests
const REQUEST_INTERVAL = 5000; // 10 seconds in milliseconds

// Get the last request time from localStorage
const getLastRequestTime = () => {
  const lastRequestTime = localStorage.getItem("lastRequestTime");
  return lastRequestTime ? parseInt(lastRequestTime, 10) : 0;
};

// Set the last request time in localStorage
const setLastRequestTime = () => {
  localStorage.setItem("lastRequestTime", Date.now());
};

// Check if enough time has passed to send a new request
const shouldSendRequest = () => {
  const currentTime = Date.now();
  const lastRequestTime = getLastRequestTime();
  return currentTime - lastRequestTime >= REQUEST_INTERVAL;
};

// Fetch the latest currency rates with rate limiting
export const fetchLatestRates = async () => {
  if (!shouldSendRequest()) {
    // If not enough time has pssed, notify the user and do not send a request
    return null;
  }

  setLastRequestTime(); // Update the last request time

  try {
    const API_URL = `https://api.freecurrencyapi.com/v1/latest?apikey=${API_KEY}`;
    const response = await axios.get(API_URL);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching currency data:", error);
    toast.error(
      "An error occurred while fetching data. Please try again later."
    );
    throw error;
  }
};

export { REQUEST_INTERVAL };