// JavaScript Document

var JS_Nom_Doc;

function change (that) {
	var message = RS_JS_Upload_Message + fileMaxSize + " Mo !";
	if (! Check_IE()) {
		if(that.files[0].size > fileMaxSize*1000*1000) {
			J("body").empty();
			Popup_Alert(message, "location.reload();");
			return;
		}
	}
	JS_Nom_Doc = that.value;
	GED_Etape_Suivante(2);
	J('#id_label_input_file').html(Extract_File_Name(that.value));
}

function GED_Etape_Suivante(etape, APopup_Form) {
	if (etape == 0) { // cas du choix du type de capitalisation
		if (Jn('type_capitalisation').eq(0).val() == 'reference') {
			etape = 1;
		} else {
			etape = 2;
		}
		nom_doc = 'test';
		obj = J('#id_div_ged');
	} else if (etape == 1) { // cas du référencement
		etape = 4;
	} else if (etape == 2) { // cas du choix du document
		etape = 3;
		nom_doc = JS_Nom_Doc;
		obj = J('#nom_doc');
	} else if (etape == 3) { // cas de la publication du document
		etape = 4;
		obj = J('#id_div_ged');
	} else if (etape == 4) { // Publication du doc 
		document.form1.submit();
		return true;
	} else if (etape == 5) {
		etape = 5;
		obj = J('#id_div_ged');
		Jn('id_donnee').eq(0).val((Jn('FileRef').eq(0).val()));
	}

	new J.ajax({
		url:'../../code/asp/ajax/actions_Function_Object.asp',
		async:false,
		cache:false,
	    dataType:'html',
		data:{
			sFunction_Name :"Get_HTML_Publication_Document",
			id_d: Jn('id_donnee').eq(0).val(),
			id_pe: 	Jn('id_pe').eq(0).val(),
			id_e:   Jn('id_e').eq(0).val(),
			etape:  etape,
			bPopup_Form:  APopup_Form,
			type_capitalisation: Jn('type_capitalisation').eq(0).val(),
			nom_doc: nom_doc
		},
		success:function(data){
			obj.html(data);
			Hide_BrowseButtonTranslatedForIe8();
		}
	});
}

function GED_Save_Ref(AID_Form,APopup){
	if (APopup){
		rFrame = Get_Parent_Frame();
		rFrame.Form_Popup_Refresh();	
	} else {
	    parent.Form_Refresh(0, true);
	}
	Close_Popup_Publish_Document();
}