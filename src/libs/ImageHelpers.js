import lwip from 'pajk-lwip'
// import * as imagetype from 'image-type'
const imageType = require('image-type')

export default class ImageHelpers {
  constructor(imageInfo, options={}) {
    this._image = imageInfo
  }

  open(...args) {
    return new Promise((resolve, reject) => {
      let image = this._image
      let imgType = null
      switch (args.length) {
        case 2:
          image = args[0]
          imgType = args[1]
          break
        case 1:
          image = args[0]
          break
      }

      if (typeof image === 'object' && image != null && image.toString() === '[object Object]')
        return resolve(image)

      if (image instanceof Buffer) {
        return lwip.open(image, imageType(image).ext, (err, image) => {
          if (err) return reject(err)
          return resolve(image)
        })
      }

      if (imgType) {
        return lwip.open(image, imgType, (err, image) => {
          if (err) return reject(err)
          return resolve(image)
        })
      }

      lwip.open(image, (err, image) => {
        if (err) return reject(err)
        return resolve(image)
      })
    })
  }

  clone(image=this._image) {
    return new Promise(async (resolve, reject) => {
      try {
        const lwipImage = await this.open(image)
        lwipImage.clone((err, newImage) => {
          if (err) return reject(err)
          return resolve(newImage)
        })
      } catch(err) {
        reject(err)
      }
    })
  }

  toBuffer(...args) {
    return new Promise(async (resolve, reject) => {
      try {
        let image = this._image
        let format = 'png'
        let options = null
        switch (args.length) {
          case 3:
            image = args[0]
            format = args[1]
            options = args[2]
            break
          case 2:
            image = args[0]
            format = args[1]
            break
          case 1:
            image = args[0]
            break
        }

        const lwipImage = await this.open(image)

        if (options) {
          lwipImage.toBuffer(format, options, (err, newBuffer) => {
            if (err) return reject(err)
            resolve(newBuffer)
          })
        } else {
          lwipImage.toBuffer(format, (err, newBuffer) => {
            if (err) return reject(err)
            resolve(newBuffer)
          })
        }
      } catch (err) {
        reject(err)
      }
    })
  }

  async dimensions(...args) {
    let image = this._image
    switch (args.length) {
      case 1:
        image = args[0]
        break
    }

    const lwipImage = await this.open(image)
    return [
      lwipImage.width(),
      lwipImage.height()
    ]
  }

  paste(...args) {
    return new Promise(async (resolve, reject) => {
      try {
        let mainImage = this._image
        let imageBeingPastedOntoMain = args[0]
        let left = 0
        let top = 0
        switch (args.length) {
          case 4:
            mainImage = args[0]
            imageBeingPastedOntoMain = args[1]
            left = args[2]
            top = args[3]
          case 3:
            imageBeingPastedOntoMain = args[0]
            left = args[1]
            top = args[2]
            break
          case 2:
            mainImage = args[0]
            imageBeingPastedOntoMain = args[1]
            break
          case 1:
            imageBeingPastedOntoMain = args[0]
            break
        }

        const lwipMainImg   = await this.open(mainImage)
        const lwipPasteImg  = await this.open(imageBeingPastedOntoMain)
        lwipMainImg.paste(left, top, imageBeingPastedOntoMain, (err, newImage) => {
          if (err)
            return reject(err)
          resolve(newImage)
        })
      } catch(err) {
        reject(err)
      }
    })
  }

  static colorAverage(colorArray) {
    let rgbSum = colorArray.reduce((memo, color) => {
      if (typeof color === 'string') color = ImageHelpers.hexToRgb(color)
      memo.r += color.r
      memo.g += color.g
      memo.b += color.b
      memo.a += (typeof color.a !== 'undefined') ? ((color.a === 0) ? 0 : (color.a || 100)) : 100
      return memo
    }, {r:0, g:0, b:0, a:0})

    rgbSum.r = Math.round(rgbSum.r / colorArray.length)
    rgbSum.g = Math.round(rgbSum.g / colorArray.length)
    rgbSum.b = Math.round(rgbSum.b / colorArray.length)
    rgbSum.a = Math.round(rgbSum.a / colorArray.length)
    return rgbSum
  }

  static hexToRgb(hexColor='#000000') {
    hexColor = ImageHelpers.hexToSix(hexColor)
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hexColor)
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null
  }

  static hexToSix(hex='#000') {
    hex = hex.replace('#','')
    if (hex.length === 3) {
      return '#' + hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2]
    }
    return hex
  }
}
