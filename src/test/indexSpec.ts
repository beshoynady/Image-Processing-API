import app from '../index';
import supertest from 'supertest';
import { resizeImage } from '../resize';
import path from 'path';
import fs from 'fs';

const request = supertest(app);

describe('Test image endpoint response', () => {
   const imagename1 = 'fjord.jpg';
   const imagewidth1 = 200;
   const imageheight1 = 200;
   it('gets the / endpoint', async () => {
      const response = await request.get(
         `/image?name=${imagename1}&width=${imagewidth1}&height=${imageheight1}`
      );
      expect(response.status).toBe(200);
   });

   it('Test to enter the wrong image name', async () => {
      const response = await request.get(
         `/image?name=noname.jpg&width=${imagewidth1}&height=${imageheight1}`
      );
      expect(response.text).toBe('There is no image with this name');
   });

   it('Test to enter the wrong width and height of the image', async () => {
      const imagewidth1 = -200;
      const response = await request.get(
         `/image?name=${imagename1}&width=${imagewidth1}&height=${imageheight1}`
      );
      expect(response.text).toBe(
         'Make sure to enter correct values for height and width'
      );
   });

   it('Test to enter the wrong width or height of the image', async () => {
      const response = await request.get(
         `/image?name=${imagename1}&width=${imagewidth1}`
      );
      expect(response.text).toBe('Enter the height and width values');
   });
});

describe('test resize function', () => {
   it('test the output of the resize function', async () => {
      const testImageName = 'santamonica.jpg';
      const testImagePath = path.normalize(
         __dirname +
            '../../images/thumb/' +
            testImageName +
            '-' +
            '200' +
            '-' +
            '200' +
            '.jpg'
      );
      await resizeImage(testImageName, 200, 200);
      expect(fs.existsSync(testImagePath)).toBeTrue;
   });
});
