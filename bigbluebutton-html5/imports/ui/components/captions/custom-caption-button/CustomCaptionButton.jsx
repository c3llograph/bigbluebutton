import React from 'react';
import ActionsBarService from '/imports/ui/components/actions-bar/service';
import { withModalMounter } from '/imports/ui/components/modal/service';
import CaptionsWriterMenu from '/imports/ui/components/captions/writer-menu/container';

const amIModerator = ActionsBarService.amIModerator();

function CustomCaptionButton(props) {
  const handleCaptionsClick = () => {
    const { mountModal } = props;
    mountModal(<CaptionsWriterMenu />);
  };
  return (
    <button type="button" onClick={handleCaptionsClick}>
      Start CC
    </button>
  );
}

export default withModalMounter(CustomCaptionButton);
