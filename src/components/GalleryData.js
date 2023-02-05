import React from 'react';
import ReactDOM from 'react-dom'
import LightGallery from 'lightgallery/react';
import lgThumbnail from 'lightgallery/plugins/thumbnail';
import lgZoom from 'lightgallery/plugins/zoom';
import $ from 'jquery';

var curGallery

const onInit = () => {
    // console.log('lightGallery has been initialized');
};

const selChange = (props) => {
    const gallery = $('#gallerySelect').val()
    curGallery = gallery
    let url = `http://tonypweb.com/pbc/ajax/gallery_data.php?rq=gallery&gallery=${gallery}`
    fetch(url)
        .then((response) => response.json())
        .then(data => {
            let imgs = [], href = `http://tonypweb.com/pbc/gallery/${gallery}/`
            for (let i in data) {
                imgs.push(
                    (<a key={'img' + i} href={`${href}/${data[i]}`}>
                        <img width="200" alt={`${data[i]}`} src={`${href}/${data[i]}`} />
                    </a>)
                )
            }

            ReactDOM.unmountComponentAtNode(document.getElementById('lhGallery'))
            ReactDOM.render(

                <LightGallery
                    onInit={onInit}
                    speed={500}
                    plugins={[lgThumbnail, lgZoom]}
                >
                    {imgs}

                </LightGallery>,
                document.getElementById('lhGallery')
            )
        })
}

export default class GalleryData extends React.Component {
    // constructor(props) {
    //     super(props);
    // }

    componentDidMount() {
        // const gallery = props.gallery
        $('#mainMenu').removeClass('hidden')
        let url = `http://tonypweb.com/pbc/ajax/gallery.php`
        fetch(url)
            .then(response => response.json())
            .then(data => {
                const gallery = data['gallery']
                const galleries = data['galleries']
                curGallery = gallery
                delete data['gallery']
                delete data['galleries']
                let imgs = [], href = `http://tonypweb.com/pbc/gallery/${gallery}/`, curGal
                for (let i in data) {
                    imgs.push(
                        (<a key={'img' + i} href={`${href}/${data[i]}`}>
                            <img width="200" alt={`${data[i]}`} src={`${href}/${data[i]}`} />
                        </a>)
                    )
                }

                let options = "", selected = "", gal
                for (let i in galleries) {
                    selected = ""
                    gal = galleries[i].replace(/_EQ_/g, "=")
                    gal = atob(gal)
                    gal = decodeURIComponent(gal)
                    if (gallery === galleries[i]) curGal = gal
                    if (galleries[i] === gallery) selected = ' selected'
                    options += `<option value="${galleries[i]}"${selected}>${gal}</option>`
                }
                $('#galleryHeaderTitle').text(curGal)
                $('#gallerySelect').html(options)
                ReactDOM.render(

                    <LightGallery
                        onInit={onInit}
                        speed={500}
                        plugins={[lgThumbnail, lgZoom]}
                    >
                        {imgs}

                    </LightGallery>,
                    document.getElementById('lhGallery')
                )
            })
            .catch(console.error);
    }
    render() {
        return (
            <div id="galleryOuter" className="container">
                <div id="galleryHeader" className="">

                    <h3 id="galleryHeaderTitle" className="hidden">
                    </h3>

                    <div id="galleryHeaderDropdown" className="">
                        <select onChange={selChange} className="form-control form-select" id="gallerySelect"></select>
                    </div>
                </div>
                <div id="lhGallery" className="">
                </div>
            </div>
        );
    }
}