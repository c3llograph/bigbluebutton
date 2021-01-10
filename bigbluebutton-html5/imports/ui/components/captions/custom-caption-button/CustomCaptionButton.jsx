import React from 'react';
import ActionsBarService from '/imports/ui/components/actions-bar/service';
import { withModalMounter } from '/imports/ui/components/modal/service';
import CaptionsWriterMenu from '/imports/ui/components/captions/writer-menu/container';
import Auth from '/imports/ui/services/auth';
import Users from '/imports/api/users';
import { makeCall } from '/imports/ui/services/api';
import { styles } from './styles';

const USER_CONFIG = Meteor.settings.public.user;
const ROLE_MODERATOR = USER_CONFIG.role_moderator;
const DIAL_IN_USER = 'dial-in-user';

// const amIModerator = ActionsBarService.amIModerator();

function CustomCaptionButton(props) {
  const handleCaptionsClick = () => {
    const { mountModal } = props;
    mountModal(<CaptionsWriterMenu />);
  };

  const amIPresenter = () => {
    let user = Users.findOne({ userId: Auth.userID }, { fields: { role: 1 } });

    let isPresenter = user.role === ROLE_MODERATOR;

    return isPresenter;
  };

  return (
    <>
      {amIPresenter() ? (
        <button
          className={styles.ccbtnclient}
          type="button"
          onClick={handleCaptionsClick}
        >
          CC
        </button>
      ) : null}
    </>
  );
}

export default withModalMounter(CustomCaptionButton);
