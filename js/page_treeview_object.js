// JavaScript Document
var id_treeviewE = 0;
var id_te = 0;
var teexma_mode;

function ObjHint(id_obj) {
	new J.ajax({
		url:'../../code/asp/ajax/actions_Abstract.asp',
		async: true,
		cache: false,
		data: { 
			sFunction_Name :"Get_Object_Hint",
			id_obj: id_obj
		},
		success: function(data) {
			J('#id_e_'+id_obj).attr('title',data);
		} 
	});  
}

function Pass_Document_As_Reference(AID_Obj) {
	// On vérifie si il y a bien un fichier "modifiable"
	// et On vérifie si il y a déjà un fichier de réf (auquel cas on demande si l'utilisateur veux l'écraser)
	new J.ajax({
		url:'../../code/asp/ajax/actions_Function_Object.asp',
		async: false,
		cache: false,
		data: { 
			sFunction_Name :"Check_Pass_Document_As_Reference",
			id_obj: AID_Obj 
		},
		success: function(data) {
			Valeur = data;
		}      
	});
	Valeurs = Valeur.split("|");
	// Valeur = 0 : Message d'erreur pour dire qu'il n'y a pas de fichiers modifiable
	if (Valeurs[0] == 0) {
		Popup_Error(Valeurs[1]);
		return;
	}                  
	
	// Valeur = 1 : Message pour demander si on veux écraser le fichiers de référence déjà présent
	if (Valeurs[0] == 1) {
		if (confirm(Valeurs[1]) == false) {
			return;
		}
	}
	
	// Valeur = 2 : On lance directement le passage en référence
	
	new J.ajax({
		url:'../../code/asp/ajax/actions_Abstract.asp',
		async: false,
		cache: false,
		data: { 
			sFunction_Name :"Pass_Document_As_Reference",
			id_obj: AID_Obj, 
			transform_to_pdf: false 
		},
		success: function(data) {
			id_obj_new = data;
		}      
	});
	
	window.parent.frames['frame_pe'].document.location.reload(true);	 
}

function Create_Document_Versionned_In_DB(AID_Obj) {
	id_obj_new = '0';
	
	if (confirm("Voulez-vous copier les fichiers de travail ?")) {
		duplicate_work_files = true;
	} else {
		duplicate_work_files = false;
	}
		
	new J.ajax({
		url:'../../code/asp/ajax/actions_Function_Object.asp',
		async: false,
		cache: false,
		data: { 
			sFunction_Name :"Create_Document_Versionned_In_DB",
			id_obj: AID_Obj, 
			duplicate_work_files: duplicate_work_files 
		},
		success: function(data) {
			id_obj_new = data;
		}      
	});
	if (id_obj_new != '0') {
		window.parent.frames['frame_blanc'].document.location.replace("nav.asp?envoyeur=te&id_e="+id_obj_new);
	}
}

function Open_Tree_E(id_tree, id_te, id_e, type) {	
	var img  = J("#img_"+id_tree+"_"+id_e);
	var e1   = J("#tree1_"+id_tree+"_"+id_e);
	
	vide = false;
	
	if(e1.html('')){
		vide = true;
		new J.ajax({
			url:'../../code/asp/ajax/loading_in_progress.asp',
			async: false,
			cache: false,
			data: { taille : '12px' },
			success:function(data){
				e1.html(data);
			}
		});
	}
	
	if (id_e == 0) {
		e1.css('display','none');
		e1.html('');
	}
	if(e1.css('display') != 'block') {
		e1.css('display','block');
		if(img)img.attr('src','../../'+ Path_Graphics_Charter +'/img/btn_tree/minus.png');
	} else {
		e1.css('display','none');
		if(img)img.attr('src','../../'+ Path_Graphics_Charter +'/img/btn_tree/plusik.png');
	}
	// On charge à chaque fois les enfants du noeud qu'on ouvre.

	new J.ajax({
	    url: '../../code/asp/ajax/actions_Treeview.asp',
	    cache: false,
		data: { 
			sFunction_Name :"Get_HTML_Treeview_Entity_LoadChild",
			id_tree: id_tree, 
			id_te: id_te, 
			id_e_pere: id_e, 
			id_e: 0, 
			recurs: false, 
			type : type 
		},
		success:function(data){
			J("#tree1_"+id_tree+"_"+id_e).html(data);
		}
	});
}

// Fonction qui surligne l'entité sur laquel on a cliqué et qui mets à jour le formulaire
function Tree_SelectE(id_tree, obj) {
	J('#action').html(' ');
	var elts = Jclass('tree_'+id_tree+'_e_name', 'span', J('#tree_'+id_tree));
  
	for(var i = 0 ; i <  elts.length ; i++) {
		J(elts[i]).css('backgroundColor','transparent');
	}
	if (obj) {
		obj.css("backgroundColor",'#cccccc');
		var str_temp = obj.id;
		document.form_nav.id_e.value = str_temp.substr(str_temp.length - (str_temp.length-5));
	} else {
		document.form_nav.id_e.value = 0;	
	}
	if (Prototype.Browser.IE) {
		document.form_nav.submit();		
	} else {	
		new J.ajax({
			url:'../../code/asp/nav.asp',
			async: false,
			cache: false,
			data: { envoyeur: 'e', id_e: document.form_nav.id_e.value },
			success:function(data){
				window.parent.frames['frame_blanc'].document.body.append(data);
			}
	  });	
	}
	if ((document.form_nav.id_e.value != '0') && ((document.form_nav.id_e.value != ''))) {
		if (document.form_nav.nav_mode.value == 'TE') {
			id_origin = 1;  
		} else {
			id_origin = 2;
		}                          
		new J.ajax({
		    url: '../../code/asp/ajax/log_navigation_action.asp',
		    cache: false,
			data: { origin : id_origin, id_obj : document.form_nav.id_e.value }
		});
	} 
	Chargement_ActionEntite(teexma_mode);			
}   

function openWindow(pURL)	{
	myWindow = window.open(pURL, 'ActionWindow', 'toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=no,resizable=yes,width=350,height=300');
}
