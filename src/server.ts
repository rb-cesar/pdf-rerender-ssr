// server/index.ts
import path from 'path';
import fs from 'fs';

import { createElement } from 'react';
import express from 'express';
import ReactDOMServer from 'react-dom/server';
import ReactPDF, { pdf } from '@react-pdf/renderer';

import { App } from './app/App';
import { PDFTemplate, PDFTemplateProps } from './app/PDFTemplate';
import { faker } from '@faker-js/faker';

const app = express();
const PORT = 5000;

const indexFile = path.resolve(__dirname, '../public/index.html');

app.use(express.static(path.join(__dirname, '..', 'dist/client')));

app.get('/', (req, res) => {
  const appContent = ReactDOMServer.renderToString(createElement(App));

  fs.readFile(indexFile, 'utf8', (err, data) => {
    if (err) {
      console.error('Something went wrong:', err);
      return res.status(500).send('Failed to load the app.');
    }

    return res.send(data.replace('<div id="root"></div>', `<div id="root">${appContent}</div>`));
  });
});

app.get('/pdf', async (_, res) => {
  const data: PDFTemplateProps['data'] = Array.from({ length: faker.number.int({ min: 150, max: 200 }) }).map(() => ({
    id: faker.string.uuid(),
    avatar: faker.image.avatar(),
    name: faker.person.fullName(),
    about: faker.lorem.paragraph({ min: 10, max: 10 }),
  }));
  const pdfStream = await ReactPDF.renderToStream(createElement(PDFTemplate as any, { data } as any));

  res.setHeader('Content-Type', 'application/pdf');

  pdfStream.pipe(res);
  pdfStream.on('end', () => console.log('Done streaming, response send.'));
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
