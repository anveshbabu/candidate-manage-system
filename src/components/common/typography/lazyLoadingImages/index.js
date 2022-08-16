import React, { Component, useEffect, useState, memo } from 'react';
import defaultImage from '../../'
import {letterAvatar} from '../../../../services/helperFunctions'


export const LazyLoadImage = (props) => {
    const [showDefault, setShowDefault] = useState(true)
    const [imageData, setImageData] = useState('')




    let {
        src = '',
        alt = '',
        name='',
        defaultImage = letterAvatar(name,40),
        className='',
      
    } = props;

    useEffect(() => {
       
        if(!!src){
            urlContentToDataUri(src).then(dataUri => {
                setShowDefault(false);
                setImageData(dataUri)
            }).catch(error => {
                console.log('-------error-----')
                setShowDefault(true)
                setImageData('')
            });
        }
        

    }, []);

    useEffect(() => {
        urlContentToDataUri(src).then(dataUri => {
            setShowDefault(!dataUri);
            setImageData(dataUri)
        }).catch(error => {
            console.log('------------')
            setShowDefault(true)
            setImageData('')
        });

    }, [props?.src])



    const urlContentToDataUri = (src) => {
        const allowedFileTypes = ["image/png", "image/jpeg", "image/gif"];
        try {
            return fetch(src).then(response => response.blob()).then(blob => new Promise(callback => {
                            if(allowedFileTypes.includes(blob?.type)){
                    let reader = new FileReader();
                    reader.onload = function () { callback(this.result) };
                    reader.readAsDataURL(blob);
                }else{
                    callback(null)
                    setShowDefault(true)
                    setImageData('')    
                }
                
            }));
        } catch (err) {
                setShowDefault(true)
            setImageData('')
        }

    }


    var image = showDefault ? defaultImage : imageData;
console.log('image------->',showDefault)
    return (

        <img className={className} src={!!image ? image : defaultImage} />
    );

}

export default memo(LazyLoadImage);