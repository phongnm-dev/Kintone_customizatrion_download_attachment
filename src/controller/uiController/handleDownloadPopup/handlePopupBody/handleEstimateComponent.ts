import {Button, Checkbox} from '../../../../components';
import {MESSAGE} from '../../../../constants';
import {EstimateComponent} from '../../../../types';

function handleEstimateComponent(fileCount: number) {
  const estimateContent = document.createElement('div');
  estimateContent.classList.add('downloadAttachment__estimate');
  const estimateTitle = document.createElement('p');
  estimateTitle.innerText = MESSAGE.estimateTitle(fileCount);
  const estimateButton = new Button(MESSAGE.estimateLabel);
  const subfolderCheckBox = new Checkbox(MESSAGE.isCreateSubfolder, 'downloadAttachments_isCreateSubFolder');
  const fileSizeLabel = document.createElement('p');
  fileSizeLabel.classList.add('downloadAttachments_fileSizeLabel');

  estimateContent.appendChild(estimateTitle);
  estimateContent.appendChild(estimateButton.render());
  estimateContent.appendChild(fileSizeLabel);
  estimateContent.appendChild(subfolderCheckBox.render());
  return {
    element: estimateContent,
    content: {
      title: estimateTitle,
      button: estimateButton,
      fileSizeLabel: fileSizeLabel,
      subfolderCheckBox: subfolderCheckBox
    }
  } as EstimateComponent;
}

export default handleEstimateComponent;
