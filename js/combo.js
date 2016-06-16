var J = jQuery.noConflict();

function Init_Combo_Component(ADiv_Combo,AID_Default_OT,AWidth,AHeight,ADiv_Tree,ACombo_Option_Type,ADisplay_All){
	new J.ajax({
		url:'../../code/asp/ajax/actions_combo.asp',
		async: false,
		cache: false,
		dataType:"script",
		data:{
			sFunction_Name:"Init_Combo_Component",
			div_combo:ADiv_Combo,
			id_default_ot:AID_Default_OT,
			width:AWidth,
			height:AHeight,
			div_tree:ADiv_Tree,
			combo_option_type:ACombo_Option_Type,
			display_all:ADisplay_All			
		}
	});
}

function Combo_Export_OnChange(AsID_Combo){
	dhxCombo = eval(AsID_Combo);
	dhxCombo.attachEvent("onChange", function(){
		dhxCombo = eval(AsID_Combo);
		new J.ajax({
			url:'../../code/asp/ajax/actions_combo.asp',
			async: false,
			cache: false,
			dataType:'html',
			data: { 
				sFunction_Name: "Combo_Export_OnChange_OT",
				id_index : dhxCombo.getSelectedValue(),
				sid_combo : AsID_Combo
			},
			success:function(data){
				J("#id_div_refresh").html(data);
			}
		});	
	});
}

function Combo_Export_OnChange_Type(AsID_Combo){
	var ID_Export = J("#select_export_type option:selected").attr("id");
	var ID_Export_Type = J("#select_export_type option:selected").val();
	dhxCombo = eval(AsID_Combo);
	new J.ajax({
		url:'../../code/asp/ajax/actions_combo.asp',
		async: false,
		cache: false,
		dataType:'script',
		data: { 
			sFunction_Name: "Combo_Export_OnChange_Type",
			id_index : dhxCombo.getSelectedValue(),
			sid_combo : AsID_Combo,
			id_export_type:ID_Export_Type,
			id_export:ID_Export
		},
		success:function(data){
			Focus_Element("btn_export");
		}
	});	
}


function Combo_Extract_OnChange_OT(AsID_Combo){
	dhxCombo = eval(AsID_Combo);
	dhxCombo.attachEvent("onChange", function(){
		dhxCombo = eval(AsID_Combo);
		J("#id_div_refresh_extract").css("display","none");
		J("#id_div_waiting_message").css("display","block");
		new J.ajax({
			url:'../../code/asp/ajax/actions_combo.asp',
			async: false,
			cache: false,
			dataType:'html',
			data: { 
				sFunction_Name: "Combo_Extract_OnChange_OT",
				id_index : dhxCombo.getSelectedValue(),
				sid_combo : AsID_Combo
			},
			success:function(data){
				J("#id_div_refresh_extraction_form").html(data);
				J("#id_div_refresh_extract").css("display","block");
				J("#id_div_waiting_message").css("display","none");
				Combo_Extract_OnChange_Type();
			}
		});	
	});
}

function Combo_Extract_OnChange_Type(){
	var ID_Extract = J("#combo_extract_type option:selected").val();
	new J.ajax({
		url:'../../code/asp/ajax/actions_combo.asp',
		async: false,
		cache: false,
		dataType:'script',
		data: { 
			sFunction_Name: "Combo_Extract_OnChange_Type",
			id_extract:ID_Extract
		},
		success:function(data){
			Focus_Element("btn_extract");
		}
	});	
}


function Combo_Curves_OnChange_Attribute(AID_Attribute){
	new J.ajax({
		url:'../../code/asp/ajax/actions_combo.asp',
		async: true,
		cache: false,
		dataType:'script',
		data: { 
			sFunction_Name: "Combo_Curves_OnChange_Attribute",
			id_attribute : AID_Attribute
		},
		success:function(data){
			Focus_Element("btn_export");
		}
	});	
}

function Combo_Curves_OnChange_OT(AsID_Combo){
	dhxCombo = eval(AsID_Combo);
	dhxCombo.attachEvent("onChange", function(){
		dhxCombo = eval(AsID_Combo);
		new J.ajax({
			url:'../../code/asp/ajax/actions_combo.asp',
			async: false,
			cache: false,
			dataType:'html',
			data: { 
				sFunction_Name: "Combo_Curves_OnChange_OT_Features",
				id_index : dhxCombo.getSelectedValue(),
				sid_combo:AsID_Combo
			},
			success:function(data){
				J("#Data_Curves_Change").html(data);
				Focus_Element("btn_export");
			}
		});
		new J.ajax({
			url:'../../code/asp/ajax/actions_combo.asp',
			async: false,
			cache: false,
			dataType:'script',
			data: { 
				sFunction_Name: "Combo_Curves_OnChange_OT_Tree",
				id_index : dhxCombo.getSelectedValue(),
				id_attribute : document.form1.id_pe_courbe.value,
				sid_combo:AsID_Combo
			}
		});		
	});
}

function Combo_Get_ID_OT(AsID_Combo){
	var dhxCombo = eval(AsID_Combo);
	var ID_OT;
	var ID_Index = dhxCombo.getSelectedIndex();
	new J.ajax({
		url:'../../code/asp/ajax/actions_combo.asp',
		async: false,
		cache: false,
		dataType:'html',
		data: { 
			sFunction_Name: "Get_ID_OT_Combo",
			id_index : ID_Index, 
			sid_combo : AsID_Combo 
		},
		success:function(data){
			ID_OT = data;
		}
	});	
	return ID_OT;
}

function Get_Combo_OT_Hint(ASelected_Option){
	new J.ajax({
		url:'../../code/asp/ajax/actions_combo.asp',
		async: false,
		cache: false,
		dataType:'script',
		data: { 
			sFunction_Name: "Get_Combo_OT_Hint",
			id_ot : ASelected_Option 
		}
	});	
}

function Combo_Initialize(ACombo_Type,AID_OT,AWidth,ADiv_Combo,AJS_Function_Name){
	var ID_OT;	
	if (AID_OT == 0) {
		ID_OT = Get_ID_OT();
	} else {
		ID_OT = AID_OT;
	}
	new J.ajax({
		url:'../../code/asp/ajax/actions_combo.asp',
		async:true,
		cache: false,
		dataType:'script',
		data:{
			sFunction_Name:"Combo_Initialize",
			combo_type:ACombo_Type,
			combo_width : AWidth,
			div_combo:ADiv_Combo,
			id_ot:ID_OT,
			js_function_name :AJS_Function_Name 
		}
	});
}

function Combo_OT_OnChange(AsID_Combo){
	dhxCombo = eval(AsID_Combo);
	dhxCombo.attachEvent("onChange", function(){
		enregistrement();
		dhxCombo = eval(AsID_Combo);
		new J.ajax({
			url:'../../code/asp/ajax/actions_combo.asp',
			async: false,
			cache: false,
			dataType:'script',
			data: { 
				sFunction_Name: "Combo_OT_OnChange",
				id_ot : dhxCombo.getSelectedValue(),
				sid_combo:AsID_Combo				
			},/*
			dataFilter: function(data) {
				return data.replace("dhxTree_Nav.enableSmartRendering(1);", "");
			},
*/			success:function(data){
				Get_Combo_OT_Hint(dhxCombo.getSelectedValue());	
				Resize_Treebox();
				Display_All_Tree();
			}
		});
		return true;
	});
}

function Combo_OT_Select_Option(AID_OT){
	new J.ajax({
		url:'../../code/asp/ajax/actions_combo.asp',
		async: false,
		cache: false,
		dataType:'script',
		data: { 
			sFunction_Name: "Combo_OT_Select_Option",
			id_ot : AID_OT 
		}
	});
}

function Combo_TinyMCE_OnChange(AsID_Combo){
	dhxCombo = eval(AsID_Combo);
	dhxCombo.attachEvent("onChange", function(){
		dhxCombo = eval(AsID_Combo);
		new J.ajax({
			url:'../../code/asp/ajax/actions_combo.asp',
			async: false,
			cache: false,
			dataType:'script',
			data: { 
				sFunction_Name: "Combo_TinyMCE_OnChange",
				id_index : dhxCombo.getSelectedValue(),
				sid_combo:AsID_Combo
			}
		});	
		J(".a_dhx_hidden_input").css("display","none");
	});
	return true;
}

function Combo_Object_Link_OnChange(AsID_Combo,AID_Attribute,APopup_Form){
	dhxCombo = eval(AsID_Combo);
	dhxCombo.attachEvent("onChange", function(){
		dhxCombo = eval(AsID_Combo);
		new J.ajax({
			url:'../../code/asp/ajax/actions_combo.asp',
			async: false,
			cache: false,
			dataType:'script',
			data: { 
				sFunction_Name: "Combo_Object_Link_OnChange",
				id_index : dhxCombo.getSelectedValue(),
				sid_combo:AsID_Combo,
				bPopup_Form:APopup_Form
			},
			success:function(data){
				modification(AID_Attribute,APopup_Form);
			}
		});
	});
}

function Get_ID_Object_Combo(AsID_Combo){
	var dhxCombo = eval(AsID_Combo);
	var ID_Object;
	var ID_Index = dhxCombo.getSelectedIndex();
	new J.ajax({
		url:'../../code/asp/ajax/actions_combo.asp',
		async: false,
		cache: false,
		dataType:'html',
		data: { 
			sFunction_Name: "Get_ID_Object_Combo",
			id_index : ID_Index, 
			sid_combo : AsID_Combo 
		},
		success:function(data){
			ID_Object = data;
		}
	});	
	return ID_Object;
}