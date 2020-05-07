import {MESSAGE} from '../../constants';
import {Button} from '../../components';

function handleDownloadButtons(buttonContainer: HTMLElement) {
  const button = new Button(MESSAGE.DOWNLOAD_BUTTON);
  buttonContainer.appendChild(button.render());
  return button;
}

export default handleDownloadButtons;
