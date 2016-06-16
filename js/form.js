var sID_Calendar_Active;
var rPopup_Form;
var sLastPortals = "";

SourceInfo = false;

function Form_Get_Actions_Switch_To_Reference(AForm, AWindow, ATree) {
    dhxForm = eval(AForm);
    dhxForm.attachEvent("onButtonClick", function (name, command) {
        switch (name) {
            case "valid":
                Tree_Switch_Document_As_Reference(false);
                break;
        }
        Windows_Get_Close(AWindow);
    });
}

function Form_Get_Actions_Switch_To_Ref_Conv_PDF(AForm, AWindow, ATree) {
    dhxForm = eval(AForm);
    dhxForm.attachEvent("onButtonClick", function (name, command) {
        switch (name) {
            case "valid":
                Tree_Switch_Document_As_Reference(true);
                break;
            case "valid":
                Tree_Switch_Document_As_Reference(false);
                break;
        }
        Windows_Get_Close(AWindow);
    });
}

function Form_Get_Actions_Versionning(AForm, AWindow, ATree) {
    dhxForm = eval(AForm);
    dhxForm.attachEvent("onButtonClick", function (name, command) {
        switch (name) {
            case "valid":
                Tree_Create_Document_Versionned(true);
                break;
            case "cancel":
                Tree_Create_Document_Versionned(false);
                break;
        }
        Windows_Get_Close(AWindow);
    });
}


function Form_Delete_Data(AID_Attribute,AID_Element,APopup_Form){
	modification(AID_Attribute,APopup_Form);
	J(AID_Element).val("");
	J(AID_Element).attr("fValue","");
}

function Delete_Document(AID_Data,APopup_Form,ARefresh_Form,AID_Attribute,AID_Object) { 
	bDelete_File = document.form1.type_supp[1].checked;
    new J.ajax({
		url:'../asp/ajax/actions_form.asp', 
		async: false,
		cache: false,
		data: {
			sFunction_Name:"Delete_Document",
			id_data : AID_Data, 
			bDelete_File : bDelete_File
		},
		success:function(data){
			if (ARefresh_Form){
				if (APopup_Form){
					rFrame = Get_Parent_Frame();
					rFrame.Form_Popup_Refresh(AID_Object);  
				} else { 
					parent.Form_Get_Content(AID_Attribute);
				}
			}
			Close_Popup_Delete_Document();
		}
	});			
}

function Form_Get_Actions_Advanced_Deletion(AForm,AWindow,ATree,AID_OT){
	dhxForm = eval(AForm);
	dhxForm.attachEvent("onButtonClick", function(name, command){
		switch (name){
			case "valid":
				Windows_Get_Close(AWindow);
				Windows_Get_Advanced_Deletions_Settings(AID_OT);
			break;
			case "cancel":
				Windows_Get_Close(AWindow);
			break;
		}
	});
}

function Form_Get_Actions_Delete(AForm,AWindow, ATree) {
	dhxForm = eval(AForm);
	var ID_Advanced_Settings=0;
	dhxForm.attachEvent("onButtonClick", function(name, command){
		dhxTree = eval(ATree);
		// catch ID_deletion_setting
		var select = dhxForm.getSelect("mySelect");
		if (select != null) 
			ID_Advanced_Settings = select.value;
		
		switch (name){
			case "valid":
				Tree_Delete_Node(dhxTree.getSelectedItemId(),ID_Advanced_Settings);
			break;
			case "cancel":
				if (ID_Advanced_Settings > 0){
					//case of advanced deletion asked but refuse by user. So send a standard deletion.
					Tree_Delete_Node(dhxTree.getSelectedItemId(),0);
				}
			break;
		}
		Windows_Get_Close(AWindow);
	});
}

function Form_Get_Content(AID_Attr) {
	new J.ajax({
		url:'../asp/ajax/actions_form.asp',
		async: false,
		cache:false,
		dataType:"html",
		data:{
			sFunction_Name:"Get_Form_Content"
		},
		success: function (data) {
            
			var regEx = new RegExp('^../../temp_resources/portals/.*asp$');
			if (data.match(regEx)) {
			    TxLayout.items[ID_Cell_Layout_Form].attachObject("id_div_form");
			    TxLayout.items[ID_Cell_Layout_Form].detachObject("id_div_form");
			    TxLayout.items[ID_Cell_Layout_Form].attachURL(data);
			    
			    sLastPortals = data;
			} else {
			    //data = data.replace(/Etes vous sûr de vouloir supprimer ce lien \?/g, "Please confirm the deletion of this link.");
				data = data.replace(/\/edit%23[0-9a-zA-Z=.%]*/g, '');
				J('#id_div_form_content').html(data);
			}	
			location.hash = '';
			if (AID_Attr>0){
				setTimeout("Set_Hash('attr_"+AID_Attr+"')",100);
			}
		}
	});
	Initialize_Form();
	return true;	
}
	
    function Exit_Popup_Form(ASave, AGED_Adv_Creation, AID_Object, AAdd_Object_After_Creation, AsID_Tree, AID_Duplication, AID_Creation, aNewIdNode) {
		if (AGED_Adv_Creation) {
			enregistrement(true);				
			Upload_GED_File(AID_Object, AsID_Tree);
			Close_Popup_Form();
		} else {
			if (ASave)
			    enregistrement(true);
			
			if (AID_Creation > 0){    
			    parent.Check_Multiple_Creation(AsID_Tree, AID_Creation, AID_Object);
				Execute_MA_After_Creation(AID_Object,AsID_Tree);
			} else if (AID_Duplication > 0) {
				Execute_MA_After_Duplication(AID_Object, AsID_Tree, aNewIdNode);
			}
			Close_Popup_Form();
		}	
	}

//permit to check if there is multiple creation. In this case a new popup form appear in case of advanced creations.
function Check_Multiple_Creation(AsID_Tree, AID_Advanced_Creation, AID_Object) {
	new J.ajax({
		url:'/code/asp/ajax/actions_form.asp',
		cache:false,
		async:false,
		dataType:'script',
		data:{
			sFunction_Name:"Check_Multiple_Creation",
			sID_Tree:AsID_Tree,
			ID_Object:AID_Object,
			ID_Advanced_Creation:AID_Advanced_Creation
		}
	});
}

function Form_Get_Header(){
	new J.ajax({
		type:'POST',
		processData: true,
		url:'../asp/ajax/actions_form.asp',
		async: false,
		cache: false,
		dataType:'html',
		data:{
			sFunction_Name:"Get_Form_Header"
		},
		success: function (data) {
		    J('#id_div_banner').html(data);
		    if (Check_IE()){
		    	setTimeout(function() {		    		
					try{
						window.parent.frames['frame_e'].TxLayout.cells("b").getFrame().contentWindow.location.reload(true);
					}catch(e){}
		    	}, 500);
			}
		}
	});
	if (dhxLayout.cells("a").isCollapsed()) {
		J("#collapse_nav").css("display","none");
	} else {
		J("#collapse_nav").css("display","block");
	}
	return true;
}

function Get_Hint_Attribute(AObject, AID_Attribute) {		
	if (AObject.title == '') {
		new J.ajax({
			url:'../asp/ajax/actions_Forms.asp',
			async: true,
			cache: false,
			data: { 
				sFunction_Name :"Get_Hint_Attribute",
				ID_Attribute: AID_Attribute
			},
			success: function(data) {	      	
				J(AObject).attr("title",data);
			} 
		});
	} 
	return false;
}

function Switch_Treeview_Height(AID_Attribute,APopup_Form) {
	var sDiv_Tree_Std = 'treebox_form_'+AID_Attribute;
	var sDiv_Tree_Flt = 'treebox_form_filtered_'+AID_Attribute;
	var sDiv_Yellow_Arrow = 'fleche_jaune_'+AID_Attribute;
	if (APopup_Form){
		sDiv_Tree_Std = 'treebox_form_popup_'+AID_Attribute;
		sDiv_Tree_Flt = 'treebox_form_filtered_popup_'+AID_Attribute;
		sDiv_Yellow_Arrow = 'fleche_jaune_popup_'+AID_Attribute;
	}
	if (J(sDiv_Yellow_Arrow)) {
		var str_image = J('#'+sDiv_Yellow_Arrow).attr('src');
		if (str_image.indexOf("arrow_down.png") != -1) {
			//display all arbo
			J('#'+sDiv_Tree_Std).css("height","auto");
			J('#'+sDiv_Tree_Std).css("min-height","18px");
			J('#'+sDiv_Tree_Flt).css("height","auto");
			J('#'+sDiv_Tree_Flt).css("min-height","18px");
			J('#'+sDiv_Yellow_Arrow).attr('src','../../resources/theme/img/btn_form/16x16_yellow_arrow_up.png');
		} else {
			//display first 4 objects
			J('#'+sDiv_Yellow_Arrow).attr('src','../../resources/theme/img/btn_form/16x16_yellow_arrow_down.png');
			J('#'+sDiv_Tree_Std).css("height","80px");
			J('#'+sDiv_Tree_Flt).css("height","80px");      
		}
	} 
}

function Clear_Combo_Object_Option(AID_Attribute,AsID_Combo,APopup_Form){
	var ID_Object = Get_ID_Object_Combo(AsID_Combo);
	Form_OnCheck(AID_Attribute,ID_Object,false,APopup_Form);
	dhxCombo = eval(AsID_Combo);
	dhxCombo.selectOption(0);
}

function Navigate_To_Combo_Object_Option(AsID_Combo){
	var ID_Object;
	ID_Object = Get_ID_Object_Combo(AsID_Combo);
	if (ID_Object != 0){
		Tree_Display_Node(ID_Object,0);
	}
}

function Form_Hauteur_Treeview(AID_Attribute,APopup_Form,AsID_Tree) {
	var dhxTree = null;
	try{
		dhxTree = eval(AsID_Tree);
	}catch(e){}
	var sDiv_Tree_Std = 'treebox_form_'+AID_Attribute;
	var sDiv_Tree_Flt = 'treebox_form_filtered_'+AID_Attribute;
	var sDiv_Yellow_Arrow = 'fleche_jaune_'+AID_Attribute;
	if (APopup_Form){
		sDiv_Tree_Std = 'treebox_form_popup_'+AID_Attribute;
		sDiv_Tree_Flt = 'treebox_form_filtered_popup_'+AID_Attribute;
		sDiv_Yellow_Arrow = 'fleche_jaune_popup_'+AID_Attribute;
	}
	if (J(sDiv_Yellow_Arrow)) {
		var str_image = J('#'+sDiv_Yellow_Arrow).attr('src');
		if (str_image.indexOf("arrow_down.png") != -1) {
			//display all arbo
			J('#'+sDiv_Tree_Std).css("height","500px");
			J('#'+sDiv_Tree_Std).css("height","auto");
			J('#'+sDiv_Tree_Std).css("min-height","18px");
			J('#'+sDiv_Tree_Std).css("overflow","auto");
			if (dhxTree != null) dhxTree.openItem('0');
		    // This will scroll the tree to bottom showing all objects, then return back to top
		    if (! J('#' + sDiv_Tree_Flt).hasClass("opened")) {
		        J('#' + sDiv_Tree_Flt).find('.containerTableStyle:first').animate({ scrollTop: J(this).height() }, function() {
		            J('#' + sDiv_Tree_Flt).find('.containerTableStyle:first').animate({ scrollTop: 0 }, function() {
		                J('#' + sDiv_Tree_Flt).css("height", "auto");
		                J('#' + sDiv_Tree_Flt).addClass("opened");
		            });
		        });
		    } else {
		        J('#' + sDiv_Tree_Flt).css("height", "auto");
		    }
		    J('#'+sDiv_Tree_Flt).css("min-height","18px");
			J('#' + sDiv_Yellow_Arrow).attr('src', '../../resources/theme/img/btn_form/16x16_yellow_arrow_up.png');
		} else {
			//display first 4 objects
			J('#'+sDiv_Yellow_Arrow).attr('src','../../resources/theme/img/btn_form/16x16_yellow_arrow_down.png');
			J('#'+sDiv_Tree_Std).css("height","72px");
			J('#' + sDiv_Tree_Flt).css("height", "72px");
		}
	} 
}

function Form_Information_Navigation(AID_Tree){
	var ID_Object = tree_id_select[AID_Tree];
	enregistrement(false);
	window.opener.enregistrement(false);
	if (ID_Object != 0) 
		window.opener.Tree_Display_Node(ID_Object);
	window.close();
}

// permit to initialize the datepicker component for mcs, form, choice guide.

function Initialize_Calendar(AID_Attribute, ALang, AData_Value, ADate_Format, ADate_And_Time_Format, AID_Input_Element, ATime, APopup_Form, ATarget) {
	J.timepicker.setDefaults(J.timepicker.regional[ALang]);	
	sYear_Range = "-200:+50";
	if (ATime){
		sDate_Format = ADate_And_Time_Format.substring(0,8);
		sTime_Format = ADate_And_Time_Format.substring(9,17);
		if(AData_Value != ""){
			sHour = AData_Value.substring(11,13);
			sMin = AData_Value.substring(14,16);
			sSec = AData_Value.substring(17,19);
			J('#'+AID_Input_Element).datetimepicker({
				changeMonth: true,
				changeYear: true,
				gotoCurrent: true,
				yearRange: sYear_Range,
				dateFormat:sDate_Format,
				timeFormat: sTime_Format,
				hour:sHour,
				minute:sMin,
				second:sSec
			});
		} else {
			J('#'+AID_Input_Element).datetimepicker({
				timeFormat: sTime_Format,
				changeMonth: true,
				changeYear: true,
				gotoCurrent: true,
				yearRange: sYear_Range,
				dateFormat:sDate_Format
			});
		}
	} else {
		J("#"+AID_Input_Element).datetimepicker({
			changeMonth: true,
			changeYear: true,
			gotoCurrent: true,
			yearRange: sYear_Range,
			showTimepicker:false,
			dateFormat:ADate_Format
		});			
	}
	//obj = document.getElementById(AID_Input_Element);
	obj = J("#"+AID_Input_Element);
	obj.click(function(){
		try{Modif_Critere = true;}catch(e){}
		if (J("#"+AID_Input_Element).val() == ""){
			Fill_Default_Date(AID_Attribute,ALang,ADate_Format,AID_Input_Element,APopup_Form,ATime);
			return false
		}
		return false;
	});
	obj.change(function(){
		try{Modif_Critere = true;}catch(e){}
		var currentDate = J("#"+AID_Input_Element).datetimepicker("getDate");
		if(!ATarget)
			ATarget = '';
		var fValue = DateStrToFloat(currentDate,ATime,ATarget);
		if (fValue == '0')
			fValue = "";
		J("#"+AID_Input_Element).attr("fValue",fValue);
		modification(AID_Attribute,APopup_Form,ATime);
	});
}

	//permit to initialize the input text with day date if it's empty.
function Fill_Default_Date(AID_Attribute, ALang, ADate_Format, AID_Input_Element, APopup_Form, ATime) {
    id = "#"+AID_Input_Element;
    var inst = J.datepicker._getInst(J(id)[0]),
			$dp = inst.dpDiv;
		J.datepicker._base_gotoToday(id);
		var tp_inst = J.datepicker._get(inst,'timepicker');
		var now = new Date();
		J.datepicker._setTime(inst, now);
		J('.ui-datepicker-today', $dp).click();
		J(id).datepicker("setDate", new Date());
		
		modification(AID_Attribute,APopup_Form);
		Modif_Critere = true;
	}
	
	//permit to show calendar when the schedule icon is clicked.
	function Display_Calendar(AID_Input_Element){
		//this instruction will be removed when frames disappeared
	    sID_Calendar_Active = AID_Input_Element;
		J("#"+AID_Input_Element).datetimepicker("show");
	}

function Form_Navigation_Treeview(AsID_Tree){
	var ID_Node;
	try {
		window.close;
	} catch(e){}
	new J.ajax({
		url:'../asp/ajax/actions_tree.asp',
		async: false,
		cache: false,
		dataType:'script',
		data:{
			sFunction_Name:"Get_ID_Node",
			sID_Tree:AsID_Tree
		},
		success:function(data){
			ID_Node = data;
			if (ID_Node != 0){
				enregistrement(false);
				Tree_Display_Node(ID_Node,0);
			}
		}
	});	
}

function Form_OnCheck(AID_Attribute, AID_Object,AChecked,APopup_Form) {
	var bChecked;
	var liste_id_e_ini = ';'+J('#id_e_initiale_'+AID_Attribute).val()+';';
	var liste_id_e_coche_abs = ';'+J('#id_e_coche_abs_'+AID_Attribute).val()+';';
	var sID_Objects_Unchecked = "id_e_decoche_"+AID_Attribute;
	var sID_Objects_Checked = "id_e_coche_"+AID_Attribute;
	var sID_Objects_Abs = "id_e_coche_abs_"+AID_Attribute;
	if(APopup_Form){
		var sID_Objects_Unchecked = "id_e_decoche_popup_"+AID_Attribute;
		var sID_Objects_Checked = "id_e_coche_popup_"+AID_Attribute;
		var sID_Objects_Abs = "id_e_coche_abs_popup_"+AID_Attribute;
	}
	if (AChecked == 1){
		bChecked = true;
	}else {
		bChecked = false;
	}
	if (bChecked) { // Lorsqu'on coche une checkbox
		J('#'+sID_Objects_Unchecked).val(Verif_Liste(J('#'+sID_Objects_Unchecked).val(), AID_Object));
		if (liste_id_e_ini.indexOf(';'+AID_Object+';') == -1) {
			J('#'+sID_Objects_Checked).val(Verif_Liste(J('#'+sID_Objects_Checked).val(), AID_Object) + AID_Object + ';');
		}
		if (liste_id_e_coche_abs.indexOf(';'+AID_Object+';') == -1) {
			J('#'+sID_Objects_Abs).val(Verif_Liste(J('#'+sID_Objects_Abs).val(), AID_Object) + AID_Object + ';');
		}
	} else { // Lorqu'on décoche une checkbox
		J('#'+sID_Objects_Checked).val(Verif_Liste(J('#'+sID_Objects_Checked).val(), AID_Object));
		if (liste_id_e_ini.indexOf(';'+AID_Object+';')!= -1) {
			J('#'+sID_Objects_Unchecked).val(Verif_Liste(J('#'+sID_Objects_Unchecked).val(), AID_Object) + AID_Object + ';');
		}
		J('#'+sID_Objects_Abs).val(Verif_Liste(J('#'+sID_Objects_Abs).val(), AID_Object));		
	}
	try	{
		modification(AID_Attribute,APopup_Form); // Pour informer d'une modifictaion du formulaire ou de la SMC
	} catch (error) {}		
}

function Form_Popup_Refresh(AID_Object){
	//enregistrement(true);
	rForm = J("form[name='document.form_popup_propriete_"+AID_Object+"']");
	rForm.submit();
	setTimeout('location.reload();',500);
}

function Form_Refresh(AID_Attribute, aSave) {
    if (aSave)
	    enregistrement(false);
	setTimeout("Form_Get_Content("+AID_Attribute+");",200);
}

function Form_TinyMCE_Modify_Element(AChecked,AID_Object_Checked,AObject_Name){
	if (AChecked) {
		if (J('#entityText').val() == "") J('#entityText').val(AObject_Name);
		J('#ID_Object').val(AID_Object_Checked);
	} else {
		J('#ID_Object').val(0);
	}
}

function Refresh_Associative_Links_Div(AID_Attribute,AID_Object){
	sNew_Content = "<table><tr><td colspan='20' style='text-align:center;'><a href='#' onclick='Display_Popup_Associatives("+AID_Attribute+", "+AID_Object+", 0);'><img src='../../resources/theme/img/btn_form/ajout_element.png' /></a></td></tr></table>";
	J("#id_div_asso_links_"+AID_Attribute).html(sNew_Content);
}

function Upload_GED_File(ID_Obj, aIdTree) {
	new J.ajax({
		url:'../../code/asp/ajax/actions_form.asp',
		async:false,
		cache:false,
		dataType:'script',
		data:{
			sFunction_Name:"Upload_GED_File",
			id_object: ID_Obj,
			sIdTree: aIdTree
		}
	});
}

function Check_Publication_After_Extraction(APublishing_Type,AID_Extraction,AFile_Name,AQuestion){
	var sResult;
	new J.ajax({
		url:'../../code/asp/ajax/actions_form.asp',
		dataType:"html",
		async:false,
		data:{
			sFunction_Name:"Check_Publication_After_Extraction",
			ID_Extraction:AID_Extraction,
			iPublishing_Type:APublishing_Type,
			sFile_Name:AFile_Name
		},
		success:function(data){
			sResult = data;
			switch(APublishing_Type){
				case 1:
					eval(sResult);
					sResult = "";
				break;
				case 2:
					window.parent.frames["frame_e"].Form_Get_Content();
				break;
			}
		}
	});
	return sResult;
}

function Add_Associative_Link(AID_Attribute, AID_Object) {
	parent.enregistrement(false);
	id_te = document.form1.id_te.value;
	id_e_lien = Jn('id_e_coche_abs_'+AID_Attribute).eq(0).val();
	id_e_lien = id_e_lien.replace(/ /g,"");
	if (document.form1.type_tableau.value == 'classe_asso') {
		new J.ajax({
			url: '../../code/asp/ajax/write_data_asso.asp',
			async: false,
			cache: false,
			dataType: "html",
            type:"post",
			data: { id_pe: document.form1.id_pe.value, id_e: AID_Object, id_e_lien: id_e_lien },
			success: function(data) {
				id_e_lien = data;
			},
			success:function(data){
				parent.Form_Get_Content(AID_Attribute);
				Close_Popup_Associatives();	  
			}
		});	
	}
}

function Save_Associative(AID_Object,AID_Attribute) {
	enregistrement(true);
	parent.enregistrement(false);	
	parent.Form_Get_Content(AID_Attribute);
	parent.Tree_Select_Node(true);
	
	if (AID_Object > 0)
		Execute_Model_Applications(AID_Attribute,AID_Object,0);
	Close_Popup_Associatives();
}

function Remove_Src_Info(AID_Object, AID_Attribute, ASource,APopup_Form) {
	new J.ajax({
		url:'../../code/asp/ajax/delete_sourceinfo.asp',
		async: false,
		cache: false,
		data: { liste_id_e : AID_Object, id_pe : AID_Attribute, source: ASource}
	});
	parent.enregistrement2(1);
	if(APopup_Form){
		parent.Form_Popup_Refresh();
	}else{
		parent.Form_Get_Content();
	}
	if (ASource)
		Close_Popup_Source();
	else
		Close_Popup_Information();
	
}

function Save_Src_Info(AID_Object,ASource,APopup){
	enregistrement2(0,true);
	
	nom_popup_form.submit();
	
	if (APopup)
		parent.Form_Popup_Refresh();
	else
		parent.Form_Get_Content();
	
	if (ASource)
		Close_Popup_Source();
	else
		Close_Popup_Information();
}

function Add_Group(){
	document.form1.submit();
}

function enregistrement(APopup_Form) {
	try{
		if (APopup_Form){
			nom_popup_form.action_page.value = 'Ecriture';
			if (verif_form(nom_popup_form) == false) {
				return false;
			}
		} else {
			nom_form.action_page.value = 'Ecriture';
			if (verif_form(nom_form) == false) {
				return false;
			}
		}
	} catch (e) {

	}
}

function Save_Extern_Form(ID_Obj,ARefresh_Form,APopup_Form,AID_Object,AID_Attribute) {
	enregistrement(false);
	if (ID_Obj > 0) {
		setTimeout("parent.GED_Upload_File("+ID_Obj+");",200);		
	} else {
		setTimeout("parent.enregistrement2(1);",200);
	}	
	if (APopup_Form){
		setTimeout("parent.Form_Popup_Refresh("+AID_Object+");",550);
	} else {
		if (ARefresh_Form == 1) setTimeout("parent.Form_Get_Content("+AID_Attribute+");",550);
	}	
	
	if (AID_Object > 0)setTimeout("Execute_Model_Applications("+AID_Attribute+","+AID_Object+",0);",500);
	setTimeout("window.close();",600);
}

// Fonction permettant de rajouter des boutons d'ajout/modification/suppression 
// sur un tableau de lien associatifs 
function Transform_Tab_Associative_Link() {
	
}

// Function permettant d'afficher ou de cacher des groupes suivant une list d'id_groupe et un id_group parent
function Display_Group(ID_Parent, List_ID_Group) {
	List_ID_Group = ',,' + List_ID_Group + ',';
	if (J('#field_'+ ID_Parent)) {
		list_child_group = J('#id_div_group_'+ ID_Parent).children();
	} else {
		list_child_group = J('#contenu_form').child().children();
	}
	for (i = 0;i<list_child_group.length;i++) {    
		sTemp = J(list_child_group[i]).attr("id");
		if (sTemp != '') {
			if (sTemp.substr(0, 6) == 'field_') {
				if (List_ID_Group.indexOf(','+sTemp.substr(6,sTemp.length)+',')> 0) {
					J(list_child_group[i]).css("display",'block');                   
				} else {
					J(list_child_group[i]).css("display",'none');
				}
			}
		}     
	}          
}

function Load_HTML_Editor(ID_Name,ALanguage) {
	tinymce.EditorManager.execCommand('mceRemoveEditor',true, 'content_'+ID_Name);
	tinymce.EditorManager.execCommand('mceAddEditor',true, 'content_'+ID_Name);
	InitTinyMCE('tiny_'+ ID_Name,ID_Name,ALanguage);	
	Jn('content_'+ID_Name).eq(0).css("display",'block');
	J('#html_text_'+ID_Name).css("display",'none');
}

function enregistrement2(pid_e,APopup_Form) {
	try{
		if(APopup_Form){
			if (nom_popup_form.chgt_form.value != '0') {
				nom_popup_form.action_page.value = 'Ecriture';
				if (SourceInfo) {
					nom_popup_form.actualiser.value = 'false';
				} else {
					nom_popup_form.actualiser.value = 'true';
				}
				verif_form(nom_popup_form); 
				if (SourceInfo) {  	
					if (pid_e == "0A0") {	 // fct désactivé		
						window.close();
					} else {
					}
				} else {
				}
			}
		}else{
			if (nom_form.chgt_form.value != '0') {
				nom_form.action_page.value = 'Ecriture';
				if (SourceInfo) {
					nom_form.actualiser.value = 'false';
				} else {
					nom_form.actualiser.value = 'true';
				}
				verif_form(nom_form); 
				if (SourceInfo) {  	
					if (pid_e == "0A0") {	 // fct désactivé		
						window.close();
					} else {
					}
				} else {
				}
			}
		}
	}catch(e){
	}
	
}
                                    
function ModifEnCours() {
	try {
		J('#contenu_form').html('<div style="text-align:center;"><img src="../../'+ Path_Graphics_Charter +'/img/gif/ajax-loader.gif" /></div>');
		J('#nom_entite_form').html('&nbsp;');		
	} catch (error) {}
}

function Convert_Unit(ID, ID_Unite_New,APopup_Form) {
	var sID_Val_Max = 'val_max_'+ID;
	var sID_Val_Min = 'val_min_'+ID;
	var sID_Val_Mean = 'val_mean_'+ID;
	var sID_Unit_Old = 'id_unite_old_'+ID;
	if (APopup_Form){
		sID_Val_Max = 'val_max_popup_'+ID;
		sID_Val_Min = 'val_min_popup_'+ID;
		sID_Val_Mean = 'val_mean_popup_'+ID;
		sID_Unit_Old = 'id_unite_old_popup_'+ID;
	}
	if ((J('#'+sID_Val_Max).length != 0) && (J('#'+sID_Val_Max).attr("value") != '')) {
		new J.ajax({
		    url: '../../code/asp/ajax/actions_otherFunctions.asp',
		    cache: false,
			data: { 
				sFunction_Name :"Convert_Unit",
				Value: J('#'+sID_Val_Max).attr("value"), 
				ID_Unit_Old: J('#'+sID_Unit_Old).attr("value"), 
				ID_Unit_New: ID_Unite_New 
			},
			success: function(data) {
				J('#'+sID_Val_Max).val(data);
			}
		});
		// Idem pour les bornes inf et bornes sup
		if (J('#'+sID_Val_Max).attr("b_inf") != "-INF") {
			new J.ajax({
			    url: '../../code/asp/ajax/actions_otherFunctions.asp',
			    cache: false,
				data: { 
					sFunction_Name :"Convert_Unit",
					Value: J('#'+sID_Val_Max).attr("b_inf"), 
					ID_Unit_Old: J('#'+sID_Unit_Old).attr("value"), 
					ID_Unit_New: ID_Unite_New 
				},
				success: function(data) {
					J('#'+sID_Val_Max).attr("b_inf", data);
				}
			});
		}
		
		if (J('#'+sID_Val_Max).attr("b_sup") != "INF") {
			new J.ajax({
			    url: '../../code/asp/ajax/actions_otherFunctions.asp',
			    cache: false,
				data: { 
					sFunction_Name :"Convert_Unit",
					Value: J('#'+sID_Val_Max).attr("b_sup"), 
					ID_Unit_Old: J('#'+sID_Unit_Old).attr("value"), 
					ID_Unit_New: ID_Unite_New 
				},
				success: function(data) {
					J('#'+sID_Val_Max).attr("b_sup", data);
				}
			});
		}
	}
	
	if ((J('#'+sID_Val_Mean).length != 0) && J('#'+sID_Val_Mean).attr("value") != '') {
		new J.ajax({
		    url: '../../code/asp/ajax/actions_otherFunctions.asp',
		    cache: false,
			data: { 
				sFunction_Name :"Convert_Unit",
				Value: J('#'+sID_Val_Mean).attr("value"), 
				ID_Unit_Old: J('#'+sID_Unit_Old).attr("value"), 
				ID_Unit_New: ID_Unite_New 
			},
			success: function(data) {
				J('#'+sID_Val_Mean).val(data);
			}
		});
		// Idem pour les bornes inf et bornes sup
		if (J('#'+sID_Val_Mean).attr("b_inf") != "-INF") {
			new J.ajax({
			    url: '../../code/asp/ajax/actions_otherFunctions.asp',
			    cache: false,
				data: { 
					sFunction_Name :"Convert_Unit",
					Value: J('#'+sID_Val_Mean).attr("b_inf"), 
					ID_Unit_Old: J('#'+sID_Unit_Old).attr("value"), 
					ID_Unit_New: ID_Unite_New 
				},
				success: function(data) {
					J('#'+sID_Val_Mean).attr("b_inf", data);
				}
			});
		}
		
		if (J('#'+sID_Val_Mean).attr("b_sup") != "INF") {
			new J.ajax({
			    url: '../../code/asp/ajax/actions_otherFunctions.asp',
			    cache: false,
				data: { 
					sFunction_Name :"Convert_Unit",
					Value: J('#'+sID_Val_Mean).attr("b_sup"), 
					ID_Unit_Old: J('#'+sID_Unit_Old).attr("value"), 
					ID_Unit_New: ID_Unite_New 
				},
				success: function(data) {
					J('#'+sID_Val_Mean).attr("b_sup", data);
				}
			});
		}
	}

	if (J('#'+sID_Val_Min).attr("value") != '') {
		new J.ajax({
		    url: '../../code/asp/ajax/actions_otherFunctions.asp',
		    cache: false,
			data: { 
				sFunction_Name :"Convert_Unit",
				Value: J('#'+sID_Val_Min).attr("value"), 
				ID_Unit_Old: J('#'+sID_Unit_Old).attr("value"), 
				ID_Unit_New: ID_Unite_New 
			},
			success: function(data) {
				J('#'+sID_Val_Min).val(data);
			}
		});
	  
		// Idem pour les bornes inf et bornes sup
		if (J('#'+sID_Val_Min).attr("b_inf") != "-INF") {
			new J.ajax({
			    url: '../../code/asp/ajax/actions_otherFunctions.asp',
			    cache: false,
				data: { 
					sFunction_Name :"Convert_Unit",
					Value: J('#'+sID_Val_Min).attr("b_inf"), 
					ID_Unit_Old: J('#'+sID_Unit_Old).attr("value"), 
					ID_Unit_New: ID_Unite_New 
				},
				success: function(data) {
					J('#'+sID_Val_Min).attr("b_inf", data);
				}
			});
		}
		
		if (J('#'+sID_Val_Min).attr("b_sup") != "INF") {
			new J.ajax({
			    url: '../../code/asp/ajax/actions_otherFunctions.asp',
			    cache: false,
				data: { 
					sFunction_Name :"Convert_Unit",
					Value: J('#'+sID_Val_Min).attr("b_sup"), 
					ID_Unit_Old: J('#'+sID_Unit_Old).attr("value"), 
					ID_Unit_New: ID_Unite_New 
				},
				success: function(data) {
					J('#'+sID_Val_Min).attr("b_sup", data);
				}
			});
		}
	}                              
	
	J('#'+sID_Unit_Old).val(ID_Unite_New);
}

function Convert_Unit_SMC(ID,ID_Unite_New){
	if ((J('#inp_val_'+ID).length != 0) && (J('#inp_val_'+ID).val() != '')) {
		sValue = J('#inp_val_'+ID).val();
		sUnit_Old = J('#id_unite_old_'+ID).attr('value');
		new J.ajax({
		    url: '../../code/asp/ajax/actions_otherFunctions.asp',
		    cache: false,
			data: { 
				sFunction_Name :"Convert_Unit",
				Value: sValue, 
				ID_Unit_Old:sUnit_Old , 
				ID_Unit_New: ID_Unite_New 
			},
			success: function(data) {
				J('#inp_val_'+ID).val(data);
			}
		});
	}
	J('#id_unite_old_'+ID).val(ID_Unite_New);
}

function ExportTable(id) {
	window.open('ajax/export_table.asp?id='+id);
}

function modification(AID_Attribute, APopup_Form) {
	try{
		if(APopup_Form){
			nom_popup_form.chgt_form.value = '1';
			Jn('chgt_'+ AID_Attribute).eq(0).val('1');
			try{
				Jn('chgt_'+ AID_Attribute).eq(1).val('1');
			} catch (e) {
			    
			}
		} else {	
			nom_form.chgt_form.value = '1';
			Jn('chgt_'+ AID_Attribute).eq(0).val('1');	
		}
	} catch (e) {
	   
	}
}

function openWindow(pURL) {
	myWindow = window.open(pURL, 'ActionWindow', 'toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=no,resizable=no,width=480,height=220');
}

function openWindow3(pURL) {
	CenterWindow(pURL, 'ActionWindow', 570, 187, 'toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=no,resizable=yes');
}

function Check_If_Group_is_Loaded(id) {
	if (J('#id_div_group_'+id).html() == '') {		
		new J.ajax({
			url :'../../code/asp/ajax/actions_Main_Interface.asp',
			async: false,
			cache: false,
			dataType: 'html',
			data: { 
				sFunction_Name :"Get_Form_Content_Detail",
				id_attr_parent: id 
			},
			success: function(data) {				
				J('#id_div_group_'+id).html(data);				
			}
		});
	}
}

function Supprimer_Lien_HeritageMultiple(id_pe, id_e, id_e_lien) {
	enregistrement(false);
	new_list_id_e_liees = Delete_Item_From_List(Jn('list_id_e_liees_'+id_pe).eq(0).val(), id_e_lien);
	
	if (Jn('type_tableau_'+id_pe).eq(0).val() == "classe_asso") {
		id_e = Jn('ID_E').eq(0).val();
		new J.ajax({
			url : '../../code/asp/ajax/write_data_asso.asp',
			async: false,
			cache: false,
            type:'post',
			dataType:"script",
			data: { id_pe : id_pe, id_e : id_e, id_e_lien : id_e_lien, id_e_new: -1 },
			success: function(data) {  resultat = data;  }
		});			
	} else {
		 
		new J.ajax({
			url : '../../code/asp/ajax/write_data.asp',
			async: false,
			cache: false,
			dataType:"script",
			data: { id_donnee : -1, type_donnee: 121, type_modif : 2, id_pe : id_pe, id_e : id_e, data: new_list_id_e_liees },
			success: function(data) {  resultat = data;  }
		});	  
	}		
	Form_Get_Content(id_pe);
}
 
function Switch_View_And_Focus_Object(AID_Object){
	new J.ajax({
		url:'../asp/ajax/actions_form.asp', 
		async: false,
		cache: false,
		dataType:"script",
		data: {
			sFunction_Name:'Switch_View_And_Focus_Object',
			bValid:true,
			ID_Object:AID_Object
		}
	});
}

function Change_Visu(id_pe, nb_d, id_d,APopup_Form) {
	var sID_Input = 'form_'+ id_pe +'_'+ nb_d +'_visu';
	var sID_Img = 'img_'+ id_pe +'_'+ nb_d +'_visu';
	if (APopup_Form){
		sID_Input = 'form_popup_'+ id_pe +'_'+ nb_d +'_visu';
		sID_Img = 'img_popup_'+ id_pe +'_'+ nb_d +'_visu';
	}
	obj_form = Jn(sID_Input).eq(0); 
	new J.ajax({
	    url: '../../code/asp/ajax/change_visu.asp',
	    async: false,
	    cache: false,
	    dataType: 'script',
        data: { id_pe: id_pe, id_d: id_d, visu: J(obj_form).val()	},
        success: function (data) {
			obj_img  = J('#'+ sID_Img);
			if (J(obj_form).val() == 'false') {
				J(obj_form).val('true');	
				obj_img.addClass('ico_doc_visu');
			} else {
				J(obj_form).val('false');
				obj_img.removeClass('ico_doc_visu');
			}	  
		}	  
	});
}
