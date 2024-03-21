import ImageTool from "@editorjs/image";
export {ImageTool};

import Cropper from 'cropperjs';

import "cropperjs/dist/cropper.css";

export class ImageToolTune {
    setting:any;
    api:any;
    block:any;
    config:any;
    data:any;
    settings:any;
    wrapper:any;
    buttons:any;
    cropperInterface:any;

    
    constructor( { api, data, config, block } ) {
        
        this.settings = [
            {
                name: 'floatLeft',
                icon: '<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 1024 1024" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M952 792H72c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h880c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm0-632H72c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h880c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zM608 660c8.8 0 16-7.2 16-16V380c0-8.8-7.2-16-16-16H96c-8.8 0-16 7.2-16 16v264c0 8.8 7.2 16 16 16h512zM152 436h400v152H152V436zm552 210c0 4.4 3.6 8 8 8h224c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8H712c-4.4 0-8 3.6-8 8v56zm8-204h224c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8H712c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8z"></path></svg>',
                label: '',
                group: 'align',
            }, {
                name: 'center',
                icon: '<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 1024 1024" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M952 792H72c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h880c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm0-632H72c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h880c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zM848 660c8.8 0 16-7.2 16-16V380c0-8.8-7.2-16-16-16H176c-8.8 0-16 7.2-16 16v264c0 8.8 7.2 16 16 16h672zM232 436h560v152H232V436z"></path></svg>',
                label: '',
                group: 'align',
            }, {
                name: 'floatRight',
                icon: '<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 1024 1024" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M952 792H72c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h880c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm0-632H72c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h880c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm-24 500c8.8 0 16-7.2 16-16V380c0-8.8-7.2-16-16-16H416c-8.8 0-16 7.2-16 16v264c0 8.8 7.2 16 16 16h512zM472 436h400v152H472V436zM80 646c0 4.4 3.6 8 8 8h224c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8H88c-4.4 0-8 3.6-8 8v56zm8-204h224c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8H88c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8z"></path></svg>',
                label: '',
                group: 'align',
            },
            {
                name: 'sizeSmall',
                icon: '<svg stroke="currentColor" fill="none" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 6V4H20V20H12V18H8V16H4V8H8V6H12ZM14 6H18V18H14V6ZM12 8H10V16H12V8ZM8 10V14H6V10H8Z" fill="currentColor"></path></svg>',
                label: '25%',
                group: 'size',
            }, {
                name: 'sizeMiddle',
                icon: '<svg stroke="currentColor" fill="none" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 6V4H20V20H12V18H8V16H4V8H8V6H12ZM14 6H18V18H14V6ZM12 8H10V16H12V8ZM8 10V14H6V10H8Z" fill="currentColor"></path></svg>',
                label: '50%',
                group: 'size',
            }, {
                name: 'sizeLarge',
                icon: '<svg stroke="currentColor" fill="none" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 6V4H20V20H12V18H8V16H4V8H8V6H12ZM14 6H18V18H14V6ZM12 8H10V16H12V8ZM8 10V14H6V10H8Z" fill="currentColor"></path></svg>',
                label: '75%',
                group: 'size',
            }, {
                name: 'resize',
                icon: '<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M29 30l1 90h36V66h26V30H29zm99 0v36h72V30h-72zm108 0v36h72V30h-72zm108 0v36h72V30h-72zm102 0v78h36V30h-36zm-206 80v36h100.543l-118 118H30v218h218V289.457l118-118V272h36V110H240zm206 34v72h36v-72h-36zM30 156v72h36v-72H30zm416 96v72h36v-72h-36zm0 108v72h36v-72h-36zm-166 86v36h72v-36h-72zm108 0v36h72v-36h-72z"></path></svg>',
                label: '',
                group: 'size',
            }, {
                name: 'crop',
                icon: '<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M21 15h2v2h-2v-2zm0-4h2v2h-2v-2zm2 8h-2v2c1 0 2-1 2-2zM13 3h2v2h-2V3zm8 4h2v2h-2V7zm0-4v2h2c0-1-1-2-2-2zM1 7h2v2H1V7zm16-4h2v2h-2V3zm0 16h2v2h-2v-2zM3 3C2 3 1 4 1 5h2V3zm6 0h2v2H9V3zM5 3h2v2H5V3zm-4 8v8c0 1.1.9 2 2 2h12V11H1zm2 8l2.5-3.21 1.79 2.15 2.5-3.22L13 19H3z"></path></svg>',
                label: '',
                group: 'size',
            }
        ];

        this.api = api;
        this.block = block;
        this.config = config;
        this.data = {
            floatLeft: data !== undefined && data.floatLeft !== undefined ? data.floatLeft : false,
            floatRight: data !== undefined && data.floatRight !== undefined ? data.floatRight : false,
            center: data !== undefined && data.center !== undefined ? data.center : false,
            sizeSmall: data !== undefined && data.sizeSmall !== undefined ? data.sizeSmall : false,
            sizeMiddle: data !== undefined && data.sizeMiddle !== undefined ? data.sizeMiddle : false,
            sizeLarge: data !== undefined && data.sizeLarge !== undefined ? data.sizeLarge : false,
            resize: data !== undefined && data.resize !== undefined ? data.resize : false,
            resizeSize: data !== undefined && data.resizeSize !== undefined ? data.resizeSize : 0,
            crop: data !== undefined && data.crop !== undefined ? data.crop : false,
            cropperFrameHeight: data !== undefined && data.cropperFrameHeight !== undefined ? data.cropperFrameHeight : 0,
            cropperFrameWidth: data !== undefined && data.cropperFrameWidth !== undefined ? data.cropperFrameWidth : 0,
            cropperFrameLeft: data !== undefined && data.cropperFrameLeft !== undefined ? data.cropperFrameLeft : 0,
            cropperFrameTop: data !== undefined && data.cropperFrameTop !== undefined ? data.cropperFrameTop : 0,
            cropperImageHeight: data !== undefined && data.cropperImageHeight !== undefined ? data.cropperImageHeight : 0,
            cropperImageWidth: data !== undefined && data.cropperImageWidth !== undefined ? data.cropperImageWidth : 0,
            cropperInterface: undefined,
        };
        this.wrapper = undefined;

        this.buttons = [];

    }

    static get isTune() {
        return true;
    }

    static get sanitize() {
        return {
            floatLeft: {},
            floatRight: {},
            center: {},
            sizeSmall: {},
            sizeMiddle: {},
            sizeLarge: {},
            resize: {},
            resizeSize: {},
            crop: {},
            cropperFrameHeight: {},
            cropperFrameWidth: {},
            cropperFrameLeft: {},
            cropperFrameTop: {},
            cropperImageHeight: {},
            cropperImageWidth: {},
            cropperInterface: {},
        };
    }

    /**
     * CSS classes
     *  @return {object}
     * @constructor
     * @property {string} CSS.wrapper - wrapper for buttons
     * @property {string} CSS.button - button
     * @property {string} CSS.buttonActive - active button
     * @property {string} CSS.buttonModifier - button with modifier
     * @property {string} CSS.buttonModifierActive - active button with modifier
     */
    get CSS() {
        return {
            wrapper: 'cdx-image-tool-tune',
            button: this.api.styles.settingsButton,
            buttonActive: this.api.styles.settingsButtonActive,
            buttonModifier: this.api.styles.settingsButtonModifier,
            buttonModifierActive: this.api.styles.settingsButtonModifierActive,
            isFloatLeft: 'cdx-image-tool-tune--floatLeft',
            isFloatRight: 'cdx-image-tool-tune--floatRight',
            isCenter: 'cdx-image-tool-tune--center',
            isSizeSmall: 'cdx-image-tool-tune--sizeSmall',
            isSizeMiddle: 'cdx-image-tool-tune--sizeMiddle',
            isSizeLarge: 'cdx-image-tool-tune--sizeLarge',
            isResize: 'cdx-image-tool-tune--resize',
            isCrop: 'cdx-image-tool-tune--crop',
        };
    }

    /**
     *  
     * @return {HTMLElement}
     * @public
     * @readonly
     * @property {HTMLElement} wrapper - tune buttons wrapper
        */
    get view() {
        if ( !this.wrapper ) {
            this.wrapper = this.createView();
        }

        return this.wrapper;
    }

    /**
     * Clicks to one of the tunes
     * @param {MouseEvent} e - click
     * @param {HTMLElement} tune - clicked tune button
     * @private
     * @return {void}
     * */
    tuneClicked( e, tune ) {
        e.preventDefault();
        e.stopPropagation();


        let tuneName = tune.dataset.tune;

        let tuneGroup = this.settings.find( tune => tune.name === tuneName ).group;


        this.buttons.forEach( button => {

            //if is the same group
            if ( this.settings.find( tune => tune.name === button.dataset.tune ).group === tuneGroup ) {
                if ( button !== tune ) {
                    button.classList.remove( this.CSS.buttonActive );
                }
            }
        } );

        tune.classList.toggle( this.CSS.buttonActive );


        this.setTune( tune.dataset.tune );
    }

    /**
     * Styles the image with a tune
     * @param {string} tune - tune name
     * @private
     * @return {void}
     * */
    setTune( tune ) {
        switch ( tune ) {
            case 'floatLeft':
                this.data.floatLeft = !this.data.floatLeft;
                this.data.floatRight = false;
                this.data.center = false;
                break;
            case 'floatRight':
                this.data.floatLeft = false;
                this.data.floatRight = !this.data.floatRight;
                this.data.center = false;
                break;
            case 'center':
                this.data.center = !this.data.center;
                this.data.floatLeft = false;
                this.data.floatRight = false;
                break;
            case 'sizeSmall':
                this.data.sizeSmall = !this.data.sizeSmall;
                this.data.sizeMiddle = false;
                this.data.sizeLarge = false;
                this.data.resize = false;
                this.data.crop = false;
                break;
            case 'sizeMiddle':
                this.data.sizeSmall = false;
                this.data.sizeMiddle = !this.data.sizeMiddle;
                this.data.sizeLarge = false;
                this.data.resize = false;
                this.data.crop = false;
                break;
            case 'sizeLarge':
                this.data.sizeSmall = false;
                this.data.sizeMiddle = false;
                this.data.sizeLarge = !this.data.sizeLarge;
                this.data.resize = false;
                this.data.crop = false;
                break;
            case 'resize':
                this.data.sizeSmall = false;
                this.data.sizeMiddle = false;
                this.data.sizeLarge = false;
                this.data.resize = !this.data.resize;
                this.data.crop = false;
                break;
            case 'crop':
                this.data.crop = !this.data.crop;
                this.data.sizeSmall = false;
                this.data.sizeMiddle = false;
                this.data.sizeLarge = false;
                this.data.resize = false;
                this.data.resizeSize = 0;
                break;
            default:
                this.data.floatLeft = false;
                this.data.floatRight = false;
                this.data.sizeSmall = false;
                this.data.sizeMiddle = false;
                this.data.sizeLarge = false;
                this.data.resize = false;
                this.data.crop = false;
                break;
        }

        if ( !this.data.resize ) {
            this.data.resizeSize = 0;
        }

        if ( !this.data.crop ) {
            this.data.cropperFrameHeight = 0;
            this.data.cropperFrameWidth = 0;
            this.data.cropperFrameLeft = 0;
            this.data.cropperFrameTop = 0;
            this.data.cropperImageHeight = 0;
            this.data.cropperImageWidth = 0;
        }

        const blockContent = this.block?.holder?.querySelector?.( '.ce-block__content' );

        this.apply( blockContent );

        this.block.dispatchChange();



    }


    /**
     * Append class to block by tune data
     * @param {HTMLElement} blockContent - wrapper for block content
     * @public
     * @return {void}
     *  */
    apply( blockContent ) {


        if ( this.data.floatLeft ) {
            blockContent.classList.add( this.CSS.isFloatLeft );
        } else {
            blockContent.classList.remove( this.CSS.isFloatLeft );
        }

        if ( this.data.floatRight ) {
            blockContent.classList.add( this.CSS.isFloatRight );
        } else {
            blockContent.classList.remove( this.CSS.isFloatRight );
        }

        if ( this.data.center ) {
            blockContent.classList.add( this.CSS.isCenter );
        } else {
            blockContent.classList.remove( this.CSS.isCenter );
        }

        if ( this.data.sizeSmall ) {
            blockContent.classList.add( this.CSS.isSizeSmall );
        } else {
            blockContent.classList.remove( this.CSS.isSizeSmall );
        }

        if ( this.data.sizeMiddle ) {
            blockContent.classList.add( this.CSS.isSizeMiddle );
        } else {
            blockContent.classList.remove( this.CSS.isSizeMiddle );
        }

        if ( this.data.sizeLarge ) {
            blockContent.classList.add( this.CSS.isSizeLarge );
        } else {
            blockContent.classList.remove( this.CSS.isSizeLarge );
        }

        if ( this.data.resize ) {
            blockContent.classList.add( this.CSS.isResize );

            if ( this.data.resizeSize > 0 ) {
                blockContent.getElementsByClassName( 'cdx-block' )[ 0 ].style.width = this.data.resizeSize + 'px';
            }

            this.resize( blockContent );
        } else {
            blockContent.classList.remove( this.CSS.isResize );
            this.unresize( blockContent );
        }

        if ( this.data.crop ) {
            blockContent.classList.add( this.CSS.isCrop );

            this.crop( blockContent );
            if ( this.data.cropperFrameHeight > 0 && this.data.cropperFrameWidth > 0 ) {
                this.applyCrop( blockContent );
            }


        } else {
            blockContent.classList.remove( this.CSS.isCrop );
            this.uncrop( blockContent );
        }




    }




    /**
     * Add crop handles to image
     * @param {HTMLCollection} images - images in block
     * @public
     * @return {void}
     */
    crop( blockContent ) {

        //add append crop button to image-tool__image
        //If editor is readOnly, do not add crop button
        if ( this.api.readOnly.isEnabled ) return;

        const image = blockContent.getElementsByClassName( 'image-tool__image' )[ 0 ];
        const cropBtn = document.createElement( 'div' );
        cropBtn.classList.add( 'crop-btn', 'btn-crop-action' );
        cropBtn.innerHTML = 'Crop';

        cropBtn.addEventListener( 'click', e => {
            //remove crop button
            image.removeChild( cropBtn );
            this.appendCrop( blockContent );
        }
        );

        image.appendChild( cropBtn );
    }


    appendCrop( blockContent ) {

        if ( this.api.readOnly.isEnabled ) return;

        this.uncrop( blockContent );
        const image = blockContent.getElementsByClassName( 'cdx-block' )[ 0 ].getElementsByTagName( 'img' )[ 0 ];
        blockContent.getElementsByClassName( 'cdx-block' )[ 0 ].classList.add( 'isCropping' );
        this.cropperInterface = new Cropper( image, {
            crop( event ) {
                // console.log( event.detail.x );
                // console.log( event.detail.y );
                // console.log( event.detail.width );
                // console.log( event.detail.height );
                // console.log( event.detail.scaleX );
                // console.log( event.detail.scaleY );
            },
        } );


        //append save crop button
        const cropSaveBtn = document.createElement( 'div' );
        cropSaveBtn.classList.add( 'crop-save', 'btn-crop-action' );

        cropSaveBtn.innerHTML = 'Apply';

        cropSaveBtn.addEventListener( 'click', e => {

            // console.log( this.cropperInterface.getCropBoxData() );
            // console.log( this.cropperInterface.getImageData() );
            // console.log( this.cropperInterface.getCanvasData() );

            this.data.cropperFrameHeight = this.cropperInterface.getCropBoxData().height;
            this.data.cropperFrameWidth = this.cropperInterface.getCropBoxData().width;
            this.data.cropperFrameLeft = this.cropperInterface.getCanvasData().left - this.cropperInterface.getCropBoxData().left;
            this.data.cropperFrameTop = this.cropperInterface.getCanvasData().top - this.cropperInterface.getCropBoxData().top;
            this.data.cropperImageHeight = this.cropperInterface.getImageData().height;
            this.data.cropperImageWidth = this.cropperInterface.getImageData().width;

            this.applyCrop( blockContent );

        }
        );

        blockContent.getElementsByClassName( 'image-tool__image' )[ 0 ].appendChild( cropSaveBtn );

        //add temporary style to block content so that it comes in front of every other block
        blockContent.classList.add( 'isCropping' );

    }

    applyCrop( blockContent ) {
        
        //apply data to image and remove cropper interface and save button, add crop button
        var blockEl = blockContent.getElementsByClassName( 'cdx-block' )[ 0 ];
        if(blockEl) {

            blockEl.style.minWidth = this.data.cropperFrameWidth + 'px';
            blockEl.style.maxWidth = this.data.cropperFrameWidth + 'px';
            
            const image = blockEl.getElementsByTagName( 'img' )[ 0 ];
                  image.style.width = this.data.cropperImageWidth + 'px';
                  image.style.height = this.data.cropperImageHeight + 'px';

            var blockImg = blockContent.getElementsByClassName( 'image-tool__image' )[ 0 ];
                blockImg.style.width = this.data.cropperFrameWidth + 'px';
                blockImg.style.height = this.data.cropperFrameHeight + 'px';
        
            var imageEl = blockImg.getElementsByTagName( 'img' )[ 0 ];
            if(imageEl) {
                imageEl.style.left = this.data.cropperFrameLeft + 'px';
                imageEl.style.top = this.data.cropperFrameTop + 'px';
                imageEl.classList.add( 'isCropped' );
            }

            blockEl.classList.remove( 'isCropping' );

            const cropSaveBtn = blockContent.getElementsByClassName( 'btn-crop-action' )[ 0 ];
            if ( cropSaveBtn ) {
                blockImg.removeChild( cropSaveBtn );
            }
        }



        //remove cropper interface
        if ( this.cropperInterface ) {
            this.cropperInterface.destroy();
        }




        //add crop button

        const cropBtn = document.createElement( 'div' );
        cropBtn.classList.add( 'crop-btn', 'btn-crop-action' );
        cropBtn.innerHTML = 'Crop';

        var imageEl = blockContent.getElementsByClassName( 'image-tool__image' )[ 0 ];
        if(imageEl) {
            
            cropBtn.addEventListener( 'click', e => {
                //remove crop button
                imageEl.removeChild( cropBtn );
                this.appendCrop( blockContent );
            }
            );

            imageEl.appendChild( cropBtn );
        }

        blockContent.classList.remove( 'isCropping' );
        
        this.block.dispatchChange();

    }


    uncrop( blockContent ) {

        if ( this.api.readOnly.isEnabled ) return;

        var imageEl = blockContent.getElementsByClassName( 'image-tool__image' )[ 0 ];

        //remove crop and save button
        const cropSaveBtn = blockContent.getElementsByClassName( 'btn-crop-action' )[ 0 ];
        if ( cropSaveBtn && imageEl) {
            imageEl.removeChild( cropSaveBtn );
        }

        //remove crop button
        const cropBtn = blockContent.getElementsByClassName( 'btn-crop-action' )[ 0 ];
        if ( cropBtn && imageEl) {
            imageEl.removeChild( cropBtn );
        }

        //remove isCropped class
        var blockEl = blockContent.getElementsByClassName( 'cdx-block' )[ 0 ];
        if(blockEl) {
            var image = blockEl.getElementsByTagName( 'img' )[ 0 ];
            if (image) image.classList.remove( 'isCropped' );

            //remove isCropping class
            blockEl.classList.remove( 'isCropping' );

            //remove min and max width
            blockEl.style.minWidth = '';
            blockEl.style.maxWidth = '';
        }

        if(imageEl) {

            //remove image width and height
            imageEl.style.width = '';
            imageEl.style.height = '';

            //remove image left and top
            var image = imageEl.getElementsByTagName( 'img' )[ 0 ];
            if(image) 
            {
                image.style.left = '';
                image.style.top = '';

                //remove image width and height
                image.style.width = '';
                image.style.height = '';
            }
        }

        blockContent.classList.remove( 'isCropping' );



        //remove cropper interface
        if ( this.cropperInterface ) {
            this.cropperInterface.destroy();
        }

        //remove crop data
        this.data.cropperFrameHeight = 0;
        this.data.cropperFrameWidth = 0;
        this.data.cropperFrameLeft = 0;
        this.data.cropperFrameTop = 0;
        this.data.cropperImageHeight = 0;
        this.data.cropperImageWidth = 0;

        // this.block.dispatchChange();
    }





    /**
     * Add resize handles to block
     * @param {HTMLElement} blockContent - wrapper for block content
     * @public
     * @return {void}
     * */
    resize( blockContent ) {

        const resizable = document.createElement( 'div' );
        resizable.classList.add( 'resizable' );

        const resizers = document.createElement( 'div' );
        resizers.classList.add( 'resizers' );

        const resizerTopLeft = document.createElement( 'div' );
        resizerTopLeft.classList.add( 'resizer', 'top-left' );
        resizerTopLeft.addEventListener( 'mousedown', e => {
            this.resizeClick( blockContent.getElementsByClassName( 'cdx-block' )[ 0 ], resizerTopLeft, e );
        } );


        const resizerTopRight = document.createElement( 'div' );
        resizerTopRight.classList.add( 'resizer', 'top-right' );
        resizerTopRight.addEventListener( 'mousedown', e => {
            this.resizeClick( blockContent.getElementsByClassName( 'cdx-block' )[ 0 ], resizerTopRight, e );
        } );


        const resizerBottomLeft = document.createElement( 'div' );
        resizerBottomLeft.classList.add( 'resizer', 'bottom-left' );
        resizerBottomLeft.addEventListener( 'mousedown', e => {
            this.resizeClick( blockContent.getElementsByClassName( 'cdx-block' )[ 0 ], resizerBottomLeft, e );
        } );

        const resizerBottomRight = document.createElement( 'div' );
        resizerBottomRight.classList.add( 'resizer', 'bottom-right' );
        resizerBottomRight.addEventListener( 'mousedown', e => {
            this.resizeClick( blockContent.getElementsByClassName( 'cdx-block' )[ 0 ], resizerBottomRight, e );
        } );

        resizers.appendChild( resizerTopLeft );
        resizers.appendChild( resizerTopRight );
        resizers.appendChild( resizerBottomLeft );
        resizers.appendChild( resizerBottomRight );
        resizable.appendChild( resizers );
        blockContent.getElementsByClassName( 'cdx-block' )[ 0 ].appendChild( resizable );
    }



    /**
          * click event to resize handles
     * preserve aspect ratio
     * prevent block from moving when dragging resize handles
     * max size = 100%
     * min size = 50px
     * @param {HTMLElement} blockContent - wrapper for block content
     * @public
     * @return {void}
     * */
    resizeClick( blockContent, handle, e ) {

        let startX = 0;
        let startY = 0;
        let startWidth = 0;
        let startHeight = 0;

        const mouseMoveHandler = e => {

            const dx = e.clientX - startX;
            const dy = e.clientY - startY;

            const newWidth = ( startWidth + dx );

            if ( newWidth > 50 ) {
                blockContent.style.width = newWidth + 'px';
            }





        };

        const mouseUpHandler = () => {
            if(document.defaultView ){
            let blockWidth = parseInt( document.defaultView.getComputedStyle( blockContent ).width, 10 )

            if ( blockWidth > 0 ) {
                this.data.resizeSize = blockWidth;
            }

            document.removeEventListener( 'mousemove', mouseMoveHandler );
            document.removeEventListener( 'mouseup', mouseUpHandler );

            this.block.dispatchChange();

            }

        };

        document.addEventListener( 'mousemove', mouseMoveHandler );
        document.addEventListener( 'mouseup', mouseUpHandler );

        startX = e.clientX;
        startY = e.clientY;
        if(document.defaultView ){
            startWidth = parseInt( document.defaultView.getComputedStyle( blockContent ).width, 10 );

            startHeight = parseInt( document.defaultView.getComputedStyle( blockContent ).height, 10 );
    

        }


    }


    /**
     * Remove resize handles from block
     * @param {HTMLElement} blockContent - wrapper for block content
     * @public
     * @return {void}
     */
    unresize( blockContent ) {
        const unresizable = blockContent.getElementsByClassName( 'resizable' )[ 0 ];
        if ( unresizable ) {
            blockContent.getElementsByClassName( 'cdx-block' )[ 0 ].removeChild( unresizable );
        }

        blockContent.getElementsByClassName( 'cdx-block' )[ 0 ].style.width = 'auto';


    }




    /**
     * Remove tunes from block wrapper
     * @param {HTMLElement} blockContent - wrapper for block content
     * @public
     * @return {HTMLElement}
     */
    unwrap( blockContent ) {
        
        //remove tunes from block
        this.buttons.forEach( button => {
            button.classList.remove( this.CSS.buttonActive );
        } );

        //remove isFloatLeft class
        blockContent.classList.remove( this.CSS.isFloatLeft );

        //remove isFloatRight class
        blockContent.classList.remove( this.CSS.isFloatRight );

        //remove isCenter class
        blockContent.classList.remove( this.CSS.isCenter );

        //remove isSizeSmall class
        blockContent.classList.remove( this.CSS.isSizeSmall );

        //remove isSizeMiddle class
        blockContent.classList.remove( this.CSS.isSizeMiddle );

        //remove isSizeLarge class
        blockContent.classList.remove( this.CSS.isSizeLarge );

        //remove isResize class
        blockContent.classList.remove( this.CSS.isResize );

        //remove isCrop class
        blockContent.classList.remove( this.CSS.isCrop );

        //remove isCropped class
        blockContent.getElementsByClassName( 'cdx-block' )[ 0 ].getElementsByTagName( 'img' )[ 0 ].classList.remove( 'isCropped' );

        //remove isCropping class
        blockContent.getElementsByClassName( 'cdx-block' )[ 0 ].classList.remove( 'isCropping' );

        //remove min and max width
        blockContent.getElementsByClassName( 'cdx-block' )[ 0 ].style.minWidth = '';
        blockContent.getElementsByClassName( 'cdx-block' )[ 0 ].style.maxWidth = '';

        //remove image width and height
        blockContent.getElementsByClassName( 'image-tool__image' )[ 0 ].style.width = '';
        blockContent.getElementsByClassName( 'image-tool__image' )[ 0 ].style.height = '';

        //remove image left and top
        blockContent.getElementsByClassName( 'image-tool__image' )[ 0 ].getElementsByTagName( 'img' )[ 0 ].style.left = '';

        blockContent.getElementsByClassName( 'image-tool__image' )[ 0 ].getElementsByTagName( 'img' )[ 0 ].style.top = '';

        //remove image width and height
        blockContent.getElementsByClassName( 'image-tool__image' )[ 0 ].getElementsByTagName( 'img' )[ 0 ].style.width = '';

        blockContent.getElementsByClassName( 'image-tool__image' )[ 0 ].getElementsByTagName( 'img' )[ 0 ].style.height = '';

        //remove resize handles
        this.unresize( blockContent );

        //remove crop handles
        this.uncrop( blockContent );

        //remove cropper interface
        if ( this.cropperInterface ) {
            this.cropperInterface.destroy();
        }

        //remove crop data
        this.data.cropperFrameHeight = 0;
        this.data.cropperFrameWidth = 0;
        this.data.cropperFrameLeft = 0;
        this.data.cropperFrameTop = 0;
        this.data.cropperImageHeight = 0;
        this.data.cropperImageWidth = 0;

        return blockContent;
    }



    /**
     * Add tune to block data
     * @private
     * @return {void}
     * */
    save() {
        return this.data;
    }

    /**
     * Append tunes to block wrapper
     * @param {HTMLElement} blockContent - wrapper for block content
     * @public
     * @return {HTMLElement}
     * */
    wrap( blockContent ) {

        //createview if not exists
        if ( !this.wrapper ) {
            this.wrapper = this.createView();
        }

        this.apply( blockContent );




        return blockContent;
    }


    /**
     * Creates a view for tunes
     * @return {HTMLElement}
     * @private
     * */
    createView() {
        this.buttons = this.settings.map( tune => {
            const el = document.createElement( 'div' );
            const buttonIco = document.createElement( 'span' );
            const buttonTxt = document.createElement( 'span' );
            el.classList.add( this.CSS.button );
            buttonTxt.style.fontSize = '8px';
            buttonIco.innerHTML = tune.icon;
            buttonTxt.innerHTML = tune.label;
            el.appendChild( buttonIco );
            el.appendChild( buttonTxt );
            el.dataset.tune = tune.name;
            el.title = tune.label;

            el.addEventListener( 'click', e => this.tuneClicked( e, el ) );

            return el;
        } );
        const wrapper = document.createElement( 'div' );
        this.buttons.forEach( button => {
            wrapper.appendChild
                ( button );
        } );
        wrapper.classList.add( this.CSS.wrapper );
        return wrapper;

    }

    /**
     * Checks if tune is active
     * @param {string} tune - tune name
     * @return {boolean}
     * @private
     * */
    isTuneActive( tune ) {
        return !!this.data[ tune ];
    }

    /**
     * Makes buttons with tunes
     * @return {HTMLElement}
     * @public
     * */
    render() {
        //when editor is ready
        this.buttons.forEach( button => {
            button.classList.toggle( this.CSS.buttonActive, this.isTuneActive( button.dataset.tune ) );
        }
        );

        return this.view;
    }


    /**
     * Destroys the plugin
     * @public
     * @return {void}
     * */
    destroy() {
        this.wrapper = null;
        this.buttons = null;
    }
}