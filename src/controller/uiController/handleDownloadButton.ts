import {MESSAGE} from '../../constants';
import {Button} from '../../components';

function handleDownloadButtons(buttonContainer: HTMLElement) {
  const button = new Button(MESSAGE.downloadButton);
  buttonContainer.appendChild(button.render());
  return button;
}

export default handleDownloadButtons;
