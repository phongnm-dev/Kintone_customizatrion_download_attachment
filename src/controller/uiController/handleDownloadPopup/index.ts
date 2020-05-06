
import {MESSAGE} from '../../../constants';
import handlePopupFooter from './handlePopupFooter';
import handlePopupBody from './handlePopupBody';
import {Dialog} from '../../../components';
import {AttachmentField} from '../../../types';
type Params = {
  attachmentFields: AttachmentField[];
  appName: string;
  recordNumber: number;
}
function handleDownloadPopup(params: Params) {
  const popupBody = handlePopupBody(params.attachmentFields);
  const popupTitle = MESSAGE.popupTitle(params.appName, params.recordNumber);
  const popupFooter = handlePopupFooter();
  const popup = new Dialog(popupTitle, popupBody.wrapper, popupFooter.wrapper);

  return {
    element: popup,
    content: {
      popupBody,
      popupFooter
    }
  };
}

export default handleDownloadPopup;