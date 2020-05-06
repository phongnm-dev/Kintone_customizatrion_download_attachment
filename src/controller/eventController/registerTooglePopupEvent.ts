import {Button, Dialog} from '../../components';

type Params = {
  closeButton: Button;
  openButton: Button;
  popup: Dialog;
}
function registerTooglePopup(params: Params) {
  params.closeButton.on('click', () => {
    params.popup.setShow(false);
  });
  params.openButton.on('click', () => {
    params.popup.setShow(true);
  });
}
export default registerTooglePopup;
