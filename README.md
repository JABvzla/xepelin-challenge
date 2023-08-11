# Project Name
XEPLIN challenge by Jose Bonito

DEMO:
<a href="https://xepelin.josebonito.com/" target="_blank">xepelin.josebonito.com</a>
## Table of Contents

- [Introduction](#introduction)
- [Architecture Overview](#architecture-overview)
- [Folder Structure](#folder-structure)
- [Installation](#installation)
- [Start the Project](#start-the-project)
- [Technologies Used](#technologies-used)

## Introduction

Technical challenge completed by José Bonito as part of the application process for a Senior Fullstack Programmer position at Xeplin.

## Architecture Overview

The proposed software architecture is clean architecture, where domain logic is separated from infrastructure logic. Commonly, an event-driven pattern is used as a means of communication. However, in this case, methods are called directly instead.

## Folder Structure

```
project-root/
│
├── application/
│ ├── uses-cases.ts
│ └── ...
│
├── domain/
│ ├── domains.d.ts
│ └── ...
│
├── infrastructure/
│ ├── memory-repository     # example used in some tests
│ ├── nest-api/             # api service in nestjs
│ │ └── ...
│ ├── next-web/             # web application in next
│ │ └── ...│
│ └──
└──
```

## Installation

To get started with this project, follow these steps to clone the repository and install the necessary dependencies:

### Prerequisites

- [Node.js](https://nodejs.org/) (version X18.15.0 or higher)
- [Git](https://git-scm.com/)

### Clone the Repository

1. Open your terminal or command prompt.
2. Navigate to the directory where you want to clone the project.
3. Run the following command to clone the repository:

```sh
git clone https://github.com/JABvzla/xepelin-challenge
```

### Install Dependencies

1. Navigate into the cloned project directory using the following command:

```sh
cd xepelin-challenge
```

2. Install the project's dependencies using npm (Node Package Manager):

```sh
npm run install-all
```

### Start the Project

To set up the project, it's necessary to start the backend and the frontend separately.

add env file, you can use example an edit.
```sh
cp .env.example .env
```

To start next-web:

```sh
npm run start:next-web
```

To start nest-api:

```sh
npm run start:nest-api
```

## Technologies Used

- NestJS
- Next.js
- Jest
