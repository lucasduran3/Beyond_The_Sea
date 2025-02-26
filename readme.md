# Beyond The Sea

_Beyond The Sea_ es un videojuego de acción 2D en el cual jugador debe enfrentarse a varios enemigos y explorar diferentes escenarios.

El proyecto fue desarrollado por Lucas Durán, Elias Coria y Máximo Gonzáles para el segundo año de la Lincenciatura en Producción de videojuegos y entretenimiento digitial.

Link del videojuego: https://beyond-the-sea.netlify.app/

## Características
- Implementación de Entidades y Componentes en la arquitectura del código
- Utilización de principios SOLID en la programación
- Autenticación de usuarios con Firebase
- API de traducción

## Prerequisites

You'll need [Node.js](https://nodejs.org/en/), [npm](https://www.npmjs.com/), and [Parcel](https://parceljs.org/) installed.

It is highly recommended to use [Node Version Manager](https://github.com/nvm-sh/nvm) (nvm) to install Node.js and npm.

For Windows users there is [Node Version Manager for Windows](https://github.com/coreybutler/nvm-windows).

Install Node.js and `npm` with `nvm`:

```bash
nvm install node

nvm use node
```

Replace 'node' with 'latest' for `nvm-windows`.

Then install Parcel:

```bash
npm install -g parcel-bundler
```

## Getting Started

Clone this repository to your local machine:

```bash
git clone https://github.com/ourcade/phaser3-parcel-template.git
```

This will create a folder named `phaser3-parcel-template`. You can specify a different folder name like this:

```bash
git clone https://github.com/ourcade/phaser3-parcel-template.git my-folder-name
```

Go into your new project folder and install dependencies:

```bash
cd phaser3-parcel-template # or 'my-folder-name'
npm install
```

Start development server:

```
npm run start
```

To create a production build:

```
npm run build
```

Production files will be placed in the `dist` folder. Then upload those files to a web server. 🎉

## License

[MIT License](https://github.com/ourcade/phaser3-parcel-template/blob/master/LICENSE)
