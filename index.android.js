import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  ListView,
  View
} from 'react-native';

/*
 * Use the Merge Sort to meet the O(n log(n))running time and O(n) space complexity requirement.
 *
 * Reminder:
 * This was the first time I've every done anything in React/React Native and years since I've written any js. I'm sure
 * there is a better way to structure the app, ie, separating out some functionality. I spent about ~5 hours on this.
 * Most of the time was spent going through the react tutorial and getting my env setup.
 *
 * Limitations:
 * - Input must be a comma separated list of positive or negative integers. No spaces please.
 */
class RnSortApp extends Component {

  constructor(props) {
    super(props);
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
        dataSource: ds.cloneWithRows([]),
        text: '',
    }
  }

  render() {
      return (
        <View style={styles.container}>
            <TextInput
                style={styles.sortInput}
                onChangeText={(text) => {
                    this.setState({text: text});
                    this.setState({dataSource: this.state.dataSource.cloneWithRows(mergeSort(text.split(","), true))});
                }}
                value={this.state.text}
            />
            <ListView
                dataSource={this.state.dataSource}
                initialListSize={0}
                enableEmptySections={true}
                renderRow={(rowData) => <Text>{rowData}</Text>}
            />
        </View>
      );
    }

}

// Merge sort implementation adapted from:
// http://www.stoimen.com/blog/2010/07/02/friday-algorithms-javascript-merge-sort/
function mergeSort(arr, finalCall) {
    if (arr.length < 2)
        return arr;

    var middle = parseInt(arr.length / 2);
    var left   = arr.slice(0, middle);
    var right  = arr.slice(middle, arr.length);

    return merge(mergeSort(left, false), mergeSort(right, false), finalCall);
}

function merge(left, right, finalCall) {
    var result = [];

    if (finalCall)
      return alternatingMerge(left, right);

    while (left.length && right.length) {
        if (parseInt(left[0]) <= parseInt(right[0])) {
            result.push(left.shift());
        } else {
            result.push(right.shift());
        }
    }

    while (left.length)
        result.push(left.shift());

    while (right.length)
        result.push(right.shift());

    return result;
}

function alternatingMerge(left, right) {
  var result = [];
  var alternate = false;

  while (left.length && right.length) {
    if (parseInt(left[0]) <= parseInt(right[0])) {
        if (alternate) {
          result.push(right.shift());
        } else {
          result.push(left.shift());
        }
    } else {
      if (alternate) {
        result.push(left.shift());
      } else {
        result.push(right.shift());
      }
    }
    alternate = !alternate;
  }

  while (left.length) {
    if (alternate) {
      result.push(left.pop());
    } else {
      result.push(left.shift());
    }
    alternate = !alternate;
  }

  while (right.length) {
    if (alternate) {
      result.push(right.pop());
    } else {
      result.push(right.shift());
    }
    alternate = !alternate;
  }

  return result;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  sortInput: {
    height: 56,
    borderColor: 'gray',
    borderWidth: 1,
  },
});

AppRegistry.registerComponent('RnSortApp', () => RnSortApp);
