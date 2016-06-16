var ID_OT;
var View;

function Menu_OnClick(AMenu,AsID_Tree,ATree_Type,AID_Attribute){
	var reg1=new RegExp("^ACR_");
	var reg2=new RegExp("^ACO_");
	var reg3=new RegExp("^ADU_");
	var reg4=new RegExp("^ACD_");
	var reg5=new RegExp("^MOD_");
	var reg6=new RegExp("^ABO_");
	var ID_Advanced_Settings;
	dhxCMenu = eval(AMenu);
	dhxCMenu.attachEvent("onClick",function(menuitemId,type){
		dhxTree = eval(AsID_Tree);
		switch (menuitemId) {
			case "add_node" :
				Tree_Add_Object(AsID_Tree,AID_Attribute,0,false,0);
			break;
			case "add_child" :
				Tree_Open_Object_Before_Insert(AsID_Tree);
				Tree_Add_Object(AsID_Tree,AID_Attribute,1,false,0);
			break;
			case "delete_node" :
				Windows_Get_Delete(AsID_Tree);
			break;
			case "convert_node" :
				Check_Convert(AsID_Tree);
			break;
			case "duplicate_entirely" :
				Tree_Duplicate_Node(AsID_Tree);
			break;
			case "duplicate_partially" :
				Display_Popup_Duplicate_Partially(AsID_Tree);
			break;
			case "insert_node" :
				Tree_Add_Object(AsID_Tree,AID_Attribute,2,false,0);
			break;
			case "add_folder" :
				Tree_Add_Object(AsID_Tree,AID_Attribute,0,true,0);
			break;
			case "insert_folder" :
				Tree_Add_Object(AsID_Tree,AID_Attribute,2,true,0);
			break;
			case "rename_node" :		
				new J.ajax({
					url:'../../code/asp/ajax/actions_tree.asp',
					method:'get',
					async: false,
					cache: false,
					dataType:'script',
					data:{
						sFunction_Name: "OnEdit",
						id_selected: dhxTree.getSelectedItemId(),
						sid_tree:AsID_Tree
					}
				});
				J(this).select();
			break;
			case "sort_asc" :
				//Sort_Type : Asc = 0 / Desc = 1
				Tree_Sort_Branch(AsID_Tree,0);
			break;
			case "sort_desc" :
				Tree_Sort_Branch(AsID_Tree,1);
			break;
			case "expand_node" :
				Tree_Expand_Nodes(ATree_Type,AsID_Tree);
			break;
			case "expand_attribute_branch" :
				Tree_Expand_Attribute(ATree_Type,dhxTree.getSelectedItemId(),false);	
			break;
			case "expand_attribute_full" :
				Tree_Expand_Attribute(ATree_Type,"",true);	
			break;
			case "collapse_node" :
				Tree_Collapse_Node(ATree_Type,AsID_Tree);
			break;
			case "collapse_attribute_branch" :
				Tree_Collapse_Attribute(ATree_Type,dhxTree.getSelectedItemId(),false);	
			break;
			case "collapse_attribute_full" :
				Tree_Collapse_Attribute(ATree_Type,"",true);	
			break;
			case "check_node" :
				Tree_Check_Branch(ATree_Type,AsID_Tree,true,dhxTree.getSelectedItemId());
			break;
			case "uncheck_node" :
				Tree_Check_Branch(ATree_Type,AsID_Tree,false,dhxTree.getSelectedItemId());
			break;
			case "property" :
				Display_Popup_Property();
			break;
			case "compare_node" :
				Display_Popup_Comparison(AsID_Tree,0);	
			break;
			case "reference" :
				Windows_Get_Switch_To_Reference();
			break;
			case "versionning" :
				Windows_Get_Versioning();
			break;			
		}
		ID_Advanced_Settings = menuitemId.substring(4,menuitemId.length);
		if (menuitemId.match(reg1)){
		//case of Advanced Creation.
			Tree_Add_Object(AsID_Tree,AID_Attribute,0, false,ID_Advanced_Settings);
		} else if (menuitemId.match(reg2)) {
		//case of Advanced Comparison.
			Display_Popup_Comparison(AsID_Tree,ID_Advanced_Settings);
		} else if (menuitemId.match(reg3)){
		//case of Advanced Duplication.
			Tree_Duplicate_Node_Partially(AsID_Tree,"",ID_Advanced_Settings);
		} else if (menuitemId.match(reg4)){
		//case of Advanced Comparison Default.
			Display_Popup_Comparison(AsID_Tree,ID_Advanced_Settings);
		} else if (menuitemId.match(reg5)){
		//case of Model.
			Tree_Load_Model(AsID_Tree,ID_Advanced_Settings,dhxCMenu.getItemText(menuitemId));
		} else if (menuitemId.match(reg6)){
		//case of add business object.
			Tree_Add_Business_Object(AsID_Tree,ID_Advanced_Settings);
		}
	});
}

function Menu_OnPMPopup(AMenu,AsID_Tree,ATree_Type){
	dhxCMenu = eval(AMenu);
	dhxCMenu.attachEvent("onBeforeContextMenu",function(zoneId){
		new J.ajax({
			url:'../../code/asp/ajax/actions_menu.asp',
			async: false,
			cache: false,
			dataType:'script',
			data: { 
				sFunction_Name: "OnPMPopup",
				id_selected: zoneId,
				sid_tree:AsID_Tree,
				tree_type:ATree_Type
			}
		});
		return true;
	});
}


