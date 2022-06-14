const gulp = require('gulp');
const GulpSSH = require('gulp-ssh');
const { exec } = require('child_process');
const ecsPath = '/www/wwwroot/techh5.diandiantn.com/0305-anmo/public/h5';

const gulpSSH = new GulpSSH({
  ignoreErrors: false,
  sshConfig: {
    host: '115.239.209.120',
    port: 22,
    username: 'root',
    password: 'kjj7Sin3Y5XJj9BT',
  },
});

// 本地打包
gulp.task('upload-before', (cb) => exec('npm run build', (err, stdout, stderr) => {
  console.log(stdout);
  console.log(stderr);
  cb(err);
}));


gulp.task('upload-sftp', () => gulp.src('./dist/build/h5/**/*')
  .pipe(gulpSSH.dest(ecsPath)));

// 打包并发布
gulp.task('build', gulp.series('upload-before', 'upload-sftp'));
