import * as React from 'react';
import { Image, StyleSheet, Text, View, VrButton, asset} from 'react-360';
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
                    <Text style={styles.controlLabel}>
                        Controls
                    </Text>
                </View>
            )
        }
    }

}

const styles = StyleSheet.create({
    wrapper: {
        width: 1000,
        height: 50,
        backgroundColor: 'rgba(0, 0, 0, 1)',
        borderColor: 'rgba(237, 255, 0, 0.4)',
        flexDirection: 'row',
        alignItems: 'center',
    },
    controlLabel: {
        fontSize: 45,
        paddingHorizontal: 10,
        paddingVertical: 2,
        alignSelf: 'flex-start',
    }
});

const ConnectedControls = connect(Controls);

export default ConnectedControls;