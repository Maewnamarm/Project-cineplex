import {
    Body,
    Button,
    Container,
    Head,
    Html,
    Preview,
    Section,
    Text,
  } from '@react-email/components';
  import * as React from 'react';
  import Image from 'next/image';
  
  interface GithubAccessTokenEmailProps {
    username?: string;
    otp: number;
  }
  
  const baseUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'https://demo.react.email';
  
  export const GithubAccessTokenEmail = ({ username, otp }: GithubAccessTokenEmailProps) => (
    <Html>
      <Head />
      <Body style={main}>
        <Preview>Your OTP Code</Preview>
        <Container style={container}>
          <Image src={`${baseUrl}/static/github.png`} width="32" height="32" alt="GitHub" />
  
          <Text style={title}>
            <strong>@{username}</strong>, here is your OTP code.
          </Text>
  
          <Section style={section}>
            <Text style={text}>Hello <strong>{username}</strong>,</Text>
            <Text style={text}>
              Your OTP code for verification is:
            </Text>
            <Text style={otpCode}>{otp}</Text>
  
            <Button style={button}>Verify Now</Button>
          </Section>
          
          <Text style={footer}>
            If you didn&apos;t request this, please ignore this email.
          </Text>
        </Container>
      </Body>
    </Html>
  );
  
  export default GithubAccessTokenEmail;
  
  const main = {
    backgroundColor: '#ffffff',
    color: '#24292e',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif',
  };
  
  const container = {
    maxWidth: '480px',
    margin: '0 auto',
    padding: '20px 0 48px',
  };
  
  const title = {
    fontSize: '24px',
    lineHeight: 1.25,
  };
  
  const section = {
    padding: '24px',
    border: 'solid 1px #dedede',
    borderRadius: '5px',
    textAlign: 'center' as const,
  };
  
  const text = {
    margin: '0 0 10px 0',
    textAlign: 'left' as const,
  };
  
  const otpCode = {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#d9534f',
    textAlign: 'center' as const,
    margin: '20px 0',
  };
  
  const button = {
    fontSize: '14px',
    backgroundColor: '#28a745',
    color: '#fff',
    lineHeight: 1.5,
    borderRadius: '0.5em',
    padding: '12px 24px',
  };
  
  const footer = {
    color: '#6a737d',
    fontSize: '12px',
    textAlign: 'center' as const,
    marginTop: '60px',
  };
  