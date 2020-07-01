import React from 'react';
import { Button, Link } from 'carbon-components-react';
import { default as Api124 } from '@carbon/icons-react/lib/API--1/24';
import Document24 from '@carbon/icons-react/lib/document/24';
import IbmCloud24 from '@carbon/icons-react/lib/ibm-cloud/24';
import Launch16 from '@carbon/icons-react/lib/launch/16';
import LogoGithub24 from '@carbon/icons-react/lib/logo--github/24';
import Header from './components/Header';
import ServiceContainer from './components/ServiceContainer';
import useScript from './hooks/useScript';

const HEADER_TITLE = 'Watson Speech to Text';
const HEADER_DESCRIPTION =
  'IBM Watson Speech to Text is a cloud-native API that transforms voice into written text.';
const HEADER_LINKS = [
  <Link
    className="link"
    key="api-link"
    target="_blank"
    rel="noopener noreferrer"
    href="https://cloud.ibm.com/apidocs/speech-to-text"
  >
    <p className="link-text">API reference</p>
    <Api124 className="link-icon" />
  </Link>,
  <Link
    className="link"
    key="docs-link"
    target="_blank"
    rel="noopener noreferrer"
    href="https://cloud.ibm.com/docs/services/speech-to-text?topic=speech-to-text-gettingStarted"
  >
    <p className="link-text">Documentation</p>
    <Document24 className="link-icon" />
  </Link>,
  <Link
    className="link"
    key="github-link"
    target="_blank"
    rel="noopener noreferrer"
    href="https://github.com/IBM/speech-to-text-code-pattern"
  >
    <p className="link-text">GitHub</p>
    <LogoGithub24 className="link-icon" />
  </Link>,
  <Link
    className="link getting-started"
    key="ibm-cloud-link"
    target="_blank"
    rel="noopener noreferrer"
    href="https://cloud.ibm.com/registration?target=%2Fcatalog%2Fservices%2Fspeech-to-text%3FhideTours%3Dtrue%26cm_mmc%3D-_-Watson%2BCore_Watson%2BCore%2B-%2BPlatform-_-WW_WW-_-wdc-ref%26cm_mmc%3D-_-Watson%2BCore_Watson%2BCore%2B-%2BPlatform-_-WW_WW-_-wdc-ref%26cm_mmca1%3D000000OF%26cm_mmca2%3D10000409&_ga=2.158846578.918027017.1572271296-1405764752.1539884377&_gac=1.250083700.1571850605.Cj0KCQjw3JXtBRC8ARIsAEBHg4m4g1PSkKQRoI6YUe4A-6ysul0ziiWU0DVbqlbWAQpq3721u-bxkd0aAkV3EALw_wcB&cm_mc_uid=83381689395615475202389&cm_mc_sid_50200000=82214471572470185115&cm_mc_sid_52640000=21949701572470185117&cm_mmc=Earned-_-Watson%20Core%20-%20Platform-_-WW_WW-_-intercom&cm_mmca1=000000OF&cm_mmca2=10000409"
  >
    <Button className="link-button" kind="tertiary" renderIcon={Launch16}>
      Start for free on IBM Cloud
    </Button>
    <IbmCloud24 className="link-icon" />
  </Link>,
];

export const App = () => {
  useScript(
    'https://cdn.jsdelivr.net/gh/watson-developer-cloud/watson-developer-cloud.github.io@master/analytics.js',
  );

  return (
    <div className="app-container">
      <Header
        description={HEADER_DESCRIPTION}
        links={HEADER_LINKS}
        title={HEADER_TITLE}
      />
      <ServiceContainer />
    </div>
  );
};

export default App;
