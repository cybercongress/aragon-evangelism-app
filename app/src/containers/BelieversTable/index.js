import React from 'react';
import { useAragonApi } from '@aragon/api-react';
import { Text, DataView, Link } from '@aragon/ui';

const PAGINATION = 10;

function truncStringPortion(str, firstCharCount = str.length, endCharCount = 0, dotCount = 3) {
	var convertedStr="";
	convertedStr+=str.substring(0, firstCharCount);
	convertedStr += ".".repeat(dotCount);
	convertedStr+=str.substring(str.length-endCharCount, str.length);
	return convertedStr;
}

const statusMapping = ["Believed", "Blessed", "Unblessed"] 

function BelieversTable({ style = {}, ...props }) {
  const { appState } = useAragonApi();
  const { believers } = appState;

  return (
    <div style={{ wordBreak: 'break-all', ...style }} {...props}>
      {believers && believers.length > 0 && (
        <DataView
          fields={[
            { label: 'Nickname', align: 'start' },
            { label: 'Status', align: 'start' },
            { label: 'Cyber Address', align: 'start' },
            { label: 'Cosmos Address', align: 'start' },
            { label: 'Ethereum Address', align: 'start' },
            { label: 'Keybase', align: 'start' },
            { label: 'GitHub', align: 'start' },
          ]}
          entries={believers.map(l => [
            l.cyberAddress,
            l.cosmosAddress,
            l.ethereumAddress,
            l.nickname,
            l.keybase,
            l.github,
            l.status,
          ])}
          renderEntry={([cyberAddress, cosmosAddress, ethereumAddress, nickname, keybase, github, status]) => [
            <Text style={{}}>{nickname}</Text>,
            <Text style={{}}>{statusMapping[status]}</Text>,
            <Link
              style={{}}
              href={`https://cyber.page/network/euler/contract/${cyberAddress}`}
            >
              {truncStringPortion(cyberAddress, 9, 6, 3)}
            </Link>,
            <Link
              style={{}}
              href={`https://cosmos.bigdipper.live/account/${cosmosAddress}`}
            >
              {truncStringPortion(cosmosAddress, 10, 6, 3)}
            </Link>,
            <Link
              style={{}}
              href={`https://etherscan.io/address/${ethereumAddress}`}
            >
              {truncStringPortion(ethereumAddress, 6, 4, 3)}
            </Link>,
            <Link
              style={{}}
              href={`https://keybase.io/${keybase}`}
            >
              {keybase}
            </Link>,
            <Link
              style={{}}
              href={`https://github.com/${github}`}
            >
              {github}
            </Link>,
          ]}
          mode="table"
          entriesPerPage={PAGINATION}
        />
      )}
    </div>
  );
}

export default BelieversTable;
