import * as React from 'react';
import { StyleSheet, Text, View, VrButton, NativeModules, Environment } from 'react-360';
import { default as VideoModule } from 'VideoModule';
import GazeButton from "react-360-gaze-button";
import { connect } from '../utils/Store';

class CurrentMovie extends React.Component {

  state = {
    gazed: false
  };

  constructor(props) {
    super(props)
    this.player = VideoModule.createPlayer('myplayer');
  }

  _playVideo = (uriVideo) => {
    console.log(uriVideo)
    this.player.play({
      source: { url: uriVideo }, // provide the path to the video
      muted: false,
      volume: 0.5,
    });
    
    // Display the background video on the Environment
    Environment.setBackgroundVideo('myplayer');
  }

  setGazed = () => {
    this.setState({ gazed: true });
  };

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
    const { gazed } = this.state;

    return (
      <View style={styles.wrapper}>
        <Text style={styles.name}>{movie.title}</Text>
        <Text style={styles.filmmaker}>{movie.filmmaker}</Text>
        <Text style={styles.plot}>{movie.plot}</Text>
        <GazeButton
          duration={400}
          onClick={() => this._playVideo(movie.assetVideo)}
          render={() => (
            <Text style={styles.pageButtonLabel}> 
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
    movieButton: {
      height: 300,
      backgroundColor: '#000000',
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