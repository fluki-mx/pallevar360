import * as React from 'react';
import { StyleSheet, Text, View, VrButton } from 'react-360';
import { connect } from '../utils/Store';

const CurrentMovie = props => {

  if (!props.movies) {
    return <View style={styles.wrapper}></View>;
  }
  if (props.current < 0) {
    return (
      <View style={styles.wrapper}>
        <View style={{flex: 1, justifyContent: 'center'}}>
          <Text style={{textAlign: 'center'}}>Selecciona una película</Text>
        </View>
      </View>
    );
  }

  const movie = props.movies.find(movie => movie.id === props.current);
  return (
    <View style={styles.wrapper}>
      <Text style={styles.name}>{movie.title}</Text>
      <Text style={styles.filmmaker}>{movie.filmmaker}</Text>
      <Text style={styles.plot}>{movie.plot}</Text>

    </View>
  );
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