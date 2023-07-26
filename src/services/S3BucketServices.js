import config from '../config.json';
import S3Bucket from 'react-s3';

const S3BucketServices = {
    uploadImage: (file) => {
        return new Promise((res, rej) => {
            S3Bucket.uploadFile(file, config['aws-s3'])
                .then(data => {
                    res(data);
                })
                .catch(error => {
                    rej(error);
                });

        });
    },
    deleteImage: (fileName) => {
        return new Promise((res, rej) => {
            S3Bucket.deleteFile(fileName, config['aws-s3'])
                .then(data => {
                    res(data);
                })
                .catch(error => {
                    rej(error);
                });

        });
    }
}

export default S3BucketServices;