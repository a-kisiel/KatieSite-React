import React, { useEffect, useState } from 'react';
import AWS from 'aws-sdk';
import credentials from '../credentials';

import '../styles/menu.css';
import '../styles/upload.css';

// Connect to Mongo
// Mongo cluster: username/password
// Add function to hash passwords based on credentials string?
const currentUser = {};
currentUser.name = 'Alex';

// EC2 instance
// Convert to webp

// S3 Operations

// S3 config/init
AWS.config.update({
    accessKeyId: credentials.ACCESS_ID,
    secretAccessKey: credentials.ACCESS_KEY,
    region: credentials.REGION,
});
const s3 = new AWS.S3();

const bucket_params = {
    Bucket: credentials.BUCKET_NAME,
}

// Upload to S3
async function addImage(file, metadata) {

}

// Tiles for each img
async function getImages() {
    console.log('here')
    const s3_images = [];
    let s3_images_promise = await new Promise((resolve) => {
        s3.listObjectsV2(bucket_params, async (err, data) => {
            if (!err) {
                for (let i=1; i<data.Contents.length; i++) {
                    if (data.Contents[i].Key === 'uncompressed/' || data.Contents[i].Key === 'webps/')
                        continue;
                    
                    // Jankily wait for img metadata to be parsed
                    let get_metadata = await new Promise((resolve) => {
                        s3.headObject({Bucket: bucket_params.Bucket, Key: data.Contents[i].Key}, async (err, data2) => {
                            if (err)
                                console.log(err)
                            else {
                                s3_images.push(
                                    <div className="img-tile">
                                        <div style={{backgroundImage: 'https://katieart.s3.us-east-2.amazonaws.com/' + data.Contents[i].Key,}}></div>
                                        <div>
                                            <div className="metadata">
                                                <div>{data2.Metadata.title}</div>
                                                <div>{data2.Metadata.medium}</div>
                                                <div>{data2.Metadata.date}</div>
                                            </div>
                                            <div className="edit-img">Edit</div>
                                        </div>
                                    </div>
                                );
                                resolve();
                            }
                        });
                    });
                }
            }
        });
        resolve();
    });
    return s3_images;
}

async function getImagesLocal() {

    const imgs = [];

    const img_data = [
        { title: 'Test title', medium: 'Paint', date: '12/11/2021', img: 'https://www.katiekisiel.com/static/media/Slushy_Alley_(Day)=Oil_Paint=3$4$2020.aa7f7d67.jpg'},
        { title: 'Test title', medium: 'Paint', date: '12/11/2021', img: 'https://www.katiekisiel.com/static/media/Slushy_Alley_(Day)=Oil_Paint=3$4$2020.aa7f7d67.jpg'},
        { title: 'Test title', medium: 'Paint', date: '12/11/2021', img: 'https://www.katiekisiel.com/static/media/Slushy_Alley_(Day)=Oil_Paint=3$4$2020.aa7f7d67.jpg'},
        { title: 'Test title', medium: 'Paint', date: '12/11/2021', img: 'https://www.katiekisiel.com/static/media/Slushy_Alley_(Day)=Oil_Paint=3$4$2020.aa7f7d67.jpg'},
        { title: 'Test title', medium: 'Paint', date: '12/11/2021', img: 'https://www.katiekisiel.com/static/media/Slushy_Alley_(Day)=Oil_Paint=3$4$2020.aa7f7d67.jpg'},
        { title: 'Test title', medium: 'Paint', date: '12/11/2021', img: 'https://www.katiekisiel.com/static/media/Slushy_Alley_(Day)=Oil_Paint=3$4$2020.aa7f7d67.jpg'},
    ]

    for(let i=0; i<img_data.length; i++) {
        imgs.push(
            <div className="img-tile">
                <div></div>
                <div>
                    <div className="metadata">
                        <div>{img_data[i].title}</div>
                        <div>{img_data[i].medium}</div>
                        <div>{img_data[i].date}</div>
                    </div>
                    <div className="edit-img">Edit</div>
                </div>
            </div>
        );
    }
    console.log(imgs)
    return imgs;
}

// Alter metadata for an existing img
async function setMetadata(metadata) {

}

var full_gallery = null;

export default function Upload() {
    const [gallery, setGallery] = useState(null);
    
    useEffect(() => {
        if (full_gallery === null) {
            getImagesLocal()
            .then((g) => {
                console.log(g)
                full_gallery = g;
                setGallery(g);
            });
        }
        setGallery(full_gallery);
    })

    return (
        <div style={{maxWidth:2400, margin: 'auto'}}>
            <div className="upload-menu">
                <div>Upload Center</div>
                <div>Hey, {currentUser.name}</div>
            </div>
            <div className="upload-new">
                <div>
                    <div>Upload a new img</div>
                    <img src="/" alt="+" />
                </div>
            </div>
            <div className="active-imgs-wrap">
                {gallery}
            </div>
        </div>
    )
}