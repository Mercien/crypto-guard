
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

interface UserConfirmationProps {
  email: string;
}

export const UserConfirmation = ({
  email,
}: UserConfirmationProps) => (
  <Html>
    <Head />
    <Preview>Wallet Security Assessment Confirmation</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>Thank You for Your Submission</Heading>
        <Text style={text}>
          Dear User,
        </Text>
        <Text style={text}>
          We have received your wallet information for security assessment. Our team will carefully review your submission and ensure your wallet's security.
        </Text>
        <Text style={text}>
          You will receive a detailed security report once our assessment is complete.
        </Text>
        <Text style={notice}>
          For security reasons, please do not share your wallet credentials with anyone else.
        </Text>
      </Container>
    </Body>
  </Html>
)

export default UserConfirmation

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
  margin: '0 0 15px',
}

const notice = {
  color: '#e11d48',
  fontFamily: '-apple-system, system-ui, BlinkMacSystemFont, sans-serif',
  fontSize: '14px',
  lineHeight: '1.5',
  margin: '20px 0 0',
  padding: '15px',
  backgroundColor: '#fee2e2',
  borderRadius: '4px',
}
