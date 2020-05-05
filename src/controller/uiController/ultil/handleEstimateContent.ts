import {Button, Checkbox} from '../../../components';
import {Message} from '../../../ultil';

type FieldCheckboxs = {
  fieldCode: string;
  fieldCheckbox: Checkbox;
  fileCheckboxs: Checkbox[];
}
type AttachmentField = {
  fieldCode: string;
  value: {
    fieldCode: string;
    value: Array<{
      fileKey: string;
      fileSize: number;
    }>;
  };
}

function handleEstimateContent() {
  const estimateContent = document.createElement('div');
  estimateContent.classList.add('downloadAttachment__estimate');
  const estimateTitle = document.createElement('p');
  const estimateButton = new Button(Message.estimateLabel);
  const subfolderCheckBox = new Checkbox(Message.isCreateSubfolder, 'downloadAttachments_isCreateSubFolder');
  const fileSizeLabel = document.createElement('p');
  fileSizeLabel.classList.add('downloadAttachments_fileSizeLabel');

  estimateContent.appendChild(estimateButton.render());
  estimateContent.appendChild(fileSizeLabel);
  estimateContent.appendChild(subfolderCheckBox.render());
  return {
    element: estimateContent,
    content: {
      title: estimateTitle,
      button: estimateButton,
      fileSizeLabel: fileSizeLabel
    }
  };
}

export default handleEstimateContent;