import {uiController, eventController} from './controller';
import {RecordUtil, TextUltil} from './utils';
import Config from './config';
import {MESSAGE} from './constants';
import {Kintone as KintoneService} from './services';

declare const kintone: any;

kintone.events.on('app.record.detail.show', async (event: any) => {
  const blankFieldElement = kintone.app.record.getSpaceElement(Config.BLANK_SPACE_ID);
  if (blankFieldElement === null) {
    const errorMessage = TextUltil.getBlankFieldNotFoundMessage(Config.BLANK_SPACE_ID);
    event.error = errorMessage;
    return event;
  }

  const attachmentFields = RecordUtil.getNonEmptyAttachmentsFields(event.record);
  let appDetail: {name: string};
  try {
    appDetail = await KintoneService.App.getDetail();
  } catch (error) {
    console.log(error);
    alert(MESSAGE.ERROR);
    return event;
  }

  const appName = appDetail.name;
  const recordNumber = event.record.Record_number.value;
  const UI = uiController({
    attachmentFields,
    appName,
    recordNumber,
    blankFieldElement
  });
  eventController(UI, attachmentFields, recordNumber);
  return event;
});
