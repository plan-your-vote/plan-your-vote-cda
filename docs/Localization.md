# Localization

This document helps you to set resource variables on `json` files by different components.

## Table of Contents

- [List of Files](#list-of-files)
- [How It Works](#how-it-works)
- [How to Use](#how-to-use)
  - [Consumers](#consumers)
  - [Developers](#developers)
- [Helpful Articles](#helpful-articles)
- [Future Steps](#future-steps)

## List of Files

All files for this function are under `Spa/ClientApp/src/`.

### Static Resource Files

`assets/i18n/`: Static resource JSON files

- Naming: `language-tag.json`
- Language tag follows [BCP 47 Language Tag](#language-tag)

### Function Files

- `app/`
  - `app.module.ts`: Imports modules and set `TranslateService` under `providers`
- `app/services/`
  - `translate.service.ts`
- `app/pipes/`
  - `translate.pipe.ts`: Connects `translate.service.ts` and this SPA
- `app/footer-menu/`
  - `footer-menu.component.ts`
  - `footer-menu.component.html`

## How It Works

- On Initialization:
  1. `app.module.ts`
  2. `translate.service.ts`
  3. `translate.pipe.ts`
  4. HTML files
  5. Done
- After Initialiazation:
  1. `footer-menu.component.html`
  2. `footer-menu.component.ts`
  3. `translate.service.ts`
  4. `translate.pipe.ts`
  5. HTML files
  6. Done

### On Initialization

1. `app.module.ts`
2. `translate.service.ts`
3. `translate.pipe.ts`
4. HTML files
5. Done

### After Initialization

1. `footer-menu.component.html`

There's a dropdown menu for voters to select a language.

```html
<select
  id="footer-select-lang"
  (change)="onLangChange($event)"
  [(ngModel)]="defaultLanguage"
>
  <option *ngFor="let language of languages" [ngValue]="language">
    {{ language }}
  </option>
</select>
```

`languages` in `<option>` comes from `translate.service.ts` via `footer-menu.component.ts` on initialization.

2. `footer-menu.component.ts`

On value change event, `footer-menu.component.ts` takes the new value and executes `use()` in `translate.service.ts`.

3. `translate.service.ts`

Passes language JSON data to the pipe.
If you want to make a change, make sure to get the exact string as a parameter from the user (dropdown menu in this case) to match `switch` cases.

4. `translate.pipe.ts`

Supplies language JSON data to the entire application.

5. HTML files

HTML files get the data from `translate.pipe.ts` by keys and render the values

Example: `{{ 'FOOTER.CITY' | translate }}`

- Key: `FOOTER.CITY`
- JSON format:

```json
"FOOTER": {
  "CITY": "Vancouver"
}
```

- Expected rendered result: `Vancouver`

6. Done

## How to Use

It's very simple!

### Consumers

1. I guess you only need to translate the texts.

### Developers

1. Make sure you have a component you want to add.
2. If you want to add new languages, you need to add language code on [this one](../Spa/ClientApp/src/app/services/translate.service.ts), and json file in [this folder](../Spa/ClientApp/src/assets/i18n/)
3. Let's say your component is `event.component.ts`.
4. Add `EVENT` key in [this file if you are English speaker](../Spa/ClientApp/src/assets/i18n/en.json). This is also a naming convention. If you're component's name is `event`, your key for texts should be `EVENT`. The following is the sample, and of course, key should be capitalized.

```json
...
"EVENT": {
  "TITLE": "Event",
  "DESCRIPTION": "This is the event."
},
...
```

5. Then add texts using meaningful key.
6. All good!

## Helpful Articles

### Language Tag

BCP 47 Language Tag is used to define names of language JSON files in `assets/i18n/` folder.

- [BCP 47 Language Tag](https://tools.ietf.org/html/bcp47)
  - [HTML Living Standard - Language](https://html.spec.whatwg.org/multipage/system-state.html#dom-navigator-language)
- [`NavigatorLanguage.language`](https://developer.mozilla.org/en-US/docs/Web/API/NavigatorLanguage/language)
  - `console.log(window.navigator.language)` in Google Chrome's console to see a list of languages in the website

## Future Steps

To get the language resource from backend:

- Make sure you share the JSON data (key-value) format with the backend team. The language data is linked by keys.
- `translate.service.ts`
  1. In `use()` function, make a GET request instead of importing JSON files from `assets/i18n/` folder.
  2. Replace imported JSON data from `assets/i18n/` with the language data.
