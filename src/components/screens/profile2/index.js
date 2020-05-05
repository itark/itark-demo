// @flow

import React from 'react';
import {
  TouchableOpacity,
  Linking,
  Platform,
  ScrollView,
  View,
  Text,
  FlatList, 
  StyleSheet,
} from 'react-native';


import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import styled from 'styled-components';

import FastImage from 'react-native-fast-image';
import { TYPES, SOCIAL_BUTTONS } from './components/SOCIAL_BUTTONS';
import LikeBeating from './components/LikeBeating';

const PROFILE_IMAGE_URL = 'https://avatars0.githubusercontent.com/u/19726280?s=460&v=4';

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    name: 'First Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    name: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    name: 'Third Item',
  },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});

function Item({ title }) {
  return (
      <Text style={styles.title}>{title}</Text>
  );
}


const Container = styled(View)`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.white};
`;

const Content = styled(View)`
  align-items: center;
`;

const ProfileImageWrapper = styled(View)`
  margin-vertical: ${({ theme }) => theme.metrics.largeSize}px;
  width: 80px;
  height: 80px;
  border-radius: 40px;
  background-color: ${({ theme }) => theme.colors.primaryColor};
`;

const ProfileImage = styled(FastImage).attrs(({ uri }) => ({
  source: { uri },
}))`
  width: 100%;
  height: 100%;
  border-radius: 40px;
`;

const NameTextWrapper = styled(View)`
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const SubTextWrapper = styled(View)`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 40px;
`;

const NameText = styled(Text)`
  color: ${({ theme }) => theme.colors.darkText};
  font-family: CircularStd-Black;
  font-size: ${({ theme }) => theme.metrics.getHeightFromDP('3.25%')};
`;

const SubText = styled(Text)`
  color: ${({ theme }) => theme.colors.lightDarkLayer};
  font-family: CircularStd-Medium;
  font-size: ${({ theme }) => theme.metrics.getHeightFromDP('2.8%')};
`;

const SocialContactsWrapper = styled(View)`
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const SocialButtonsWrapper = styled(View)`
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  width: 70%;
  margin-top: ${({ theme }) => theme.metrics.largeSize}px;
`;

const SocialButton = styled(TouchableOpacity)`
  justify-content: center;
  align-items: center;
  width: 35px;
  height: 35px;
  border-radius: 17.5px;
`;

const AboutMeWrapper = styled(View)`
  width: 100%;
  height: 100%;
  margin-top: ${({ theme }) => 1.5 * theme.metrics.mediumSize}px;
  padding-top: ${({ theme }) => theme.metrics.extraLargeSize}px;
  padding-horizontal: ${({ theme }) => theme.metrics.extraLargeSize}px;
`;

const AboutMeWrapper2 = styled(View)`
  width: 100%;
  height: 100%;
  margin-top: ${({ theme }) => 1.5 * theme.metrics.mediumSize}px;
  padding-top: ${({ theme }) => theme.metrics.extraLargeSize}px;
  padding-horizontal: ${({ theme }) => theme.metrics.extraLargeSize}px;
`;


const AboutMeDescription = styled(Text)`
  color: ${({ theme }) => theme.colors.darkLayer};
  font-size: ${({ theme }) => theme.metrics.getWidthFromDP('4%')}px;
  text-align: left;
  font-family: CircularStd-Book;
`;

const MinaFans = styled(Text)`
  color: ${({ theme }) => theme.colors.darkLayer};
  font-size: ${({ theme }) => theme.metrics.getWidthFromDP('4%')}px;
  text-align: left;
  font-family: CircularStd-Book;
`;

const AboutMeTitle = styled(Text)`
  margin-bottom: ${({ theme }) => theme.metrics.smallSize}px;
  color: ${({ theme }) => theme.colors.darkText};
  font-family: CircularStd-Black;
  font-size: ${({ theme }) => theme.metrics.getHeightFromDP('2.7%')};
`;

const SocialIcon = styled(Icon).attrs(({ name }) => ({
  size: 21,
  name,
}))`
  color: ${({ theme }) => theme.colors.white};
  margin-top: ${({ withMarginTop }) => (Platform.OS === 'ios' && withMarginTop ? 2 : 0)}px;
`;

const ButtonWrapper = styled(LinearGradient).attrs({
  start: {
    x: 0,
    y: 0,
  },
  end: {
    x: 1,
    y: 0,
  },
})`
  width: 35px;
  height: 35px;
  border-radius: 17.5px;
  justify-content: center;
  align-items: center;
`;

const handleSocialButtonClick = async (url: string): void => {
  const canOpenURL = await Linking.canOpenURL(url);

  if (canOpenURL) {
    Linking.openURL(url);
  } else {
    alert("Unfortunately, this URL can't be opened on your devices! :(");
  }
};

const renderSocialButton = (type: string): Object => {
  const {
    withMarginTop, iconName, colors, url,
  } = SOCIAL_BUTTONS[type];

  return (
    <ButtonWrapper
      colors={colors}
    >
      <SocialButton
        onPress={() => handleSocialButtonClick(url)}
      >
        <SocialIcon
          withMarginTop={withMarginTop}
          name={iconName}
        />
      </SocialButton>
    </ButtonWrapper>
  );
};

const ListWrapper = styled(View)`
  flex: 1;
  flex-direction: row;
`;

const Profile2 = (): Object => (
  <Container>
    <ScrollView
      alwaysBounceVertical={false}
    >
      <Content>
        <ProfileImageWrapper>
          <ProfileImage
            uri={PROFILE_IMAGE_URL}
          />
        </ProfileImageWrapper>
        <NameTextWrapper>
          <NameText>Fredrik Möller</NameText>
          <LikeBeating />
        </NameTextWrapper>
        <SubTextWrapper>
          <SubText>Full Stack Utvecklare</SubText>
        </SubTextWrapper>        
        <SocialContactsWrapper>
          <SocialButtonsWrapper>
            {renderSocialButton(TYPES.LINKEDIN)}
            {renderSocialButton(TYPES.GITHUB)}
            {renderSocialButton(TYPES.INSTAGRAM)}
          </SocialButtonsWrapper>
        </SocialContactsWrapper>
        <AboutMeWrapper>
          <AboutMeTitle>Om mig </AboutMeTitle>
          <AboutMeDescription>
            {
              "En Full Stack Utvecklare med intresse..."
            }
          </AboutMeDescription>
          <MinaFans>
            { 
              "kalle XX"
            }
          </MinaFans>
        </AboutMeWrapper>
      </Content>
    </ScrollView>
    <FlatList
          data={DATA}
          renderItem={({item}) => <Text style={styles.item}>{item.name}</Text>}
         />
  </Container>
);

export default Profile2;
