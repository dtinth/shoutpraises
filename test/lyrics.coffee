
lyrics = require('../lyrics')

describe 'lyrics', ->

  folder = __dirname + '/fixture/lyrics'

  it 'should return the lyrics it found', ->
    lyrics.scan(folder).get('length').should.eventually.equal(2)

  it 'should return the lyrics sorted by file name', ->
    lyrics.scan(folder).then (array) ->
      array[0].name.should.equal('Example')
      array[1].name.should.equal('Test 1')
      array[0].filename.should.equal('example')

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

  it 'should get the timing data', ->
    lyrics.scan(folder).then (array) ->
      contents = array[1].contents
      contents[0][0].text[0].should.equal('First line')
      contents[0][0].text[1].should.equal('Second line')
      contents[0][0].text[2].should.equal('Third line')
      contents[0][0].timing[0].should.deep.equal([0.5,0.5])
      contents[0][0].timing[1].should.deep.equal([0.25,0.5,0.25])
      contents[0][0].timing[2].should.deep.equal([0.25,0.25,0.25,0.25])
      contents[0][1].text[0].should.equal('Fourth line')
      contents[0][1].timing[0].should.deep.equal([])
    

