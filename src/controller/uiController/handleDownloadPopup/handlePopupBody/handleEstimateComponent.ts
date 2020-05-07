import {Button, Checkbox} from '../../../../components';
import {TextUltil} from '../../../../utils';
import {MESSAGE} from '../../../../constants';
import {EstimateComponent} from '../../../../types';

function handleEstimateComponent(fileCount: number): EstimateComponent {
  const estimateContent = document.createElement('div');
  estimateContent.classList.add('downloadAttachment__estimate');
  const estimateTitle = document.createElement('p');
  estimateTitle.innerText = TextUltil.getEstimateTitle(fileCount);
  const estimateButton = new Button(MESSAGE.ESTIMATE_LABEL);
  const subfolderCheckBox = new Checkbox(MESSAGE.IS_CREATE_SUBFOLDER, 'downloadAttachments_isCreateSubFolder');
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
  };
}

export default handleEstimateComponent;
