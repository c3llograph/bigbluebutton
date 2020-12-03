import React, { PureComponent } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Session } from 'meteor/session';
import CaptionsService from '/imports/ui/components/captions/service';
import Pad from './component';
import Auth from '/imports/ui/services/auth';

class PadContainer extends PureComponent {
  render() {
    const { children } = this.props;
    return <Pad {...this.props}>{children}</Pad>;
  }
}

//  TODO Here first of all Check what's locale on settings and

export default withTracker(() => {
  const locale = Session.get('captionsLocale');
  const caption = CaptionsService.getCaptions(locale);
  const { padId, ownerId, readOnlyPadId } = caption;
  console.log('padd running');
  console.log({ locale, caption });

  const { name } = caption ? caption.locale : '';

  return {
    locale,
    name,
    ownerId,
    padId,
    readOnlyPadId,
    currentUserId: Auth.userID,
    amIModerator: CaptionsService.amIModerator(),
  };
})(PadContainer);
