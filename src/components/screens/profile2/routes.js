import { createStackNavigator } from 'react-navigation';

import { setDefaultHeaderLayout } from '../../../routes/headerUtils';

import Profile2 from './index';

export const ROUTE_NAMES = {
  PROFILE2: 'PROFILE2',
};

const ROUTES = createStackNavigator({
  [ROUTE_NAMES.PROFILE2]: {
    screen: Profile2,
    navigationOptions: ({ navigation }) => setDefaultHeaderLayout(navigation, 'Skön profil'),
  },
});

export default ROUTES;
