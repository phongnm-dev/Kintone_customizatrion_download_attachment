(function ($) {
  'use strict';

  // User config
  const CONFIG = {
    SPECIFIC_TEXT: '',
    FILE_NAME_FORMAT_TYPE: 1,
    SEPARATOR_CHARACTER: '-',
    BLANK_SPACE_ID: 'download_button'
  };

  const CONSTANTS = {
    APP_ID: kintone.app.getId()
  }

  // word management
  const TEXT = {
    downloadButton: 'Download Attachments',
    selectAllFields: 'Select all fields',
    selectField: 'Select field',
    estimateLabel: 'Estimate',
    cancel: 'Cancel',
    download: 'Download',
    noAttachmentField: 'No attachment fields found in record.',
    popupTitle: (recordId, appName) => `Download attachments for record ${recordId} 
      in app ${appName}`,
    estimateTitle: (fileCount) => `${fileCount} files will be added to a compressed zip file for download.
    Your browser or network may have download file size or type limitations.
    Estimate compressed file size?`,
    fileSize: (fileSize) => `File size: ${fileSize}`
  };

  kintone.events.on('app.record.detail.show', async function (event) {
    const app = await getAppDetail(CONSTANTS.APP_ID);
    const record = event.record
    const downloadButton = createButton();
    if (downloadButton) {
      //create popup
      createPopup(app.name, record);

      //get attchment fields of record
      let attachmentFields = [];
      for (let field in record) {
        let fieldData = record[field];

        if (fieldData.type == "FILE") {
          let item = {};
          item['fieldCode'] = field;
          item['value'] = fieldData.value;
          attachmentFields.push(item);
        }
      }

      //render popup's content
      addPopupContent(attachmentFields);
      //register events
      registerEvent(attachmentFields.length);
    }
  });

  async function getAppDetail(id) {
    return kintone.api(kintone.api.url('/k/v1/app', true), 'GET', {
      id: id
    });
  }

  function createButton() {
    const buttonContainer = kintone.app.record.getSpaceElement(CONFIG.BLANK_SPACE_ID);
    if (buttonContainer) {
      const button = document.createElement('button');
      button.innerHTML = 'Download button';
      $(button).addClass('downloadAttachment__button kintoneplugin-button-normal');
      buttonContainer.appendChild(button);
      button.html = TEXT.downloadButton;
      return button;
    }
    return {};
  }

  function createPopup(appName, record) {
    // Create popup
    var popup = document.createElement('div');
    $(popup).addClass('downloadAttachmentModal');
    document.body.appendChild(popup);
    $(popup).html(
      `
        <div class="downloadAttachment__wrapper">
          <div class="downloadAttachment__header">
            <span class="downloadAttachment__close">&times;</span>
            <h2 class="downloadAttachment__title">
              ${TEXT.popupTitle(record.Record_number.value, appName)}
            </h2>
          </div>
          <form class="downloadAttachment_form">
            <div class="downloadAttachment__content">
            </div>
            <div class="downloadAttachment__estimate">
            </div>
          </form>
          <div class="downloadAttachment__footer">
            <div class="downloadAttachment__actions">
              <button id="downloadAttachment_close" class="kintoneplugin-button-dialog-cancel">
                ${TEXT.cancel}
              </button>
              <button id="downloadAttachment_save" class="kintoneplugin-button-dialog-ok">
                ${TEXT.download}
              </button>
            </div>
          </div>
        </div>
      `
    );
  }

  function addPopupContent(attachmentFields) {
    const popContent = $('.downloadAttachment__content');

    if (popContent) {
      if (attachmentFields.length) {
        popContent.html(
          `
            <div class="kintoneplugin-input-checkbox">
              <span class="kintoneplugin-input-checkbox-item">
                <input
                  id="downloadAttachments_selectAllFields"
                  type="checkbox"
                  checked="checked"
                  value="1"
                />
                <label for="downloadAttachments_selectAllFields">${TEXT.selectAllFields}</label>
              </span>
            </div>
            <div class="downloadAttachment__fieldsContainer">
            </div>
          `
        );
  
        //render field select
        attachmentFields.forEach((field, index) => {
          createFieldSelect(field, index)
        })

        //render estimate file count
        $('.downloadAttachment__estimate').html(
          `
            <p id="downloadAttachment_estimateTitle">${TEXT.estimateTitle(getCountSelectedFile())}</p>
            <button
              id="downloadAttachment_estimate"
              class="kintoneplugin-button-normal"
              type="button"
            >${TEXT.estimateLabel}</button>
            <span id="downloadAttachment_totalFileSize"></span>
          `
        )
        //register event for field select checkbox
        $('.downloadAttachments_selectField').change(function () {
          if ($('.downloadAttachments_selectField:checked').length == attachmentFields.length) {
            $("#downloadAttachments_selectAllFields").prop('checked', true).change();
          } else {
            $("#downloadAttachments_selectAllFields").prop('checked', false).change();
          }
        })
      } else {
        popContent.html(
          `
            <p>${ TEXT.noAttachmentField }</p>
          `
        );
        $('#downloadAttachment_save').addClass('kintoneplugin-button-disabled')
          .prop("disabled", true)
          .removeClass('kintoneplugin-button-dialog-ok');
      }
    }
  }

  function createFieldSelect(field, fieldIndex) {
    $(".downloadAttachment__fieldsContainer").append(
      `
      <div class="downloadAttachment__field">
        <a id="downloadExpand_${fieldIndex}">
          <span class="downloadAttachment__expander"></span>
          ${field.fieldCode}
        </a>
        <div class="downloadContent__field" id="downloadContent_${fieldIndex}">
          <div class="kintoneplugin-input-checkbox">
            <span class="kintoneplugin-input-checkbox-item">
              <input
                id="downloadAttachments_selectField_${fieldIndex}"
                class="downloadAttachments_selectField"
                checked="checked"
                type="checkbox"
              />
              <label for="downloadAttachments_selectField_${fieldIndex}">${TEXT.selectField}</label>
            </span>
          </div>
        </div>
      </div>
      `
    )

    //register event field select checkbox
    $(`#downloadExpand_${fieldIndex}`).click(function () {
      $(`#downloadContent_${fieldIndex}`).slideToggle('fast');
      $(`#downloadExpand_${fieldIndex} .downloadAttachment__expander`).toggleClass('down');  
    });

    $(`#downloadAttachments_selectField_${fieldIndex}`).click(function () {
      $(`.downloadAttachments_selectFile_${fieldIndex}`).prop('checked', $(this).prop('checked'));
    });


    //render file select
    field.value.forEach((file, fileIndex) => {
      createFileSelect(file, fileIndex, fieldIndex, field.fieldCode)
    })

    //register event file select checkbox
    $(`.downloadAttachments_selectFile_${fieldIndex}`).change(function () {
      if ($(`.downloadAttachments_selectFile_${fieldIndex}:checked`).length == field.value.length) {
        $(`#downloadAttachments_selectField_${fieldIndex}`).prop('checked', true).change();
      } else {
        $(`#downloadAttachments_selectField_${fieldIndex}`).prop('checked', false).change();
      }
    })
  }

  function createFileSelect(file, fileIndex, fieldIndex, fieldCode) {
    $(`#downloadContent_${fieldIndex}`).append(
      `
      <div class="kintoneplugin-input-checkbox">
        <span class="kintoneplugin-input-checkbox-item">
          <input
            id="downloadAttachments_selectFile_${fieldIndex}_${fileIndex}"
            class="downloadAttachments_selectFile downloadAttachments_selectFile_${fieldIndex}"
            name="${fieldCode}[]"
            checked="checked"
            type="checkbox"
            value="${file.fileKey}"
          />
          <label for="downloadAttachments_selectFile_${fieldIndex}_${fileIndex}">${file.name}</label>
        </span>
      </div>
      `
    )
  }

  function registerEvent(attachmentLength) {
    //Close popup event
    $('.downloadAttachment__close, #downloadAttachment_close').click(() => {
      $('.downloadAttachmentModal').hide();
    });
    //show modal button
    $(".downloadAttachment__button").click(function () {
      $('.downloadAttachmentModal').show();
    });
    if(attachmentLength) {
      //Register caculate file count event
      $(".downloadAttachment_form .kintoneplugin-input-checkbox label").click(() => {
        setTimeout(function() {
        $('#downloadAttachment_estimateTitle').html(TEXT.estimateTitle(getCountSelectedFile()))
        }, 0)
      })
      //Select all fields event
      $("#downloadAttachments_selectAllFields").click(function () {
        $(".downloadAttachments_selectField").prop('checked', $(this).prop('checked'));
        $(".downloadAttachments_selectFile").prop('checked', $(this).prop('checked'));
      });
      //Estimate button
      $('#downloadAttachment_estimate').click(() => {
        $('#downloadAttachment_totalFileSize').html(TEXT.fileSize(getTotalFileSize()))
      })
      //Save button
      $('#downloadAttachment_save').click(() => {
        downloadFiles()
      })
    }
  }

  function getCountSelectedFile() {
    const fileList = $('.downloadAttachment_form').serializeArray();
    return fileList.length
  }

  function getTotalFileSize() {
    //return file size
  }

  function downloadFiles() {
    const fileList = $('.downloadAttachment_form').serializeArray();
    //download file.
  }
})(jQuery);
