import React from 'react';
import PropTypes from 'prop-types';

const DATA_POINT_WIDTH = 1;
const DATA_POINT_HEIGHT = 50;
const DATA_POINT_MARGIN = 2;
const DATA_POINT_Y_OFFSET = 50;

export class AudioWave extends React.Component {
  constructor(props) {
    super(props);

    this.audioWaveCanvasRef = React.createRef();
    this.audioWaveCanvasCtx = null;
    this.animationFrameId = null;

    this.draw = this.draw.bind(this);

    this.state = {
      startingTimestamp: 0,
      microphoneData: new Uint8Array(1024),
    };
  }

  componentDidMount() {
    this.audioWaveCanvasCtx = this.audioWaveCanvasRef.current.getContext('2d');
    this.audioWaveCanvasCtx.lineCap = 'round';
    this.initializeCanvasDimensions();
  }

  componentDidUpdate(prevProps) {
    const [firstPrevValue] = prevProps.data;
    const [firstCurrentValue] = this.props.data;

    if (firstPrevValue !== firstCurrentValue) {
      this.drawInitialAudioWave();
    }

    if (
      prevProps.isTranscribing === false &&
      this.props.isTranscribing === true
    ) {
      this.setStartingTimestamp();
      this.draw();
    } else if (
      prevProps.isTranscribing === true &&
      this.props.isTranscribing === false
    ) {
      this.stopDrawing();
    }
  }

  setStartingTimestamp() {
    this.setState({ startingTimestamp: Date.now() });
  }

  initializeCanvasDimensions() {
    const canvasCtx = this.audioWaveCanvasRef.current;
    const audioWaveContainer = this.props.audioWaveContainerRef.current;

    canvasCtx.width = audioWaveContainer.clientWidth;
    canvasCtx.height = 100;
  }

  drawInitialAudioWave() {
    this.resetCanvasForNewFrame();
    this.drawEmptyDataPoints();
  }

  drawEmptyDataPoints() {
    const { data } = this.props;
    data.forEach((dataPoint, i) => {
      this.audioWaveCanvasCtx.beginPath();

      this.audioWaveCanvasCtx.fillStyle = 'rgba(0, 98, 255, 0.5)';
      this.audioWaveCanvasCtx.fillRect(
        i * DATA_POINT_MARGIN, // x position
        DATA_POINT_Y_OFFSET, // y position
        DATA_POINT_WIDTH, // rect width
        DATA_POINT_HEIGHT * dataPoint, // rect height
      );
      this.audioWaveCanvasCtx.fillRect(
        i * DATA_POINT_MARGIN, // x position
        DATA_POINT_Y_OFFSET, // y position
        DATA_POINT_WIDTH, // rect width
        -DATA_POINT_HEIGHT * dataPoint, // rect height
      );
      this.audioWaveCanvasCtx.stroke();
      this.audioWaveCanvasCtx.closePath();
    });
  }

  drawMicrophoneDataPoints() {
    this.props.audioAnalyzer.getByteFrequencyData(this.state.microphoneData);

    const { microphoneData } = this.state;
    const arrayData = [].slice.call(microphoneData);
    const floatArray = arrayData.map(n => n / 255);

    floatArray.forEach((dataPoint, i) => {
      this.audioWaveCanvasCtx.beginPath();

      this.audioWaveCanvasCtx.fillStyle = 'rgba(0, 98, 255, 1)';
      this.audioWaveCanvasCtx.fillRect(
        i * DATA_POINT_MARGIN, // x position
        DATA_POINT_Y_OFFSET, // y position
        DATA_POINT_WIDTH, // rect width
        DATA_POINT_HEIGHT * dataPoint, // rect height
      );
      this.audioWaveCanvasCtx.fillRect(
        i * DATA_POINT_MARGIN, // x position
        DATA_POINT_Y_OFFSET, // y position
        DATA_POINT_WIDTH, // rect width
        -DATA_POINT_HEIGHT * dataPoint, // rect height
      );
      this.audioWaveCanvasCtx.stroke();
      this.audioWaveCanvasCtx.closePath();
    });
  }

  drawAudioDataPoints() {
    const { data, duration } = this.props;

    // Make time calculations.
    const now = Date.now();
    const { startingTimestamp } = this.state;
    const timeElapsed = now - startingTimestamp;
    const audioProgressPercent = timeElapsed / duration;

    // Draw the audio lines.
    const numberOfDataPoints = data.length;
    const highlightIndex = numberOfDataPoints * audioProgressPercent;

    const wholeHighlightIndex = Math.floor(highlightIndex);
    let decimalOpacityIndex = highlightIndex - wholeHighlightIndex;

    if (decimalOpacityIndex > 1) {
      decimalOpacityIndex = 1;
    }

    if (decimalOpacityIndex < 0.5) {
      decimalOpacityIndex = 0.5;
    }

    data.forEach((dataPoint, i) => {
      this.audioWaveCanvasCtx.beginPath();

      let fillColor = 'rgba(0, 98, 255, 1)';
      if (i > wholeHighlightIndex) {
        fillColor = 'rgba(0, 98, 255, 0.5)';
      }

      if (i - 1 === wholeHighlightIndex) {
        fillColor = `rgba(0, 98, 255, ${decimalOpacityIndex.toFixed(2)})`;
      }

      this.audioWaveCanvasCtx.fillStyle = fillColor;
      this.audioWaveCanvasCtx.fillRect(
        i * DATA_POINT_MARGIN, // x position
        DATA_POINT_Y_OFFSET, // y position
        DATA_POINT_WIDTH, // rect width
        DATA_POINT_HEIGHT * dataPoint, // rect height
      );
      this.audioWaveCanvasCtx.fillRect(
        i * DATA_POINT_MARGIN, // x position
        DATA_POINT_Y_OFFSET, // y position
        DATA_POINT_WIDTH, // rect width
        -DATA_POINT_HEIGHT * dataPoint, // rect height
      );
      this.audioWaveCanvasCtx.stroke();
      this.audioWaveCanvasCtx.closePath();
    });
  }

  draw() {
    this.resetCanvasForNewFrame();

    if (this.props.audioSource && this.props.audioSource === 'microphone') {
      this.drawMicrophoneDataPoints();
    } else {
      this.drawAudioDataPoints();
    }

    this.animationFrameId = requestAnimationFrame(this.draw);
  }

  resetCanvasForNewFrame() {
    const audioWaveCanvas = this.audioWaveCanvasRef.current;
    this.audioWaveCanvasCtx.clearRect(
      0,
      0,
      audioWaveCanvas.width,
      audioWaveCanvas.height,
    );
  }

  stopDrawing() {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
  }

  render() {
    return (
      <div ref={this.props.audioWaveContainerRef} className="audiowave">
        <canvas ref={this.audioWaveCanvasRef} />
      </div>
    );
  }
}

AudioWave.propTypes = {
  data: PropTypes.array.isRequired,
  duration: PropTypes.number.isRequired,
  isTranscribing: PropTypes.bool.isRequired,
  audioWaveContainerRef: PropTypes.object.isRequired,
  audioSource: PropTypes.string,
  audioAnalyzer: PropTypes.object,
};

AudioWave.defaultProps = {
  audioSource: null,
  audioAnalyzer: null,
};

export default AudioWave;
