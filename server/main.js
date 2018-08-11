import { Meteor } from 'meteor/meteor';
import '/imports/api/actividades/actividades.js'
import '/imports/api/libros/libros.js'
import '/imports/api/prensa/prensa.js'
import '/imports/api/textos/textos.js'
import '/imports/api/personas/personas.js'
import '/imports/api/colaboradores/colaboradores.js'
import '/imports/api/markers/markers.js'
import { Resenas} from "../imports/api/reseñas/reseñas";
import "/imports/api/reseñas/reseñas.js";

'/imports/api/reseñas/reseñas.js'

Meteor.startup(() => {
    // Meteor.users.remove({});
    
    if(!Meteor.users.findOne()){
        var userId = Accounts.createUser({username:Meteor.settings.AdminName, email:Meteor.settings.AdminEmail, password:Meteor.settings.AdminPass});
        var user = Meteor.users.findOne({_id:userId});
        user.emails[0].verified = true;
        Meteor.users.update({_id: userId},user);
    }

    var schedule = later.parse.recur().every(60).minute(); // on fifth minute of every hour, every day
    var hourlyReseñas= new ScheduledTask(schedule, getBlogInfo());
    hourlyReseñas.start();


});

var getBlogInfo = function(){
    var bloggerKey = Meteor.settings.BloggerKey;
    console.log("Actualizando blogs")
    var arrayToReturn = [];
    var listBlogs = ["https://claudialcordoba.blogspot.com/",
        "http://alfilodelashojas.blogspot.com/",
        "http://ennemidusommeil.blogspot.com/",
        "https://refugiodeldragondetierra.blogspot.com/",
        "http://rincondellectorconstante.blogspot.com/",
        "https://elhombrehormiga96.blogspot.com/",
        "http://myworldbetween.blogspot.com/",
        "https://blog-whatalife.blogspot.com/",
        "http://nightsinautumnwoods.blogspot.com/",
        "https://descubri-libros.blogspot.com/",
        "http://shinzathrone.blogspot.com/",
        "http://lectordemilhistorias.blogspot.com/",
        "https://momoysuobraenpalabras.blogspot.com/",
        "https://cuentosdealvin.blogspot.com/"];
    _.each(listBlogs, function(blog){
        try {
            var getResult = HTTP.get("https://www.googleapis.com/blogger/v3/blogs/byurl?key="+bloggerKey+"&url=" + blog);
            var id = getResult.data.id;
            var descripcion = getResult.data.description;
            var name = getResult.data.name;
            // console.log("getResult", getResult);
            var getResult2 = HTTP.get("https://www.googleapis.com/blogger/v3/blogs/"+id+"/posts?key="+bloggerKey)
            // console.log("result", getResult2.data.items);

            // console.log("result", getResult2.data.items[0]);
            //find first image of blog
            var str = getResult2.data.items[0].content;
            var regex = /src="(.*?)"/g;
            var matches, output = [];
            while (matches = regex.exec(str)) {
                output.push(matches[1]);
            }


            var titleLastPost = getResult2.data.items[0].title
            var url = blog;
            var updated = new Date(getResult2.data.items[0].updated);

            var imageFromPostAuthor;
            if(output.length>0)
                imageFromPostAuthor = output[0];
            arrayToReturn.push()
            var resenaFinded = Resenas.findOne({url:url})
            if(!resenaFinded){
                Resenas.insert({descripcion: descripcion, updated: updated, name: name, image:imageFromPostAuthor, post: titleLastPost, url:url});
            }
            else{
                Resenas.update({url:url},{descripcion: descripcion, updated: updated, name: name, image:imageFromPostAuthor, post: titleLastPost, url:url});
            }
        }
        catch(e){
            console.log("failed blogs", e);
        }
    })
}

