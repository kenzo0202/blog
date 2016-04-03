var gulp        = require('gulp');
var glob        = require('glob-all');
var filelog     = require('gulp-filelog');
var changed     = require('gulp-changed');
var imageResize = require('gulp-image-resize');


gulp.task( 'image-resize:eyecatch', function(){
  var srcGlobs   = glob.sync('source/articles/**/images/');
  var srcDir     = 'origin';
  var dstDir     = 'eyecatch';
  var targetFile = '/*.+(jpg|jpeg|png|gif)';

  var resizeOptions = {
    width       : 400,
    height      : 400,
    gravity     : 'Center',
    crop        : true,
    upscale     : false,
    imageMagick : true
  };

  var imageminOptions = {
    optimizationLevel: 7
  };

  for(var item in srcGlobs) {
    var srcGlob = srcGlobs[item] + srcDir + targetFile;
    var dstGlob = srcGlobs[item] + dstDir;

    gulp.src( srcGlob )
      .pipe(changed( dstGlob ))
      .pipe(imageResize( resizeOptions ))
      .pipe(gulp.dest( dstGlob ))
      .pipe(filelog());
  }
});

gulp.task( 'image-resize', ['image-resize:eyecatch'] );