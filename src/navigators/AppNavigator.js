import { StackNavigator } from 'react-navigation';
import A from '../containers/A';
import B from '../containers/B';
import C from '../containers/C';
import D from '../containers/D';
import E from '../containers/E';
import NavigationBack from '../components/NavigationBack';

const AppNavigator = StackNavigator(
  {
    A: { screen: A },
    B: { screen: B },
    C: { screen: C },
    D: { screen: D },
    E: { screen: E },
  },
  {
    navigationOptions: ({ navigation }) => ({
      headerLeft: new NavigationBack({ navigation }),
    }),
  },
);

export default AppNavigator;
