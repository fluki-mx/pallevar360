import React from 'react';

import {
  AppRegistry,
  // StyleSheet,
  // Text,
  // View,
  // asset,
  // VrButton,
  // Environment
} from 'react-360';

// import { default as VideoModule } from 'VideoModule';
import Catalog from './components/Catalog'; 
import CurrentMovie from './components/CurrentMovie'; 

import * as Store from './utils/Store';
import seed from './utils/seed';

Store.initialize(seed);

// class platform360 extends React.Component {

//   state = {
//     playing: false,
//   };

//   constructor(props) {
//     super(props)
//     this.player = VideoModule.createPlayer('myplayer');
//   }

//   _playVideo = () => {

//     this.player.play({
//       source: {url: asset('cosmonaute_360.mp4').uri}, // provide the path to the video
//       muted: false,
//       volume: 0.5,
//     }); 

//     // Display the background video on the Environment
//     Environment.setBackgroundVideo('myplayer');

//     // Environment.setScreen(
//     //   'default', /* screen name */
//     //   'myplayer', /* player unique id */
//     //   'default', /* surface name */
//     //   0, 0, 1200, 400 /* relative position on the surface */
//     // );
//   }

//   render() {
//     return (
//       <View style={styles.panel}>
//         <View style={styles.greetingBox}>
//           <VrButton onClick={this._playVideo}>
//             <Text style={styles.greeting}>
//               Play Video
//             </Text>
//           </VrButton>
//         </View>
//       </View>
//     );
//   }
// };

// const styles = StyleSheet.create({
//   panel       : {
//     // Fill the entire surface
//     width           : 1000,
//     height          : 600,
//     backgroundColor : 'rgba(255, 255, 255, 0.3)',
//     justifyContent  : 'center',
//     alignItems      : 'center'
//   },
//   greetingBox : {
//     padding         : 20,
//     backgroundColor : '#000000',
//     borderColor     : '#639dda',
//     borderWidth     : 2
//   },
//   greeting    : {
//     fontSize : 30
//   }
// });

AppRegistry.registerComponent('Catalog', () => Catalog);
AppRegistry.registerComponent('CurrentMovie', () => CurrentMovie);
