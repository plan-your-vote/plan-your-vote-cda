---
id: unit-test
title: Unit Test
sidebar_label: Unit Test
---

There is currently a framework of unit-tests for both the front-end Angular and the back-end dotnet set-up for this project.

## Front-End

For the front-end, it's using Angular. We are using Jasmine and Karma, in which Jasmine is the testing framework and Karma is the task runner for our tests.

To run the tests, go to this directory:

votingtool\Spa\ClientApp\src\app

Component that is made in Angular should have a "spec.ts" file generated (if not you can manually make one), this is where the test for that component exists.

To run your test, make sure you're in the directory as shown above, and in cmd type in: ng test

Note: One thing we noticed, the first time you pull from the project, you may get an error with npm, google that error and you'll find a command to run which installs a bunch of things, then re-run the tests. (If it doesn't work the first time try re-running again)

## Back-End

In the backend, there is a project called "BackEndTests".

It's implemented using the xUnit testing framework.

Currently tests the controller classes made by other students with some basic tests.

To run the tests, make sure you're in the "BackEndTests" directory in cmd.

Type in `dotnet test` and the unit-tests will run.
