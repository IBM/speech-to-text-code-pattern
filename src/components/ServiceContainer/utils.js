const AUDIO_VISUALIZATION_DIMENSIONS = {
  DATA_POINT_WIDTH: 1,
  DATA_POINT_HEIGHT: 50,
  DATA_POINT_MARGIN: 2,
  DATA_POINT_X_OFFSET: 25,
  DATA_POINT_Y_OFFSET: 50,
};

const readFileToArrayBuffer = fileData => {
  const fileReader = new FileReader();

  return new Promise((resolve, reject) => {
    fileReader.onload = () => {
      const arrayBuffer = fileReader.result;
      resolve(arrayBuffer);
    };

    fileReader.onerror = () => {
      fileReader.abort();
      reject(new Error('failed to process file'));
    };

    // Initiate the conversion.
    fileReader.readAsArrayBuffer(fileData);
  });
};

export const formatStreamData = data => {
  const { results, result_index: resultIndex } = data;

  let finalKeywords = [];
  const finalTranscript = [];
  let isFinal = false;

  results.forEach(result => {
    const { final } = result;
    let alternatives = null;
    let speaker = null;
    let keywords_result = null;

    if (final) {
      ({ alternatives, speaker, keywords_result } = result);
    } else {
      ({ alternatives, speaker } = result);
    }

    // Extract the main alternative to get keywords.
    const [mainAlternative] = alternatives;
    const { transcript } = mainAlternative;

    if (speaker === undefined) {
      speaker = null;
    }

    // Push object to final transcript.
    finalTranscript.push({
      final,
      speaker,
      text: transcript,
    });

    isFinal = final;

    // Push keywords to final keyword list.
    if (keywords_result) {
      finalKeywords.push(keywords_result);
    }
  });

  return {
    transcript: finalTranscript,
    keywordInfo: finalKeywords,
    resultIndex,
    final: isFinal,
  };
};

export const convertAudioBlobToVisualizationData = async (
  audioBlob,
  audioCtx,
  audioWaveContainerWidth,
) => {
  const audioArrayBuffer = await readFileToArrayBuffer(audioBlob);
  const audioUint8Array = new Uint8Array(audioArrayBuffer.slice(0));

  // NOTE: BaseAudioContext.decodeAudioData has a promise syntax
  // which we are unable to use in order to be compatible with Safari.
  // Therefore, we wrap the callback syntax in a promise to give us the same
  // effect while ensuring compatibility
  // see more: https://developer.mozilla.org/en-US/docs/Web/API/BaseAudioContext/decodeAudioData#Browser_compatibility
  return new Promise((resolve, reject) => {
    audioCtx.decodeAudioData(
      audioArrayBuffer,
      audioDataBuffer => {
        const { duration } = audioDataBuffer;

        const { DATA_POINT_MARGIN } = AUDIO_VISUALIZATION_DIMENSIONS;
        const validContainerWidth =
          audioWaveContainerWidth - DATA_POINT_MARGIN * 2;
        const numberOfChunks = Math.floor(validContainerWidth / 2);
        const chunkSize = audioUint8Array.length / numberOfChunks;

        const chunkedAudioDataArray = [];
        for (let i = 1; i < numberOfChunks; i += 1) {
          let previousIndex = i - 1;
          if (previousIndex < 0) {
            previousIndex = 0;
          }

          chunkedAudioDataArray.push(
            audioUint8Array.slice(previousIndex * chunkSize, i * chunkSize),
          );
        }

        const reducedFloatArray = chunkedAudioDataArray.map(chunk => {
          const totalValue = chunk.reduce(
            (prevValue, currentValue) => prevValue + currentValue,
          );
          const floatValue = totalValue / (chunkSize * 255);
          return floatValue;
        });

        resolve({
          duration,
          reducedFloatArray,
        });
      },
      () => {
        reject(new Error('failed to chunk audio'));
      },
    );
  });
};
