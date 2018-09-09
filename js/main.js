/* -- Nous avons créer une fonction(ajaxGet) dans notre fichier ajax.js.
nous allons appeller cette fonction(ajaxGet), ensuite nous traitérions
la réponse de cette requête*/

//traitement de la reponse
          
function afficher(reponse){
    var resultatElt = document.getElementById("containerDroite");
    resultatElt.innerHTML = '<div id="titreP" class="row ligne1" style="margin-bottom:25px"><p class="col-sm-offset-1 col-sm-10">Choisissez une gare de départ</p></div>';    
    
    var divElt = document.createElement("div");
    divElt.classList.add("list-group");
    document.getElementById("containerDroite").insertAdjacentElement('beforeend', divElt);
    
    var objetReponse = JSON.parse(reponse);
    if(objetReponse.length > 8){
        for(var i = 0; i < 7; i++){
                divElt.innerHTML +='<button id='+ objetReponse[i].city_id  + ' onclick=recupValue("' + objetReponse[i].unique_name + '")' + ' class="col-sm-12 list-group-item buttonDroite">' + objetReponse[i].unique_name + '</button>';             
                //divElt.innerHTML +='<button id='+ objetReponse[i].city_id +' onclick="recupValue(\"' + objetReponse[i].unique_name + '\")" class="col-sm-12 list-group-item buttonDroite">' + objetReponse[i].unique_name + '</button>';             
                
        }
    } 
    else{
        for(var i = 0; i < objetReponse.length; i++){
            divElt.innerHTML +='<button id='+ objetReponse[i].city_id  + ' onclick=recupValue("' + objetReponse[i].unique_name + '")' + ' class="col-sm-12 list-group-item buttonDroite">' + objetReponse[i].unique_name + '</button>';             
            
        }
    }
    /* Optiont via */
    var ContButtonViaElt = document.createElement("div")
    
    ContButtonViaElt.id = "containerButtonVia";
    ContButtonViaElt.textContent = "";
    divElt.insertAdjacentElement('afterend', ContButtonViaElt);

    var buttonViaElt = document.createElement("button");
    buttonViaElt.classList = "col-sm-offset-10 col-sm-2";
    buttonViaElt.id = "buttonVia";
    buttonViaElt.textContent = "VIA";
    buttonViaElt.style.backgroundColor = "#d3f9f4";
    buttonViaElt.style.border = "1px solid #01c3a7";
    buttonViaElt.style.borderRadius = "3px";
    buttonViaElt.style.color = "#01c3a7";
    buttonViaElt.style.lineHeight = "30px";
    ContButtonViaElt.appendChild(buttonViaElt);

    var buttonSuprimViaElt = document.createElement("button");
    buttonSuprimViaElt.classList = "col-sm-offset-7 col-sm-5";
    buttonSuprimViaElt.id = "buttonSuprimVia";
    buttonSuprimViaElt.textContent = "SUPPRIMER LE VIA";
    buttonSuprimViaElt.style.backgroundColor = "#8c9da1";
    buttonSuprimViaElt.style.border = "1px solid #70858a";
    buttonSuprimViaElt.style.borderRadius = "3px";
    buttonSuprimViaElt.style.color = "white";
    buttonSuprimViaElt.style.lineHeight = "30px";
   
    buttonSuprimViaElt.style.display = "none";
    ContButtonViaElt.appendChild(buttonSuprimViaElt);
    
    document.getElementById("buttonVia").addEventListener("click", function(e){
        document.getElementById("via").style.display = "block";
        e.target.style.display = "none";
        document.getElementById("buttonSuprimVia").style.display = "block";
    });

    document.getElementById("buttonSuprimVia").addEventListener("click", function(e){
        document.getElementById("via").style.display = "none";
        e.target.style.display = "none";
        document.getElementById("buttonVia").style.display = "block";
    });
}





var ChampDeDepartElt = document.getElementById("ChampDeDepart");
var ChampDarriverElt = document.getElementById("ChampDarriver");
var viaElt = document.getElementById("via");

ChampDeDepartElt.onclick = clickSurChampGares;
ChampDarriverElt.onclick = clickSurChampGares;
viaElt.onclick = clickSurChampGares;

var IdchampCliquer = "";

function clickSurChampGares(vent){
    ChampDeDepartElt.style.borderColor = "#cccccc";
    ChampDarriverElt.style.borderColor = "#cccccc";
    vent.target.style.borderColor = "#01c3a7";

    IdchampCliquer = vent.target.getAttribute("id");
   
}


function recupValue(name){
    document.getElementById(IdchampCliquer).value = name;
  // document.getElementById("ChampDeDepart").value = name;
}
 


//Quant on click sur le champ de saisi (gare de départ ou arrivé)
document.getElementById("ChampDeDepart").addEventListener("click", function(){
    document.getElementById("calendar").style.display = "none";
    document.getElementById("containerChoixDuPassager").style.display = "none";
    document.getElementById("containerDroite").style.display = "block";
    ajaxGet("http://www-uat.tictactrip.eu/api/cities/autocomplete/?q=P", afficher);
    
});



document.getElementById("via").addEventListener("click", function(){
    ajaxGet("http://www-uat.tictactrip.eu/api/cities/autocomplete/?q=P", afficher);
});

document.getElementById("ChampDarriver").addEventListener("click", function(){
    document.getElementById("calendar").style.display = "none";
    document.getElementById("containerChoixDuPassager").style.display = "none";
    document.getElementById("containerDroite").style.display = "block";
    ajaxGet("http://www-uat.tictactrip.eu/api/cities/autocomplete/?q=P", afficher);
});

var form = document.querySelector("form"); //On utilise le formulaire comme élément du DOM
    

//verificatioin de la saisi du client
function saisir(e){
    var regex = /[a-z]||[A-Z]/;//On prend uniquement les caractères d'alphabet
    var saisi = e.target.value;
    if(regex.test(saisi)){
        ajaxGet("http://www-uat.tictactrip.eu/api/cities/autocomplete/?q=" + saisi, afficher);
    }
}

document.getElementById("ChampDeDepart").addEventListener("input", saisir);
document.getElementById("via").addEventListener("input", saisir);
document.getElementById("ChampDarriver").addEventListener("input", saisir);

/* Calendar */
        /* Affichage du calendrier */
var dateElt = document.getElementById("champ_date2");
dateElt.addEventListener("focus", function(){
    document.getElementById("containerDroite").style.display = "none";
    document.getElementById("containerChoixDuPassager").style.display = "none";
    document.getElementById("calendar").style.display = "block";
    calInit("calendarMain2", "Calendrier", "champ_date2", "jsCalendar", "day", "selectedDay");
});


var dateElt2 = document.getElementById("champ_dateRetour");
dateElt2.addEventListener("focus", function(){
    document.getElementById("containerDroite").style.display = "none";
    document.getElementById("containerChoixDuPassager").style.display = "none";
    document.getElementById("calendar").style.display = "block";
    calInit("calendarMain2", "Calendrier", "champ_dateRetour", "jsCalendar", "day", "selectedDay");
    document.getElementById("optionPasDeRetour").style.display = "block";
 
});


/* OPTION PAS DE RETOUR */

 
/*----------Heure-------------*/

var clickDepart = 0;  /* Initialisation du nombre de click sur le champ de départ à zero */
var clickArriver = 0; /* Initialisation du nombre de click sur le champ d'arriver à zero */

var heurElt = document.getElementsByClassName("h"); /* Récupération de l'objet contenant la liste des heures  */
var champGarDepElt = document.getElementById("champ_date2");
var champArriverElt = document.getElementById("champ_dateRetour");

champGarDepElt.onclick = clickChampAllerRetour;
champArriverElt.onclick = clickChampAllerRetour;

/*-------Appel de la fonction qui permet d'afficher le calendrier------ */

      
/*---------- */

/* Fonction permetant d'inserer l'heur sur le champ sélectionner */
    function clickChampAllerRetour(vent){

        /* Le champ qui à été selectionné en dernier en lui donne une bordure "red" */
        champGarDepElt.style.borderColor = "white";
        champArriverElt.style.borderColor = "white";
        vent.target.style.borderColor = "red";

        
        /* On verifie si le champ "Aller" à été selectionner, on met dans la variable clickDEpart le nbr 1" */
        if( (champGarDepElt.style.borderColor === "red") && (champArriverElt.style.borderColor === "white")){
            clickDepart = 1;
            clickArriver = 0;
        }
        /* On verifie si le champ "Retour" à été selectionner, on met dans la variable clickArriver le nbr 1" */
        
        if((champGarDepElt.style.borderColor === "white") && (champArriverElt.style.borderColor === "red")){
            clickDepart = 0;
            clickArriver = 1;
        }

        /* Affichage du calendrier par rapport au champs cliquer par le client */
        if(clickDepart > clickArriver){
             }else{
            
        }

        
        for(var i = 0; i < heurElt.length; i++){
            /* On ajoute l'événement onclick sur tous les éléments se trouvant dans 
            l'objet heurElt */
            heurElt[i].onclick = onAcliquer;
           
        }
        
       
        function onAcliquer(e){

            for(var i = 0; i < heurElt.length; i++){
                heurElt[i].style.backgroundColor = "white";
                e.target.style.backgroundColor = "#01c3a7";
            }
            
            if(clickDepart > clickArriver){
                document.getElementById("champHeurDepart").textContent = "à partir de " + e.target.textContent;
            }else{
                document.getElementById("champHeurArriver").textContent = "à partir de " + e.target.textContent;
            }
            
        }   
    }

    /* Choix de passage */
    /* Affichage du block "choissisez vos passager" */
    var choixDuPassagerElt = document.getElementById("choixDuPassager");
    choixDuPassagerElt.addEventListener("focus", function(e){
        document.getElementById("containerDroite").style.display = "none";
        document.getElementById("calendar").style.display = "none";
        //Affichage du block contenant le choix du passager
        document.getElementById("containerChoixDuPassager").style.display = "block";
    });
    

    /*Age du passager */
    /* On recupère l'age saisie pas le client et on l'insert dans le dans champ "Adulte (26-59)" */
    var ageClientElt = document.getElementById("ageClient");
    ageClientElt.addEventListener("change", function(e){
        choixDuPassagerElt.value = e.target.value;
    
        /* Affichage du champ de saisie age */
        if(e.target.value === "Jeune"){
            document.getElementById("carteAbonnement").style.display = "none";
            document.getElementById("groupAgeContainer").style.display ="block";
            document.getElementById("descriptAgeJeune").style.display = "block";
            insertAge();
        }else{
            document.getElementById("carteAbonnement").style.display = "block";
            document.getElementById("groupAgeContainer").style.display ="none";
            document.getElementById("descriptAgeJeune").style.display = "none";
            carteAbonnementElt.value = "Cartes et abonnement"
        }
    })

    /*Button ok sur le champ age*/
    var okElt = document.getElementById("ok");
    okElt.style.zIndex = -5;
    okElt.style.opacity = 0.5;
    okElt.style.backgroundColor = "#017f6d";

    /* Si l'utilisateur saisie un nombre, on l'insert dans le champ "ageClient" */
    function insertAge(){
        var JeuneElt = document.getElementById("jeune");
        var descrptionElt = document.getElementById("descriptAgeJeune");
        var ageUtilisateurElt = document.getElementById("ageUtilisateur");
        var regex = /^[0-9]{1,2}$/;

        afficheButonCartes();

        ageUtilisateurElt.addEventListener("input", function(event){
            if(regex.test(event.target.value)){
                /* si l'age est inférieur à 26 on l'insert dans le champ */
                if(event.target.value < 26){
                    descrptionElt.textContent = "L’âge du passager permettra d’obtenir le meilleur tarif.";
                    descrptionElt.style.color = "black";
                    descrptionElt.style.fontSize = "0.9em";
                    JeuneElt.textContent = "Jeune (" + event.target.value + " ans)";

                    okElt.style.zIndex = 1;
                    okElt.style.opacity = 1;
                    okElt.style.backgroundColor = "#01c3a7";
                    okElt.style.cursor = "pointer";
                    okElt.style.color = "white";
                    

                }else{
                    descrptionElt.textContent = 'Si le passager a plus de 25 ans, choisissez le profil "Adulte".';
                    descrptionElt.style.color = "red";
                    descrptionElt.style.fontSize = "0.8em";

                    okElt.style.zIndex = -5;
                    okElt.style.opacity = 0.5;
                    okElt.style.cursor = "none";
                }
                
            }else{
                descrptionElt.textContent = "L'age entré n'est pas valide"
                descrptionElt.style.color = "red";
                descrptionElt.style.fontSize = "1em";

                okElt.style.zIndex = -5;
                okElt.style.opacity = 0.5;
                okElt.style.cursor = "none";
            }
        });
    }

    /* Si on click sur OK, alors affiche le button "Cartes et abonnements" */
    function afficheButonCartes(){
        okElt.addEventListener("click", function(e){
            document.getElementById("carteAbonnement").style.display = "block";
            document.getElementById("carteAbonnement").style.zIndex = "2";
            document.getElementById("groupAgeContainer").style.display ="none";
            document.getElementById("descriptAgeJeune").style.display = "none";
        })
    }

    
    //Script concernant notre boîte de dialogue
    //Fonction affichage de la boite
    function ouvrirBoite(){
        document.getElementById("IdFond").style.display = "block";
        document.getElementById("IdContainer").style.display = "block";
    }

    //Fonction fermeture de la boite
    function fermeBoite(){
        document.getElementById("IdFond").style.display = "none";
        document.getElementById("IdContainer").style.display = "none";
    }

    //affichage de la boite 
    document.getElementById("carteAbonnement").addEventListener("click", function(e){
        ouvrirBoite();
    });

    //Récupération du nom de la carte
    document.getElementById("carteEtAbonnemnt").addEventListener("change", function(e){

        ajoutCarte(e.target.value);
    });

    var carteAbonnementElt = document.getElementById("carteAbonnement");
    function ajoutCarte(carteChoisie){
        document.getElementById("ajouterCarte").addEventListener("click", function(e){
            carteAbonnementElt.value = carteChoisie;
        });
        
    }
    
    //Fin de script

    //Ajout d'un nouveau passager
    function ajoutNvPassager(valueId){
        var blockElt = document.createElement("form");
        blockElt.classList = "row " + "agePassager";
      //  blockElt.innerHTML = '<div class="col-sm-offset-1 col-sm-5 contAgePassager"><div class="form-group "><div class="input-group passagerAge"><span style="display:none" class="input-group-addon "><i class="fas fa-times"></i></span><select onchange="changeEventHandler(event);" id="ageClient0" class="form-control ageClient"><option id="jeune0" value="Jeune">Jeune (0-25)</option><option selected value="Adulte (26-59)">Adulte (26-59)</option><option value="Senior">Senior (60+)</option></select></div></div></div><div  class="col-sm-5 autreContainer"><div id="groupAgeContainer0" style="display:none" class="form-group groupAgeContainer"><div class="input-group"><input type="text" class="form-control age" value="" placeholder="Age"><span id="ok0" class="input-group-addon ok">OK</span> </div></div><input id="carteAbonnement0"  type="button" value="Cartes et abonnements" class="form-control carteAbonnement"></div><div id="descriptAgeJeune0" class="col-sm-offset-2 col-sm-8 descriptAgeJeune">L’âge du passager permettra d’obtenir le meilleur tarif.</div>';
        blockElt.innerHTML = '<div id="contAgePassager' + valueId + ' " class="col-sm-offset-1 col-sm-5 contAgePassager"><div class="form-group "><div id="passagerAge' + valueId + ' "  class="input-group passagerAge"><span id="suprimePassager' + valueId + ' " class="input-group-addon "><i class="fas fa-times"></i></span><select onchange="changeEventHandler(event);" id="ageClient' + valueId + ' " class="form-control ageClient"><option id="jeune ' + valueId + '" value="Jeune">Jeune (0-25)</option><option selected value="Adulte (26-59)">Adulte (26-59)</option><option value="Senior">Senior (60+)</option></select></div></div></div><div id="autreContainer ' + valueId + '" class="col-sm-5 autreContainer"><div id="groupAgeContainer ' + valueId + '" style="display:none" class="form-group groupAgeContainer"><div class="input-group"><input id="ageUtilisateur ' + valueId + '" type="text" class="form-control age" value="" placeholder="Age"><span id="ok' + valueId + ' " class="input-group-addon ok">OK</span> </div></div><input id="carteAbonnement' + valueId + ' "  type="button" value="Cartes et abonnements" class="form-control carteAbonnement"></div><div id="descriptAgeJeune' + valueId + ' " class="col-sm-offset-2 col-sm-8 descriptAgeJeune">L’âge du passager permettra d’obtenir le meilleur tarif.</div>';
      document.getElementById("ajoutPassager").insertAdjacentElement('beforebegin', blockElt);
      
      document.getElementById("suprimePassager").style.display = "";
      

    
    }


    //Clique sur le button "Ajout un nouveau passager"
    var nbr = 0; //Conmpteur nombre de passagé
    var nbrAdulte = 1;
        document.getElementById("textAjoutPassager").addEventListener("click", function(){
        nbr ++;
        nbrAdulte++;

        if(nbr < 5){
            ajoutNvPassager(nbr);
            choixDuPassagerElt.value = nbrAdulte + " Adulte (26-59)";
        }else{
            document.getElementById("ajoutPassager").style.display = "none";
        
        }
            
        
        
    });

    
    function changeEventHandler(event) {
        var ageChoisi = event.target.value;
        var choixDuPassagerElt = document.getElementById("choixDuPassager");
        
        //Condition pour afficher le resultat dans le champ "Adulte(26-58)"
        if((choixDuPassagerElt.value === "Adulte (26-59)") && (ageChoisi === "")){
            choixDuPassagerElt.value = "2 Adule (26-59)";
        }
        else if((choixDuPassagerElt.value === "Jeune")&&(ageChoisi === "Jeune")){
            choixDuPassagerElt.value = "2" + ageChoisi;
        }else if(choixDuPassagerElt.value === "Adulte (26-59)"){
            choixDuPassagerElt.value = "on";
        }else if(choixDuPassagerElt.value === "Senior"){

        }
    }











