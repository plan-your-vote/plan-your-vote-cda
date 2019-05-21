---
id: dockerization
title: Dockerization
sidebar_label: Dockerization
---

This document helps you to set up Docker and run it on your local machine with only one console command.

## Table of Contents

- [Install Docker](#install-docker)
- [How to Use](#how-to-use)
- [Containers](#containers)
- [Customization](#customization)
  - [SQL Server](#sql-server)
  - [MySQL](#mysql)

## Install Docker

Please refer to [Docker Official Website](https://www.docker.com/) to download the latest version of Docker for your own Operating System

## How to Use

- Once the installation is done, navigate to the root folder of the project.
- Open a terminal in the current directory
- Open Docker
- Test the docker command by running: `docker ps -a`

At this point, you should be able to run this app without worrying about how to install .NET Core or config your database. Simply just copy and run this command on your terminal window. Open [localhost:8888](http:localhost:8888) to see the result !

- MySQL: `docker-compose -f docker/mysql.yml up --build`
- SQL Server: `docker-compose -f docker/sqlserver.yml up --build`
- SQLite: `docker-compose -f docker/sqlite.yml up --build`

## Containers

To Dockerize this application, we have used .Net Core 2.2 for the website. For the database you can choose between using SQLite (by default), MySql or Linux SQL Server.

## Customization

### SQL Server

To change the database name or the password, please open the **sqlserver.yml** in the root folder using your favourite text editor and you should see the following:

```yml
version: '3'

services:
  db:
    image: microsoft/mssql-server-linux
    restart: always
    ports:
      - '1433:1433'
    environment:
      - SA_PASSWORD=Sql!Expre55
      - ACCEPT_EULA=Y

  mvc:
    build:
      context: .
      dockerfile: Dockerfile
    depends_on:
      - db
    ports:
      - '8888:80'
    restart: always
    environment:
      - DBHOST=db
      - DBNAME=openvoting
      - DBPORT=1433
      - DBUSERNAME=sa
      - DBPASSWORD=Sql!Expre55
      - ASPNETCORE_ENVIRONMENT=Production
      - APPSETTING_DB_TYPE=mssql
```

- To change the **database name**, simply replace a new name for `DBNAME`

- To change the **database password**, you have to change both the `SA_PASSWORD` for the database and `DBPASSWORD` for the web part. **Make sure that your password is strong enough (more than 8 characters with at least one uppercase, one lowercase, one number and one special character)**

- To change the **port**, you also need to change the `DBPORT` and `ports` to match the pattern `- "[DBPORT]:1433"`

### MySQL

Similarly to customize your setting for MySQL you can modify the variable in the **mysql.yml**. The password for MySQL is less strict and you can name whatever you want

```yml
version: '3'

services:
  db:
    image: mysql:8.0.0
    restart: always
    environment:
      - MYSQL_ROOT_PASSWORD=secret
      - MYSQL_TCP_PORT=3306

  mvc:
    build:
      context: .
      dockerfile: Dockerfile
    depends_on:
      - db
    ports:
      - '8888:80'
    restart: always
    environment:
      - DBHOST=db
      - DBPORT=3306
      - DBNAME=openvoting
      - DBPASSWORD=secret
      - ASPNETCORE_ENVIRONMENT=Production
      - APPSETTING_DB_TYPE=mysql
```
