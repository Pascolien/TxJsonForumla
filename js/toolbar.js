var ArrTxCharts = [];

function TxMain_Toolbar_OnClick(ALang, AForce_Win_Exportation, APolyspot) {
	TxMain_Toolbar.attachEvent("onClick",function(id){
		ID_OT = Get_ID_OT();
		var reg1=new RegExp("^AMO_");
		switch (id) {
			case "mViewTable":
				Display_Table_View();
			break;
			case "mViewCalendar":
				Display_Calendar_View();
			break;
			case "mReadMode":
				Switch_RW_Mode(true);
			break;
			case "mWriteMode":
				Switch_RW_Mode(true);
			break;
			case "mLocked":
				TB_Locking_OnClick();
			break;
			case "mPrevObject":
				Browsing_Navigation(1);
			break;
			case "mNextObject":
				Browsing_Navigation(0);
			break;
			case "mHome":
				Display_Home_Page();
			break;
			case "mModuleSMC":
				Launch_MCS(Get_ID_OT());
			break;
			case "mModuleGDC":
				Display_Popup_CG_List();
			break;
			case "mModuleCDC":
				Display_Popup_CDC();
			break;
			case "mModuleCurves":
				Launch_Curves(AForce_Win_Exportation);
			break;
			case "mModuleExport":
				Launch_Exportation(AForce_Win_Exportation);
			break;
		    case "mModuleExtract":
		        Launch_Extraction(AForce_Win_Exportation);
		        break;
		    case "mTxCharts":
		        DisplayTxCharts();
		        break;
			case "mHelp":
				Display_TEEXMA_Help();
			break;
			case "mExit":
				Exit_TEEXMA();
			break;
			case "mSearch":
				Launch_Search(APolyspot);
			break;
			case "mAbout":
				Display_Popup_About();
			break;
		}
		//case of application Model.
		if (id.match(reg1)){
			iPos1 = id.indexOf("_");
			iPos2 = id.lastIndexOf("_");
			ID_Application_Model = id.substring(iPos1+1,iPos2);
			ID_Model_Type = id.substring(iPos2 + 1, id.length);
			Tree_Load_Model("dhxTree_Nav",ID_Application_Model,ID_Model_Type);
		}
		return true;
	});
}

function TxMain_Toolbar_Search_OnEnter(){
	TxMain_Toolbar.attachEvent("onEnter",function(id,value){
		Launch_Search();
		return true;
	});
}

function TxMain_Toolbar_OnStateChange(AsID_Toolbar){
	TxMain_Toolbar.attachEvent("onStateChange", function(id, state){
		ID_OT = Get_ID_OT();
		if (id != "mUser") {
			TxMain_Toolbar.forEachItem(function(itemId) {
				if (TxMain_Toolbar.getType(itemId) == "buttonTwoState") {
					TxMain_Toolbar.setItemState(itemId, false);
				}
			});
			TxMain_Toolbar.setItemState(id, true);
		}	
		switch (id){
			case "mViewForm":
				Display_Form_View();
			break;
			case "mViewBusiness":
				Display_Business_View();
			break;
			case 'mUser':
				Display_User_Info();
			break;
		}
	});
}

function Toolbar_OnClick(AsID_Toolbar,AsID_Tree,AID_Attribute,ATree_Type){
	dhxToolbar = eval(AsID_Toolbar);
	dhxToolbar.attachEvent("onClick",function(id){
		dhxTree = eval(AsID_Tree);
		dhxToolbar = eval(AsID_Toolbar);
		switch (id) {
			case "addItem":
				//AAddType : sister :0 / child :1 / insert:2
				Tree_Add_Object(AsID_Tree,AID_Attribute,0, false,0);
			break;
			case "addChild":
				Tree_Add_Object(AsID_Tree,AID_Attribute,1, false,0);
			break;
			case "deleteItem":
				Windows_Get_Delete(AsID_Tree);
			break;
			case "moveDown":
				Tree_Move_Node(AsID_Tree,1);
			break;
			case "moveUp":
				Tree_Move_Node(AsID_Tree,0);
			break;
			case "checkAll":
				Tree_Check_Branch(ATree_Type,AsID_Tree,true,dhxTree.getSelectedItemId());
			break;
			case "uncheckAll":
				Tree_Check_Branch(ATree_Type,AsID_Tree,false,dhxTree.getSelectedItemId());
			break;
			case "displaySelection":
				var sSearch_value;
				try {
					sSearch_value = dhxToolbar.getValue("search_input");
				} catch(e){}
				Tree_Display_Selection(ATree_Type,AsID_Tree,dhxTree.getAllChecked(),"treebox_form_filtered_"+AID_Attribute,"toolbarbox_form_filtered_"+AID_Attribute,sSearch_value);
			break;
			case "displayAll":				
				Tree_Display_All(ATree_Type,AsID_Tree,AID_Attribute);
			break;
		}
		return true;
	});
}

function Toolbar_MCS_OnClick(AsID_Toolbar,AsID_Tree){
	dhxToolbar_MCS = eval(AsID_Toolbar);
	dhxToolbar_MCS.attachEvent("onClick",function(id){
		var type = dhxToolbar_MCS.getType(id);
		switch (type){
			case "buttonSelectButton":
				var idParent;
				if (id.match("page_")){
					Option_Page_OnClick(id);
					Init_Buttons_From_Page_Number();
				} else if (id.match("results_")){
					Option_Result_OnClick(id);			
				}	
			break;
			case "button":
				switch (id){
					case "first":
						Init_Buttons();
						pageNumber_Fictive = 1;
					break;
					case "prev":
						if (!dhxToolbar_MCS.isEnabled("next")){
							dhxToolbar_MCS.enableItem("next");
							dhxToolbar_MCS.enableItem("last");
						}
						pageNumber_Fictive = pageNumber_Fictive - 1;
						if (pageNumber_Fictive == 1){
							dhxToolbar_MCS.disableItem("prev");
							dhxToolbar_MCS.disableItem("first");
						}
					break;
					case "next":
						if (!dhxToolbar_MCS.isEnabled("prev")){
							dhxToolbar_MCS.enableItem("prev");
							dhxToolbar_MCS.enableItem("first");
						}
						pageNumber_Fictive = pageNumber_Fictive + 1;
						if (pageNumber_Fictive == nbPage){
							dhxToolbar_MCS.disableItem("next");
							dhxToolbar_MCS.disableItem("last");
						}
					break;
					case "last":
						dhxToolbar_MCS.disableItem("last");
						dhxToolbar_MCS.disableItem("next");
						dhxToolbar_MCS.enableItem("prev");
						dhxToolbar_MCS.enableItem("first");
						pageNumber_Fictive = nbPage;
					break;
				}
				Option_Page_OnClick("page_"+pageNumber_Fictive);
				dhxToolbar_MCS.setListOptionSelected("pages","page_"+pageNumber_Fictive);
			break;
		}
	});
	
}

function Toolbar_OnEnter(AsID_Toolbar,AsID_Tree,AID_Attribute,ATree_Type){
	dhxToolbar = eval(AsID_Toolbar);
	dhxToolbar.attachEvent("onEnter",function(id,value){
		dhxTree = eval(AsID_Tree);
		new J.ajax({
			url:'../../code/asp/ajax/actions_toolbar.asp',
			async: false,
			cache: false,
			dataType:'script',
			data: { 
				sFunction_Name:"OnEnter",
				value_searched:value,
				tree_filter:"treebox_form_filtered_"+AID_Attribute,
				toolbar_filter:"toolbarbox_form_filtered_"+AID_Attribute,
				node_checked:dhxTree.getAllChecked(),
				sid_tree:AsID_Tree,
				tree_type:ATree_Type
			}
		});
		return true;
	});
}

function Init_Toolbar_MCS(){
	Init_Select_Button_Pages();
	Init_Label_Result();
	J("#id_div_toolbar_mcs_paging").css("display","block");
	J("#table_mcs_view").css("top","40px");
	dhxToolbar_MCS.disableItem("first");
	dhxToolbar_MCS.disableItem("prev");
	if (nbPage == 1){
		dhxToolbar_MCS.disableItem("last");
		dhxToolbar_MCS.disableItem("next");
	}
	dhxToolbar_MCS.setListOptionSelected("results","results_1");
	dhxToolbar_MCS.setListOptionSelected("pages","page_1");
	var text = dhxToolbar_MCS.getListOptionText("results","results_1");
	dhxToolbar_MCS.setItemText("results", text);
}

function Check_Button_Activated(AsID_Btn){
	return TxMain_Toolbar.getItemState(AsID_Btn);
}

function Check_Button_Visible(AsID_Btn){
	return TxMain_Toolbar.isVisible(AsID_Btn);
}

/*********************  dhxToolbar_Nav_Search  *******************/
function Initialize_Toolbar_Nav_Search(){
	dhxToolbarNav_Search = new dhtmlXToolbarObject("id_div_navigation_toolbar_search"); 
	dhxToolbarNav_Search.setIconPath("../../resources/theme/img/dhtmlx/toolbar/");
	dhxToolbarNav_Search.addButton("tbTree", 0, "", "../../btn_tree/20x20-Tree_View.png", "../../../btn_tree/20x20-Tree_View_Disabled.png");
	dhxToolbarNav_Search.addButton("tbLinear", 1, "", "../../btn_tree/20x20-Linear_View.png", "../../../btn_tree/20x20-Linear_View_Disabled.png");
	dhxToolbarNav_Search.addSpacer("tbLinear");
	dhxToolbarNav_Search.addText("tbSearchLabel", 2, Get_RS("RS_Toolbar_Search_Label"));
	dhxToolbarNav_Search.addInput("tbSearch", 3, "", 100);
	dhxToolbarNav_Search.hideItem("tbLinear");
	
	dhxToolbarNav_Search.attachEvent("onClick",function(AID_Btn){
		switch (AID_Btn) {
			case "tbTree":
				Display_Linear_Tree();
				dhxToolbarNav_Search.setValue("tbSearch","");
				Tree_Display_Selection(0,'dhxTree_Nav','','','','');
			break;
			case "tbLinear":
				Display_All_Tree();
				dhxTree_Nav_Filtered.deleteChildItems(0);
				Tree_Display_All(0,'dhxTree_Nav_Filtered');
			break;
		}
		return true;
	});
	dhxToolbarNav_Search.attachEvent("onEnter",function(AID_Btn,AValue){
		Display_Linear_Tree();
		dhxTree_Nav_Filtered = eval("dhxTree_Nav_Filtered");
		dhxTree_Nav_Filtered.deleteChildItems(0);
		new J.ajax({
			url:'../../code/asp/ajax/actions_toolbar.asp',
			async: false,
			cache: false,
			dataType:'script',
			data: { 
				sFunction_Name:"OnEnter",
				value_searched:AValue,
				tree_filter:"",
				toolbar_filter:"",
				node_checked:"",
				sid_tree:'dhxTree_Nav',
				tree_type:0
			}
		});
		return true;
	});
}

function Display_Linear_Tree(){
	dhxToolbarNav_Search.hideItem("tbTree");
	dhxToolbarNav_Search.showItem("tbLinear");
	J("#id_div_navigation_tree").css("display","none");
		J("#id_div_navigation_toolbar").css("display","none");

	
	J("#id_div_navigation_tree_filtered").css("display","block");
	Resize_Treebox();
	Tree_OnClickOut('dhxTree_Nav',0);
}

function Display_All_Tree(){
	dhxToolbarNav_Search.hideItem("tbLinear");
	dhxToolbarNav_Search.showItem("tbTree");
	J("#id_div_navigation_tree").css("display","block");
	J("#id_div_navigation_toolbar").css("display","none");
	J("#id_div_navigation_tree_filtered").css("display","none");
	
	if (TxMain_Toolbar.isVisible("mWriteMode") && TxMain_Toolbar.isEnabled("mWriteMode")){
		J("#id_div_navigation_toolbar").css("display","block");
	}
	dhxToolbarNav_Search.setValue("tbSearch","");
	Resize_Treebox();
}

/****************************************/

/*********************  TxMain_Toolbar  *******************/

function Display_Form_View(){
	J("#id_div_navigation_toolbar_search").css("display","block");	
	ID_OT = Get_ID_OT();
	ID_Object = Get_ID_Object();
	ID_Tab = Get_ID_Tab();
	new J.ajax({
		url:'../../code/asp/ajax/actions_toolbar.asp',
		dataType:'script',
		async: true,
		cache: false,
		data:{
			sFunction_Name:"Display_Form_View",
			id_ot:ID_OT,
			id_object:ID_Object,
			id_tab:ID_Tab
		},
		success:function(data){
			Resize_Treebox();
		}
	});
}

function Display_Table_View(){
	CenterWindow('../../code/asp/table_view.asp','Form',960,540,'resizable=yes,status=no,toolbar=no,menubar=no,location=no');
}

function Display_Business_View(){
	J("#id_div_navigation_toolbar_search").css("display","none");	
	ID_OT = Get_ID_OT();
	ID_Object = Get_ID_Object();
	ID_Tab = Get_ID_Tab();
	new J.ajax({
		url:'../../code/asp/ajax/actions_toolbar.asp',
		dataType:'script',
		async: false,
		cache: false,
		data:{
			sFunction_Name:"Display_Business_View",
			id_ot:ID_OT,
			id_object:ID_Object,
			id_tab:ID_Tab
		},
		success: function (data) {
			Resize_Treebox();
		}
	});
}

function Display_Calendar_View(){
}

function Switch_RW_Mode(ARefesh_Form){
	TxLayout.progressOn();
	if (Check_Write_Mode()){
		try {	
			if (tinyMCE != null) {
				if (tinyMCE.activeEditor.getParam('fullscreen_is_enabled')){
					tinyMCE.activeEditor.execCommand('mceFullScreen');
					tinyMCE.activeEditor.execCommand('mceSave');
				}
			}						
		} catch (e) { }
		enregistrement(false);
	}
	new J.ajax({
		url:'../../code/asp/ajax/actions_menu.asp',
		async: false,
		cache: false,
		dataType:'script',
		data:{sFunction_Name:"Switch_Write_Mode"},
		success:function(data){
			if (!Check_Write_Mode()){
				if (ARefesh_Form){
					Form_Get_Header();
					Form_Get_Content();
				}
				TxMain_Toolbar.hideItem("mReadMode");
				TxMain_Toolbar.showItem("mWriteMode");
			} else {
				TxMain_Toolbar.showItem("mReadMode");
				TxMain_Toolbar.hideItem("mWriteMode");
				setTimeout("Form_Get_Content();", 1000);
				setTimeout("Form_Get_Header();", 1200);
			}	
			TxLayout.progressOff();
			Resize_Treebox();
		}
	});	
	return true;
}

function TB_Locking_OnClick(){
	new J.ajax({
		url : '../../code/asp/ajax/actions_toolbar.asp',
		async: false,
		cache: false,
		dataType:'script',
		data:{
			sFunction_Name:"TB_Locking_OnClick"
		}
	});
}

function Browsing_Navigation(ABrowse_Type){
	new J.ajax({
		url : '../../code/asp/ajax/actions_toolbar.asp',
		async: true,
		cache: false,
		dataType:'script',
		data:{
			sFunction_Name:"Browsing_Navigation",
			browse_type:ABrowse_Type
		}
	});
}

function Display_Home_Page(){
	if (View == "Form"){
		TxNav_Combo.selectOption(0,1,1);
	} else {
		TxMain_Toolbar.setItemState("mViewBusiness", false);
		TxMain_Toolbar.setItemState("mViewForm", true);
		Set_ID_OT(Get_ID_OT_Portal());
		Set_ID_Object(0);
		Display_Form_View();
	}
}

/** Moduls **/

function Launch_MCS(AID_OT,AID_CDC,ATab){
	if (AID_CDC == null) AID_CDC = 0;
	if (ATab == null) ATab = "";
	var iHeight,iWidth,sFullscreen;
	iHeight = 560;
	iWidth = 850;

	Display_Popup_MCS(AID_OT,AID_CDC,ATab);
	return false;
}

function Launch_Curves(AForce_Win_Exportation){
	var iHeight = 535;
	var iWidth = 395;
	if (AForce_Win_Exportation) {
		Display_Popup_Curves();
	} else {
		if (Check_IE()) { 
			Display_Popup_Curves();
		} else { 
			Popup_Alert(Get_RS('RS_JS_IE'));
		}
	}
	return false;
}

function Launch_Exportation(AForce_Win_Exportation){
	var ID_OT = Get_ID_OT();
	if (AForce_Win_Exportation) {
		var sKeyExportation = '';
		var sIDs_ObjSelected = Tree_Get_IDs_Selected(ID_OT);
		if (sIDs_ObjSelected != "")
		    new J.ajax({
			    url:'../../code/asp/ajax/TxContextVariables_ajax.asp',
			    dataType: 'html',
			    async: false,
			    cache: false,
			    data:{
				    sFunction_Name:"Set_Variable",
				    sIDS_ObjSelected : sIDs_ObjSelected
			    }, 
			    success: function(data) {
				    sKeyExportation = data;
			    }, 
			    error: function(e){
				    alert("Error \"Launch_Exportation\" : Fail to Get Key Exportation From dhxTree_Nav");
			    }
		    });
		Display_Popup_Exportation(ID_OT,sKeyExportation);
		return false;
	} else {
		if (Check_IE()) { 
		    Display_Popup_Exportation(ID_OT);
			return false;
		} else { 
			Popup_Alert(Get_RS('RS_JS_IE'));
		}
	}	
}

function Launch_Extraction(AForce_Win_Exportation){
	var ID_OT = Get_ID_OT();
	var iHeight = 430;
	var iWidth = 530;
	
	if (AForce_Win_Exportation) {
		Display_Popup_Extraction(ID_OT);
	} else {
		if (Check_IE()) { 
			Display_Popup_Extraction(ID_OT);
		} else { 
			Popup_Alert(Get_RS('RS_JS_IE'));
		}
	}		
}

function DisplayTxCharts(AID_Object, AID_Attribute) {
    var sParam = "";
    if ((AID_Object) && (AID_Attribute))
        sParam = "?ID_Object=" + AID_Object + "&ID_Attribute=" + AID_Attribute;

    ArrTxCharts.push(window.open("/temp_resources/models/TxCharts/TxCharts.asp" + sParam));
}

/*******/

function Display_TEEXMA_Help(){
	window.open("http://help.teexma.com");
}

function Exit_TEEXMA(){
	enregistrement(false);
	Popup_Confirm(Get_RS('RS_Head_Menu_Question_Leave_TEEXMA'),"Ok","Annuler","DoExit_TEEXMA()");
}

function DoExit_TEEXMA(){
	fct_onunload();
	location = "../../default.asp?deco_manuelle=true";
	return true;
}
	
function Launch_Search(){	
	sValue = TxMain_Toolbar.getValue("mSearchInput"); 
	Display_Popup_Search(sValue);
	return false;
}
	
function Display_User_Info(){
	if (TxMain_Toolbar.getItemState("mUser") == true) 
		J('#id_div_user_info_container').css('display','block');
	else 
		J('#id_div_user_info_container').css('display','none');
}
