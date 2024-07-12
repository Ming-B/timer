import React, { useState, useEffect } from 'react';
import { TextInput, StyleSheet, Button, View, SafeAreaView, Text, Alert } from 'react-native';

const App = () => {
    const [eventName, setEventName] = useState('');
    const [eventDate, setEventDate] = useState('');
    const [eventTime, setEventTime] = useState('');
    const [countdown, setCountdown] = useState(null);

    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date();
            const timeToEvent = new Date(eventDate + 'T' + (eventTime || '00:00:00'));
            const timeDifferential = timeToEvent - now;

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

              const totalSeconds = Math.floor(timeDifferential / 1000);
              const seconds = totalSeconds % 60;
              const totalMinutes = Math.floor(totalSeconds / 60);
              const minutes = totalMinutes % 60;
              const totalHours = Math.floor(totalMinutes / 60);
              const hours = totalHours % 24;
              const totalDays = Math.floor(totalHours / 24);
              const days = totalDays % 30;
              const months = Math.floor(totalDays / 30);

              console.log(now);

            // stackoverflow explains the calculations better than I can
            // https://stackoverflow.com/questions/51078140/calculation-of-countdown-timer
            setCountdown({ months, days, hours, minutes, seconds });
        }, 1000);

        return () => clearInterval(interval);
    }, [eventDate, eventTime]);

    const formatCountdown = () => {
        if (!countdown) return '';

        const { months, days, hours, minutes, seconds } = countdown;
        return `${months} months, ${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`;
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
            <Button
                title="Start"
                onPress={() => Alert.alert('Countdown has started')}
            />

            {countdown && (<Text>{formatCountdown()}</Text>)}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fffafa',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

/* git is working for joshua mcmahon 7/9/2024 */
/* git is working for ming 7/10/24 */

export default App;
