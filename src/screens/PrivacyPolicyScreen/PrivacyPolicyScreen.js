import React from 'react';
import { FlatList, ScrollView, StyleSheet, View } from 'react-native';
import { Container, Spacer, Text } from '../../common';

const paragraphs = [
  {
    header: 'What data do we collect?',
    body: 'Ocon collects the following data:',
    listItems: [
      'Personal identification information (email address, username, location)'
    ]
  },
  {
    header: 'How do we collect your data?',
    body: 'You directly provide Ocon with your email and username, however your location is only used by us when you post an image. We collect data from you when you:',
    listItems: [
      'Register for an account.',
      'Gives us permission to use your location.'
    ]
  },
  {
    header: 'How will we use your data?',
    body: 'Ocon collects your data so that we can:',
    listItems: [
      'Manage your account.',
      'Give users a better experience inside the app, by showing them your location and username.',
      'Give you the possibility to create a new password.'
    ]
  },
  {
    header: 'How do we store your data?',
    body: 'Ocon securely stores your data at Firebase and Heroku. Ocon will keep your email address, username and location until you request an account-deletion.'
  },
  {
    header: 'What are your data protection rights?',
    body: 'Ocon would like to make sure you are fully aware of all of your data protection rights. Every user is entitled to the following:',
    listItems: [
      'The right to access – You have the right to request Ocon for copies of your personal data.',
      'The right to rectification – You have the right to request that Ocon correct any information you believe is inaccurate. You also have the right to request Ocon to complete the information you believe is incomplete.',
      'The right to erasure – You have the right to request that Ocon erase your personal data, under certain conditions.',
      'The right to restrict processing – You have the right to request that Ocon restrict the processing of your personal data, under certain conditions.',
      'The right to object to processing – You have the right to object to Ocon’s processing of your personal data, under certain conditions.',
      'The right to data portability – You have the right to request that Ocon transfer the data that we have collected to another organization, or directly to you, under certain conditions.',
      'If you make a request, we have one month to respond to you. If you would like to exercise any of these rights, please contact us at our email: odin.hufnagl@gmail.com'
    ]
  },
  {
    header: 'What is local storage?',
    body: 'Local storage is a part of your devices storage where Ocon can store data and values for usage in the app'
  },
  {
    header: 'What do we use local storage for?',
    body: 'We take use of your local storage to:',
    listItems: ['Keep you signed in']
  },
  {
    header: 'Changes to our privacy policy',
    body: 'Ocon keeps its privacy policy under regular review and places any updates on this page. This privacy policy was last updated on 19 September 2022.'
  },
  {
    header: 'How to contact us',
    body: 'If you have any questions about Ocon’s privacy policy, the data we hold on you, or you would like to exercise one of your data protection rights, please do not hesitate to contact us.',
    listItems: ['Email us at: odin.hufnagl@gmail.com', 'Call us: 0737645814']
  }
];
const Paragraph = ({ header, body, listItems }) => {
  return (
    <>
      <Text type="header">{header}</Text>
      <Spacer />
      <Text bold>{body}</Text>
      <Spacer />
      <FlatList
        scrollEnabled={false}
        data={listItems}
        renderItem={({ item }) => (
          <>
            <Text style={styles.item}>
              {'\u25CF' + ' '}
              {item}
            </Text>
            <Spacer spacing="small" />
          </>
        )}
      />
      <Spacer spacing="extraLarge" />
    </>
  );
};

const PrivacyPolicyScreen = () => {
  return (
    <ScrollView>
      <Container>
        <Spacer spacing="large" />
        <Text type="header">Ocon Privacy Policy</Text>
        <Spacer />
        <Text type="body" bold>
          This privacy policy will explain how our organization uses the
          personal data we collect from you when you use our app.
        </Text>
        <Spacer />
        <FlatList
          scrollEnabled={false}
          data={[
            'What data do we collect?',
            'How do we collect your data?',
            'How will we use your data?',
            'How do we store your data?',
            'What are your data protection rights?',
            'What is local storage?',
            'What do we use local storage for?',
            'Changes to our privacy policy',
            'How to contact us'
          ]}
          renderItem={({ item }) => (
            <>
              <Text style={styles.item}>
                {'\u25CF' + ' '}
                {item}
              </Text>
              <Spacer spacing="small" />
            </>
          )}
        />
        <Spacer spacing="extraLarge" />
        <FlatList
          data={paragraphs}
          renderItem={({ item }) => (
            <Paragraph
              header={item.header}
              body={item.body}
              listItems={item.listItems}
            />
          )}
        />
      </Container>
    </ScrollView>
  );
};

const styles = StyleSheet.create({});

export default PrivacyPolicyScreen;
