import React, { Component, useEffect, useState, memo } from 'react';
// import defaultImage from '../../../../assets/images/logo-placeholder.png'


const LazyLoadImage = (props) => {
    const [showDefault, setShowDefault] = useState(true)
    const [imageData, setImageData] = useState('')




    let {
        src = '',
        alt = '',
        defaultImage = '',
        className=''
    } = props;

    useEffect(() => {
        urlContentToDataUri(src).then(dataUri => {
            setShowDefault(false);
            setImageData(dataUri)
        }).catch(error => {
            setShowDefault(true)
            setImageData('')
        });

    }, []);

    useEffect(() => {
        urlContentToDataUri(src).then(dataUri => {
            setShowDefault(!dataUri);
            setImageData(dataUri)
        }).catch(error => {
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

    return (

        <img className={className} src={!!image ? image : defaultImage} />
    );

}

export default memo(LazyLoadImage);