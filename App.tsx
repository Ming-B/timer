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
          // if event time has passed, clear the interval and set everything to 0
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


//         const months =
//         const days = somebody better than me at math do this calculation :)
//         const hours =
//         const minutes =
//         const seconds =


        setCountdown({ months, days, hours, minutes, seconds });
      }, 1000);


      return () => clearInterval(interval);
    }
  }, [countdown, eventDate, eventTime]);

  const handleStart = () => {
    // start button stuff, dunno how it works. this is just what i saw to do.
    setCountdown({});
  };
/* git is working for joshua mcmahon 7/9/2024 */
/*git is working for ming 7/10/24*/




export default CountdownTimer;




