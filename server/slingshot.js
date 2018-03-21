Slingshot.fileRestrictions( "uploadToAmazonS3", {
    allowedFileTypes: [ "image/png", "image/jpeg", "image/gif", "audio/mpeg3", "audio/mp3" ],
    maxSize: 1 * 1024 * 1024 * 1024
});

Slingshot.createDirective( "uploadToAmazonS3", Slingshot.S3Storage, {
    bucket: "clubdelecturauy",
    acl: "public-read",
    region:"us-east-2",
    authorize: function () {
        // let userFileCount = Files.find( { "userId": this.userId } ).count();
        return true;
    },
    key: function ( file ) {
        // var user = Meteor.users.findOne( this.userId );
        return file.name;
    }
});