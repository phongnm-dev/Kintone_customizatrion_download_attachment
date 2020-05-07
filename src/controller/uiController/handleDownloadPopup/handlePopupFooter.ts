import {Button, Checkbox} from '../../../components';
import {MESSAGE} from '../../../constants';

function handlePopupFooter() {
  const popupFooter = document.createElement('div');
  popupFooter.classList.add('downloadAttachment__actions');
  const cancelButton = new Button(MESSAGE.CANCEL, {type: 'dialog-cancel'});
  const saveButton = new Button(MESSAGE.DOWNLOAD, {type: 'dialog-ok'});
  popupFooter.appendChild(cancelButton.render());
  popupFooter.appendChild(saveButton.render());
  return {
    wrapper: popupFooter,
    content: {
      cancelButton,
      saveButton
    }
  };
}

export default handlePopupFooter;
