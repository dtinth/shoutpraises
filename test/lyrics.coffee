
lyrics = require('../lyrics')

describe 'lyrics', ->

  folder = __dirname + '/fixture/lyrics'

  it 'should return the lyrics it found', ->
    lyrics.scan(folder).get('length').should.eventually.equal(2)

  it 'should return the lyrics sorted by file name', ->
    lyrics.scan(folder).then (array) ->
      array[0].name.should.equal('Example')
      array[1].name.should.equal('Test 1')

  it 'it should group the contents', ->
    lyrics.scan(folder).then (array) ->
      contents = array[0].contents
      contents.length.should.equal(2)
      contents[0].length.should.equal(2)
      contents[1].length.should.equal(3)
      contents[0][0].text.length.should.equal(2)
      contents[0][1].text.length.should.equal(3)
      contents[1][0].text.length.should.equal(2)
      contents[1][1].text.length.should.equal(2)
      contents[1][2].text.length.should.equal(1)
      contents[0][0].text[0].should.equal('This is an example.')

