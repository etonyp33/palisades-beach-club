import React from 'react';
import LightGallery from 'lightgallery/react';

import lgThumbnail from 'lightgallery/plugins/thumbnail';
import lgZoom from 'lightgallery/plugins/zoom';
import $ from 'jquery';
const onInit = () => {
    console.log('lightGallery has been initialized');
};
export default class GalleryMain extends React.Component {
    constructor(props) {
        super(props);
    }


    render() {
        return (
            <div className="container">
                <LightGallery
                    onInit={onInit}
                    speed={500}
                    plugins={[lgThumbnail, lgZoom]}
                >
                    <a href="img/img1.jpg">
                        <img alt="img1" src="gallery/San-Diego-Photography-San-Diego-Family-photographer-San-Diego-Wedding-Photographer-by-Pam-Davis-at-www.SavoringTheSweetLife.com-21-3.jpg" />
                    </a>
                    <a href="gallery/img2.jpg">
                        <img alt="img2" src="img/thumb2.jpg" />
                    </a>

                </LightGallery>
            </div>
        );
    }
}