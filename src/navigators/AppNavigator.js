import { StackNavigator } from 'react-navigation';
import A from '../containers/A';
import B from '../containers/B';
import C from '../containers/C';
import D from '../containers/D';
import E from '../containers/E';
import TimeoutPage from '../containers/TimeoutPage';
import NavigationBack from '../components/NavigationBack';
import { handleOrientation } from '../utils/OrientationUtils';

const AppNavigator = StackNavigator(
  {
    A: { screen: A },
    B: { screen: B },
    C: { screen: C },
    D: { screen: D },
    E: { screen: E },
    TimeoutPage: { screen: TimeoutPage },
  },
  {
    navigationOptions: ({ navigation }) => ({
      headerLeft: new NavigationBack({ navigation }),
    }),
  },
);

export const onNavigationStateChange = (prevState, currentState) => {
  const { routes } = currentState;
  const currentRouteName = routes[routes.length - 1].routeName;
  handleOrientation(currentRouteName);
};

export const landscapeOrientationScreens = ['C'];

export default AppNavigator;
