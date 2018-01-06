utils = {}
utils.uploadToAmazonS3 = function(options){
    return new Promise((resolve, reject) => {
        var template = options.template;
        let file = _getFileFromInput(options.event);
        _setPlaceholderText("Uploading" + file.name + "...", template);
        _uploadFileToAmazon(file, template, resolve, reject);
    })
}

var  _getFileFromInput = function(event){
    return  event.target.files[0];
}

var _setPlaceholderText = function(string, template){
    template.find( ".alert span" ).innerText = string;
}

var _uploadFileToAmazon = ( file, template, resolve, reject ) => {
    const uploader = new Slingshot.Upload( "uploadToAmazonS3" );
    uploader.send( file, ( error, url ) => {
        if ( error ) {
            _setPlaceholderText( "Error, "+error, template);
            reject(error);
        } else {
            _setPlaceholderText( "Clickear o Arrastrar acá para agregar foto", template);
            resolve(url);
        }
    });
};
