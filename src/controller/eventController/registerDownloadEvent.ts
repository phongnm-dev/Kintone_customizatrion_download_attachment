import getSelectedFiles from '../../utils/getSelectedFiles';
import {Button, Checkbox} from '../../components';
import {Kintone as KintoneService} from '../../services';
import {FieldCheckboxs, AttachmentField} from '../../types';

type Params = {
  saveButton: Button;
  subfolderCheckBox: Checkbox;
  listCheckboxs: FieldCheckboxs[];
  attachmentFields: AttachmentField[];
  zipName: string;
}

function registerDownloadEvent(params: Params) {
  params.saveButton.on('click', () => {
    const selectedFile = getSelectedFiles(params.listCheckboxs, params.attachmentFields);
    const isCreateSubfolder = params.subfolderCheckBox.getChecked();
    KintoneService.Record.downloadAttachmentFiles(selectedFile, isCreateSubfolder, params.zipName);
  });
}

export default registerDownloadEvent;
