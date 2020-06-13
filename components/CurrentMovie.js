import * as React from 'react';
import { StyleSheet, Text, View, VrButton, NativeModules, Environment } from 'react-360';
import VideoModule from 'VideoModule';
import GazeButton from "react-360-gaze-button";
import { connect, changePlayerStatus } from '../utils/Store';

// const { VideoModule } = NativeModules;

class MiniSection extends React.Component {
  render() {
    if (this.props.choice === 'plot') {
      return (
        <View style={styles.miniWrapper}>
          <View style={styles.miniSectionBar}>
          
          </View>
          <View style={styles.miniSectionContent}>
              <Text style={styles.plotLabel}>{this.props.plot}</Text>
          </View>
        </View>
      )
    } else {
      return (
        <View></View>
      )
    }
  }
}

class CurrentMovie extends React.Component {

  state = {
    section: 'plot'
  }

  constructor(props) {
    super(props)
    this.player = VideoModule.createPlayer('myplayer');
  }

  _playVideo = (videoURL, videoStereo=null) => {  
    // Display the background video on the Environment

    console.log(videoURL)

    this.player.play({
      source: { url: videoURL }, // provide the path to the video
      muted: true,
      stereo: videoStereo ? videoStereo : null,
      autoPlay: false,
    });

    Environment.setBackgroundVideo('myplayer');
    
    this.player.resume();

    changePlayerStatus();
  }

  clickButton = (event) => {
    NativeModules.Location.replace('https://google.com.mx', '_blank')
  } 
  
  render() {

    console.log(this.props)


    if (this.props.playing) {
      return (<View></View>)
    }

    if (!this.props.catalog) {
      return <View style={styles.wrapper}></View>;
    }

    if (this.props.activeMovie < 0) {
      return (
        <View style={styles.wrapper}>
          <View style={{flex: 1, justifyContent: 'center'}}>
            <Text style={{textAlign: 'center', fontSize: 100}}>Selecciona una película</Text>
          </View>
        </View>
      );
    }
    const movie = this.props.catalog.data.find(movie => movie.id === this.props.activeMovie);
    return (
      <View style={styles.wrapper}>
        <Text style={styles.nameLabel}>{movie.title}</Text>
        <Text style={styles.filmmakerLabel}>{movie.filmmaker}</Text>
        <MiniSection 
          plot={movie.plot}
          choice={this.state.section}
        />
        {/* <GazeButton
          duration={400}
          style={styles.playButton}
          onClick={() => this._playVideo(movie.uri, movie.stereo)}
          render={() => (
            <Text style={styles.playButtonLabel}> 
                PLAY
            </Text>      
          )}
        /> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
    // CurrentMovie Component
    wrapper: {
        width: 600,
        height: 600,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        borderColor: 'rgba(237, 255, 0, 0.4)',
        borderWidth: 7,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
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
    nameLabel: {
      fontSize: 60,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    filmmakerLabel: {
        fontSize: 30,
        textAlign: 'center',
    },

    // MiniSection
    miniWrapper: {
      width: 550,
      height: 300,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      borderWidth: 0,
      flexDirection: 'column',
      alignItems: 'center'
    },
    miniSectionBar: {
      width: 550,
      height: 50,
      backgroundColor: 'rgba(125, 128, 0, 1)',
      flexDirection: 'row',
      alignItems: 'center'
    },
    miniSectionContent: {
      width: 550,
      height: 200,
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      marginTop: 0,
      paddingLeft: 15,
      paddingRight: 15,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    },
    plotLabel: {
        paddingTop: 0,
        marginTop: 0,
        fontSize: 34,
        textAlign: 'center',
    },
});
  
const ConnectedCurrentMovie = connect(CurrentMovie);

export default ConnectedCurrentMovie;