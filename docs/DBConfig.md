---
id: db-config
title: How to configure your database
sidebar_label: How to configure your database
---

This document gives instructions on how to change the database provider for Votingtool

NOTE: if any of the steps below are not followed, VotingTool defaults to a local sqlite database and gets the connection string from `appsettings.json` instead of `launchsettings.json`

## Local Deployment

in `Properties/launchSettings.json`, change `APPSETTING_DB_TYPE` value to one of the three following. An example .json
file is contained at the bottom of this document.

- SQLite
- MySQL
- Microsoft SQL Server

After you have done that, set `APPSETTING_CONNECTION_STRING` to a valid connection string.

These key value pairs are duplicated. This is because dotnet maintains two different launch profiles.

The json child of `IIS Explorer` is the settings used when launching votingtool from visual studio
The json child of `Web` is the settings used when launching votingtool from dotnet run

## Azure instance

IMPORTANT: When setting application settings on the azure app instance, omit the `APPSETTING_` used in local deployments

In order to keep the connection string a secret, use the application settings in your Azure app instance

These can be found in Settings > Configuration on the left hand sidebar of the App instance on Azure Portal

The keys to use in this case are:

`DB_TYPE`
`CONNECTION_STRING`

```json
{
  "iisSettings": {
    "windowsAuthentication": false,
    "anonymousAuthentication": true,
    "iisExpress": {
      "applicationUrl": "http://localhost:59119",
      "sslPort": 44307
    }
  },
  "profiles": {
    "IIS Express": {
      "commandName": "IISExpress",
      "launchBrowser": true,
      "environmentVariables": {
        "ASPNETCORE_ENVIRONMENT": "Development",
        "APPSETTING_DB_TYPE": "sqlite",
        "APPSETTING_CONNECTION_STRING": "Data Source=PlanYourVote.db"
      }
    },
    "Web": {
      "commandName": "Project",
      "launchBrowser": true,
      "applicationUrl": "https://localhost:5001;http://localhost:5000",
      "environmentVariables": {
        "ASPNETCORE_ENVIRONMENT": "Development",
        "APPSETTING_DB_TYPE": "sqlite",
        "APPSETTING_CONNECTION_STRING": "Data Source=PlanYourVote.db"
      }
    }
  }
}
```
