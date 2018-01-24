import bunyan from 'bunyan'
import Aws from '../libs/Aws'
import config from '../config'

const log = bunyan.createLogger(config.logger.options)
const s3 = Aws().S3

export default async function fileDownloadS3(req, res) {
  const bucket    = config.aws.s3.bucket
  const filename  = req.params[0]
  const params    = { Bucket: bucket, Key: filename }

  try {
    await s3.getFileStreamWithBackoff(res, { bucket: bucket, filename: filename })
  } catch (err) {
    res.status(500).json(err.toString())
    return log.error(err)
  }
}
