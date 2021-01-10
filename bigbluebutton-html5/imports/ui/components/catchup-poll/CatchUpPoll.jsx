import React, { Fragment, useEffect, useState } from 'react';
import { withModalMounter } from '../modal/service';
import Auth from '/imports/ui/services/auth';
import Users from '/imports/api/users';
import Modal from '/imports/ui/components/modal/simple/component';
import { styles } from './styles';
import Button from '/imports/ui/components/button/component';
import axios from 'axios';
import UserInfos from '/imports/api/users-infos';

const VotePresentationModal = (props) => {
  //   const [vote, setVote] = useState('');

  const handleVoteSubmit = (e) => {
    e.preventDefault();
    console.log(e.target.value);
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
        <select name="vote" onChange={(e) => console.log(e.target.value)}>
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
  const [show, setShow] = useState(false);

  const handleFeedback = async (e, data) => {
    console.log(data);
    await axios({
      url: 'https://bbb2.pressply.site/catchupgraphql',
      method: 'post',
      data: {
        query: `
        mutation {
          createVote(data: {
            meetingid: "${data.meetingID}",
            name: "${data.name}",
            vote: "${data.vote}"
          }) {
            vote
          }
        }
          `,
      },
    })
      .then((result) => {
        console.log(result.data);
      })
      .catch((err) => console.log(err));
  };
  const amIPresenter = () => {
    let user = Users.findOne({ userId: Auth.userID }, { fields: { role: 1 } });
    console.log(user);
    let isPresenter = user.role === ROLE_MODERATOR;

    return isPresenter;
  };

  // amIPresenter();

  useEffect(() => {
    console.log({
      meet: Auth.meetingID,
      requesterUserId: Auth.userID,
    });
    console.log(Auth);
    const UserInfo = UserInfos.find({
      meetingId: Auth.meetingID,
      requesterUserId: Auth.userID,
    }).fetch();
    console.log({ UserInfo });
    setShow(true);
  }, []);
  return (
    <Fragment>
      {show && (
        <div className={styles.voteDiv}>
          <p>Vote Now:</p>
          <button
            className={styles.voteYes}
            type="button"
            onClick={async (e) =>
              await handleFeedback(e, {
                vote: 'YES',
                meetingID: Auth.meetingID,
                name: Auth.fullname,
              })
            }
          >
            Yes
          </button>
          <button
            className={styles.voteNo}
            type="button"
            onClick={async (e) =>
              await handleFeedback(e, {
                vote: 'NO',
              })
            }
          >
            No
          </button>
        </div>
      )}
    </Fragment>
  );
}

export default CatchUpPoll;
