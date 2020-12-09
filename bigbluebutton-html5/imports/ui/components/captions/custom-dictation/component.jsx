import React, { useState } from 'react';
import CaptionsService from '/imports/ui/components/captions/service';
import logger from '/imports/startup/client/logger';

function component({ locale, ownerId, name, amIModerator }) {
  const [listening, setListening] = useState(false);
  const recognition = CaptionsService.initSpeechRecognition(locale);

  const toggleListen = () => {
    setListening(!listening);
    console.log({ listening });
    handleListen();
  };

  const handleListen = () => {
    if (listening) {
      recognition.start();
      console.log('Dictation STarted');
    } else {
      recognition.stop();
    }

    let finalTranscript = '';

    recognition.onresult = (event) => {
      const { resultIndex, results } = event;
      let interimTranscript = '';
      for (let i = resultIndex; i < results.length; i += 1) {
        const { transcript } = event.results[i][0];
        if (results[i].isFinal) finalTranscript += `${transcript} `;
        else interimTranscript += transcript;

        const newEntry = finalTranscript !== '';

        if (newEntry) {
          const text = finalTranscript.trimRight();
          console.log({ text });
          CaptionsService.appendText(text, locale);
          finalTranscript = '';
        }
      }
    };

    recognition.onerror = (event) => {
      logger.error(
        {
          logCode: 'captions_recognition',
          extraInfo: { error: event.error },
        },
        'Captions pad error on recognition'
      );
    };
  };

  return (
    <>
      {CaptionsService.canIDictateThisPad(ownerId) ? (
        <button onClick={toggleListen} type="button" disabled={!recognition}>
          {listening ? 'Stop Dictation' : 'Start Dictation'}
        </button>
      ) : null}
      {console.log(recognition)}
    </>
  );
}

export default component;
