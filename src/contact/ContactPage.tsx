import React from 'react';
import styled from 'styled-components/macro';
import { MaxWidthWrapper } from '../global/Common';
import { BurgerMenu } from '../components/BurgerMenu';
import { ExternalLink } from '../components/Link';
import { Navigation } from '../components/Navigation';
import {
  Page,
  PageTitle,
  PageLeftContentWrapper,
  PageRightContentWrapper,
  PageContent,
} from '../components/Page';
import { ContactResponse, getContact } from './contact.service';
import { stripHTMLTags } from '../utils/stringUtils';
import { black, white } from '../styles/colors';
import { ThemeType } from '../styles/themes';
import { fontFamily, Text } from '../styles/typography';

import imageBackgroundWood from '../assets/background-wood.jpg';
import { CONTACT_PATH } from '../global/pages';
import { sendPageView } from '../utils/analyticsUtils';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100%;
  background-color: ${black};
`;

const BackgroundImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.3;
`;

const Main = styled.main`
  display: flex;
  width: 100%;
  height: 100%;
`;

const DescriptionText = styled(Text)`
  & + & {
    margin-top: 18px;
  }
`;

const Subtitle = styled(Text)`
  margin: 24px 0 6px;
  font-weight: 600;
`;

const Addresses = styled.div`
  display: flex;

  @media only screen and (max-width: 480px) {
    flex-direction: column;
  }
`;

const AddressWrapper = styled.div`
  & + & {
    margin-left: 36px;

    @media only screen and (max-width: 1024px) {
      margin-left: 18px;
    }

    @media only screen and (max-width: 768px) {
      margin-left: 36px;
    }

    @media only screen and (max-width: 480px) {
      margin-left: 0;
      margin-top: 18px;
    }
  }
`;

const Address = styled.address`
  margin: 0;
  padding: 0;
  font-family: ${fontFamily.text};
  font-size: 13px;
  font-weight: 400;
  font-style: normal;
  color: ${white};
  white-space: pre;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const LogoImage = styled.img`
  width: 100px;
  height: auto;
  margin-top: 18px;
`;

type ContactData = ContactResponse;

export const ContactPage = () => {
  const [content, setContent] = React.useState<ContactData | undefined>(
    undefined
  );

  sendPageView(CONTACT_PATH);

  React.useEffect(() => {
    getContact()
      .then((contactData) => {
        setContent(contactData);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const contactTitle = content?.name || '';

  React.useEffect(() => {
    if (contactTitle) {
      document.title = contactTitle;
    }
  }, [contactTitle]);

  const picturePath = content?.textPage?.pictures?.[0]?.url;
  const contactDescriptionText = stripHTMLTags(
    content?.textPage?.bodyText || ''
  );

  const contacts = content?.contacts || [];

  return (
    <Page>
      <BackgroundImage
        src={imageBackgroundWood}
        alt="Background of Wood floor"
      />

      <Wrapper>
        <MaxWidthWrapper>
          <BurgerMenu themeType={ThemeType.THEME_DARK} />

          <Navigation themeType={ThemeType.THEME_DARK} />

          <Main>
            <PageLeftContentWrapper width="45%">
              <PageContent style={{ paddingRight: 0 }}>
                {contactTitle && <PageTitle>{contactTitle}</PageTitle>}

                {contactDescriptionText && (
                  <DescriptionText>{contactDescriptionText}</DescriptionText>
                )}

                {contacts.length > 0 && (
                  <Addresses>
                    {contacts.map((contact, index) => (
                      <AddressWrapper key={`contact-${index}`}>
                        {contact?.address && (
                          <React.Fragment>
                            <Subtitle>{contact.name}</Subtitle>
                            <Address>{contact.address}</Address>
                          </React.Fragment>
                        )}

                        {contact?.phone && (
                          <React.Fragment>
                            <Subtitle>Telephone</Subtitle>
                            <Text>{contact.phone}</Text>
                          </React.Fragment>
                        )}

                        {contact?.email && (
                          <React.Fragment>
                            <Subtitle>Email</Subtitle>
                            <Text>
                              <ExternalLink href={`mailto:${contact.email}`}>
                                {contact.email}
                              </ExternalLink>
                            </Text>
                          </React.Fragment>
                        )}

                        {contact?.logo && (
                          <LogoImage src={contact.logo.originalUrl} alt="" />
                        )}
                      </AddressWrapper>
                    ))}
                  </Addresses>
                )}
              </PageContent>
            </PageLeftContentWrapper>

            <PageRightContentWrapper width="55%">
              {picturePath && <Image src={picturePath} alt="" />}
            </PageRightContentWrapper>
          </Main>
        </MaxWidthWrapper>
      </Wrapper>
    </Page>
  );
};
