

// import 'react-native-reanimated';
// import 'react-native-gesture-handler';
// import {GestureHandlerRootView} from 'react-native-gesture-handler';
// import * as React from 'react';
// import { Pressable, View, Text, Image } from 'react-native';
// import { NavigationContainer } from '@react-navigation/native';
// import { createDrawerNavigator ,DrawerItemList,DrawerContentScrollView} from '@react-navigation/drawer';
// import { StyleSheet } from 'react-native';
// import logo from './assets/favicon.png'
// function Home({ navigation }) {
//   return (
//     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//       <Text>Welcome to our Home Screen</Text>
//       <Text>Checkout screens from the tab below</Text>
//        <Pressable
//         onPress={() => navigation.openDrawer()}
//         style={{ padding: 10, marginBottom: 10, marginTop: 10 }}
//       >
//       <Text>Open Drawer</Text>
//       </Pressable>
//     </View>
//   );
// }

// function Conference({ navigation }) {
//   return (
//     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//       <Text style={{fontSize: 20}}>Conference Details</Text>
//       <Pressable
//         onPress={() => navigation.navigate('Story')}
//         style={{ padding: 10, marginBottom: 10, marginTop: 10 }}
//       >
//       <Text>Go to Story</Text>
//       </Pressable>
//       <Pressable
//         onPress={() => navigation.openDrawer()}
//         style={{ padding: 10, marginBottom: 10, marginTop: 10 }}
//       >
//       <Text>Open Drawer</Text>
//       </Pressable>
//     </View>
//   );
// }

// function Story({ navigation }) {
//   return (
//     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//       <Text style={{fontSize: 20}}>Our Story</Text>
//        <Pressable
//         onPress={() => navigation.navigate('Conference')}
//         style={{ padding: 10, marginBottom: 10, marginTop: 10 }}
//       >
//       <Text>Go to Conference</Text>
//       </Pressable>
//     </View>
//   );
// }
// const CustomDrawer = (props) => {
//   return 
// (  <DrawerContentScrollView {...props}>

// <View>
// <Text>te</Text>

// <DrawerItemList  {...props}/>
// </View>

//   </DrawerContentScrollView>)
// }





// const Drawer = createDrawerNavigator();









// export default function App() {
//   return (
  

//   <NavigationContainer drawerContent={props => <CustomDrawer {...props} />}>
//     <Drawer.Navigator >
//     <Drawer.Screen name="Home" component={Home}  />
//         <Drawer.Screen name="Conference" component={Conference} />
//         <Drawer.Screen name="Story" component={Story} />
 
//     </Drawer.Navigator>
//   </NavigationContainer>

//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function App() {
  const [count, setCount] = React.useState(0);

  const handleSwipeRight = () => {
    setCount(count + 1);
  };

  const handleSwipeLeft = () => {
    setCount(count - 1);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Compteur: {count}</Text>
      <TouchableOpacity
        style={styles.button}
        onSwipeRight={handleSwipeRight}
        onSwipeLeft={handleSwipeLeft}
      >
        <Text style={styles.buttonText}>Swipez à droite ou à gauche !</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 24,
    marginBottom: 20,
  },
  button: {
    paddingVertical: 20,
    paddingHorizontal: 40,
    borderRadius: 10,
    backgroundColor: 'blue',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
});