import {Button, Checkbox, Dialog} from '../components';

export type UI = {
  downloadPopup: DownloadPopup;
  downloadButton: Button;
}

export type DownloadPopup = {
  element: Dialog;
  content: {
    popupBody: PopupBody;
    popupFooter: PopupFooter;
  };
}

export type PopupBody = {
  wrapper: HTMLDivElement;
  content: {
    fileSelectComponent: FileSelectComponent;
    estimateComponent: EstimateComponent;
  };
};

export type EstimateComponent = {
  element: HTMLDivElement;
  content: {
    title: HTMLParagraphElement;
    button: Button;
    fileSizeLabel: HTMLParagraphElement;
    subfolderCheckBox: Checkbox;
  };
}

export type FileSelectComponent = {
  wrapper: HTMLDivElement;
  content: {
    selectAllCheckBox: Checkbox;
    listCheckboxs: FieldCheckboxs[];
  };
}

export type PopupFooter = {
  wrapper: HTMLDivElement;
  content: {
    cancelButton: Button;
    saveButton: Button;
  };
}

export type FieldCheckboxs = {
  fieldCode: string;
  fieldCheckbox: Checkbox;
  fileCheckboxs: Checkbox[];
}

export type AttachmentField = {
  fieldCode: string;
  value: any;
}