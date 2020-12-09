import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Session } from 'meteor/session';
import CaptionsService from '/imports/ui/components/captions/service';
import Auth from '/imports/ui/services/auth';
import CustomDictationButton from './component';

function container(props) {
  return <CustomDictationButton {...props} />;
}

export default withTracker(() => {
  const locale = Session.get('captionsLocale');
  const caption = CaptionsService.getCaptions(locale);
  const { padId, ownerId, readOnlyPadId } = caption;
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
})(container);
