import assert from 'assert'
import path from 'path'
import ImageHelpers from './ImageHelpers'

describe('ImageHelpers', () => {
  const imagePath           = path.join('.', 'src', 'tests', 'beach.jpg')
  const expectedFileTypeJpg = 'jpg'
  const imageHelpers        = new ImageHelpers(imagePath)

  const imagePathPng        = path.join('.', 'src', 'tests', 'beach.png')
  const expectedFileTypePng = 'png'
  const imageHelpersPng     = new ImageHelpers(imagePathPng)

  describe('#open()', () => {
    it('should open image without error', async () => {
      const lwipImage = await imageHelpers.open()
      assert.equal(typeof lwipImage, 'object')
    })
  })

  describe('#toBuffer()', () => {
    it('should convert image to Buffer object', async () => {
      const imageBuffer = await imageHelpers.toBuffer(imagePath)
      assert.equal(typeof imageBuffer, 'object')
      assert.equal(imageBuffer instanceof Buffer, true)
    })
  })

  describe('#dimensions()', async () => {
    it('should get valid dimensions of image', async () => {
      const lwipImage             = await imageHelpers.open(imagePath)
      const [width, height]       = [lwipImage.width(), lwipImage.height()]
      const [widthDim, heightDim] = await imageHelpers.dimensions(imagePath)
      assert.equal(width, widthDim)
      assert.equal(height, heightDim)
    })
  })

  describe('static #hexToRgb()', () => {
    it(`should return {r:0, g:0, b:0} when provided hex value of '#000000'`, () => {
      assert.equal(0, ImageHelpers.hexToRgb('#000000').r)
      assert.equal(0, ImageHelpers.hexToRgb('#000000').g)
      assert.equal(0, ImageHelpers.hexToRgb('#000000').b)
    })

    it(`should return {r:255, g:255, b:255} when provided hex value of '#FFFFFF'`, () => {
      assert.equal(255, ImageHelpers.hexToRgb('#FFFFFF').r)
      assert.equal(255, ImageHelpers.hexToRgb('#FFFFFF').g)
      assert.equal(255, ImageHelpers.hexToRgb('#FFFFFF').b)
    })
  })
})
