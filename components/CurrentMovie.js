import * as React from 'react';
import { StyleSheet, Text, View, VrButton, NativeModules, Environment } from 'react-360';
import VideoModule from 'VideoModule';
import GazeButton from "react-360-gaze-button";
import { connect, changePlayerStatus } from '../utils/Store';
import { PlotPaginator } from '../utils/funcs';
import {isMobile} from 'react-device-detect';

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

class SocialButton extends React.Component {
   
  state = {
    hover: false,
  };

  getButtonStyle(type) {
    switch (type) {
      case 'www':
        return styles.miniWWWButton
      case 'fb':
        return styles.miniFBButton
      case 'ig':
        return styles.miniIGButton
      case 'tw':
        return styles.miniTWButton
      default:
        break;
    }
  }

  getTextStyle(type) {
    switch (type) {
      case 'www':
        return styles.miniBarButtonLabel
      case 'fb':
        return styles.miniBarButtonLabelWhite
      case 'ig':
        return styles.miniBarButtonLabelWhite
      case 'tw':
        return styles.miniBarButtonLabel
      default:
        break;
    }
  }

  render() {
    return (
      <GazeButton
        style={[this.getButtonStyle(this.props.type), this.state.hover ? styles.miniBarButtonHover : null]}
        duration={400} 
        onEnter={() => this.setState({hover: true})}
        onExit={() => this.setState({hover: false})}
        onClick={() => NativeModules.LinkingManager.openURL(this.props.uri)}
        render={() => (
            <Text style={this.getTextStyle(this.props.type)}> 
                { this.props.title } 
            </Text>      
          )}
      />
    )
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
        disabled={this.props.disabled}
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
  
  state = {
    activePagePlot: 1,
  };

  componentDidMount() {
    const plotPages = PlotPaginator(this.state.activePagePlot, this.props.plot);
    console.log(plotPages)
  }

  componentDidUpdate(prevProps) {
    console.log(prevProps)
  } 

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
            disabled={this.props.instruction ? false : true}
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
            disabled={this.props.social ? false : true}
            handleClick={this.props.handleChangeChoice}
          />
        </View>
        <View style={styles.miniContentInfo}>
          {
            this.props.activeChoice === 'instructions' && this.props.instruction ?
          <Text style={styles.plotLabel}>
            {this.props.instruction.text}
          </Text>
            : this.props.activeChoice === 'plot' ?
            <Text style={styles.plotLabel}>
             { this.props.plot[0] }
            </Text>
            : this.props.activeChoice === 'social' && this.props.social &&
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
              { this.props.social.website &&
                <SocialButton 
                  type={'www'}
                  title={'Website'}
                  uri={this.props.social.website}
                />
              }

              { this.props.social.facebook &&
                <SocialButton 
                  type={'fb'}
                  title={'Facebook'}
                  uri={this.props.social.facebook}
                />
              }

              { this.props.social.instagram &&
                <SocialButton 
                  type={'ig'}
                  title={'Instagram'}
                  uri={this.props.social.instagram}
                />
              }

              { this.props.social.twitter &&
                <SocialButton 
                  type={'tw'}
                  title={'Twitter'}
                  uri={this.props.social.twitter}
                />
              }
              
              
            </View>
          }
        </View>
        {
          this.props.activeChoice === 'instructions' && this.props.instruction.link ?
            <View style={styles.miniPaginationWrapper}>
              <GazeButton
                style={[styles.miniInstructionButton, this.state.hover ? styles.miniInstructionButtonHover : null]}
                duration={400} 
                onEnter={() => this.setState({hover: true})}
                onExit={() => this.setState({hover: false})}
                onClick={() => NativeModules.LinkingManager.openURL(this.props.instruction.link)}
                render={() => (
                    <Text style={styles.miniBarButtonLabel}> 
                        Trivia 
                    </Text>      
                )}
              />
            </View>
          : this.props.activeChoice === 'plot' &&
            <View style={styles.miniPaginationWrapper}>
              <MiniPaginationButton />
            </View>
        }
      </View>
    )
  }
}

class Player extends React.Component {
  
  // Constructor
  constructor(props) {
    super(props)
    console.log('BORN')
    try {
      this.player = VideoModule.getPlayer('myplayer');
    } catch (error) {
      this.player = VideoModule.createPlayer('myplayer');
    }
  }

  // Función para reproducir Videos
  _playVideo = (videoURL, videoStereo=null) => { 
    this.player.play({
      source: { url: videoURL }, // provide the path to the video
      stereo: videoStereo ? videoStereo : null,
      autoPlay: false,
      muted: false
    });
    
    // Setea el reproductor como background de la pantalla
    Environment.setBackgroundVideo('myplayer');

    this.player.pause();
    this.player.resume();
    
    // Cambia el estatus en el Store para renderizar los controles mientras se reproduce un video
    changePlayerStatus();
  }

  render() {
    return (
      <View style={styles.playerWrapper}>
        {
          this.props.movies.map((movie, i) => (
            <GazeButton
              key={i}
              duration={400}
              style={styles.playButton}
              onClick={() => this._playVideo(movie.uri, movie.stereo)}
              render={() => (
                <Text style={styles.playButtonLabel}> 
                    { movie.title }
                </Text>      
              )}
            /> 
          ))
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

  // Función que cambia la sección activa del Mini-Contenedor
  changeSection = (name) => {
    this.setState({
      section: name
    })
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
          id={movie.title}
          instruction={movie.instruction} 
          plot={movie.plot}
          social={movie.social}
          activeChoice={this.state.section}
          handleChangeChoice={this.changeSection}
        />
        {
          movie.uris &&
          <Player 
            status={this.props.playing}
            movies={movie.uris}
          />
        }
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
      height: 50,
      width: 180,
      marginVertical: 5,
      marginHorizontal: 5,
      backgroundColor: 'rgba(237, 255, 0, 0.8)',
      overflow: 'hidden',
    },
    playButtonLabel: {
      fontSize: 30,
      color: 'black',
      overflow: 'hidden',
      textAlign: 'center'
    },
    nameLabel: {
      fontSize: 50,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    filmmakerLabel: {
      paddingVertical: 10,
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
    miniInstructionButton: {
      width: 184,
      height: 50,
      backgroundColor: 'rgba(12, 222, 250, 1)',
    },
    miniInstructionButtonHover: {
      backgroundColor: 'rgba(12, 222, 250, 0.5)',
    },
    miniWWWButton: {
      width: 184,
      height: 50,
      marginBottom: 10,
      marginHorizontal: 10,
      backgroundColor: 'rgba(227, 244, 250, 1)',
    },
    miniFBButton: {
      width: 184,
      height: 50,
      marginBottom: 10,
      marginHorizontal: 10,
      backgroundColor: 'rgba(59, 89, 152, 1)',
    },
    miniIGButton: {
      width: 184,
      height: 50,
      marginBottom: 10,
      marginHorizontal: 10,
      backgroundColor: 'rgba(193, 53, 132, 1)',
    },
    miniTWButton: {
      width: 184,
      height: 50,
      marginBottom: 10,
      marginHorizontal: 10,
      backgroundColor: 'rgba(0, 172, 238, 1)',
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
    miniBarButtonLabelWhite: {
      textAlign: 'center', 
      fontSize: 30, 
      color: 'white'
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

    //Player
    playerWrapper: {
      flexDirection: 'row',
      justifyContent: 'center',
      flexWrap: 'wrap'
    }
});
  
const ConnectedCurrentMovie = connect(CurrentMovie);

export default ConnectedCurrentMovie;