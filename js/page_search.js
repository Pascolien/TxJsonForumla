// JavaScript Document
pathLevel = '../../';

function ValidRecherche(event, bSubmit, bLimit) {	
	if ((event.keyCode == 13) || (bSubmit)) {	
		J("#id_btn_launch_search").attr("disabled","disabled");
		J('#id_div_loading').css("display",'block');
		J('#div_nbResult').css("display",'block');	             
		mot_cles_et = document.form1.mots_cles.value;
		mot_cles_ou = document.form1.mots_cles_ou.value;
		mot_cles_sans = document.form1.mots_cles_sans.value;
		Get_XML_Search_Result(mot_cles_et, mot_cles_ou, mot_cles_sans, ID_TE_cmb, document.form1.c_lien.checked, document.form1.c_doc.checked, bLimit); 
	}	
}

function Get_Nb_Search_Results(){
	new J.ajax({
		url:'../asp/ajax/actions_form.asp',
		async:false,
		cache:false,
		dataType:'html',
		data:{sFunction_Name:"Get_Nb_Search_Results"},
		success:function(data){
			J('#div_nbResult').css('visibility','visible');
			J('#div_nbResult').html(data);
		}
	});
}

function Get_XML_Search_Result(AStr_And, AStr_Or, AStr_Without, AID_OT, ALink, ADoc, ALimit){	
    mygrid.clearAll();
	if (isIE(8)){
		AStr_And = ReplaceWithoutAccents(AStr_And);
		AStr_Or = ReplaceWithoutAccents(AStr_Or);
		AStr_Without = ReplaceWithoutAccents(AStr_Without);
	}
	new J.ajax({
		url:pathLevel + 'code/asp/ajax/load_xml_search_result.asp',
		async:false,
		cache:false,
		dataType:'html',
		data:{
			path_level:pathLevel,
			id_ot:AID_OT,
			str_and:AStr_And,
			str_or:AStr_Or,
			str_without:AStr_Without,
			bLink:ALink,
			bDoc:ADoc,
			bLimit:ALimit
		},
		success:function(data){
			mygrid.parse(data);
			if (data.indexOf("Popup_Alert(") != -1){
				J("#id_div_empty").append("<script type='text/javascript'>parent."+data+"</script>");
				J("#div_nbResult").css("display","none");
			}
			J("#id_div_loading").css("display",'none');
			J("#id_btn_launch_search").removeAttr('disabled');
		}
	});
}
