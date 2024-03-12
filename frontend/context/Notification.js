import PushNotification from 'react-native-push-notification';


export default function triggernotification ()  {
    PushNotification.localNotification({
        title: 'My Notification Title',
        message: 'Hello, this is a local notification!',
      });
      
      
      PushNotification.localNotificationSchedule({
        title: 'Scheduled Notification',
        message: 'This is a scheduled notification!',
        date: new Date(Date.now() + 10 * 1000),
      });
}




