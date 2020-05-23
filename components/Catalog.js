import * as React from 'react';
import {Image, StyleSheet, Text, View, VrButton, asset} from 'react-360';
import {connect, setCurrent} from '../utils/Store';

class MovieButton extends React.Component {
    state = {
      hover: false,
    };

    // componentDidMount() {
    //     console.log(this.props)
    // }
   
    render() {
        return (
        <VrButton
            style={styles.movieButton}
            onEnter={() => this.setState({hover: true})}
            onExit={() => this.setState({hover: false})}
            onClick={() => setCurrent(this.props.id)}
        >
            <Image style={styles.movieButtonPreview} source={asset('preview.jpg')} />
            <View style={[styles.movieButtonInfo, this.state.hover ? styles.movieButtonInfoHover : null]}>
            <View style={styles.movieButtonLabel}>
                <Text style={styles.movieButtonTitle}>{this.props.title}</Text>
            </View>
            <View style={styles.movieButtonLabel}>
                <Text style={styles.movieButtonFilmmaker}>{this.props.filmmaker}</Text>
            </View>
            </View>
        </VrButton>
        );
    }
}

const Catalog = props => { 

    if (!props.movies) {
        return (
          <View style={styles.wrapper}>
            <Text>Loading...</Text>
          </View>
        );
    }

    return (
        <View style={styles.wrapper}>
            {
                props.movies.map((movie, i) => (
                    <MovieButton
                        key={i}
                        id={movie.id}
                        title={movie.title}
                        filmmaker={movie.filmmaker}
                        preview={movie.preview}
                    />
                ))
            }
            <View style={styles.pagesButton}>
                <VrButton
                    style={styles.leftPageButton}
                >
                    <Text style={{textAlign: 'center'}}> {'<'} </Text>
                </VrButton>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        width: 300,
        height: 600,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        borderColor: '#EDFF00',
        borderWidth: 2,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'stretch',
    },
    movieButton: {
        height: 105,
        backgroundColor: '#000000',
        overflow: 'hidden',
    },
    movieButtonInfo: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        flexDirection: 'column',
    },
    movieButtonPreview: {
        width: '100%',
        height: 105,
    },
    movieButtonInfoHover: {
        backgroundColor: 'rgba(0, 0, 0, 0)',
    },
    movieButtonLabel: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        paddingHorizontal: 10,
        paddingVertical: 2,
        alignSelf: 'flex-start',
    },
    movieButtonTitle: {
        fontSize: 24,
    },
    movieButtonFilmmaker: {
        fontSize: 16,
    },
    pagesButton: {
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        alignContent: 'center',
        alignSelf: 'center' 
    },
    leftPageButton: {
        height: 30
    },
});

const ConnectedCatalog = connect(Catalog);

export default ConnectedCatalog;