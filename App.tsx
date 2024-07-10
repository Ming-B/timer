/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 */

import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const CountdownTimer = () => {
  // State for event name, date, and time input
  const [eventName, setEventName] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventTime, setEventTime] = useState('');
  const [countdown, setCountdown] = useState(null);

  useEffect(() => {
    if (countdown) {
      //if countdown is not null, set a new interval
      const interval = setInterval(() => {
        const now = new Date();


        const eventDateTime = new Date(eventDate + 'T' + (eventTime || '00:00:00'));


        const timeDiff = eventDateTime - now;

        if (timeDiff <= 0) {
          // If the event time has passed, clear the interval and set countdown to zero
          clearInterval(interval);
          setCountdown({
            months: 0,
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0,
          });
          return;
        }


        const months = Math.floor(timeDiff / (1000 * 60 * 60 * 24 * 30));
        const days = Math.floor((timeDiff % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);


        setCountdown({ months, days, hours, minutes, seconds });
      }, 1000);


      return () => clearInterval(interval);
    }
  }, [countdown, eventDate, eventTime]);

  const handleStart = () => {
    // When the "Start" button is pressed, initialize the countdown
    setCountdown({});
  };
/* git is working for joshua mcmahon 7/9/2024 */
/*git is working for ming 7/10/24*/




export default CountdownTimer;




