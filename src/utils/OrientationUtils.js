import Orientation from 'react-native-orientation';
import { landscapeOrientationScreens } from '../navigators/AppNavigator';

const lockToLandscapeLeft = orientation =>
  (orientation !== 'LANDSCAPE-LEFT' ? Orientation.lockToLandscapeLeft() : {});

const lockToPortrait = orientation =>
  (orientation !== 'PORTRAIT' ? Orientation.lockToPortrait() : {});

const removeListener = () => {
  Orientation.removeSpecificOrientationListener(lockToPortrait);
  Orientation.removeSpecificOrientationListener(lockToLandscapeLeft);
};

const isLandscape = route => landscapeOrientationScreens.includes(route);

export const handleOrientation = (route) => {
  removeListener();
  if (isLandscape(route)) {
    lockToLandscapeLeft();
    Orientation.addSpecificOrientationListener(lockToLandscapeLeft);
  } else {
    lockToPortrait();
    Orientation.addSpecificOrientationListener(lockToPortrait);
  }
};
