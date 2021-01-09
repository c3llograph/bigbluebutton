import React, { Fragment, useState } from 'react';
import { withModalMounter } from '../modal/service';
import Auth from '/imports/ui/services/auth';
import Users from '/imports/api/users';
import Modal from '/imports/ui/components/modal/simple/component';
import { styles } from './styles';
import Button from '/imports/ui/components/button/component';

const VotePresentationModal = ({ vote, setVote }) => {
  const handleVoteSubmit = (e) => {
    e.preventDefault();
    console.log(vote);
  };
  return (
    <Modal
      overlayClassName={styles.overlay}
      className={styles.modal}
      onRequestClose={closeModal}
      hideBorder
    >
      <header className={styles.header}>
        <h3 className={styles.title}>{'Feedback!'}</h3>
      </header>
      <form onSubmit={handleVoteSubmit}>
        <select name="vote" onChange={(e) => setVote(e.target.value)}>
          <option value="YES">Liked it!</option>
          <option value="AVG">Average!</option>
          <option value="NO">Didn't like it!</option>
        </select>
        <button>Vote</button>
      </form>
    </Modal>
  );
};

function CatchUpPoll(props) {
  const [vote, setVote] = useState('');
  const handleFeedbackModal = () => {
    const { mountModal } = props;
    mountModal(<VotePresentationModal />);
  };
  const amIPresenter = () => {
    let user = Users.findOne({ userId: Auth.userID }, { fields: { role: 1 } });

    let isPresenter = user.role === ROLE_MODERATOR;

    return isPresenter;
  };
  return (
    <Fragment>
      {amIPresenter() ? null : (
        <button
          className={styles.ccbtnclient}
          type="button"
          onClick={handleFeedbackModal}
        >
          Vote
        </button>
      )}
    </Fragment>
  );
}

export default withModalMounter(CatchUpPoll);
