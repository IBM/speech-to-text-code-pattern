export const actionTypes = {
  setAudioAnalyzer: 'SET_AUDIO_ANALYZER',
  setAudioContext: 'SET_AUDIO_CONTEXT',
  setAudioSource: 'SET_AUDIO_SOURCE',
  setAudioStream: 'SET_AUDIO_STREAM',
  setAudioVisualizationData: 'SET_AUDIO_VISUALIZATION_DATA',
  setError: 'SET_ERROR',
  setSpeakerLabels: 'SET_SPEAKER_LABELS',
  setIsRecording: 'SET_IS_RECORDING',
  setIsSamplePlaying: 'SET_IS_SAMPLE_PLAYING',
  setIsTranscribing: 'SET_IS_TRANSCRIBING',
  setIsUploadPlaying: 'SET_IS_UPLOAD_PLAYING',
  updateResults: 'UPDATE_RESULTS',
};

export const initialState = {
  audioAnalyzer: {},
  audioContext: null,
  audioDataArray: [],
  audioDurationInMs: 0,
  audioSource: '',
  audioStream: null,
  error: null,
  isRecording: false,
  isSamplePlaying: false,
  isTranscribing: false,
  isUploadPlaying: false,
  keywordInfo: [],
  speakerLabels: [],
  transcript: [],
};

export const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_AUDIO_ANALYZER': {
      return {
        ...state,
        audioAnalyzer: action.audioAnalyzer,
      };
    }
    case 'SET_AUDIO_CONTEXT': {
      return {
        ...state,
        audioContext: action.audioContext,
      };
    }
    case 'SET_AUDIO_SOURCE': {
      return {
        ...state,
        audioSource: action.audioSource,
      };
    }
    case 'SET_AUDIO_STREAM': {
      return {
        ...state,
        audioStream: action.audioStream,
      };
    }
    case 'SET_AUDIO_VISUALIZATION_DATA': {
      return {
        ...state,
        audioDataArray: action.audioDataArray,
        audioDurationInMs: action.audioDurationInMs,
      };
    }
    case 'SET_ERROR': {
      return {
        ...state,
        error: action.error,
      };
    }
    case 'SET_IS_RECORDING': {
      return {
        ...state,
        isRecording: action.isRecording,
      };
    }
    case 'SET_IS_SAMPLE_PLAYING': {
      return {
        ...state,
        isSamplePlaying: action.isSamplePlaying,
      };
    }
    case 'SET_IS_TRANSCRIBING': {
      return {
        ...state,
        isTranscribing: action.isTranscribing,
      };
    }
    case 'SET_IS_UPLOAD_PLAYING': {
      return {
        ...state,
        isUploadPlaying: action.isUploadPlaying,
      };
    }
    case 'SET_SPEAKER_LABELS': {
      return {
        ...state,
        speakerLabels: action.speakerLabels,
      };
    }
    case 'UPDATE_RESULTS': {
      let updatedTranscript = [...state.transcript];
      if (action.resultIndex === 0) {
        updatedTranscript = action.transcript;
      } else {
        updatedTranscript[action.resultIndex] = action.transcript[0];
      }

      return {
        ...state,
        keywordInfo: action.keywordInfo,
        transcript: updatedTranscript,
      };
    }
    default: {
      throw new Error();
    }
  }
};
