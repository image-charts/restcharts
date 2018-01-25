import assert from 'assert'
import async_waterfall from 'async/waterfall'
import RedisHelper from './RedisHelper'

const redis = new RedisHelper('redis://localhost:6379')

describe('RedisHelper', () => {
  before(`clear all test keys from database`, async () => {
    await redis.delete_keys_like('test_*')
  })

  describe(`#keys()`, () => {
    it(`should return all keys that match the pattern as expected`, async () => {
      await redis.set('test_keys_match_1', 'value')
      await redis.set('test_keys_match_2', 'value')
      await redis.set('test_keys_do_not_match_3', 'value')
      const results = await redis.keys('test_keys_match*')

      assert.equal(true, results instanceof Array)
      assert.equal(2, results.length)
    })
  })

  describe(`#set()`, () => {
    after(`clear 'test_1'`, async () => {
      return await redis.del('test_1')
    })

    it(`should set key without error with callback`, done => {
      redis.set('test_1', 'value', done)
    })

    it(`should set key without error using async/await`, async () => {
      return await redis.set('test_1', 'value')
    })

    it(`should set key and ttl without error using async/await`, async () => {
      await redis.set('test_1', 'value', {ttl: 1000})
      const result = await redis.get('test_1')
      const ttl = await redis.ttl('test_1')

      assert.equal('value', result)
      assert.equal(true, ttl <= 1000 && ttl > 0)
    })
  })

  describe(`#setnx()`, () => {
    after(`clear 'test_1'`, async () => {
      return await redis.delete_keys_like('test_*')
    })

    it (`should set key without error using async/await`, async () => {
      const val1 = await redis.setnx('test_1_setnx', 'value')
      const val0 = await redis.setnx('test_1_setnx', 'value')

      assert.equal(1, val1)
      assert.equal(0, val0)
    })
  })

  describe(`#setnxex()`, () => {
    after(`clear 'test_1'`, async () => {
      return await redis.delete_keys_like('test_*')
    })

    it (`should set key and TTL without error using async/await`, async () => {
      const valOk = await redis.setnxex('test_1_setnxex', 'value', 60)
      const valNull = await redis.setnxex('test_1_setnxex', 'value', 60)
      const t = await redis.ttl('test_1_setnxex')

      assert.equal('OK', valOk)
      assert.equal(null, valNull)
      assert.equal(true, t <= 60 && t > 0)
    })
  })

  describe(`#get()`, () => {
    before(`set 'test_2'`, async () => {
      return await redis.set('test_2', 'value2')
    })
    after(`clear 'test_2'`, async () => {
      return await redis.del('test_2')
    })

    it(`should set key without error with callback`, done => {
      redis.get('test_2', done)
    })

    it(`should set key without error using async/await`, async () => {
      const result = await redis.get('test_2')
      assert.equal('value2', result)
    })
  })

  describe('#lrange() && #lrangeBatch()', () => {
    const key1 = 'test_list_1'
    const key2 = 'test_list_2'
    const redisCompressed = new RedisHelper('redis://localhost:6379', true)

    before('populate list', async () => {
      await redis.rpush(key1, 'val1')
      await redis.rpush(key1, 'val2')
      await redis.rpush(key1, 'val3')
      await redis.rpush(key1, 'val4')
      await redis.rpush(key1, 'val5')
      await redisCompressed.rpush(key2, 'val1')
      await redisCompressed.rpush(key2, 'val2')
      await redisCompressed.rpush(key2, 'val3')
      await redisCompressed.rpush(key2, 'val4')
      await redisCompressed.rpush(key2, 'val5')
    })

    after('clear list', async () => {
      await redis.del(key1)
      await redis.del(key2)
    })

    describe ('#lrange', () => {
      it('should get the first 2 entries in the list', async () => {
        const vals = await redis.lrange(key1, 0, 1)
        assert.equal(2, vals.length)
        assert.equal('val1', vals[0])
        assert.equal('val2', vals[1])
      })

      it('COMPRESSED: should get the first 2 entries in the list', async () => {
        const vals = await redisCompressed.lrange(key2, 0, 1)
        assert.equal(2, vals.length)
        assert.equal('val1', vals[0])
        assert.equal('val2', vals[1])
      })
    })

    describe('#lrangeBatch', () => {
      it('should get all entries without error with batch size of 2', async () => {
        const listLength = await redis.lrangeBatch(key1, async vals => {
          assert.equal(true, [1, 2].filter(length => length == vals.length).length > 0)
        }, 2)

        assert.equal(5, listLength)
      })

      it('COMPRESSED: should get all entries without error with batch size of 2', async () => {
        const listLength = await redisCompressed.lrangeBatch(key2, async vals => {
          assert.equal(true, [1, 2].filter(length => length == vals.length).length > 0)
        }, 2)

        assert.equal(5, listLength)
      })
    })
  })

  describe(`#zsetadd()`, () => {
    const zsetKey = 'test_zset_1'
    after(`clear the sorted set`, async () => await redis.del(zsetKey))

    it(`should add to the sorted set without erroring`, async () => {
      await redis.zsetadd(zsetKey, JSON.stringify({key: 'val1'}), 123)

      const data = await redis.zall(zsetKey)
      const data123Parsed = JSON.parse(data[123])

      assert.equal(123, Object.keys(data)[0])
      assert.equal('val1', data123Parsed.key)
    })
  })

  describe(`#parseData()`, () => {
    const key = 'test_compress_1'
    const redisCompressed = new RedisHelper('redis://localhost:6379', true)
    afterEach('clear keys', async () => {
      await redisCompressed.del(key)
    })

    it('should be a valid base64 string on deflate, then be a valid Buffer and the correct value on inflate', async () => {
      const base64string = await redisCompressed.parseData('lance123')
      const buff         = await redisCompressed.parseData(base64string, false)
      const lance123     = buff.toString()

      assert.equal(true, typeof base64string === 'string')
      assert.equal(true, buff instanceof Buffer)
      assert.equal('lance123', lance123)
    })

    it('should copmress the input value and decompress it back to the normal string on #set/#get', async () => {
      await redisCompressed.set(key, 'lance123')
      const val = await redisCompressed.get(key)
      assert.equal(val, 'lance123')
    })
  })

  it(`#del() should delete key without error`, async () => {
    await redis.del('test_1')
    return true
  })

  it(`#getAndDelete() should get the value and delete the key without error`, done => {
    async_waterfall([
      callback => redis.set('test_1', 'value', callback),
      (r, callback) => redis.getAndDelete('test_1', callback),
      (val, callback) => redis.get('test_1', (e, v) => callback(e, v, val))
    ], (err, shouldBeNull, shouldBeValue) => {
      if (err) return done(err)
      done(assert.equal(null, shouldBeNull) || assert.equal('value', shouldBeValue))
    })
  })
})
