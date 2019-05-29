import { StyleSheet, Dimensions } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';

export const dimensions = {
  fullHeight: Dimensions.get('window').height,
  fullWidth: Dimensions.get('window').width,
  statusBarHeight: getStatusBarHeight(),
};

export const colors = {
  navIcons: '#4901EF',
  primary: '#620BC9',
  accent: '#A21F77',
  highlight: '#D764CB',
  descTxt: '#666666',
  editTxt: '#2D2A32',
  preTxt: '#9A989E',
  white: '#FDFCFF',
};

export const padding = {
  sm: 30,
  md: 40,
  lg: 50,
};

export const fonts = {
  h1: 43,
  h2: 28,
  h3: 22,
  p1: 18,
  p2: 12,
  p3: 10,
};
