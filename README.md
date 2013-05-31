
shoutpraises
============

At church, I sometimes help display lyrics on the presentation during worship.
Usually people use church presentation software, or just PowerPoint.
However, the people using it have to actively focus on controlling the presentation.

This web based lyrics presentation application can be controlled remotely
via an iPad (or other tablets). This makes it easier for the presentation controller
to join in and delight in worship.


Name
----

I got the name from [__Psalm 150:6__ (CEV)][ps], the last verse in the Psalm book.
Also the default port number 1506 came from the chapter and verse number:

> Let every living creature<br>
> praise the Lord.<br>
> &nbsp; &nbsp;<strong>Shout praises</strong> to the Lord!


Usage
-----

1. Install Node.js
2. Download this repository.
3. Open command prompt, and `cd` to this directory.
4. `npm install` to install required dependencies.
5. `node server.js` to start the server.
6. Add lyrics: create a folder called __lyrics__ and put files there. It should be a `.txt` file.
7. On your presentation computer, navigate to `http://[your IP]:1506/display.html`.
8. On your iPad, navigate to `http://[your IP]:1506/admin.html`.


Lyrics File
-----------

Just make `.txt` files that look like this:

```
name: song name here

line 1
line 2
line 3

line 4
line 5
line 6


line 7
line 8
line 9
```

A blank line lets you split part of a verse into multiple slides.
Two consecutive blank lines separate between verses.

I don't recommend that lyrics slides have a duration of more
than 15 seconds—consider splitting them into multiple slides.


[ps]: http://www.biblegateway.com/passage/?search=Psalm+150%3A6&version=CEV



