var RS_Tab1;
var RS_Tab2;

function Translate (){

//var lang = parent.tinymce.activeEditor.getLang();
var lang = parent.tinymce.activeEditor.getParam('language');

if (lang == "fr_FR") {

		var RS_languages = {
		'{#TxLink_js.title}' : 'Libellé :',
		'{#TxLink_js.filterObject}' : 'Type d\'Entités :',
		'{#TxLink_js.selectObject}' : 'Entités :',
		'{#TxLink_js.URL}' : 'Site internet :',
		'{#TxLink_js.insert}' : 'Valider',
		'{#TxLink_js.cancel}' : 'Annuler'
	};
	RS_Tab1 = "Liens internes";
	RS_Tab2 = "Liens externes";
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
			'{#TxLink_js.title}' : 'Label :',
			'{#TxLink_js.filterObject}' : 'Object Type :',
			'{#TxLink_js.selectObject}' : 'Object :',
			'{#TxLink_js.URL}' : 'External link :',
			'{#TxLink_js.insert}' : 'Validate',
			'{#TxLink_js.cancel}' : 'Cancel'
		};
		RS_Tab1 = "Internals links";
		RS_Tab2 = "Externals links";
		var html_languages = document.body.innerHTML;
		var i_languages;

		for (i_languages in RS_languages) {
			if (RS_languages.hasOwnProperty(i_languages)) {
				html_languages = html_languages.replace(RegExp(i_languages, 'g'), RS_languages[i_languages]);
		}}
		document.body.innerHTML = html_languages;
		
}

}