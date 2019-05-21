---
id: accessibility
title: Accessibility
sidebar_label: Accessibility
---

This document gives instructions on how to use ARIA attributes to ensure pages are accessible to those who are visually impaired.

## ARIA

ARIA is a standard in providing enhanced accessibility to those that are visually impaired. Instead of using vision, a visually impaired user relies on the screen reader that describes and helps navigate the user through a page.

The screen reader relies on the "reader tree" analogous to the "render tree" for those with sight. ARIA attributes manipulate the render tree to ensure the screen reader speaks accurately the page the user is currently on.

Two major aspects of ARIA must be considered:

Ease of Navigation (landmarks)

Understadability (accurately spoken descriptions)

NOTE: You are free to use any screen reader as ARIA implementation is standardized.
Screen readers I used to accessibility testing:
If you are developing on a mac, utilize the built in reader (shortcut: CTRL+F5).
If you are developing on a window computer, utilize the chrome vox extension.

## Landmarks

For those that cannot see, the tab button is used to navigate through elements on a page. To allow convenient navigation to specific regions of a page the "role" attribute is used.

The addition of the role attribute allows you to denote regions of a page allowing the user to easily tab directly to these areas. role values are defined in ARIA online documentation. Examples include navigation, main, region, form, alert ... etc. (Google: ARIA roles for more role values)

Example:
< div role = "navigation" > <-- this div element will now become a landmark for navigation

This div will now be read as a navigation bar. Users will be able to tab directly to this navigation region instead of continously cycling through all the elements of a page to get back to the navigation region.

## Understadability

### Adding Context: using "aria-label" attribute

E.g. a submit button. <-- the screen reader will read "submit button" with no context as to what is being submitted and the effects of the submission.

Using aria: < button name="submit" aria-label="This will submit your answers to the database. Your information will be kept confidential." >

The screen reader will read the aria-label once the user tabs to this button. As you can see the aria-label adds context to the button. You can use it to also provide a reminder.

### Ownership

It is important (especially for forms) that you apply ownership of specific elements to their label. For the sake of UI design, some labels will not be associated with their respective input box. The reader will read e.g. "text box" with no mention of what the textbox is for.

< div id="owner" aria-label="subject"> Subject < /div>
< input type="text" aria-labelledby="owner" />

Notice that the input element is labelled by the "owner". The screen reader will announce "textbox subject". This will ensure form elements are given context.

### Updates

When a form submission fails validation, red text indicating the error will not be noticeable for blind users. Use aria-live="assertive" to ensure updates to the page are immediately read. There are quite a few other update attributes in aria. Look up the ARIA online documentation for more information. (Remeber to pay close attention if you are working on elements that are dynamic)

### Dynamic Elements

When elements are dynamic, using plain aria attributes can cause the reader to speak the opposite of what is happening. Read up on dynamic aria implementation (uses attr.) via the ARIA online documentation. It is essential that all dynamic elements are given proper dynamic aria attributes.

Here is a link to a few youtube videos demonstrating ARIA scenarios in action:
[Video](https://www.youtube.com/channel/UCYTh3fYU3grIoU7ATYMgnHA)

Good Luck! - Aska
