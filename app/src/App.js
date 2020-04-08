import React from 'react';
import styled from 'styled-components';
import { useAragonApi } from '@aragon/api-react';
import { Main, Text, Info, Button } from '@aragon/ui';

import BelieversTable from './containers/BelieversTable';
import Believe from './containers/Believe';

function App() {
  const { api, appState } = useAragonApi();
  const { isSyncing } = appState;

  return (
    <Main>
      <AppContainer>
        <Header>
          <Text size="xlarge">cyber~Evangelists Dashboard</Text>
          <BelieveButton />
        </Header>
        {isSyncing && <Syncing />}
        <Intro title="Information">An application for cyber~Evangelists. This app lets anyone apply to be blessed to become an evangelist and make the web great again!
Acknowledged takeoff Evangelists will be eligible to 10% of all donations in ATOMs, which they have generated during the Game of Links and Game of Thrones and other perks like CYB rewards for certain actions.
Evangelist will empower the project and involve some bright minds into the bootstrap of the Superintelligence.
</Intro>
        <Believers />
      </AppContainer>
    </Main>
  );
}

const AppContainer = styled.div`
  padding: 0 60px;
`;

const Syncing = styled.div.attrs({ children: 'Syncing data…' })`
  position: absolute;
  top: 15px;
  right: 20px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 30px 0;
`;

const Intro = styled(Info)`
  margin-bottom: 40px;
`;

const BelieveButton = styled(Believe)`
  font-size: 16px;
  padding: 10px 40px;
`;

const Believers = styled(BelieversTable)`
  margin-top: 40px;
`;

export default App;
