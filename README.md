# image-processing-api
This is a project for Full Stack JavaScript Developer - MCIT Nanodegree Program. And the goal of this project is to create two tasks. And those are a placeholder API and image scaling library.
## Installation
```
$ clone https://github.com/mssalkhalifah/image-processing-api.git
$ cd image-processing-api
$ npm install
```
### npm scripts
#### Build
```
npm run build
```
This will compile the typescript code and place it in ./dist
#### Test
```
npm test
```
This will run eslint first for any linting error. After that, build it then run jasmine for unit testing.
#### Start
```
npm start
```
Will build, unit test and then run nodemon to start the server.
## Api query
`/api/image?filename=Name[&width=ImageWidth][&height=ImageHeight]`
|Parameters|Description|
|:-------------:|:-:|
| filename | The name of the file.|   
| width |Optional parameter for changing the image width.| 
| height |Optional parameter for changing the image height.|
## Example
![firefox_xn0KEW7LJc](https://user-images.githubusercontent.com/60398196/195410389-add235f9-010d-44a8-b780-885b55da60c1.gif)

