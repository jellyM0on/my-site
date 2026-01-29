## About 
This project is my portfolio site built using different AWS services to learn more about them. 

The frontend files are stored in a S3 bucket served through a CloudFront distribution. Previously, it had a visitor counter works through a Lambda HTTP API. To check this version, see https://github.com/jellyM0on/my-site/tree/ver1

To streamline deployments, it integrates a CI/CD pipeline to automatically update the S3 files for the frontend. 

## Stack
- Frontend: JavaScript, Bootstrap
- Hosting: AWS S3, CloudFront, Route53


