function Curve_Import_From_TEEXMA(id_tree, checked_items, id_pe, id_e,APopup_Form) {
	HTML_Tab = '';
	new J.ajax({
		url:'../../code/asp/ajax/actions_Curves.asp',
		async: false,
		cache: false,
		data: {
			sFunction_Name :"Curve_Import_From_TEEXMA",
			id_e : id_e,
			id_pe : id_pe,
			id_tree : id_tree,
			checked_items : checked_items 
		},
		success:function(data) {
			HTML_Tab = data;
		}
	});
	window.opener.Update_Tab(HTML_Tab,APopup_Form);  		
}
  
function Update_Tab(HTML_Tab) {
	J('#id_div_tab').html(HTML_Tab);  
}

function onlyNb(myField) {
	var reg1 = /^[-]{0,1}[0-9\s]{0,}[,.]{0,1}[0-9]{0,20}[E]{0,1}[-]{0,1}[0-9]{0,5}$/;
	if (reg1.exec(J(myField).val()) == null) {
		Popup_Alert(RS_JS_OnlyNumber);
		J(myField).val('');
	}
}
  
function DeleteCurve(AID_Attribute, AID_Object,APopup_Form,ARefresh) {
	try{
		// On dit qu'on a modifié la pe (pour que les modifs soient prise en compte)
		modification(AID_Attribute,APopup_Form);
		sID_Tab = 'tab_'+AID_Attribute;
		if(APopup_Form) 
			sID_Tab = 'tab_popup_'+AID_Attribute;
		// On efface toutes les données du tableau
		var tab = J("#"+sID_Tab);
		J("#"+sID_Tab+" tr").each(function(){
			obj =J('#'+sID_Tab+' tr:eq(' + (J('#'+sID_Tab+' tr').index(this) + 1) + ')');
			obj.find('td').each(function(){
					ID_Serie = J(this).children('input').eq(0).attr("id_serie");
					if (!ID_Serie){
						J(this).children('input').eq(0).val('');
					}
				});
		});	
		if (ARefresh){
			if (APopup_Form){
				Form_Popup_Refresh();
			}else{
			    Form_Refresh(0, true);
			}
		}
	} catch(e){}
}

function Tab_AddColumn(id_tab, obj,APopup_Form) {
	var sTemp;
	var nb;
	var sID_Tab = 'tab_'+id_tab;
	if (APopup_Form) sID_Tab = 'tab_popup_'+id_tab;
	var col_id = J(obj).parent().attr("id");

	Temp_Text = Text_AddColomn;
  	J("#"+sID_Tab+" tr:eq(0)").append(J("<th>", { html:Temp_Text.replace(/id_tab/g,id_tab), id:sID_Tab + '_c' + J('#'+sID_Tab+'_id_cMax').val()})); 
  	J('#'+sID_Tab+'_id_cMax').val(J('#'+sID_Tab+'_id_cMax').val() + 1);
	nb = 0;
	J("#"+sID_Tab+" tr").each(function(){	
		nb = nb + 1;
		if (nb != J("#"+sID_Tab+" tr").length){
			sTemp = J('#'+sID_Tab+' tr:eq(' + (J('#'+sID_Tab+' tr').index(this) + 1) + ')').find('td').eq(2).html();
			if (sTemp.indexOf('onlyNb') > 0) {
				J('#'+sID_Tab+' tr:eq(' + (J('#'+sID_Tab+' tr').index(this) + 1) + ')').append(J("<td>",{ html:'<input type="text" size="2" class="inp_discret" onKeyUp="onlyNb(this);"  />' }));
			}	
			else {
				J('#'+sID_Tab+' tr:eq(' + (J('#'+sID_Tab+' tr').index(this) + 1) + ')').append(J("<td>",{ html:'<input type="text" size="2" class="inp_discret"  />' }));
			}
		}
  	});
  }

function Tab_DeleteColumn(id_tab, obj,APopup_Form) {
	var sID_Tab = 'tab_'+id_tab;
	if (APopup_Form) sID_Tab = 'tab_popup_'+id_tab;
	var tab = J("#"+sID_Tab);
	var col_id = J(obj).parent().attr("id");
	var decalage = 0;
	var nb = 0;
	J("#"+sID_Tab+" th").each(function(){	
			nb = nb +1;
			if (J(this).attr("id") == col_id){
				decalage = nb - 1;
			}		
	}); 
	nb = 0;
	J('#'+sID_Tab+' tr:last').each(function(){
		J(this).find('td').each(function(){
			nb = nb + 1;
		});
	});
	if (nb > 3){
		J('#'+sID_Tab+' tr').each(function(){
			J(this).find('td').eq(decalage).remove();
		});
		J('#'+col_id).remove();
	}
}

function Tab_AddLine(id_tab, obj, name_serie,APopup_Form,aNumerical) {
	var sID_Tab = 'tab_'+id_tab;
	if (APopup_Form) 
		sID_Tab = 'tab_popup_'+id_tab;
		
	var tab = J("#"+sID_Tab);
	var line = J(obj).parent().parent();
	J("#"+sID_Tab+" tr").each(function(){	
		if (J(this).attr("id") == line.attr("id")) {
			Temp_Text = '<input type="hidden" value="name_serie" /> name_serie ' + Text_AddLine;
			Temp_Text = Temp_Text.replace(/id_tab/g, id_tab);
			tab.append(J("<tr>",{ id:sID_Tab + '_r' +  J('#'+sID_Tab+'_id_rMax').val()}).append(J("<td>",{html:Temp_Text.replace(/name_serie/g, name_serie)})));
			J('#'+sID_Tab+'_id_rMax').val(J('#'+sID_Tab+'_id_rMax').val() + 1);
			var max=((J('#'+sID_Tab+' td').length-1-(J('#'+sID_Tab+' tr').length-2))/(J('#'+sID_Tab+' tr').length-2));
			for (var j = 0; j < max; j++) {
			    sOnKeyUp = "";
			    if (aNumerical)
			        sOnKeyUp = 'onkeyup="onlyNb(this);"';				    

				J("#"+sID_Tab+" tr:last").append(J("<td>",{html:'<input type="text" size="2" class="inp_discret" onclick="modification('+id_tab+')" '+sOnKeyUp+'  />'}));
			}											
		}
	});				
}

function Tab_DeleteLine(id_tab, obj,APopup_Form) {
	var sID_Tab = 'tab_'+id_tab;
	if (APopup_Form) sID_Tab = 'tab_popup_'+id_tab;
	var tab = J("#"+sID_Tab);
	var line = J(obj).parent().parent();
	if (Tab_VerifTwoExist(sID_Tab, line.children().first().children().first().val())) {
		J("#"+sID_Tab+" tr").each(function(){	
			if (J(this).attr("id") == line.attr("id")) {
				J('#'+line.attr("id")).remove();
			}
		}); 
	}
}

function Tab_VerifTwoExist(sID_Tab, name) {
	var nb = 0;
	J("#"+sID_Tab+" tr").each(function(){	
		if (J('#'+sID_Tab+' tr:eq(' + (J('#'+sID_Tab+' tr').index(this) + 1) + ')').children().first().children().first().val() == name) {
			nb = nb + 1;
		}	
	});
	if (nb > 1) {
		return true;
	} else {
		return false;
	}
}	

function Update_File_Name(AFile_Name){
	J("#id_hidden_filename").val(Extract_File_Name(AFile_Name));
	setTimeout("document.form1.submit();",500);
	
}
  
function Save_Curve_Import(id_obj, id_attr, csv_file, obj_tab, APopup_Form) {
	if (Check_Colomn(id_attr)) {
		tab_value = Get_Table_Value(obj_tab);
		new J.ajax({
			url:'../../code/asp/ajax/actions_Forms.asp',
			async: false,
			cache: false,
			dataType:'html',
			method:"post",
			data: {
				sFunction_Name :"Write_Data_Table",
				id_object : id_obj,
				id_attribute : id_attr,
				csv_file : csv_file,
				tab_value : tab_value	     
			},
			success:function(data){
				if (data.match("<script>")){
					J("#id_div_error").html(data);
				} else {
					if (APopup_Form){
						setTimeout("parent.Form_Popup_Refresh();",300);
					} else {
						setTimeout("parent.Form_Refresh();",300);
					}
					setTimeout("Close_Popup_Import_Data_Array();",400);  
				}
			}
		});
	} else {
	    parent.Popup_Error("Error");
	}
}
  
function Check_Colomn(id_tab,APopup_Form) {
	var list = ';;';
	var list_temp = '';
	var sID_Tab = 'tab_'+id_tab;
	if (APopup_Form) sID_Tab = 'tab_popup_'+id_tab;
	var tab = J("#"+sID_Tab)
	J("#"+sID_Tab+" tr").each(function(){
		obj = J('#'+sID_Tab+' tr:eq(' + (J('#'+sID_Tab+' tr').index(this) + 1) + ')').find('td').eq(0);
		obj_select = J(obj).children().eq(0);

		//select_value = obj_select.options[obj_select.selectedIndex].val();
		select_value = J(obj_select).eq(obj_select.attr('selectedIndex')).val();
		//select_multi = obj_select.options[obj_select.selectedIndex].attr("multi"); 
		select_multi = J(obj_select).eq(obj_select.attr('selectedIndex')).attr("multi"); 
		if (select_multi == 0) {
			if (list.indexOf(';'+select_value+';') > 0) {          
				return false;
			}
			list = list + select_value + ';';
		}
	});
	return  true;
}