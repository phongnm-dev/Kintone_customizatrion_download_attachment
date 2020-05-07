import getSelectedFiles from '../../utils/getSelectedFiles';
import {Button, Checkbox} from '../../components';
import {Kintone as KintoneService} from '../../services';
import {FieldCheckboxs, AttachmentField} from '../../types';
import {MESSAGE} from '../../constants';

type Params = {
  saveButton: Button;
  subfolderCheckBox: Checkbox;
  listCheckboxs: FieldCheckboxs[];
  attachmentFields: AttachmentField[];
  zipName: string;
}

function registerDownloadEvent(params: Params) {
  params.saveButton.on('click', async () => {
    const selectedFile = getSelectedFiles(params.listCheckboxs, params.attachmentFields);
    const isCreateSubfolder = params.subfolderCheckBox.getChecked();
    try {
      await KintoneService.Record.downloadAttachmentFiles(selectedFile, isCreateSubfolder, params.zipName);
    } catch (error) {
      console.log(error);
      alert(`${error.message}\n${MESSAGE.ERROR}`);
    }
  });
}

export default registerDownloadEvent;
