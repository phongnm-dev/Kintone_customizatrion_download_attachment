Kintone Customization - Download record's attachment
====

Written in TypeScript
## How to build
### Requirement
```
* Node.js
* Git
```
```
$ git clone https://github.com/phongnm-dev/Kintone_practice_2.git
$ cd Kintone_customizatrion_download_attachment
$ npm install
$ npm run build
```
Output
```
./dist/Kintone_customization_downloadAttachment.min.css
./dist/Kintone_customization_downloadAttachment.min.js
```
## Usage:

```console
$ npm run build
```
After build,
- Upload dist/Kintone_customization_downloadAttachment.min.css & dist/Kintone_customization_downloadAttachment.min.js to Kintone app - JavaScript and CSS Customization.
- Add blank field to your Kintone Application and specify blank field ID in ./src/config/index.ts
- Click on button render in blank space to open download popup.
- Select file and click download button.
related document: [Kintone customization css and javascript](https://get.kintone.help/k/en/user/app_settings/js_customize.html)

## Config:
./src/config/index.ts
| Name | Type | Description |
| ------------- |:-------------:| -----:|
| BLANK_FIELD_ID | String | Id of the blank field to render open popup button  |
| SPECIFIC_TEXT | String | Text to include in file's name. |
| SEPARATOR_CHARACTER  | String | Separator character for file name, value must be one of allowed values:<br/>[-, =, +, $,_]<br/>Default:  -|
| FILE_NAME_FORMAT_TYPE | Interger | Options for file name format with mapping</br>value: format:</br>1: [AppID] + [Record ID] + [SPECIFIC_TEXT] + [current datetime]</br>2: [Record ID] + [SPECIFIC_TEXT] + [current datetime]</br>3: [SPECIFIC_TEXT] + [current datetime]</br>Default: 1. [AppID] + [Record ID] + [SPECIFIC_TEXT] + [current datetime]
- On record detail screen, a button for openning download attachment popup will be render in blank field with id config in [BLANK_FIELD_ID]
- All selected files compressed in one file with format file name specify in FILE_NAME_FORMAT_TYPE, with seperator is specify in SEPARATOR_CHARACTER, mapping value format:
[AppID]: Id of Kintone app.
[Record ID]: Id of current record.
[SPECIFIC_TEXT]: Value of SPECIFIC_TEXT, ignore if empty.
[current datetime]: Current datetime with format MM/dd/yyyy HH:mm:ss

## License:
MIT Licence
