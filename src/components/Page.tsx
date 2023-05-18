import React from 'react';
import styled from 'styled-components/macro';
import { MainTitle } from '../styles/typography';

export const PageWrapper = styled.div`
  width: 100%;
  height: 100%;
`;

export const PageTitle = styled(MainTitle)<{ color?: string }>`
  margin-bottom: 24px;
  font-size: 48px;
  font-weight: 400;
  line-height: 1.1;
  letter-spacing: 0;
  text-align: left;
  ${(props) => props.color && `color: ${props.color};`};

  @media only screen and (max-width: 1024px) {
    font-size: 42px;
    letter-spacing: 1px;
  }

  @media only screen and (max-width: 768px) {
    font-size: 32px;
    letter-spacing: 1px;
  }
`;

export const PageContentWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 100px 0 0 0;

  @media only screen and (max-width: 480px) {
    padding-top: 64px;
  }
`;

export const PageLeftContentWrapper = styled(PageContentWrapper)<{
  width?: string;
}>`
  width: ${(props) => props?.width || '40%'};
  padding-left: 72px;

  @media only screen and (max-width: 768px) {
    width: 100%;
    padding-bottom: 72px;
    padding-right: 72px;
  }

  @media only screen and (max-width: 480px) {
    padding-left: 24px;
    padding-right: 24px;
  }
`;

export const PageRightContentWrapper = styled(PageContentWrapper)<{
  width?: string;
}>`
  width: ${(props) => props?.width || '60%'};
  padding: 100px 108px 108px 36px;

  @media only screen and (max-width: 768px) {
    display: none;
  }
`;

export const PageContent = styled.div`
  flex: 1 1 auto;
  overflow-y: auto;
  height: 0px;
  padding: 20px 36px 36px 36px;

  @media only screen and (max-width: 480px) {
    padding-left: 0;
    padding-right: 0;
  }
`;

type PageProps = {
  children: React.ReactNode;
};

export const Page = ({ children }: PageProps) => {
  return <PageWrapper>{children}</PageWrapper>;
};
