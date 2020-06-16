import * as React from 'react';
import { Image, StyleSheet, Text, View, VrButton, asset} from 'react-360';
import { connect, activeMovie, changePage } from '../utils/Store';
import GazeButton from "react-360-gaze-button";


/**
 * Bótones de Películas, para renderizar la Película Actual seleccionada.
 */

class MovieButton extends React.Component {
    state = {
      hover: false,
    };

    render() {
        return (
            <GazeButton
                style={styles.movieButton}
                duration={300}
                onEnter={() => this.setState({hover: true})}
                onExit={() => this.setState({hover: false})}
                onClick={() => activeMovie(this.props.id)}
                render={() => (
                    <React.Fragment>
                        <Image crossorigin="Access-Control-Allow-Origin" style={styles.movieButtonPreview} source={{uri: this.props.preview}} />
                        <View style={[styles.movieButtonInfo, this.state.hover ? styles.movieButtonInfoHover : null]}>
                        <View style={styles.movieButtonLabel}>
                            <Text style={styles.movieButtonTitle}>
                                {this.props.title}
                            </Text>
                        </View>
                        <View style={styles.movieButtonLabel}>
                            <Text style={styles.movieButtonFilmmaker}>{this.props.filmmaker}</Text>
                        </View>
                        </View>
                    </React.Fragment>       
                )}
            />
        );
    }
}

/**
 * Botones del Paginador, anterior o siguiente
 */

class PageButton extends React.Component {
    state = {
      hover: false,
    };
   
    render() {
        return (
            <GazeButton
                style={[styles.pageButton, this.props.stylish, this.state.hover ? styles.pageButtonHover : null]}
                duration={400}
                disabled={this.props.pageNum ? false : true}
                onEnter={() => this.setState({hover: true})}
                onExit={() => this.setState({hover: false})}
                onClick={() => changePage(this.props.pageNum)}
                render={() => (
                    <Text style={styles.pageButtonLabel}> 
                        { this.props.func === 'prev' ? '<' : '>'} 
                    </Text>      
                )}
            />
        );
    }
}


/**
 * Componente Paginador del Catálogo
 */
class Pages extends React.Component {

    render() {
        return (
            <View style={styles.pagesWrapper}>
                {
                    this.props.prev &&
                        <PageButton 
                            func='prev' 
                            stylish={{ marginRight: 50 }}
                            pageNum={this.props.prev}
                        />
                }
                {
                    this.props.next &&
                        <PageButton 
                            func='next' 
                            stylish={{ marginLeft: 50 }}
                            pageNum={this.props.next}
                        />
                }
            </View>
        )
    }
}

/**
 * Componente principal conectado con el Store, 
 * renderiza el catalogo de Bótones de Películas y el Paginador
 */
class Catalog extends React.Component {

    constructor(props) {
      super(props)
    }

    render() {

        if (this.props.playing) {
            return (<View></View>)
        }
        
        if (!this.props.catalog) {
            return (
              <View style={styles.wrapper}>
                <Text>Loading...</Text>
              </View>
            );
        }

        return (
            <View style={styles.wrapper}>
                {
                    this.props.catalog.data.map((movie, i) => (
                        <MovieButton
                            key={i}
                            id={movie.id}
                            title={movie.title}
                            filmmaker={movie.filmmaker}
                            preview={movie.preview}
                        />
                    ))
                }

                <Pages 
                    prev={this.props.catalog.pre_page}
                    next={this.props.catalog.next_page}
                />
            
            </View>
        )
    }
}

/**
 * Estilo React-Native de los Componentes
 */
const styles = StyleSheet.create({

    // Catalog
    wrapper: {
        width: 400,
        height: 600,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        borderColor: 'rgba(237, 255, 0, 0.4)',
        borderWidth: 7,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'stretch',
    },

    // MovieButton
    movieButton: {
        height: 150,
        backgroundColor: '#000000',
        overflow: 'hidden',
    },
    movieButtonInfo: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        flexDirection: 'column',
    },
    movieButtonPreview: {
        width: '100%',
        height: 150,
    },
    movieButtonInfoHover: {
        backgroundColor: 'rgba(0, 0, 0, 0)',
    },
    movieButtonLabel: {
        paddingHorizontal: 10,
        paddingVertical: 2,
        alignSelf: 'flex-start',
    },
    movieButtonTitle: {
        fontSize: 35,
        fontWeight: 'bold'
    },
    movieButtonFilmmaker: {
        fontSize: 25
    },

    // Pages
    pagesWrapper: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 15,
        height: 100
    },
    pageButton: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        marginVertical: 10,
        paddingHorizontal: 15
    },
    pageButtonHover: {
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
    },
    pageButtonLabel: {
        textAlign: 'center', 
        fontSize: 50, 
        fontWeight: 'bold', 
        color: 'rgb(237, 255, 0)',
    }
});

const ConnectedCatalog = connect(Catalog);

export default ConnectedCatalog;