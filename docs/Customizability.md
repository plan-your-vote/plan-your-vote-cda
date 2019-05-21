---
id: customizability
title: Customizability
sidebar_label: Customizability
---

Customizability was intended to allow system administrators to select one of the predefined templates.

The scope and requirements given were:

> Use Case
>
> As a system administrator, I want to be able to change to a professional theme via dropdown in CMS without knowing any HTML, CSS, JavaScript, etc.

It is up to the developers of this application to have predefined templates. If the system administrator is a **developer**, they could extend the application as they wished without much trouble.

Aside: **developer** in this instance is someone who knows component-based frameworks (e.g. an Angular developer) and is comfortable with editing the code directly.

On the back-end, **Customizability** is essentially a bunch of strings (data in the `Theme` and `Image` tables) associated to a **theme** (a string). That theme string is an agreed upon contract that the front-end uses to determine which CSS file (which is on front-end, `Spa/ClientApp/src/assets/css/*.css`) to render (e.g. _Maple_ is the PoC theme template).

Notes:

- Styling is unfinished but the PoC (proof-of-concept) is completed.
- Front-end SPA's contents are from [Plan Your Vote website](https://vancouver.ca/plan-your-vote/index.aspx)

## Table of Contents

- [List of Files](#list-of-files)
- [Future Steps](#future-steps)

## List of Files

### Back-End

`Themes` is implement using the following files:

- Model: `VotingModelLibrary/Models/Theme/`
  - `Image.cs`
  - `Theme.cs`
- View: `Web/Views/`
  - `Images/*.cshtml`
  - `Themes/*.cshtml`
- Controller
  - CMS: `Web/CmsControllers/`
    - `ThemesController.cs`
    - `ImagesController.cs`
  - REST API: `Web/ApiControllers/`
    - `ThemesController.cs`

DummyData is generated using

- `Web/Data/ThemesInit.cs`

#### Notes

- `ApplicationDbContext` was modified
  - Images need a [composite key](https://docs.microsoft.com/en-us/ef/core/modeling/keys)
  - See comment in [`Image.cs`](../VotingModelLibrary/Models/Theme/Image.cs) model class
- Backend only stores image links, not images

## Future Steps

- Known issue: Need to refresh SPA after initialization to render logo images
  - Need to make components initialized after receiving logo image URLs
- Suggestion: Making this function work with SVG images might be a good idea for front-end performance
