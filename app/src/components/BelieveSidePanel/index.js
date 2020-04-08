import React, { useState } from 'react';
import styled from 'styled-components';
import { SidePanel, Button, TextInput, Text, theme } from '@aragon/ui';

function BelieveSidePanel({ opened, onClose, onSubmit }) {
  const [cyber, setCyber] = useState('');
  const [cosmos, setCosmos] = useState('');
  const [nickname, setNickname] = useState('');
  const [keybase, setKeybase] = useState('');
  const [github, setGithub] = useState('')

  return (
    <SidePanel title="Believe in Cyber" opened={opened} onClose={onClose}>
      <AccountTitle size="xsmall" color={theme.textSecondary}>
        Cyber address <span style={{ color: theme.accent }}>*</span>
      </AccountTitle>
      <AccountInput
        type="text"
        value={cyber}
        onChange={e => setCyber(e.target.value)}
      />
      <AccountTitle size="xsmall" color={theme.textSecondary}>
        Cosmos address <span style={{ color: theme.accent }}>*</span>
      </AccountTitle>
      <AccountInput
        type="text"
        value={cosmos}
        onChange={e => setCosmos(e.target.value)}
      />
      <AccountTitle size="xsmall" color={theme.textSecondary}>
        Nickname <span style={{ color: theme.accent }}>*</span>
      </AccountTitle>
      <AccountInput
        type="text"
        value={nickname}
        onChange={e => setNickname(e.target.value)}
      />
      <AccountTitle size="xsmall" color={theme.textSecondary}>
        Keybase nickname <span style={{ color: theme.accent }}>*</span>
      </AccountTitle>
      <AccountInput
        type="text"
        value={keybase}
        onChange={e => setKeybase(e.target.value)}
      />
      <AccountTitle size="xsmall" color={theme.textSecondary}>
        Github nickname <span style={{ color: theme.accent }}>*</span>
      </AccountTitle>
      <AccountInput
        type="text"
        value={github}
        onChange={e => setGithub(e.target.value)}
      />
      <Button
        mode="strong"
        onClick={() => onSubmit(
          cyber,
          cosmos,
          nickname,
          keybase,
          github,
        )}
      >
        Believe
      </Button>
    </SidePanel>
  );
}

const AccountTitle = styled(Text)`
  margin-top: 10px;
`;

const AccountInput = styled(TextInput)`
  margin-bottom: 30px;
`;

export default BelieveSidePanel;
