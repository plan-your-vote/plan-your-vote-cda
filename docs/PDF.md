---
id: pdf
title: [Deprecated, Angular] PDF Generator
sidebar_label: [Deprecated, Angular] PDF Generator (Angular)
---

This document let you to set up Angular PDF Generator on the project and how to use it.

## Table of Contents

- [Angular Library](#angular-library)
- [How to Use](#how-to-use)
  - [Consumers](#consumers)
  - [Developers](#developers)

## Angular Library

The project will be using `jspdf` which resides on npm.

## How to Use

You can look up this [website](https://github.com/MrRio/jsPDF/blob/master/README.md).
This is where you can find all functions you need, [DOCS](https://rawgit.com/MrRio/jsPDF/master/docs/)

### Consumers

1. Inject PdfService to your component constructor parameters
   `private pdfSerivce: PdfService`
2. Call a function with the object

```js
// Since this is an open source project where pdf format can be different for different cities,
// it is HIGHLY recommended to talk to the developers or someone who is in charge
pdfData = { Something: [], 'Another Thing': {} };
fileName: string = 'test.pdf';
pdfService.pdf(pdfData, fileName);
```

3. WILL CHANGE THIS IN THE FUTURE, but currently please just follow like below

```js
pdfData = {
  demoText: 'SOMETHING YOU WANT TO PUT'
};
fileName: string = 'SOME_NAME.pdf';
pdfService.pdf(pdfData, fileName);
```

I don't have image inputting dynamically for now since that needs some studying

### Developers

1. Really, the only thing you need to do is in [PDF Service](../Spa/ClientApp/src/app/services/pdf.service.ts), decide how to structure your pdf
