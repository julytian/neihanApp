import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  'body': {
    'height': [{ 'unit': '%V', 'value': 1 }],
    'width': [{ 'unit': '%H', 'value': 1 }],
    'fontSize': [{ 'unit': 'px', 'value': 14 }],
    'color': '#313131',
    'overflowX': 'hidden',
    'lineHeight': [{ 'unit': 'px', 'value': 1 }]
  },
  '#app': {
    'width': [{ 'unit': '%H', 'value': 1 }],
    'maxWidth': [{ 'unit': 'px', 'value': 640 }],
    'height': [{ 'unit': '%V', 'value': 1 }],
    'margin': [{ 'unit': 'px', 'value': 0 }, { 'unit': 'string', 'value': 'auto' }, { 'unit': 'px', 'value': 0 }, { 'unit': 'string', 'value': 'auto' }]
  },
  'a': {
    'WebkitTapHighlightColor': 'transparent'
  },
  'div': {
    'WebkitTapHighlightColor': 'transparent'
  },
  'p': {
    'WebkitTapHighlightColor': 'transparent'
  }
});
