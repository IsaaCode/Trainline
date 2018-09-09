/* Une fonction qui sert d'envoyer une requette au server "tictatrip"
dans cette requête on met la lettre saisie par le client. Le server  "tictatrp"
renvoie la liste des gares commençant par la lettre en question*/

//La fonction prend en paramètres l'url cible et la fonction callback appelée en cas de succès
function ajaxGet(url, callback){
    //création d'une requête HTTP
    var req = new XMLHttpRequest();
    
    //configuratioin de la requête
    req.open("GET", url);

    //Envoie de la requête
    req.send(null);

    //reponse du serveur
    /*Comme nous utilisons un requête de type "asynchrone",
    nous voulons donc savoir si le serveur nous a répondu
    */
   req.addEventListener("load", function(){
       //si le status de la réponse du serveur est compris entre 200 et 400
       //on appel notre fonction callback
       if(req.status >= 200 && req.status < 400){
            //Appelle de la fonction callback en lui passant la réponse de la requête 
            callback(req.responseText);
       } else {
           console.error(req.status + " " + req.statusText + " " + url);
       }
   });

   req.addEventListener("error", function(){
       console.error("Erreur réseau avec l'url " + url);
   });
}
