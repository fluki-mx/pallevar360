import * as React from 'react';
import { Image, StyleSheet, Text, View, VrButton, NativeModules} from 'react-360';
import { connect } from '../utils/Store';
import GazeButton from "react-360-gaze-button";
import VideoModule from 'VideoModule';
import {isMobile} from 'react-device-detect';

class Controls extends React.Component {

    state = {
        show: true
    }
 
    constructor(props) {
        super(props)
    }
    
    activateSound() {
        this.player = VideoModule.getPlayer('myplayer')
        this.player.setMuted(false)
        this.player.setVolume(1)
        this.setState({
            show: false
        });   
    }

    createControls() {
        if (isMobile) {
            return (
                <React.Fragment>
                    <GazeButton
                        duration={400}
                        style={styles.playButton}
                        onClick={() => NativeModules.LinkingManager.openURL('https://platform.vrparallevar.com')}
                        render={() => (
                            <Text style={styles.controlLabel}>
                                X
                            </Text>  
                        )}
                    />
                    {
                        this.state.show &&
                        <GazeButton
                            duration={400}
                            style={styles.soundButton}
                            onClick={() => this.activateSound()}
                            render={() => (
                                <Text style={styles.soundLabel}>
                                    Activar Sonido
                                </Text>  
                            )}
                        />
                    }
                </React.Fragment>
            )
        } else {
            return (
                <GazeButton
                    duration={400}
                    onClick={() => NativeModules.LinkingManager.openURL('https://platform.vrparallevar.com')}
                    render={() => (
                        <Text style={styles.controlLabel}>
                            X
                        </Text>  
                    )}
                />
            )
        }
    }

    render() {

        if (!this.props.playing) {
            return (<View></View>)
        } else {
            return (
                <View style={styles.wrapper}>
                    { this.createControls() }
                </View>
            )
        }
    }

}

const styles = StyleSheet.create({
    wrapper: {
        width: 1000,
        height: 200,
        backgroundColor: 'rgba(0, 0, 0, 0)',
        borderColor: 'rgba(237, 255, 0, 0.4)',
        flexDirection: 'row-reverse',
        alignItems: 'center',
    },
    controlLabel: {
        fontSize: 100,
        paddingHorizontal: 10,
        paddingVertical: 2,
        alignSelf: 'flex-start',
        color: 'red'
    },
    soundButton: {
        height: 60,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        marginVertical: 10,
        paddingHorizontal: 15
    },
    soundLabel: {
        fontSize: 40,
        paddingHorizontal: 10,
        paddingVertical: 2,
        alignSelf: 'flex-start',
        color: 'white'
    },
});

const ConnectedControls = connect(Controls);

export default ConnectedControls;