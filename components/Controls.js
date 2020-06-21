import * as React from 'react';
import { Image, StyleSheet, Text, View, VrButton, NativeModules} from 'react-360';
import { connect } from '../utils/Store';
import GazeButton from "react-360-gaze-button";

class Controls extends React.Component {

    constructor(props) {
        super(props)
    }

    render() {

        if (!this.props.playing) {
            return (<View></View>)
        } else {
            return (
                <View style={styles.wrapper}>
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
        flexDirection: 'row-reverse'
    },
    controlLabel: {
        fontSize: 100,
        paddingHorizontal: 10,
        paddingVertical: 2,
        alignSelf: 'flex-start',
        color: 'red'
    }
});

const ConnectedControls = connect(Controls);

export default ConnectedControls;