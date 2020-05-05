import {Button, Checkbox} from '../../../components';
import {Message} from '../../../ultil';

function handlePopupFooter() {
  const popupFooter = document.createElement('div');
  popupFooter.classList.add('downloadAttachment__actions');
  const cancelButton = new Button(Message.cancel, {type: 'dialog-cancel'});
  const saveButton = new Button(Message.download, {type: 'dialog-ok'});
  popupFooter.appendChild(cancelButton.render());
  popupFooter.appendChild(saveButton.render());
  return {
    entity: popupFooter,
    cancelButton,
    saveButton
  };
}

export default handlePopupFooter;
