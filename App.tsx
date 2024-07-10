import React, {useState, useEffect} from 'react';
import{
    TextInput, StyleSheet, Button, View, SafeAreaView, Text, Alert
    } from 'react-native';

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

            if(timeDifferential <= 0){
                clearInterval(interval);
                setCountdown({
                    months: 0,
                    days: 0,
                    hours: 0,
                    minutes: 0,
                    seconds: 0;
                    });
                return;
                }

            const months = Math.Floor(timeDifferential/(1000*60*60*24*30));
            const days = Math.Floor(timeDifferential % (1000*60*60*24));
            const hours = Math.Floor((timeDifferential%(1000*60*60*24)) / (1000*60*60));
            const minutes = Math.Floor((timeDifferential%(1000*60*60)) / (1000*60));
            const seconds = Math.Floor((timeDifferential % (1000*60)) / 1000);

            //stackoverflow explains the calculations better than I can
            //https://stackoverflow.com/questions/51078140/calculation-of-countdown-timer


            }
        }


    };

    return (
        <View style = {styles.container}>

        <Button

            title = "Start"
            onPress = {() => Alert.alert(
                'Countdown has started')}
        />

        </View>
        );
    }

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: '#fffafa',
        alignItems: 'center',
        justifyContent:'center',
        },
    });

/* git is working for joshua mcmahon 7/9/2024 */
/* git is working for ming 7/10/24 */




export default App;




