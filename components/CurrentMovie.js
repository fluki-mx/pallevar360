import * as React from 'react';
import { StyleSheet, Text, View, VrButton, NativeModules, Environment } from 'react-360';
import VideoModule from 'VideoModule';
import GazeButton from "react-360-gaze-button";
import { connect, changePlayerStatus } from '../utils/Store';

class MiniPaginationButton extends React.Component {
  state = {
    hover: false,
  };
 
  render() {
      return (
          <GazeButton
              duration={400}
              onEnter={() => this.setState({hover: true})}
              onExit={() => this.setState({hover: false})}
              onClick={() => console.log('CLICK')}
              render={() => (
                  <Text style={[styles.paginationButtonLabel, this.state.hover ? styles.paginationButtonHover : null]}> 
                      { this.props.func === 'prev' ? '<' : '>'} 
                  </Text>      
              )}
          />
      );
  }
}

class MiniBarButton extends React.Component {

  state = {
    hover: false,
  };

  
  render() {
    return (
      <GazeButton
        style={[styles.miniBarButton, this.state.hover ? styles.miniBarButtonHover : null, this.props.active ? styles.miniBarButtonActive : null]}
        duration={400}
        onEnter={() => this.setState({hover: true})}
        onExit={() => this.setState({hover: false})}
        onClick={() => this.props.handleClick(this.props.section)}
        render={() => (
            <Text style={ styles.miniBarButtonLabel }> 
                { this.props.title }
            </Text>      
        )}
      />
    )
  }
}

class MiniContent extends React.Component {

  handlePlotPage(number) {

  }

  isActive(section) {
    return true ? this.props.activeChoice === section : false
  }

  render() {

    let sections = {
      instructions: 'instructions',
      plot: 'plot',
      social: 'social',
    } 

    return (
      <View style={styles.miniWrapper}>
        <View style={styles.miniContentBar}>
          <MiniBarButton
            title={'Instrucciones'}
            active={this.isActive(sections.instructions)}
            section={sections.instructions}
            handleClick={this.props.handleChangeChoice}
          />
          <MiniBarButton
            title={'Sinópsis'}
            active={this.isActive(sections.plot)}
            section={sections.plot}
            handleClick={this.props.handleChangeChoice}
          />
          <MiniBarButton
            title={'Social'}
            active={this.isActive(sections.social)}
            section={sections.social}
            handleClick={this.props.handleChangeChoice}
          />
        </View>
        <View style={styles.miniContentInfo}>
          {
            this.props.activeChoice === 'instructions' ?
            <Text style={styles.plotLabel}>Instrucciones...</Text>
            : this.props.activeChoice === 'plot' ?
            <Text style={styles.plotLabel}>{this.props.plot}</Text>
            : this.props.activeChoice === 'social' &&
            <Text style={styles.plotLabel}>Social...</Text>
          }
        </View>
        {
          this.props.activeChoice === 'plot' &&
          <View style={styles.miniPaginationWrapper}>
            <MiniPaginationButton />
          </View>
        }
      </View>
    )
  }
}

/**
 * Componente principal, conectado con el Store de la Plataforma
 * renderiza la película actual seleccionada 
 * con el Mini-Contenedor que contiene más detalles del filme y
 * también configura el reproductor de Videos de la Plataforma
 */
class CurrentMovie extends React.Component {

  state = {
    section: 'plot'
  }

  // Constructor
  constructor(props) {
    super(props)
    // Setup del Reproductor de Videos
    this.player = VideoModule.createPlayer('myplayer');
  }

  // Función que cambia la sección activa del Mini-Contenedor
  changeSection = (name) => {
    this.setState({
      section: name
    })
  }

  // Función para reproducir Videos
  _playVideo = (videoURL, videoStereo=null) => {  

    // Función para reproducir Videos y setear configuraciones
    this.player.play({
      source: { url: videoURL }, // provide the path to the video
      muted: true,
      stereo: videoStereo ? videoStereo : null,
      autoPlay: false,
    });

    // Setea el reproductor como background de la pantalla
    Environment.setBackgroundVideo('myplayer');
    
    // Resume el video
    this.player.resume();

    // Cambia el estatus en el Store para renderizar los controles mientras se reproduce un video
    changePlayerStatus();
  }
  
  render() {

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
        <MiniContent 
          plot={movie.plot}
          activeChoice={this.state.section}
          handleChangeChoice={this.changeSection}
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

/**
 * Estilo de los Componentes
 */
const styles = StyleSheet.create({
    // CurrentMovie
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

    // MiniContent
    miniWrapper: {
      width: 552,
      height: 300,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      borderWidth: 0,
      flexDirection: 'column',
      alignItems: 'center'
    },
    miniContentBar: {
      width: 552,
      height: 50,
      flexDirection: 'row',
      alignItems: 'center'
    },
    miniBarButton: {
      width: 184,
      height: 50,
      backgroundColor: 'rgba(237, 255, 0, 0.5)',
    },
    miniBarButtonActive: {
      backgroundColor: 'rgba(237, 255, 0, 1)',
    },
    miniBarButtonHover: {
      backgroundColor: 'rgba(237, 255, 0, 0.2)',
    },
    miniBarButtonLabel: {
      textAlign: 'center', 
      fontSize: 30, 
      color: 'black'
    },
    miniContentInfo: {
      width: 552,
      height: 200,
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      marginTop: 0,
      marginBottom: 0,
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

    //MiniPagination
    miniPaginationWrapper: {
      marginTop: 0,
      paddingTop: 0,
      flexDirection: 'row',
      justifyContent: 'center',
      height: 50
    },
    paginationButtonHover: {
        color: 'rgba(237, 255, 0, 0.4)',
    },
    paginationButtonLabel: {
        textAlign: 'center', 
        fontSize: 37, 
        fontWeight: 'bold', 
        color: 'rgb(237, 255, 0)',
    },
});
  
const ConnectedCurrentMovie = connect(CurrentMovie);

export default ConnectedCurrentMovie;