import * as React from 'react';
import { StyleSheet, Text, View, VrButton, NativeModules, Environment } from 'react-360';
import VideoModule from 'VideoModule';
import GazeButton from "react-360-gaze-button";
import { connect } from '../utils/Store';

class CurrentMovie extends React.Component {

  constructor(props) {
    super(props)
    this.player = VideoModule.createPlayer('myplayer');
  }

  _playVideo = (videoURL, videoStereo=null) => {  
    // Display the background video on the Environment

    this.player.play({
      source: { url: videoURL }, // provide the path to the video
      muted: false,
      volume: 0.5,
      stereo: videoStereo ? videoStereo : null,
      autoPlay: false,
    });

    Environment.setBackgroundVideo('myplayer');
    
    this.player.resume();
  }

  clickButton = (event) => {
    NativeModules.Location.replace('https://google.com.mx', '_blank')
  } 
  
  render() {

    if (!this.props.catalog) {
      return <View style={styles.wrapper}></View>;
    }

    if (this.props.activeMovie < 0) {
      return (
        <View style={styles.wrapper}>
          <View style={{flex: 1, justifyContent: 'center'}}>
            <Text style={{textAlign: 'center', fontSize: 70}}>Selecciona una película</Text>
          </View>
        </View>
      );
    }
    const movie = this.props.catalog.data.find(movie => movie.id === this.props.activeMovie);
    return (
      <View style={styles.wrapper}>
        <Text style={styles.name}>{movie.title}</Text>
        <Text style={styles.filmmaker}>{movie.filmmaker}</Text>
        <Text style={styles.plot}>{movie.plot}</Text>
        <GazeButton
          duration={400}
          style={styles.playButton}
          onClick={() => this._playVideo(movie.uri, movie.stereo)}
          render={() => (
            <Text style={styles.playButtonLabel}> 
                PLAY
            </Text>      
          )}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
    wrapper: {
        width: 600,
        height: 600,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        borderColor: '#303050',
        borderWidth: 2,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'stretch',
        padding: 10,
    },
    playButton: {
      height: 70,
      width: 120,
      backgroundColor: 'rgba(237, 255, 0, 0.8)',
      overflow: 'hidden',
    },
    playButtonLabel: {
      fontSize: 50,
      color: 'black',
      overflow: 'hidden',
    },
    name: {
        fontSize: 30,
        textAlign: 'center',
    },
    filmmaker: {
        fontSize: 20,
        textAlign: 'center',
    },
    plot: {
        fontSize: 16
    },
});
  
const ConnectedCurrentMovie = connect(CurrentMovie);

export default ConnectedCurrentMovie;