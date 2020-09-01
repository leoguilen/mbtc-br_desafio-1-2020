import path from 'path';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const zipper = require('zip-local');

const UPLOADS_PATH = path.join(__dirname, '..', 'uploads');

const zipDir = (): void => {
  zipper.zip(UPLOADS_PATH, function (error, zipped) {

    if (!error) {
      zipped.compress();

      zipped.save(`${UPLOADS_PATH}/uploads.zip`, function (error) {
        if (!error) {
          console.log('directory saved successfully!');
        }
      });
    }
  });
};

export default zipDir;





