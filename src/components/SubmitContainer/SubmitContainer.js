import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, FileUploaderButton } from 'carbon-components-react';
import fetch from 'isomorphic-fetch';
import models from '../../data/models.json';

export const SubmitContainer = ({
  isRecording,
  isSamplePlaying,
  isUploadPlaying,
  keywordText,
  modelName,
  onError,
  onStartPlayingFileUpload,
  onStopPlayingFileUpload,
  onStartPlayingSample,
  onStopPlayingSample,
  onStartRecording,
  onStopRecording,
  useSpeakerLabels,
}) => {
  const [keywordList, setKeywordList] = useState([]);
  useEffect(() => {
    let newKeywordList = [];
    if (keywordText.length > 0) {
      newKeywordList = keywordText.split(',').map(k => k.trim());
    }
    setKeywordList(newKeywordList);
  }, [keywordText]);

  const sampleModelInfo = models.find(model => model.name === modelName);
  const sampleModelFilename = sampleModelInfo ? sampleModelInfo.filename : null;

  const getBaseAudioConfig = async () => {
    let authResponse;
    let authJson;
    authResponse = await fetch('/api/auth');
    authJson = await authResponse.json();
    if (!authResponse.ok) {
      onError(authJson);
      return {
        error: authJson,
      };
    }

    let options = {};

    // We'll lowercase these so that we can ignore cases when highlighting keyword
    // occurrences later on.
    const lowerCasedKeywords = keywordList.map(keyword =>
      keyword.toLowerCase(),
    );

    options = {
      ...options,
      url: authJson.url || undefined,
      accessToken: authJson.accessToken,
      format: true,
      keywords: keywordList.length > 0 ? lowerCasedKeywords : undefined,
      keywordsThreshold: keywordList.length > 0 ? 0.01 : undefined,
      model: modelName,
      objectMode: true,
      play: true,
      realtime: true,
      resultsBySpeaker: useSpeakerLabels,
      speakerlessInterim: true,
      timestamps: true,
    };

    return options;
  };

  const getSampleAudioConfig = async () => {
    const baseConfig = await getBaseAudioConfig();
    return {
      ...baseConfig,
      file: `audio/${sampleModelFilename}`,
    };
  };

  const getMicrophoneAudioConfig = async () => {
    const baseConfig = await getBaseAudioConfig();
    return {
      ...baseConfig,
      resultsBySpeaker: false,
    };
  };

  const getUploadAudioConfig = async file => {
    const baseConfig = await getBaseAudioConfig();
    return {
      ...baseConfig,
      file,
      resultsBySpeaker: false,
    };
  };

  return (
    <div className="submit-container">
      {isSamplePlaying ? (
        <Button
          className="submit-button"
          kind="tertiary"
          onClick={onStopPlayingSample}
        >
          Stop audio sample
        </Button>
      ) : (
        <Button
          className="submit-button"
          disabled={!modelName}
          kind="tertiary"
          onClick={async () => {
            const config = await getSampleAudioConfig();
            if (!config.error) {
              onStartPlayingSample(config);
            }
          }}
        >
          Play audio sample
        </Button>
      )}
      {isRecording ? (
        <Button
          className="submit-button"
          kind="tertiary"
          onClick={onStopRecording}
        >
          Stop recording
        </Button>
      ) : (
        <Button
          className="submit-button"
          disabled={!modelName}
          kind="tertiary"
          onClick={async () => {
            const config = await getMicrophoneAudioConfig();
            if (!config.error) {
              onStartRecording(config);
            }
          }}
        >
          Record your own
        </Button>
      )}
      {isUploadPlaying ? (
        <Button
          className="submit-button"
          kind="tertiary"
          onClick={onStopPlayingFileUpload}
        >
          Stop playing
        </Button>
      ) : (
        <FileUploaderButton
          accept={['audio/wav', 'audio/mpeg', 'audio/flac', 'audio/opus']}
          buttonKind="tertiary"
          className="submit-button"
          disabled={!modelName}
          disableLabelChanges
          labelText="Upload file"
          onChange={async evt => {
            const uploadedFile = evt.currentTarget.files[0];
            const config = await getUploadAudioConfig(uploadedFile);
            if (!config.error) {
              onStartPlayingFileUpload(config);
            }
          }}
        />
      )}
    </div>
  );
};

SubmitContainer.propTypes = {
  isRecording: PropTypes.bool,
  isSamplePlaying: PropTypes.bool,
  isUploadPlaying: PropTypes.bool,
  keywordText: PropTypes.string,
  modelName: PropTypes.string,
  onError: PropTypes.func,
  onStartPlayingFileUpload: PropTypes.func,
  onStopPlayingFileUpload: PropTypes.func,
  onStartPlayingSample: PropTypes.func,
  onStopPlayingSample: PropTypes.func,
  onStartRecording: PropTypes.func,
  onStopRecording: PropTypes.func,
  useSpeakerLabels: PropTypes.bool,
};

SubmitContainer.defaultProps = {
  isRecording: false,
  isSamplePlaying: false,
  isUploadPlaying: false,
  keywordText: '',
  modelName: null,
  onError: () => {},
  onStartPlayingFileUpload: () => {},
  onStopPlayingFileUpload: () => {},
  onStartPlayingSample: () => {},
  onStopPlayingSample: () => {},
  onStartRecording: () => {},
  onStopRecording: () => {},
  useSpeakerLabels: false,
};

export default SubmitContainer;
