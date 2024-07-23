import React, { useState, useEffect } from 'react';
import { TextInput, StyleSheet, Button, View, SafeAreaView, Text, Alert } from 'react-native';

const App = () => {
    const [eventName, setEventName] = useState('');
    const [eventDate, setEventDate] = useState('');
    const [eventTime, setEventTime] = useState('');
    const [countdown, setCountdown] = useState(null);
    const [countStarted, setcountStarted] = useState(false);
    const [formatedCountdown, setformatedCountdown] = useState('');
    useEffect(() => {
        setcountStarted(false);
        }, [eventName, eventDate, eventTime]);
    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date();
            const timeToEvent = new Date(eventDate + 'T' + (eventTime || '00:00:00'));
            const timeDifferential = timeToEvent - now; // timeToEvent vs timeToEvent.getTime()

            if (timeDifferential <= 0) {
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
            //console.log('hello');
              const totalSeconds = Math.floor(timeDifferential / 1000);
              const seconds = totalSeconds % 60;
              const totalMinutes = Math.floor(totalSeconds / 60);
              const minutes = totalMinutes % 60;
              const totalHours = Math.floor(totalMinutes / 60);
              const hours = totalHours % 24;
              const totalDays = Math.floor(totalHours / 24);
              const days = totalDays % 30;
              const months = Math.floor(totalDays / 30);


            // stackoverflow explains the calculations better than I can
            // https://stackoverflow.com/questions/51078140/calculation-of-countdown-timer
            setCountdown({ months, days, hours, minutes, seconds });
        }, 1000);

        return () => clearInterval(interval);
    }, [eventDate, eventTime]);

     useEffect(() => {  //Creates the alert to let them know the countdown has ended
        if (countStarted && formatCountdown() === 'Time Up!') {
          Alert.alert('Time Up!');
          setcountStarted(false); // resets countStarted to false to create new timer
        }
      }, [countdown]);

    const formatCountdown = () => {
        if (!countdown) return '';

        const { months, days, hours, minutes, seconds } = countdown;
        if (months > 0 || days > 0 || hours > 0 || minutes > 0 || seconds > 0) {
            return `${months} months, ${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`;
        }
            return 'Time Up!';
      };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Event Name"
                value={eventName}
                onChangeText={setEventName}
            />
            <TextInput
                style={styles.input}
                placeholder="Event Date"
                value={eventDate}
                onChangeText={setEventDate}
            />
            <TextInput
                style={styles.input}
                placeholder="Event Time"
                value={eventTime}
                onChangeText={setEventTime}
            />
            <View style={styles.startButton}>
                <Button
                    title="Start"
                    onPress={() => {
                        Alert.alert('Countdown has started');
                        setcountStarted(true);
                        }}
                />
            </View>

            {countStarted && countdown && (<Text style={styles.countdown}>{formatCountdown()}</Text>)}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fffafa',
        alignItems: 'center',
        marginTop: 10,
        justifyContent: 'center',
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        padding: 10, // Add padding inside the TextInput INSIDE
        marginTop: 10, // Add top margin to the TextInput
        width: '80%',
    },
    startButton: {
        marginTop: 30,
    },
    countdown: {
        marginTop: 30,
    }

});

/* git is working for joshua mcmahon 7/9/2024 */
/* git is working for ming 7/10/24 */

export default App;
