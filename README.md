

## Koneseppä - Computer build shop
![Medusa Hackathon 2022](https://i.imgur.com/ji999v7.png)

## About

### Participants
Roni Äikäs - @raikasdev

### Description

An storefront that utilizes MedusaJS to allow users to choose from variety of prebuilt computers or design their own by choosing components with an easy to use UI.

Will actually be using this for my computer build shop. There might be some Finnish (wrote first in Finnish and then translated back to english for submission).

### Preview

< PUT PREVIEW HERE >

## Set up Project

Welcome to the tricky section, as this storefront is pretty customized to my use case.

### Prerequisites
Before you start with the tutorial make sure you have

- [Node.js](https://nodejs.org/en/) v14 or greater installed on your machine
- [Medusa server](https://docs.medusajs.com/quickstart/quick-start/) v1.5.0 or greater installed on your machine
- Redis, Postgres and a storage plugin recommended

#### Setupping the server/products

Collections with metadata "set" == 0 will show up in the "Prebuilts" section, and "set" == 1 will show up in the "Accessories" section. \
Each designer category (cpu, gpu, case, psu...) requires its own collection, that has the metadata property "designer" set to the designed component. \
Subtitles are used for designer item data storage in the following format:

key=value;key2=value2;key3=[arrayvalue1,arrayvalue2]

Processors, coolers and motherboards need to have the "socket" value set to the supported socket (for coolers that support multiple sockets, use arrays)

Product descriptions are shown to the users, but designer category texts are hardcoded, and need to modified in code.

### Install Project

1. Clone the repository:

```bash
git clone https://github.com/raikasdev/koneseppa
```

2. Change directory and install dependencies:

```bash
cd koneseppa
yarn install
```
4.  Start the app
```
yarn dev
```

## Resources
- [Medusa’s GitHub repository](https://github.com/medusajs/medusa)
- [Medusa Admin Panel](https://github.com/medusajs/admin)
- [Medusa Documentation](https://docs.medusajs.com/)