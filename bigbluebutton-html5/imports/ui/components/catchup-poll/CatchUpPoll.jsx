import React, { Fragment, useEffect, useState } from 'react';
import { withModalMounter } from '../modal/service';
import Auth from '/imports/ui/services/auth';
import Users from '/imports/api/users';
import Modal from '/imports/ui/components/modal/simple/component';
import { styles } from './styles';
import Button from '/imports/ui/components/button/component';
import axios from 'axios';

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
    // await axios({
    //   url: 'http://localhost:5957/catchupgraphql',
    //   method: 'post',
    //   data: {
    //     query: `
    //     mutation {
    //       createVote(data: {
    //         meetingid: ${data.meetingID},
    //         name: ${data.name},
    //         vote: ${data.vote}
    //       }) {
    //         id
    //         name
    //         vote
    //       }
    //     }
    //       `,
    //   },
    // }).then((result) => {
    //   console.log(result.data);
    // });
  };
  const amIPresenter = () => {
    let user = Users.findOne({ userId: Auth.userID }, { fields: { role: 1 } });
    console.log(user);
    let isPresenter = user.role === ROLE_MODERATOR;

    return isPresenter;
  };

  useEffect(() => {
    setShow(true);
  }, []);
  return (
    <Fragment>
      {show && (
        <Fragment>
          {amIPresenter() ? (
            <div style={{ width: '50px', display: 'flex', background: '#fff' }}>
              <p>Feedback:</p>
              <button
                className={styles.ccbtnclient}
                type="button"
                onClick={async (e) =>
                  await handleFeedback(e, {
                    vote: 'YES',
                    meetingID: '',
                    name: '',
                  })
                }
              >
                Liked
              </button>
              <button
                className={styles.ccbtnclient}
                type="button"
                onClick={async (e) =>
                  await handleFeedback(e, {
                    vote: 'YES',
                  })
                }
              >
                Liked
              </button>
            </div>
          ) : (
            <div style={{ width: '50px', display: 'flex', background: '#fff' }}>
              <p>Feedback:</p>
              <button
                className={styles.ccbtnclient}
                type="button"
                onClick={async (e) =>
                  await handleFeedback(e, {
                    vote: 'YES',
                    meetingID: '',
                    name: '',
                  })
                }
              >
                Liked
              </button>
              <button
                className={styles.ccbtnclient}
                type="button"
                onClick={async (e) =>
                  await handleFeedback(e, {
                    vote: 'YES',
                  })
                }
              >
                Liked
              </button>
            </div>
          )}
        </Fragment>
      )}
    </Fragment>
  );
}

export default CatchUpPoll;
