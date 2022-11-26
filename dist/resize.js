"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resizeImage = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const sharp_1 = __importDefault(require("sharp"));
const resize = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const imageName = req.query.name;
    const imageWidth = Number(req.query.width);
    const imageHeight = Number(req.query.height);
    const fullImage = path_1.default.normalize(__dirname + '../../images/full/' + imageName);
    const thumbImage = path_1.default.normalize(__dirname +
        '../../images/thumb/' +
        imageName +
        '-' +
        imageWidth +
        '-' +
        imageHeight +
        '.jpg');
    if (!fs_1.default.existsSync(fullImage)) {
        res.status(400).send('There is no image with this name');
        return;
    }
    if (imageWidth < 0 || imageHeight < 0) {
        res.status(400).send('Make sure to enter correct values for height and width');
        return;
    }
    if (!imageWidth || !imageHeight) {
        res.status(400).send('Enter the height and width values');
        return;
    }
    if (fs_1.default.existsSync(thumbImage)) {
        return res.status(200).sendFile(thumbImage);
    }
    else {
        if (req.query.name != null) {
            resizeImage(imageName, imageWidth, imageHeight);
            yield setTimeout(() => {
                return res.status(200).sendFile(thumbImage);
            }, 500);
        }
    }
});
function resizeImage(name, width, height) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield (0, sharp_1.default)('./images/full/' + name)
                .resize({ width: width, height: height })
                .toFile('./images/thumb/' + name + '-' + width + '-' + height + '.jpg');
        }
        catch (error) {
            console.log(error);
        }
    });
}
exports.resizeImage = resizeImage;
exports.default = resize;
