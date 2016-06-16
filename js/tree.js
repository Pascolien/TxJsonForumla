var bCheck_After_Rename=false;
var dhxTree;
var sTreeNameNav = "dhxTree_Nav"

function Set_ID_Object_To_Display_OnLoad(AID_Object) {
	new J.ajax({
		url:'../../code/asp/ajax/actions_tree.asp',
		async: false,
		cache: false,
		dataType:'script',
		data: {
			sFunction_Name:"Set_ID_Object_To_Display_OnLoad",
			id_object:AID_Object
		}
	});
}

function Init_Tree_Nav_Component(ADiv_Tree) {
	new J.ajax({
		url:'../../code/asp/ajax/actions_tree.asp',
		async:false,
		dataType:'script',
		data:{
			sFunction_Name:"Init_Tree_Nav_Component",
			div_tree:ADiv_Tree			
		},
		success:function(data){
		}
	});
}

function Init_Tree_Search_Component(ADiv_Tree, ADiv_Combo){
	new J.ajax({
		url:'../../code/asp/ajax/actions_tree.asp',
		async: false,
		cache: false,
		dataType:'script',
		data:{
			sFunction_Name:"Init_Tree_Search_Component",
			div_tree:ADiv_Tree,
			div_combo:ADiv_Combo
		}
	});
}

function Tree_Initialize_Tree(AID_OT,ACheck_Type,AToolbar_Type,ADiv_Box_Standard,ADiv_Tree_Standard,ADiv_Toolbar_Standard,ADiv_Box_Filtered,ADiv_Tree_Filtered,ADiv_Toolbar_Filtered) {
	/* params
	* ACheck_Type : 0 - ctNone / 1 - ctCheckbox / 2 - ctRadioButton
	* AToolbar_Type : 0 - ttCRUD / 1 - ttCheck / 2 - ttFilterAll
	* ATree_Type : 0 - ttObject / 1 - ttAttribute / 2 - ttTiny
	*			   3 - ttSimple / 4 - ttFiltered / 5 - ttHeritage
	*/
	new J.ajax({
		url:'../../code/asp/ajax/actions_tree.asp',
		async: false,
		cache: false,
		dataType:'script',
		data: {
			sFunction_Name:"Initialize_Tree",
			id_ot: AID_OT,
			check_type: ACheck_Type,
			toolbar_type : AToolbar_Type,
			div_box_standard:ADiv_Box_Standard,
			div_tree_standard:ADiv_Tree_Standard,
			div_toolbar_standard:ADiv_Toolbar_Standard,
			div_box_filtered:ADiv_Box_Filtered,
			div_tree_filtered:ADiv_Tree_Filtered,
			div_toolbar_filtered:ADiv_Toolbar_Filtered
		}
	});
}

function Tree_Initialize_Tree_Curves(AID_OT,ANodes_Checked) {
	var iFeatureValue;
	if(document.form1.id_pe_courbe)
		iFeatureValue = document.form1.id_pe_courbe.value;
	new J.ajax({
		url:'../../code/asp/ajax/actions_tree.asp',
		async: false,
		cache: false,
		dataType:'script',
		data: {
			sFunction_Name:"Initialize_Tree_Curves",
			id_ot: AID_OT,
			id_attribute :  iFeatureValue,
			nodes_checked:ANodes_Checked
		}
	});
}

function Tree_Initialize_Tree_Export(AID_OT,ANodes_Checked) {
	new J.ajax({
		url:'../../code/asp/ajax/actions_tree.asp',
		async: false,
		cache: false,
		type:'post',
		dataType:'script',
		data: {
			sFunction_Name:"Initialize_Tree_Export",
			id_ot: AID_OT,
			nodes_checked:ANodes_Checked
		}
	});
}

function Tree_Initialize_TinyMCE_Plugin(AID_Object,AObject_Name_To_Search){
	new J.ajax({
		url:'../../code/asp/ajax/actions_tree.asp',
		async: false,
		cache: false,
		dataType:'script',
		data:{
			sFunction_Name:"Initialize_TinyMCE_Plugin",
			id_object:AID_Object,
			object_name_to_search:AObject_Name_To_Search
		}
	});
}

function Tree_Add_Business_Object(AsID_Tree,AID_Advanced_Settings){
	new J.ajax({
		url:'../../code/asp/ajax/actions_tree.asp',
		async: false,
		cache: false,
		dataType:'script',
		data: {
			sFunction_Name:"Add_Business_Object",
			sid_tree:AsID_Tree,
			id_advanced_settings : AID_Advanced_Settings
		}
	});
}

function Tree_Add_Object(AsID_Tree,AID_Attribute,AAdd_Type, AFolder, AID_Advanced_Settings,AID_Parent,AObject_Name) {
	new J.ajax({
		url:'../../code/asp/ajax/actions_tree.asp',
		async: false,
		cache: false,
		dataType:'script',
		data: {
			sFunction_Name:"Add_Object_Web_Tree",
			id_object_parent: AID_Parent,
			add_Type: AAdd_Type,
			is_folder : AFolder,
			sid_tree:AsID_Tree,
			id_advanced_settings : AID_Advanced_Settings,
			object_name:AObject_Name
		}
	});
	if (AID_Attribute > 0){
	    bCheck_After_Rename = true;
	    sIdNode = eval(AsID_Tree).getSelectedItemId();
	    Tree_Check_Object_After_Creation(AsID_Tree, sIdNode,0);
	}
}

// permit to add object on client side after the advanced creation popup.
function Add_Object_After_Creation(AID_Object,AsID_Tree) {
	//* requete jquery car avec protoype, l'entité qui vient d'être dupliquée via duplication avancée, n'est pas séléctionnée.
	new J.ajax({
		url:'../../code/asp/ajax/actions_tree.asp',
		async: false,
		cache: false,
		dataType:'script',
		data: {
			sFunction_Name:"Add_Object_After_Creation",
			id_object:AID_Object,
			sid_tree:AsID_Tree
		}
	});
}

// permit to add object on server and client side after the advanced creations popup.
function Create_Object_After_Advanced_Creation_Popup(AsID_Tree,AID_Object_Parent,AObject_Name,AFolder,AAdd_Type,AID_Advanced_Creation,AID_Attribute) {
	new J.ajax({
		url:'../../code/asp/ajax/actions_tree.asp',
		async: false,
		cache: false,
		dataType:'script',
		data: {
			sFunction_Name:"Create_Object_After_Advanced_Creation_Popup",
			sid_tree:AsID_Tree,
			ID_Object_Parent:AID_Object_Parent,
			sObject_Name:AObject_Name,
			bFolder:AFolder,
			iAdd_Type:AAdd_Type,
			ID_Advanced_Creation:AID_Advanced_Creation,
			ID_Attribute:AID_Attribute			
		}
	});
}

function Tree_Add_Object_And_Write(AID_OT, AID_Parent, AObject_Name, AID_Advanced_Creation) {
	var ID_OT;
	if (AID_OT == 0){
		ID_OT = Get_ID_OT_From_Advanced_Creation(AID_Advanced_Creation);
	} else 
		ID_OT = AID_OT;
	Combo_OT_Select_Option(ID_OT);
	bWrite = Check_Write_Mode(); 
	if (!bWrite){
		Switch_RW_Mode(false);
	}
	sID_Tree = "dhxTree_Nav";
	Tree_Add_Object(sID_Tree, 0, 0, false, AID_Advanced_Creation, AID_Parent, AObject_Name);
}

function Tree_Check_Branch(ATree_Type,AsID_Tree,AChecked,AID_Checked) {
	new J.ajax({
		url:'../../code/asp/ajax/actions_tree.asp',
		type: 'get',
		dataType: 'script',
		async: false,
		cache: false,
		data:{
			sFunction_Name:"Check_Branch",
			checked_branch : AChecked,
			sid_tree:AsID_Tree,
			tree_type:ATree_Type,
			id_checked:AID_Checked
		}
	});
}

function Tree_Check_Object_After_Creation(AsID_Tree, asIdObject, AID_Object) {
    
	new J.ajax({
		url:'../../code/asp/ajax/actions_tree.asp',
		async: false,
		cache: false,
		dataType:'script',
		data: {
			sFunction_Name:"Check_Object_After_Creation",
			sid_tree: AsID_Tree,
			sIdObject:asIdObject,
			id_object : AID_Object
		}
	});
}

function Tree_Check_Object_Exist(AID_Object){
	var bExist = false;
	new J.ajax({
		url:'../../code/asp/ajax/actions_tree.asp',
		async: false,
		cache: false,
		dataType:'html',
		data:{
			sFunction_Name:"Check_Object_Exist",
			id_object:AID_Object
		},
		success:function(data){
			bExist = data;
		}
	});
	return bExist;
}

function Tree_Collapse_Attribute(ATree_Type,AsID_Attribute,AFull) {
	new J.ajax({
		url:'../../code/asp/ajax/actions_tree.asp',
		async: false,
		cache: false,
		dataType:'script',
		data: {
			sFunction_Name:"Collapse_Attribute",
			sid_attribute:AsID_Attribute,
			tree_type:ATree_Type,
			full: AFull
		}
	});
}

function Tree_Collapse_Node(ATree_Type,AsID_Tree) {
	new J.ajax({
		url:'../../code/asp/ajax/actions_tree.asp',
		type:'get',
		async: false,
		cache: false,
		dataType:'script',
		data: {
			sFunction_Name:"Collapse_Nodes",
			sid_tree:AsID_Tree,
			tree_type:ATree_Type
		}
	});
}

function Tree_Convert_Node(){
	new J.ajax({
		url:'../../code/asp/ajax/actions_tree.asp',
		async: false,
		cache: false,
		dataType:'script',
		data: {
			sFunction_Name:"Convert_Node"
		}
	});
}

function Tree_Compare_Node(AID_OT,AID_Object,AID_Advanced_Comparison) {
	//catch ids Attribute type.
	var Ids_Attribute;
	new J.ajax({
		url:'../../code/asp/ajax/actions_tree.asp',
		dataType: 'script',
		async: false,
		cache: false,
		data: {
			sFunction_Name:"Get_Ids_Nodes_Checked"
		},
		success: function(data) {
			Ids_Attribute = data;
		}
	});
	new J.ajax({
		url:'../../code/asp/ajax/actions_MCS.asp',
		dataType: 'script',
		async: false,
		cache: false,
		data: {
			sFunction_Name:"Write_Comparison_CDC",
			Liste_ID_PE: Ids_Attribute,
			ID_E: AID_Object,
			ID_Advanced_Comparison: AID_Advanced_Comparison
		},
		success: function(data) {
			ID_Cdc = data;
		}
	});
	Launch_MCS(AID_OT,ID_Cdc,"resultats");
}

function Tree_Create_Document_Versionned(ADuplicate_Work_File){
	new J.ajax({
		url:'../../code/asp/ajax/actions_tree.asp',
		async: false,
		cache: false,
		dataType:'script',
		data: {
			sFunction_Name:"Create_Document_Versionned",
			duplicate_work_file:ADuplicate_Work_File
		}
	});
}

function Tree_Delete_Node(AIDs_Nodes,AID_Advanced_Settings) {
	new J.ajax({
		url:'../../code/asp/ajax/actions_tree.asp',
		async: false,
		cache: false,
		dataType:'script',
		data:{
			sFunction_Name:"Delete_Node",
			ids_nodes : AIDs_Nodes,
			id_advanced_settings:AID_Advanced_Settings
		},
		success: function (data) {
		    Set_ID_Object(0);
		    if (data.indexOf("Error:") != -1)
		        Popup_Alert(data);
		}
	});
}

function Tree_Display_All(ATree_Type,AsID_Tree,AID_Attribute) {
	if (isIE(8)){
		//reduce the tree size to prevent tree with a big number of object on root --> script error on IE8
		var sImg_Element = J('#fleche_jaune_'+AID_Attribute);
		if (sImg_Element){
			var sDiv_Element = J('#div_yellow_arrow_'+AID_Attribute);
			var sImg_Src = sImg_Element.attr('src');
			if (sImg_Src){
				if (sImg_Src.indexOf("arrow_up.png") > -1){
					Form_Hauteur_Treeview(AID_Attribute,false,AsID_Tree);
				}
			}
		}
	}
	new J.ajax({
		url:'../../code/asp/ajax/actions_tree.asp',
		dataType: 'script',
		async: false,
		cache: false,
		data:{
			sFunction_Name:"Display_All",
			tree_type:ATree_Type,
			sid_tree:AsID_Tree
		}
	});
}

function Tree_Display_Business_View(AID_BV){
	new J.ajax({
		url:'../../code/asp/ajax/actions_tree.asp',
		async: false,
		cache: false,
		dataType:'script',
		data:{
			sFunction_Name:"Display_Business_ViewExt",
			id_business_view : AID_BV
		}
	});
}

function Tree_Display_Node(AID_Object,AID_Tab){
	new J.ajax({
		url:'../../code/asp/ajax/actions_tree.asp',
		async: false,
		cache: false,
		dataType:'script',
		data:{
			sFunction_Name:"Display_Node",
			id_object : AID_Object,
			id_tab:AID_Tab,
			change_view:true
		}
	});
}

function Tree_Display_OT(AID_OT){
	new J.ajax({
		url:'../../code/asp/ajax/actions_tree.asp',
		async: false,
		cache: false,
		dataType:'script',
		data:{
			sFunction_Name:"Display_OT",
			id_ot : AID_OT
		}
	});
}

function Tree_Display_Selection(ATree_Type,AsID_Tree,ANodes_Checked,ATree_Filter,AToolbar_Filter,ASearch_Input_Value) {
	new J.ajax({
		url:'../../code/asp/ajax/actions_tree.asp',
		dataType: 'script',
		async: false,
		cache: false,
		type:'post',
		data:{
			sFunction_Name:"Display_Selection",
			tree_type:ATree_Type,
			nodes_checked : ANodes_Checked,
			tree_filter : ATree_Filter,
			toolbar_filter : AToolbar_Filter,
			sid_tree: AsID_Tree,
			search_input_value:ASearch_Input_Value
		}
	});
}

function Tree_Duplicate_Node(AsID_Tree) {
	new J.ajax({
		url:'../../code/asp/ajax/actions_tree.asp',
		dataType: 'script',
		async: false,
		cache: false,
		data: {
			sFunction_Name:"Duplicate_Node",
			sid_tree:AsID_Tree
		}
	});
}

function Tree_Duplicate_Node_Partially(AsID_Tree,AIDs_Attribute_Selected,AID_Advanced_Settings) {
	new J.ajax({
		url:'../../code/asp/ajax/actions_tree.asp',
		dataType: 'script',
		async: false,
		cache: false,
		data:{
			sFunction_Name:"Duplicate_Node_Partially",
			sid_tree:AsID_Tree,
			ids_attribute_selected:AIDs_Attribute_Selected,
			id_advanced_settings:AID_Advanced_Settings
		}
	});
}

function Execute_MA_After_Creation(AID_Object, AsID_Tree, aNewIdNode) {
	new J.ajax({
		url:'../../code/asp/ajax/actions_tree.asp',
		async: false,
		cache: false,
		dataType:'html',
		data: {
			sFunction_Name:"Execute_MA_After_Creation",
			id_object: AID_Object,
			sID_Tree: AsID_Tree
		},
		success: function (data) {
			rFrame = Get_Parent_Frame('dhxPopup_Form');
			if (rFrame) {
			    rFrame.manageModelApplicationActions(data, AsID_Tree, aNewIdNode);
			} else {
			    parent.manageModelApplicationActions(data, AsID_Tree, aNewIdNode);
			}
		}
	});
}

function Execute_MA_After_Duplication(AID_Object, AsID_Tree, aNewIdNode) {
	new J.ajax({
		url:'../../code/asp/ajax/actions_tree.asp',
		async: false,
		cache: false,
		dataType:'html',
		data: {
			sFunction_Name:"Execute_MA_After_Duplication",
			id_object: AID_Object,
			sID_Tree: AsID_Tree
		},
		success: function (data) {
		    rFrame = Get_Parent_Frame('dhxPopup_Form');
		    if (rFrame) {
		        rFrame.manageModelApplicationActions(data, AsID_Tree, aNewIdNode);
		    } else {
		        parent.manageModelApplicationActions(data, AsID_Tree, aNewIdNode);
		    }
		}
	});
}

function Tree_Expand_Attribute(ATree_Type,AsID_Attribute,AFull) {
	new J.ajax({
		url:'../../code/asp/ajax/actions_tree.asp',
		async: false,
		cache: false,
		dataType:'script',
		data: {
			sFunction_Name:"Expand_Attribute",
			sid_attribute:AsID_Attribute,
			tree_type:ATree_Type,
			full: AFull
		}
	});
}

function Tree_Expand_Nodes(ATree_Type,AsID_Tree) {
	new J.ajax({
		url:'../../code/asp/ajax/actions_tree.asp',
		async: false,
		cache: false,
		dataType:'script',
		data: {
			sFunction_Name:"Expand_Nodes",
			sid_tree:AsID_Tree,
			tree_type:ATree_Type
		}
	});
}

function Tree_Get_ID_Object(ATree,AsID_Object){
	var ID_O;
	new J.ajax({
		url:'../../code/asp/ajax/actions_tree.asp',
		async: false,
		cache: false,
		data:{
			sFunction_Name:"Get_ID_Object",
			id_tree : ATree,
			sid_object : AsID_Object
		},
		success:function(data){
			ID_O = data;
		}
	});
	return ID_O;
}

function Tree_Get_IDs_Selected(AID_OT){
	var list;
	new J.ajax({
		url:'../../code/asp/ajax/actions_tree.asp',
		async: false,
		cache: false,
		dataType:'script',
		data: { 
			sFunction_Name: "Get_IDs_Selected",
			id_ot : AID_OT
		},
		success:function(data){
			list = data;
		}
	});	
	return list;
}

function Tree_Get_sID(AID_OT,AID_Attribute){
	var result;
	new J.ajax({
		url:'../../code/asp/ajax/actions_tree.asp',
		async: false,
		cache: false,
		dataType:'script',
		data: { 
			sFunction_Name: "Get_sID_Tree",
			id_ot : AID_OT,
			id_attribute:AID_Attribute
		},
		success:function(data){
			result = data;
		}
	});
	return result;
}

function Tree_Load_Model(AsID_Tree,AID_Model,AModel_Name){
	new J.ajax({
		url:'../../code/asp/ajax/actions_tree.asp',
		async: false,
		cache: false,
		dataType:'script',
		data:{
			sFunction_Name:"Load_Model",
			id_model:AID_Model,
			model_name:AModel_Name,
			sid_tree:AsID_Tree
		}
	});
}

function Tree_Move_Node(AsID_Tree,ADirection) {
	function Get_children_Index(str,separator){
		var children_indexes='';
		var child_id;
		var child_index;
		var strUpdated;
		strUpdated = str;
		while (strUpdated.indexOf(separator) > 0){
			child_id = strUpdated.substring(0,strUpdated.indexOf(separator));
			child_index = dhxTree.getIndexById(child_id);
			children_indexes = children_indexes + child_index + ',';
			strUpdated = strUpdated.substring(strUpdated.indexOf(separator)+1);
		}
		child_index = dhxTree.getIndexById(strUpdated);
		children_indexes = children_indexes + child_index;
		return children_indexes;
	}
	var indexes = Get_children_Index(dhxTree.getSelectedItemId(),',');
	new J.ajax({
		url:'../../code/asp/ajax/actions_tree.asp',
		async: false,
		cache: false,
		dataType:'script',
		data: {
			sFunction_Name:"Move_Node",
			sid_tree:AsID_Tree,
			id_object:dhxTree.getSelectedItemId(),
			direction: ADirection,
			indexes_corresponding : indexes
		}
	});
}

function Tree_OnBeforeDrag(AsID_Tree){
	dhxTree = eval(AsID_Tree);
	dhxTree.attachEvent("onBeforeDrag",function(id){
		new J.ajax({
			url:'../../code/asp/ajax/actions_tree.asp',
			async: false,
			dataType:'script',
			data: {
				sFunction_Name: "OnBeforeDrag",
				sid_tree:AsID_Tree
			}
		});
		return true;
	});
}

function Tree_OnCheck(AsID_Tree,ATree_Type){
	dhxTree = eval(AsID_Tree);
	dhxTree.attachEvent("onCheck", function (id, state) {
	    DoOnCheck(AsID_Tree, id, state, ATree_Type);
		
		return true;
	});	
}

function DoOnCheck(aIdTree,aSidObject,aChecked,aTreeType) {
    dhxTree = eval(aIdTree);
    new J.ajax({
        url: '../../code/asp/ajax/actions_tree.asp',
        async: false,
        cache: false,
        type:'post',
        dataType: 'script',
        data: {
            sFunction_Name: "OnCheck",
            id_object: aSidObject,
            checked: aChecked,
            sid_tree: aIdTree,
            tree_type: aTreeType
        }
    });
}

function Tree_OnClick(AsID_Tree,ATree_Nav,ATree_Type){
	dhxTree = eval(AsID_Tree);
	dhxTree.attachEvent("onClick", function(AsID_Object,AsID_Object_Old){
		bActiveLoader = !parent.dhxWins && AsID_Tree == sTreeNameNav;
		if (bActiveLoader)
			TxLayout.progressOn(); 
        
		dhxTree = eval(AsID_Tree);
		new J.ajax({
			url: '../../code/asp/ajax/actions_tree.asp',
			async: false,
			cache: false,
			type:'post',
			dataType:'script',
			data: { 
				sFunction_Name: "OnClick",
				ids_selected : dhxTree.getSelectedItemId(),
				id_object: AsID_Object,
				sid_tree:AsID_Tree,
				tree_type:ATree_Type
			}
		});
		setTimeout(function(){
			if (bActiveLoader)
				TxLayout.progressOff();
		},300);
	});
}

function Tree_OnClickOut(AsID_Tree,ATree_Type){
	new J.ajax({
		url:'../../code/asp/ajax/actions_tree.asp',
		async: false,
		cache: false,
		dataType:'script',
		data: { 
			sFunction_Name: "OnClickOut",
			sid_tree:AsID_Tree,
			tree_type:ATree_Type
		}
	});
}

function Tree_OnDblClick(AsID_Tree,ATree_Type){
	dhxTree = eval(AsID_Tree);
	dhxTree.attachEvent("onDblClick",function(id){
		new J.ajax({
			url:'../../code/asp/ajax/actions_tree.asp',
			async: false,
			cache: false,
			dataType:'script',
			data: {
				sFunction_Name: "OnDblClick",
				sid_tree:AsID_Tree,
				sid_object: id
			}
		});
		return true;
	});
}

function Tree_OnDrag(){
	new J.ajax({
		url:'ajax/actions_tree.asp',
		async: false,
		cache: false,
		dataType:'script',
		data: {
			sFunction_Name: "OnDrag"
		}
	});
	return true;
}

function Tree_OnDrop(AsID_Tree){
	dhxTree = eval(AsID_Tree);
	dhxTree.attachEvent("onDrop",function(idSelected,idCibling,idNextCibling){
		new J.ajax({
			url:'../../code/asp/ajax/actions_tree.asp',
			async: false,
			cache: false,
			dataType:'script',
			data: {
				sFunction_Name: "OnDrop",
				sid_tree:AsID_Tree,
				id_object: idSelected,
				id_cibling : idCibling,
				id_next_cibling : idNextCibling
			}
		});
		return true;
	});
}

function Tree_OnEdit(AsID_Tree){
	dhxTree = eval(AsID_Tree);
	dhxTree.attachEvent("onEdit",function(AState,AsID_Node,ATree,AValue){
		dhxTree = eval(AsID_Tree);
		var editAction = false;
		//AState - 0 = before starting of editing, 1 = after starting of editing, 2 = before editor's closing, 3 = after editor's closing
		bWrite = Check_Write_Mode();
		if (bWrite){
			editAction = true;
			
			switch (AState){
			    case 0: //before starting of editing
					if (Get_Node_Right_To_Rename(AsID_Tree,AsID_Node) == '1')
						return true;
					else
						return false;
				break;
			    case 1: //after starting of editing
					var inp = this._editCell.span.firstChild;
					inp.select();
					new J.ajax({
						url:'../../code/asp/ajax/actions_tree.asp',
						async: false,
						cache: false,
						dataType:'script',
						data:{sFunction_Name:"OnEditStart"}
					});
				break;
			    case 2: //before editor's closing
			        if (AValue == "" || AValue == " ") {

					}
				break;
			    case 3: //after editor's closing  
					ATree.setEditStartAction(false,true);
					sText = dhxTree.getItemText(AsID_Node);
					sText = Replace_From_XML(sText);
					if (AValue)
						editAction = Tree_Rename_Node(AsID_Tree,AsID_Node,sText);
					if (!editAction){
						dhxTree.setItemText(AsID_Node,J("#header_middle").html());
					}
				break;
			}
		}
		return editAction;
	});
}

function Get_Node_Right_To_Rename(AsID_Tree,AsID_Node){
	var bResult;
	new J.ajax({
		url:'../../code/asp/ajax/actions_tree.asp',
		async: false,
		cache: false,
		dataType:'html',
		data:{
			sFunction_Name:"Get_Node_Right_To_Rename",
			sID_Tree:AsID_Tree,
			sID_Node:AsID_Node
		},
		success:function(data){
			bResult = data;
		}
	});
	return bResult;
}	

function Tree_OnMouseIn(AsID_Tree,ATree_Type){
	dhxTree = eval(AsID_Tree);
	dhxTree.attachEvent("onMouseIn",function(AID_Node){
		dhxTree = eval(AsID_Tree);
		sHint = dhxTree.getItemTooltip(AID_Node);
		if (sHint == ""){
			new J.ajax({
				url:'../../code/asp/ajax/actions_tree.asp',
				async: false,
				cache: false,
				dataType:'script',
				data: {
					sFunction_Name: "OnMouseIn",
					sid_tree:AsID_Tree,
					sid_object: AID_Node,
					tree_type:ATree_Type
				}
			});
		}
		return true;
	});
}

function Tree_OnOpenEnd(AsID_Tree,ATree_Nav){
	dhxTree = eval(AsID_Tree);
	dhxTree.attachEvent("onOpenEnd", function(AID_Node,AState){
		dhxTree = eval(AsID_Tree);
		//AState - current open state of the item: 0 - item has no child nodes, -1 - item is closed, 1 - item is opened.
		switch (AState){
			case 0:
			//item has no child nodes
			break;
			case -1:
			//item is closed
				new J.ajax({
					url:'../../code/asp/ajax/actions_tree.asp',
					async: false,
					cache: false,
					dataType:'script',
					data: { 
						sFunction_Name: "OnOpenEnd",
						id_object: AID_Node,
						sid_tree:AsID_Tree
					}
				});
			break;
			case 1:
			//item is opened.
			break;
		}
		return true;
	});
}

function Tree_OnOpenStart(AsID_Tree,ATree_Nav,ATree_Type){
	dhxTree = eval(AsID_Tree);
	dhxTree.attachEvent("onOpenStart", function(AID_Node,AState){
		dhxTree = eval(AsID_Tree);
		switch (AState){
			case 0:
			//item has no child nodes
			break;
			case -1:
			//item is closed
				new J.ajax({
					url:'../../code/asp/ajax/actions_tree.asp',
					async: false,
					cache: false,
					dataType:'script',
					data: { 
						sFunction_Name: "OnOpenStart",
						id_object: AID_Node,
						tree_type:ATree_Type,
						sid_tree:AsID_Tree,
						bState:AState
					}
				});
			break;
			case 1:
			//item is opened.
			break;
		}
		return true;
	});
}

function Tree_OnPMPopup(AsID_Tree,ATree_Type){
	dhxTree = eval(AsID_Tree);
	dhxTree.attachEvent("onBeforeContextMenu", function(ASelectedId){
		new J.ajax({
			url:'../../code/asp/ajax/actions_tree.asp',
			async: false,
			cache: false,
			dataType:'script',
			data: { 
				sFunction_Name: "OnPMPopup",
				id_object: ASelectedId,
				sid_tree:AsID_Tree,
				tree_type:ATree_Type
			}
		});
		return true;
	});
}

function Tree_OnSelect(AsID_Tree,ATree_Nav,ATree_Type){
	dhxTree = eval(AsID_Tree);
	dhxTree.attachEvent("onSelect", function(AsID_Object,AsID_Object_Old){
	    DoSelectItem(AsID_Tree, AsID_Object, ATree_Type)
	});
}

function DoSelectItem(aIdTree, aSidObject, aTreeType) {
    dhxTree = eval(aIdTree);
    new J.ajax({
        url: '../../code/asp/ajax/actions_tree.asp',
        async: true,
        cache: false,
        type: 'post',
        dataType: 'script',
        data: {
            sFunction_Name: "OnSelect",
            ids_selected: dhxTree.getSelectedItemId(),
            id_object: aSidObject,
            sid_tree: aIdTree,
            tree_type: aTreeType
        }
    });
}

function Tree_OnXLE(AsID_Tree, ATree_Type) {
	dhxTree = eval(AsID_Tree);
	dhxTree.attachEvent("onXLE", function(tree,AsID_Object){
		if (!parent.dhxWins) { TxLayout.progressOn(); }
		new J.ajax({
			url:'../../code/asp/ajax/actions_tree.asp',
			async: false,
			cache: false,
			dataType:'script',
			data: { 
				sFunction_Name: "OnXLE",
				id_object: AsID_Object,
				sid_tree:AsID_Tree,
				tree_type:ATree_Type
			}
		});

		if (!parent.dhxWins) { TxLayout.progressOff(); }
		return true;
	});	
}

function Tree_OnXLS(AsID_Tree,ATree_Type){
}

function Tree_Open_Object_Before_Insert(AsID_Tree){
	new J.ajax({
		url:'../../code/asp/ajax/actions_tree.asp',
		async: false,
		cache: false,
		dataType:'script',
		data: {
			sFunction_Name:'Open_Object_Before_Insert',
			sid_tree:AsID_Tree
		}
	});
}

function Tree_Rename_Node(AsID_Tree,AsID_Object,ANode_Name) {
	var bResult = false;
	new J.ajax({
		url:'../../code/asp/ajax/actions_tree.asp',
		async: false,
		cache: false,
		dataType:'script',
		data: {
			sFunction_Name:"Rename_Node",
			node_name: ANode_Name,
			sid_tree:AsID_Tree,
			id_object:AsID_Object
		},
		success:function(data){
			bResult = data.indexOf("Popup_Error(")== -1;
		}
	});
	if (bCheck_After_Rename){
		bCheck_After_Rename = false;
	}
	return bResult;
}

function Tree_Select_Node(ASelected){
	new J.ajax({
		url:'../../code/asp/ajax/actions_tree.asp',
		async: false,
		cache: false,
		dataType:'script',
		data: {
			sFunction_Name:"Select_Node",
			selected:ASelected
		}
	});
}

function Tree_Sort_Branch(AsID_Tree,ASort_Type){
	new J.ajax({
		url:'../../code/asp/ajax/actions_tree.asp',
		async: false,
		cache: false,
		dataType:'script',
		data: {
			sFunction_Name:"Sort_Branch",
			sort_type: ASort_Type,
			sid_tree:AsID_Tree
		}
	});
}

function Tree_Switch_Document_As_Reference(AConvert_To_PDF){
	new J.ajax({
		url:'../../code/asp/ajax/actions_tree.asp',
		async: false,
		cache: false,
		dataType:'script',
		data: {
			sFunction_Name:"Switch_Document_As_Reference",
			convert_to_pdf:AConvert_To_PDF
		}
	});
}

function Test_Move_Node(AsID_Tree,AsID_Node_To_Move,AsID_Targeted_Node){
	dhxTree = eval(AsID_Tree);
	dhxTree.moveItem(AsID_Node_To_Move,"item_sibling",AsID_Targeted_Node);
	dhxTree.moveItem(AsID_Targeted_Node,"up");
	dhxTree.selectItem(AsID_Node_To_Move);
}

function Rename_Node_Ext(AsID_Tree,AsID_Node,ANew_Name){
//	dhxTree = eval(AsID_Tree);
//	dhxTree.setItemText(AsID_Node,ANew_Name);
}

function Resize_Treebox(){
	bBusiness_View = Check_Button_Activated("mViewBusiness");
	bToolbar_Add_Visible = J("#id_div_navigation_toolbar").css("display") == "block";
	bToolbar_Search_Visible = J("#id_div_navigation_toolbar_search").css("display") == "block";
	if (bBusiness_View){
		// toolbars not visible
		J("#id_div_navigation_tree").css("bottom","0px");
		J("#id_div_navigation_tree_filtered").css("bottom","0px");
		J("#id_div_navigation_toolbar").css("display","none")
		J("#id_div_navigation_toolbar").css("id_div_navigation_toolbar_search","none")
	} else {
		if (bToolbar_Add_Visible && bToolbar_Search_Visible){
			J("#id_div_navigation_tree").css("bottom","52px");
			J("#id_div_navigation_tree_filtered").css("bottom","52px");
		} else if (bToolbar_Add_Visible || bToolbar_Search_Visible){
			J("#id_div_navigation_tree").css("bottom","26px");
			J("#id_div_navigation_tree_filtered").css("bottom","26px");
		} else {
			// toolbars not visible
			J("#id_div_navigation_tree").css("bottom","0px");
			J("#id_div_navigation_tree_filtered").css("bottom","0px");
		}		
	}
}

function Check_Convert(AsID_Tree){
	new J.ajax({
		url:'../../code/asp/ajax/actions_tree.asp',
		async: false,
		cache: false,
		dataType:'script',
		data:{
			sFunction_Name: "Get_Window_Convert",
			sid_tree:AsID_Tree
		},
		success:function(data){
			if (data == "1"){
				Popup_Confirm(Get_RS('RS_Tree_Convert_Node'),"Oui","Non","Tree_Convert_Node()");
			}
			else {
				Tree_Convert_Node();
			}
		}
	});	
}
