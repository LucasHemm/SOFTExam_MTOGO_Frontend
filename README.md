# SOFT1Exam_MTOGO_Frontend


## Table of Contents

- [SOFT1Exam\_MTOGO\_Frontend](#soft1exam_mtogo_frontend)
  - [Table of Contents](#table-of-contents)
  - [Introduction](#introduction)
  - [Build Status](#build-status)
  - [CI/CD Pipeline](#cicd-pipeline)
    - [Pipeline Steps](#pipeline-steps)
  - [Tech stack](#tech-stack)
  - [Docker Compose](#docker-compose)
    - [Overview](#overview)
    - [Dockerhub](#dockerhub)
    - [Services / Containers](#services--containers)

## Introduction

Welcome to the **SOFT1Exam_MTOGO_Backend** repository! This is our backend service, which manages the independent microservices to the frontend. This endpoints in this service, is dependent on the whcich of the other microserveices are running. But to have the full functionlity, all of the microservices must be up and running.

## Build Status
Check out the lastest build status here: ![CI/CD](https://github.com/LucasHemm/SOFT1Exam_MTOGO_Backend/actions/workflows/dotnet-tests.yml/badge.svg)

## CI/CD Pipeline

Our CI/CD pipeline utilizes GitHub Actions to automate the testing and deployment of the application.  To initate the pipeline a pull request has to be made to merge the code. 

The pipeline consists of the following steps:

### Pipeline Steps

1. **Checkout Repository**
2. **Setup .NET**
3. **Restore Dependencies**
4. **Build**
5. **Test**
6. **Log in to Docker Hub**
7. **Build Docker Image**
8. **Push Docker Image** 

## Tech stack
The tech stack for this microservice is as follows:
- **Javascript**: The programming language used to write the application.
- **Node.js**: The runtime used to run the application.
- **HTML/CSS**: The languages used to write the frontend.
- **REACT**: The library used to create the frontend.
- **Docker**: The containerization tool used to deploy the application.
- **Docker Compose**: The tool used to deploy the application locally.
- **GitHub Actions**: The CI/CD tool used to automate the testing and deployment of the application.
  

## Docker Compose

### Overview

To run this microservice, you can use Docker Compose to deploy the services locally. 

```yaml
docker-compose up --build
```


Alternatively, you can run all the services from the MTOGO project by going to this repository and following the guide there.
```
https://github.com/LucasHemm/SOFTEXAM_Deployment
```

### Dockerhub
The docker-compose file uses the local dockerfile to build the image, and run the container. The image can also be found on Docker Hub at:
```
https://hub.docker.com/u/lucashemcph
```

### Services / Containers

- **App** / **mtogofrontend**: Runs the main application server.
- **DB** / **Database**: Runs the Microsoft SQL Server database.
- **Prometheus** / **Prometheus**: Runs the prometheus server.
- **Grafana** / **Grafana**: Runs the grafana server.