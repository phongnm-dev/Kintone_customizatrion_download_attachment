(function($) {
  'use strict';

  // User config
  const CONFIG = {
    SPECIFIC_TEXT: '',
    FILE_NAME_FORMAT_TYPE: 1,
    SEPARATOR_CHARACTER: '-',
    BLANK_SPACE_ID: 'download_button'
  };

  // word management
  const TEXT = {
    downloadAttachments: 'Download Attachments'
  };

  kintone.events.on('app.record.detail.show', function(event) {
    const downloadButton = createButton();
    if (downloadButton) {
      createPopup();
    }
  });

  function createPopup() {
    // create popup
  }

  function createButton() {
    const buttonContainer = kintone.app.record.getSpaceElement(CONFIG.BLANK_SPACE_ID);
    if (buttonContainer) {
      const button = document.createElement('button');
      button.innerHTML = 'Download button';
      $(button).addClass('kintoneplugin-button-normal');
      buttonContainer.appendChild(button);
      button.html = TEXT.downloadAttachments;
      return button;
    }
    return {};
  }

})(jQuery);
