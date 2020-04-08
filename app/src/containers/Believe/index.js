import React, { useState } from 'react';
import { useAragonApi } from '@aragon/api-react';
import { Button } from '@aragon/ui';

import BelieveSidePanel from '../../components/BelieveSidePanel';

function Believe({ containerStyle, ...props }) {
  const [sidePanelOpened, setSidePanelOpened] = useState(false);
  const { api } = useAragonApi();

  return (
    <div style={containerStyle}>
      <Button
        mode="strong"
        onClick={() => setSidePanelOpened(true)}
        {...props}
      >
        Believe
      </Button>
      <BelieveSidePanel
        opened={sidePanelOpened}
        onClose={() => setSidePanelOpened(false)}
        onSubmit={(
            cyber,
            cosmos,
            nickname,
            keybase,
            github,
          ) => {
            setSidePanelOpened(false);
            api.believe(
              cyber,
              cosmos,
              nickname,
              keybase,
              github,
              { value: 10101000000000000 }
            ).toPromise();
        }}
      />
    </div>
  );
}

export default Believe;
