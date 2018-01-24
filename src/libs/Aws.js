import fs from 'fs'
import url from 'url'
import AWS from 'aws-sdk'
import config from '../config'

export default function Aws(options={}) {
  const accessKeyId = options.accessKeyId || process.env.AWS_ACCESS_KEY_ID
  const secretAccessKey = options.secretAccessKey || process.env.AWS_SECRET_ACCESS_KEY

  return {
    S3: {
      _s3: new AWS.S3({ accessKeyId: accessKeyId, secretAccessKey: secretAccessKey }),
      defaultbucket: options.bucket || config.aws.s3.bucket,

      getFile(options) {
        return new Promise((resolve, reject) => {
          const filename = options.filename
          const bucket = options.bucket || this.defaultbucket
          const extraOptions = options.options || {}
          const params = Object.assign({Bucket: bucket, Key: filename}, extraOptions)
          // Note the raw buffer data in the file is returned in callback(err,data) {}
          // as data.Body
          this._s3.getObject(params, (err, result) => {
            if (err) return reject(err)
            resolve(result)
          })
        })
      },

      getFileStreamWithBackoff(streamToPipeTo, options, backoffAttempt=1) {
        const totalAllowedBackoffTries = 5
        const backoffSecondsToWait = 2 + Math.pow(backoffAttempt, 2)
        const sleep = () => new Promise(resolve => setTimeout(resolve, backoffSecondsToWait * 1000))

        return new Promise((resolve, reject) => {
          const filename = options.filename
          const bucket = options.bucket || this.defaultbucket
          const extraOptions = options.options || {}
          const params = Object.assign({Bucket: bucket, Key: filename}, extraOptions)

          this._s3.getObject(params).createReadStream()
          .on('error', async (err, response) => {
            if (backoffAttempt > totalAllowedBackoffTries)
              return reject(err)

            try {
              await sleep()
              await this.getFileStreamWithBackoff(streamToPipeTo, options, backoffAttempt + 1)
              resolve()
            } catch(e) {
              reject(e)
            }
          })
          .on('end', resolve)
          .pipe(streamToPipeTo)
        })
      },

      getFileUrl(options) {
        return new Promise((resolve, reject) => {
          const filename = options.filename
          const bucket = options.bucket || this.defaultbucket
          const params = {Bucket: bucket, Key: filename}
          this._s3.getSignedUrl('getObject', params, (err, result) => {
            if (err) return reject(err)
            resolve(result)
          })
        })
      },

      writeFile(options) {
        return new Promise((resolve, reject) => {
          const bucket = options.bucket || this.defaultbucket
          const data = options.data
          const filename = (!options.exact_filename) ? getFileName(options.filename) : options.filename
          const params = {Bucket: bucket, Key: filename, Body: data}
          this._s3.putObject(params, (err, returnedData) => {
            if (err) return reject(err)
            resolve({filename:filename, data:returnedData})
          })
        })
      },

      createBucket(bucketName) {
        return new Promise((resolve, reject) => {
          this._s3.createBucket({Bucket: bucketName}, (err, result) => {
            if (err) return reject(err)
            resolve(result)
          })
        })
      }
    }
  }
}

function getFileName(fileName, extraText=Date.now()) {
  const lastPeriod = fileName.lastIndexOf(".")
  return `${fileName.substring(0, lastPeriod)}_${extraText}${fileName.substring(lastPeriod)}`
}
