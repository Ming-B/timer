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

  // State for the countdown timer, initially null
  const [countdown, setCountdown] = useState(null);

  useEffect(() => {
    if (countdown) {
      // If countdown is active, set up an interval to update it every second
      const interval = setInterval(() => {
        const now = new Date();

        // Construct the event date-time string in ISO 8601 format
        const eventDateTime = new Date(eventDate + 'T' + (eventTime || '00:00:00'));

        // Calculate the difference between the event time and the current time
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

        // Calculate the remaining time components
        const months = Math.floor(timeDiff / (1000 * 60 * 60 * 24 * 30));
        const days = Math.floor((timeDiff % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

        // Update the countdown state
        setCountdown({ months, days, hours, minutes, seconds });
      }, 1000);

      // Cleanup the interval on component unmount or if countdown state changes
      return () => clearInterval(interval);
    }
  }, [countdown, eventDate, eventTime]);

  const handleStart = () => {
    // When the "Start" button is pressed, initialize the countdown
    setCountdown({});
  };
/* git is working for joshua mcmahon 7/9/2024 */
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Countdown Timer</Text>
      <TextInput
        style={styles.input}
        placeholder="Event Name"
        value={eventName}
        onChangeText={setEventName}
      />
      <TextInput
        style={styles.input}
        placeholder="Event Date (YYYY-MM-DD)"
        value={eventDate}
        onChangeText={setEventDate}
      />
      <TextInput
        style={styles.input}
        placeholder="Event Time (HH:MM:SS) - Optional"
        value={eventTime}
        onChangeText={setEventTime}
      />
      <Button title="Start" onPress={handleStart} />
      {countdown && (
        <View style={styles.countdownContainer}>
          <Text style={styles.countdownText}>Event: {eventName}</Text>
          <Text style={styles.countdownText}>{countdown.months} Months</Text>
          <Text style={styles.countdownText}>{countdown.days} Days</Text>
          <Text style={styles.countdownText}>{countdown.hours} Hours</Text>
          <Text style={styles.countdownText}>{countdown.minutes} Minutes</Text>
          <Text style={styles.countdownText}>{countdown.seconds} Seconds</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    width: '100%',
    paddingLeft: 8,
  },
  countdownContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  countdownText: {
    fontSize: 18,
  },
});

export default CountdownTimer;




