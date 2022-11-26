# Application resize images
# This is how you use the Image Processing API

### The endpoint ("/") is the home page.
### The endpoint ("/images") is where the image is processed.

## To resize the image, you need to do the following:
1- Make sure the image is in the "full" folder.

2- In the title bar, add the image's name, width, and height, in that order.
Example:
http://localhost:3000/image?name=fjord.jpg&width=300&height=700
4- If the API detects that the thumbnail already exists, it will not do any processing, and a message will tell you that the thumbnail already exists

5- If the process is successful, the thumbnail will be saved in the "thumb" folder

6- The thumbnail will be saved with the original name of the image + the new width and height (fjord.jpg-300-750.jpg)
## to start the test
npm run test //
## to start building
npm run build
## To start the application
npm start