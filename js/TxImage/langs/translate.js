var RS_Tab1;
var RS_Tab2;

function Translate (){

//var lang = parent.tinymce.activeEditor.getLang();
var lang = parent.tinymce.activeEditor.getParam('language');

if (lang == "fr_FR") {

				var RS_languages = {
				'{#TxImage_js.tab_general}' :"Général",
				'{#TxImage_js.tab_appearance}':"Apparence",
				'{#TxImage_js.tab_advanced}':"Avancé",
				'{#TxImage_js.general}':"Général",
				'{#TxImage_js.title}':"Titre :",
				'{#TxImage_js.preview}':"Aperçu",
				'{#TxImage_js.constrain_proportions}':"Contraindre les proportions",
				'{#TxImage_js.langdir}':"Langage direction",
				'{#TxImage_js.langcode}':"Langage code",
				'{#TxImage_js.long_desc}':"Description du lien",
				'{#TxImage_js.style}':"Style",
				'{#TxImage_js.classes}':"Classes",
				'{#TxImage_js.ltr}':"Gauche à droite",
				'{#TxImage_js.rtl}':"Droite à gauche",
				'{#TxImage_js.id}':"Id",
				'{#TxImage_js.map}':"Image cliquable",
				'{#TxImage_js.swap_image}':"Permuter l\'image",
				'{#TxImage_js.alt_image}':"Image Alternative",
				'{#TxImage_js.mouseover}':"Sur mouseOver",
				'{#TxImage_js.mouseout}':"Sur mouseOut",
				'{#TxImage_js.misc}':"Autre",
				'{#TxImage_js.example_img}':"Appearance preview image",
				'{#TxImage_js.missing_alt}':"Etes-vous sûr de vouloir continuer sans ajouter de description ? Sans description, l\'image peut ne pas être accessible à certains utilisateurs handicapés, ou à ceux qui utilisent un navigateur en mode texte, ou à ceux qui naviguent sur le web avec les images désactivées.",
				'{#TxImage_js.dialog_title}':"Insérer/modifier Image",
				'{#TxImage_js.src}':"Lien de l\'image :",
				'{#TxImage_js.alt}':"Description :",
				'{#TxImage_js.image_list}':"Liste d\'images",
				'{#TxImage_js.border}':"Bordure",
				'{#TxImage_js.dimensions}':"Dimensions :",
				'{#TxImage_js.vspace}':"Espace vertical",
				'{#TxImage_js.hspace}':"Espace horizontale",
				'{#TxImage_js.align}':"Alignement :",
				'{#TxImage_js.align_baseline}':"Baseline",
				'{#TxImage_js.align_top}':"Haut",
				'{#TxImage_js.align_middle}':"Milieu",
				'{#TxImage_js.align_bottom}':"Bas",
				'{#TxImage_js.align_texttop}':"Text haut",
				'{#TxImage_js.align_textbottom}':"Text bas",
				'{#TxImage_js.align_left}':"Gauche",
				'{#TxLink_js.filterObject}' : 'Filtrer sur le type d\'entités',
				'{#TxLink_js.selectObject}' : 'Sélectionnez une entité',
				'{#TxLink_js.URL}' : 'Site internet',
				'{#TxImage_js.external_link}' : "Lien externe",
				'{#TxImage_js.internal_link}' : "Lien interne",
				'{#TxImage_js.align_right}':"Droite",
				'{#TxImage_js.image_list}':"Liste d\'images",
				'{#TxImage_js.image_upload}':"Ouvrir une image",
				'{#TxImage_js.class_name}' : 'Classe',
				'{#TxImage_js.not_set}' : '-- non défini --',
				'{#TxImage_js.insert}' : 'Insérer',
				'{#TxImage_js.cancel}' : 'Annuler',	
				'{#TxImage_js.link_type}' : 'Type de lien',
				'{#TxImage_js.add_link}' : 'Image cliquable',
				'{#TxLink_js.website}' : 'Site internet',
				'{#TxLink_js.title}' : 'Titre'
		
				
		};
		
		RS_Tab1 = "Général";
		RS_Tab2 = "Apparence";	
		var html_languages = document.body.innerHTML;
		var i_languages;

		for (i_languages in RS_languages) {
			if (RS_languages.hasOwnProperty(i_languages)) {
				html_languages = html_languages.replace(RegExp(i_languages, 'g'), RS_languages[i_languages]);
		}}
		document.body.innerHTML = html_languages;
		
	
}

else

{ 
				var RS_languages = {
				'{#TxImage_js.tab_general}' :"General",
				'{#TxImage_js.tab_appearance}':"Appearance",
				'{#TxImage_js.tab_advanced}':"Advanced",
				'{#TxImage_js.general}':"General",
				'{#TxImage_js.title}':"Title :",
				'{#TxImage_js.preview}':"Preview",
				'{#TxImage_js.constrain_proportions}':"Constrain proportions",
				'{#TxImage_js.langdir}':"Language direction",
				'{#TxImage_js.langcode}':"Language code",
				'{#TxImage_js.long_desc}':"Long description link",
				'{#TxImage_js.style}':"Style",
				'{#TxImage_js.classes}':"Classes",
				'{#TxImage_js.ltr}':"Left to right",
				'{#TxImage_js.rtl}':"Right to left",
				'{#TxImage_js.id}':"Id",
				'{#TxImage_js.map}':"Image map",
				'{#TxImage_js.swap_image}':"Swap image",
				'{#TxImage_js.alt_image}':"Alternative image ",
				'{#TxImage_js.mouseover}':"for mouse over",
				'{#TxImage_js.mouseout}':"for mouse out",
				'{#TxImage_js.misc}':"Miscellaneous",
				'{#TxImage_js.example_img}':"Appearance preview image",
				'{#TxImage_js.missing_alt}':"Are you sure you want to continue without including an Image Description? Without it the image may not be accessible to some users with disabilities, or to those using a text browser, or browsing the Web with images turned off.",
				'{#TxImage_js.dialog_title}':"Insert/edit Image",
				'{#TxImage_js.src}':"Image URL :",
				'{#TxImage_js.alt}':"Description :",
				'{#TxImage_js.image_list}':"Image List",
				'{#TxImage_js.border}':"Border",
				'{#TxImage_js.dimensions}':"Dimensions :",
				'{#TxImage_js.vspace}':"Vertical space",
				'{#TxImage_js.hspace}':"Horizontal space",
				'{#TxImage_js.align}':"Alignment :",
				'{#TxImage_js.align_baseline}':"Baseline",
				'{#TxImage_js.align_top}':"Top",
				'{#TxImage_js.align_middle}':"Middle",
				'{#TxImage_js.align_bottom}':"Bottom",
				'{#TxImage_js.align_texttop}':"Text top",
				'{#TxImage_js.align_textbottom}':"Text bottom",
				'{#TxImage_js.align_left}':"Left",
				'{#TxLink_js.filterObject}' : 'Filter Object Type',
				'{#TxLink_js.selectObject}' : 'Select an Object',
				'{#TxLink_js.URL}' : 'External link',
				'{#TxImage_js.external_link}' : "External link",
				'{#TxImage_js.internal_link}' : "Internal link",
				'{#TxImage_js.align_right}':"Right",
				'{#TxImage_js.image_list}':"Image List",
				'{#TxImage_js.image_upload}':"Image Upload",
				'{#TxImage_js.class_name}' : 'Classes',
				'{#TxImage_js.not_set}' : '-- not set --',
				'{#TxImage_js.insert}' : 'Submit',
				'{#TxImage_js.cancel}' : 'Cancel',	
				'{#TxImage_js.link_type}' : 'Type of link',
				'{#TxImage_js.add_link}' : 'Add Link',
				'{#TxLink_js.website}' : 'External Link',
				'{#TxLink_js.title}' : 'Title'
				
		};
		
			RS_Tab1 = "General";
			RS_Tab2 = "Appearance";
	
		var html_languages = document.body.innerHTML;
		var i_languages;

		for (i_languages in RS_languages) {
			if (RS_languages.hasOwnProperty(i_languages)) {
				html_languages = html_languages.replace(RegExp(i_languages, 'g'), RS_languages[i_languages]);
		}}
		document.body.innerHTML = html_languages;
		
}

}