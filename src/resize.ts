import express from 'express';
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const resize = async (req: express.Request, res: express.Response) => {
   const imageName = req.query.name;
   const imageWidth = Number(req.query.width);
   const imageHeight = Number(req.query.height);
   const fullImage: string = path.normalize(
      __dirname + '../../images/full/' + imageName
   );
   const thumbImage: string = path.normalize(
      __dirname +
         '../../images/thumb/' +
         imageName +
         '-' +
         imageWidth +
         '-' +
         imageHeight +
         '.jpg'
   );

   if (!fs.existsSync(fullImage)) {
      res.status(400).send('There is no image with this name');
      return;
   }
   if (imageWidth < 0 || imageHeight < 0) {
      res.status(400).send(
         'Make sure to enter correct values for height and width'
      );
      return;
   }
   if (!imageWidth || !imageHeight) {
      res.status(400).send('Enter the height and width values');
      return;
   }

   if (fs.existsSync(thumbImage)) {
      return res.status(200).sendFile(thumbImage);
   } else {
      if (req.query.name != null) {
         resizeImage(
            imageName as string,
            imageWidth as unknown as number,
            imageHeight as unknown as number
         );

         await setTimeout(() => {
            return res.status(200).sendFile(thumbImage);
         }, 500);
      }
   }
};

async function resizeImage(name: string, width: number, height: number) {
   try {
      await sharp('./images/full/' + name)
         .resize({ width: width, height: height })
         .toFile(
            './images/thumb/' + name + '-' + width + '-' + height + '.jpg'
         );
   } catch (error) {
      console.log(error);
   }
}

export { resizeImage };

export default resize;
