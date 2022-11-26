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
const index_1 = __importDefault(require("../index"));
const supertest_1 = __importDefault(require("supertest"));
const resize_1 = require("../resize");
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const request = (0, supertest_1.default)(index_1.default);
describe('Test image endpoint response', () => {
    const imagename1 = 'fjord.jpg';
    const imagewidth1 = 200;
    const imageheight1 = 200;
    it('gets the / endpoint', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get(`/image?name=${imagename1}&width=${imagewidth1}&height=${imageheight1}`);
        expect(response.status).toBe(200);
    }));
    it('Test to enter the wrong image name', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get(`/image?name=noname.jpg&width=${imagewidth1}&height=${imageheight1}`);
        expect(response.text).toBe('There is no image with this name');
    }));
    it('Test to enter the wrong width and height of the image', () => __awaiter(void 0, void 0, void 0, function* () {
        const imagewidth1 = -200;
        const response = yield request.get(`/image?name=${imagename1}&width=${imagewidth1}&height=${imageheight1}`);
        expect(response.text).toBe('Make sure to enter correct values for height and width');
    }));
    it('Test to enter the wrong width or height of the image', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get(`/image?name=${imagename1}&width=${imagewidth1}`);
        expect(response.text).toBe('Enter the height and width values');
    }));
});
describe('test resize function', () => {
    it('test the output of the resize function', () => __awaiter(void 0, void 0, void 0, function* () {
        const testImageName = 'santamonica.jpg';
        const testImagePath = path_1.default.normalize(__dirname +
            '../../images/thumb/' +
            testImageName +
            '-' +
            '200' +
            '-' +
            '200' +
            '.jpg');
        yield (0, resize_1.resizeImage)(testImageName, 200, 200);
        expect(fs_1.default.existsSync(testImagePath)).toBeTrue;
    }));
});
