import * as React from 'react';
import { Image, StyleSheet, Text, View, VrButton, asset} from 'react-360';
import { connect, activeMovie, changePage } from '../utils/Store';
import GazeButton from "react-360-gaze-button";

class MovieButton extends React.Component {
    state = {
      hover: false,
    };

    // componentDidMount() {
    //     console.log(this.props)
    // }
   
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
                        <Image style={styles.movieButtonPreview} source={asset('preview.jpg')} />
                        <View style={[styles.movieButtonInfo, this.state.hover ? styles.movieButtonInfoHover : null]}>
                        <View style={styles.movieButtonLabel}>
                            <Text style={styles.movieButtonTitle}>{this.props.title}</Text>
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



class Pages extends React.Component {

    render() {
        return (
            <View style={styles.pagesWrapper}>
                {
                    this.props.prev &&
                        <PageButton 
                            func='prev' 
                            stylish={{ marginRight: 30 }}
                            pageNum={this.props.prev}
                        />
                }
                {
                    this.props.next &&
                        <PageButton 
                            func='next' 
                            stylish={{ marginLeft: 30 }}
                            pageNum={this.props.next}
                        />
                }
            </View>
        )
    }
}

const Catalog = props => {

    if (!props.catalog) {
        return (
          <View style={styles.wrapper}>
            <Text>Loading...</Text>
          </View>
        );
    }

    return (
        <View style={styles.wrapper}>
            {
                props.catalog.data.map((movie, i) => (
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
                prev={props.catalog.pre_page}
                next={props.catalog.next_page}
            />
            
        </View>
    )
}

const styles = StyleSheet.create({
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
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        paddingHorizontal: 10,
        paddingVertical: 2,
        alignSelf: 'flex-start',
    },
    movieButtonTitle: {
        fontSize: 45,
    },
    movieButtonFilmmaker: {
        fontSize: 25,
    },
    pagesWrapper: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 15,
        height: 100
    },
    pageButton: {
        backgroundColor: 'rgba(237, 255, 0, 1)',
        marginVertical: 10,
        borderWidth: 3,
        paddingHorizontal: 15
    },
    pageButtonHover: {
        backgroundColor: 'rgba(237, 255, 0, 0.7)',
    },
    pageButtonLabel: {
        textAlign: 'center', 
        fontSize: 50, 
        fontWeight: 'bold', 
        color: 'black'
    }
});

const ConnectedCatalog = connect(Catalog);

export default ConnectedCatalog;