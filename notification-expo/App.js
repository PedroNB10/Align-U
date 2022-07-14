import React, { Component,useEffect } from 'react';
import { AppRegistry, View, Text, StyleSheet, Platform } from 'react-native';

import * as Notifications from "expo-notifications"
import * as Permissions from "expo-permissions"
//novas modificaçõe



//import  triggerLocalNotificationHandler  from './NotificationAlert'




Notifications.setNotificationHandler({
  handleNotification: async () => {
    return {
      shouldShowAlert: true,
    }
  },
})

export  function Notification() {
  useEffect(() => {
    // Permission for iOS
    Permissions.getAsync(Permissions.NOTIFICATIONS)
      .then(statusObj => {
        // Check if we already have permission
        if (statusObj.status !== "granted") {
          // If permission is not there, ask for the same
          return Permissions.askAsync(Permissions.NOTIFICATIONS)
        }
        return statusObj
      })
      .then(statusObj => {
        // If permission is still not given throw error
        if (statusObj.status !== "granted") {
          throw new Error("Permission not granted")
        }
      })
      .then(() => {
        return Notifications.getExpoPushTokenAsync()
      })
      .then(response => {
        const deviceToken = response.data
        console.log({ deviceToken })
      })
      .catch(err => {
        return null
      })
  }, [])

  useEffect(() => {
    const receivedSubscription = Notifications.addNotificationReceivedListener(
      notification => {
        console.log("Notification Received!")
        console.log(notification)
      }
    )

    const responseSubscription = Notifications.addNotificationResponseReceivedListener(
      response => {
        console.log("Notification Clicked!")
        console.log(response)
      }
    )

    const subscription = Notifications.addNotificationResponseReceivedListener(response => {
      const url = response.notification.request.content.data.url;
      Linking.openURL(url);
    })


    return () => {
      receivedSubscription.remove()
      responseSubscription.remove()
      subscription.remove()
    }
  }, [])

  const triggerLocalNotificationHandler = () => {
    Notifications.scheduleNotificationAsync({
      content: {
        title: "Local Notification",
        body: "Hello this is a local notification!",
      },
      trigger: { seconds: 1 },
    })
  }

  return (
    <View style={styles.container}>
      <Button
        title="Trigger Local Notification"
        onPress={triggerLocalNotificationHandler}
      />
    </View>
  )
}

export default class App extends Component {

  //notificações

  //fim notificações
  constructor() {
    super();

    this.state = { currentTime: null, currentDay: null }
    this.daysArray = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
  }

  componentWillMount() {
    this.getCurrentTime();
  }

  getCurrentTime = () => {
    let hour = new Date().getHours();
    let minutes = new Date().getMinutes();
    let seconds = new Date().getSeconds();
    let am_pm = 'pm';

    if (minutes < 10) {
      minutes = '0' + minutes;
    }

    if (seconds < 10) {
      seconds = '0' + seconds;
    }

    if (hour > 12) {
      hour = hour - 12;
    }

    if (hour == 0) {
      hour = 12;
    }

    if (seconds == 20) {
      Notifications.scheduleNotificationAsync({
        content: {
          title: "Local Notification",
          body: "Hello this is a local notification!",
        },
        trigger: { seconds: 1 },
      })
     
    }

    if (new Date().getHours() < 12) {
      am_pm = 'am';
    }

    this.setState({ currentTime: hour + ':' + minutes + ':' + seconds + ' ' + am_pm });

    this.daysArray.map((item, key) => {
      if (key == new Date().getDay()) {
        this.setState({ currentDay: item.toUpperCase() });
      }
    })
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  componentDidMount() {
    this.timer = setInterval(() => {
      this.getCurrentTime();
    }, 1000);
  }

  render() {

    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.daysText}>{this.state.currentDay}</Text>
          <Text style={styles.timeText}>{this.state.currentTime}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create(
  {
    container: {
      flex: 1,
      paddingTop: (Platform.OS === 'ios') ? 20 : 0,
      justifyContent: 'center',
      alignItems: 'center',
    },
    headerText: {
      fontSize: 30,
      textAlign: "center",
      margin: 10,
      color: 'black',
      fontWeight: "bold"
    },
    timeText: {
      fontSize: 50,
      color: '#f44336'
    },
    daysText: {
      color: '#2196f3',
      fontSize: 25,
      paddingBottom: 0
    }

  })