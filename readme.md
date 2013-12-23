# next big sound
## simple D3 visualization

This d3.js graph plots several female musicians' Facebook likes over the period of 2013.

A json file was piped as data into a function called 'draw'.  This 'draw' function took two arguments, the data, and the artists' id number.

Here's the HTTP get request link that I used:
`[https://api.nextbigsound.com/metrics/v1/entityData?start=2013-01-01&end=2014-01-01&metrics=11&entities=143,5774,659,4599,303701,2727&access_token=[xyz]](https://api.nextbigsound.com/metrics/v1/entityData?start=2013-01-01&end=2014-01-01&metrics=11&entities=143,5774,659,4599,303701,2727&access_token=xyz`

(replace [xyz] with API key)
