var dhxWins;
var sTxIcon = 'temp_resources/theme/img/icon-16.png';
var sIcon_MCS = 'temp_resources/theme/img/btn_titre/module_mcs-16.png';

function Windows_Get_Close(AWindow){
	AWindow.close();
}

function Windows_Get_Delete(AsID_Tree){
	new J.ajax({
		url:'../../code/asp/ajax/actions_window.asp',
		async: false,
		cache: false,
		dataType:'script',
		data: {
			sFunction_Name:"Get_Window_Delete",
			sid_tree:AsID_Tree,
			width:380,
			height:145
		}
	});
}

function Windows_Get_Advanced_Deletions_Settings(AID_OT){
	new J.ajax({
		url:'../../code/asp/ajax/actions_window.asp',
		async: false,
		cache: false,
		dataType:'script',
		data: {
			sFunction_Name:"Get_Window_Advanced_Deletion_Settings",
			id_ot:AID_OT
		}
	});
}

function Windows_Get_Popup(AHeader,ADiv_Name,AWidth,AHeight,AIcon){
	dhxWins = new dhtmlXWindows();
	dhxWins.createWindow("w1",0,0,AWidth,AHeight);
	dhxWins.setImagePath("../../resources/theme/img/dhtmlx/windows/");
	dhxWins.setSkin("dhx_skyblue");
	var window = dhxWins.window("w1");
	window.setIcon(AIcon);
	window.button("park").hide();
	window.attachObject(ADiv_Name);
	J('#'+ADiv_Name).css('display','block');
	window.centerOnScreen();
	window.setModal(true);
	window.keepInViewport(true);
	window.setText(AHeader);
	dhxWins.attachEvent("onClose", function(win){
		try{
			window.detachObject(ADiv_Name);
			J('#'+ADiv_Name).css('display','none');
			dhxWins.unload();
		} catch (e){}
	});
}

function Windows_Get_Switch_To_Reference(){
	new J.ajax({
		url:'../../code/asp/ajax/actions_window.asp',
		async: false,
		cache: false,
		dataType:'script',
		data:{
			sFunction_Name: "Get_Window_Switch_To_Reference",
			width:400,
			height:120
		}
	});
}

function Windows_Get_Versioning(){
	new J.ajax({
		url:'../../code/asp/ajax/actions_window.asp',
		async: false,
		cache: false,
		dataType:'script',
		data:{
			sFunction_Name: "Get_Window_Versioning",
			width:380,
			height:120
		}
	});
}

function Close_Popup_MCS(){
	new J.ajax({
		url:'../../code/asp/ajax/actions_window.asp',
		async: false,
		cache: false,
		data:{
			sFunction_Name:"OnClose_Popup_MCS"
		}
	});
}	

function Get_Popup_Prompt_Value(AQuestion,ADefault_Value){
	var sValue;
	sValue = prompt(AQuestion,ADefault_Value);
	return sValue;
}

function Get_Popup_Publish_Doc(AID_Attribute,AID_Object,AID_Data,AFile_Name){
	Display_Popup_Publish_Document(AID_Attribute,AID_Object,0,AID_Data,4,AFile_Name);
}

function Close_Popup(AID_Popup){
	parent.dhxWins.window(AID_Popup).close();
}

function Disable_Popup(AID_Popup,ADisable){
	if (parent.dhxWins){
		if (parent.dhxWins.window(AID_Popup)){
			if (!parent.dhxWins.window(AID_Popup).isHidden()){
				parent.dhxWins.window(AID_Popup).setModal(!ADisable);
			}
		}
	} else if (dhxWins){
		if (dhxWins.window(AID_Popup)){
			if (!dhxWins.window(AID_Popup).isHidden()){
				dhxWins.window(AID_Popup).setModal(!ADisable);
			}
		}
	}
		
}

/* Ged */
function Display_Popup_GED(aIdTree,AID_Object,AMessage,AModel,AWith_Template,ASimple_Import,AID_Popup){
	var iHeight;
	if(AModel)
		iHeight = 130;
	else if (AWith_Template && (!AID_Popup))
		iHeight = 120;
	else
		iHeight = 130;
	var iWidth = 500;

	if (isIE(8)) {
	    AMessage = ReplaceWithoutAccents(AMessage);
	}

	sParam_IDs = "?id_object='" + AID_Object + "'&sIdTree='" + aIdTree + "'&sMessage=" + AMessage + "&bModel=" + AModel + "&bWith_Template=" + AWith_Template + "&bSimple_Import=" + ASimple_Import;
	
	Initialise_Popup('dhxPopup_GED','../../code/asp/Popup_Upload_GED_File.asp'+ sParam_IDs,'Information',iWidth,iHeight,'temp_resources/theme/img/btn_titre/module_export-16.png',true,true);
}
	function Close_Popup_GED(){
		Close_Popup('dhxPopup_GED');
	}

/* Open / close groups */
function Display_Popup_OCG(AMessage,AID_MA_On_Object_Checked,AIDs_Object_Checked,AYes,ANo,ATitle) {
    dhtmlx.confirm({
        title: ATitle,
        text: AMessage,
        ok: AYes,
        cancel: ANo,
        callback: function (result) {
            new J.ajax({
                url: '../asp/ajax/actions_tree.asp',
                method: 'get',
                async: false,
                cache: false,
                dataType: 'script',
                data: {
                    sFunction_Name: "Close_Group",
                    erase: result,
                    ID_MA_On_Object_Checked: AID_MA_On_Object_Checked,
                    ids_selected: AIDs_Object_Checked
                }
            });
        }
    });	
}

/* Extraction */
function Display_Popup_Extraction(AID_OT,AIDs_Object){
	var iHeight = 410;
	var iWidth = 530;
	sParams = '?id_ot='+AID_OT;
	if (AIDs_Object)
	    new J.ajax({
	        url: '../../code/asp/framework_bassetti.asp',
	        async: false,
	        cache: false,
            type:'post',
	        data: {
	            sFunction_Name: 'Save_IDs_Selected_ForExtraction',
	            IDs_Selected_ForExtraction: AIDs_Object
	        }
        })

	Initialise_Popup('dhxPopup_Extract', '../../code/asp/extraction.asp' + sParams, 'Extraction', iWidth, iHeight, 'temp_resources/theme/img/btn_titre/module_extract-16.png', true, true);
}
	function Close_Popup_Extraction(){
		Close_Popup('dhxPopup_Extract');
	}

/* Exportation */
function Display_Popup_Exportation(AID_OT,aKeyExportation){
	var iHeight = 490;
	var iWidth = 705;
	Initialise_Popup('dhxPopup_Export', '../../code/TxWebExportation/TxWebExportation.asp?ID_OT=' + AID_OT + '&sKeyTxWebExportation=' + aKeyExportation, 'Exportation', iWidth, iHeight, 'temp_resources/theme/img/btn_titre/module_export-16.png', true, true);
}
	function Close_Popup_Exportation(){
		Close_Popup('dhxPopup_Export');
	}

/* MCS */
function Display_Popup_MCS(AID_OT,AID_CDC,ATab,AFrom_CG,APathFile){
	bFrom_CG = AFrom_CG;
	if (!bFrom_CG)
		bFrom_CG = false;
		
	var iHeight = 570;
	var iWidth = 850;
	var sParams = '?cg='+AFrom_CG+'&id_cdc='+AID_CDC+'&id_te='+AID_OT+'&onglet="'+ATab+'"';
	if (APathFile)
		sParams += '&sPathFile='+APathFile;
		
	var sIcon = sIcon_MCS;
	var sHeader = Get_RS("RS_Title_SMC_CDC");
	
	if (window.opener){
		window.opener.Initialise_Popup('dhxPopup_MCS','../../code/asp/mcs.asp'+sParams,sHeader,iWidth,iHeight,sIcon,true);
	} else {
		Initialise_Popup('dhxPopup_MCS','../../code/asp/mcs.asp'+sParams,sHeader,iWidth,iHeight,sIcon,true,false,true);
	}
}

	/*define criterion*/
	function Display_Popup_Modify_Criteria(){
		var iHeight = 550;
		var iWidth = 960;
		var sIcon = sIcon_MCS;
		var sHeader = Get_RS("RS_Title_SMC_CDC");
		var sParams = '?id_gc='+page_id_gc_select+'&id_te='+ID_TE_cmb;
		Initialise_Popup('dhxPopup_MCS_Criteria','selection_criteria.asp'+sParams,sHeader,iWidth,iHeight,sIcon,true,true,false,true);
	}
	
		function Close_Popup_Modify_Criteria(){
			Close_Popup('dhxPopup_MCS_Criteria');
		}

	function Display_Popup_Add_Group() {
		var iHeight = 145;
		var iWidth = 340;
		var sParams = '?id_rl_owner='+page_id_cdc+'&id_pere='+page_id_gc_select+'&id=0';
		var sIcon = sIcon_MCS;
		var sHeader = Get_RS("RS_Title_SMC_Group");
		
		Initialise_Popup('dhxPopup_MCS_Group','page_modif_cg.asp'+sParams,sHeader,iWidth,iHeight,sIcon,true,true,false,true);
	}

	function Display_Popup_Modify_Group() {
		var iHeight = 145;
		var iWidth = 340;
		var sParams = '?id_rl_owner='+page_id_cdc+'&id='+page_id_gc_select+'&id=0';
		var sIcon = sIcon_MCS;
		var sHeader = Get_RS("RS_Title_SMC_Modify_Group");
		
		Initialise_Popup('dhxPopup_MCS_Group','page_modif_cg.asp'+sParams,sHeader,iWidth,iHeight,sIcon,true,true,false,true);
	}
	
	function Display_Popup_Modify_RS() {
		var iHeight = 145;
		var iWidth = 340;
		var sParams = '?id_rl_owner='+page_id_cdc+'&id='+page_id_cdc;
		var sIcon = sIcon_MCS;
		var sHeader = Get_RS("RS_Title_SMC_Modify_RS");
		
		Initialise_Popup('dhxPopup_MCS_Group','page_modif_cg.asp'+sParams,sHeader,iWidth,iHeight,sIcon,true,true,false,true);
		}
	
		function Close_Popup_Add_Group(){
			Close_Popup('dhxPopup_MCS_Group');
		}
	
	function Update_Requirement_Set(AID_Requirement_Set){
		rFrame = parent.dhxWins.window("dhxPopup_MCS").getFrame().contentWindow;
		rFrame.UpdateTextCdc();
		rFrame.page_id_gc_select = AID_Requirement_Set;
	    Close_Popup_Add_Group();	
	}
	
/* CG */
function Display_Popup_CG(AID_CG,AFile_Name){
	var iHeight = resizeHeight(620);
	var iWidth = 910;
	sHeader = Get_RS("RS_Title_GDC");
	Initialise_Popup('dhxPopup_CG', '../../code/asp/cg_form.asp?import_file=' + AFile_Name + '&id_gdc=' + AID_CG, sHeader, iWidth, iHeight, 'temp_resources/theme/img/btn_titre/module_cg-16.png', true);
}

/* CG List */
function Display_Popup_CG_List(){
	var iHeight = 210;
	var iWidth = 460;
	sHeader = Get_RS("RS_Title_GDC");
	Initialise_Popup('dhxPopup_CG_List','../../code/asp/cg_opening.asp',sHeader,iWidth,iHeight,'temp_resources/theme/img/btn_titre/module_cg-16.png',true);
}

/* Requirement Set List */
function Display_Popup_CDC(){
	var iHeight = 390;
	var iWidth = 440;
	sHeader = Get_RS("RS_Title_SMC_CDC");
	Initialise_Popup('dhxPopup_CDC','../../code/asp/selection_multicriteria.asp',sHeader,iWidth,iHeight,'temp_resources/theme/img/btn_titre/module_rs-16.png',true,true);
}
	function Close_Popup_CDC(){
		Close_Popup('dhxPopup_CDC');
	}

/* Curves */
function Display_Popup_Curves(){
	var iHeight = 440;
	var iWidth = 380;
	sHeader = Get_RS("RS_Title_Curves");
	Initialise_Popup('dhxPopup_Curves','../../code/asp/load_curves_superposition.asp',sHeader,iWidth,iHeight,'temp_resources/theme/img/btn_titre/module_curves-16.png',true,true);
}
	function Close_Popup_Curves(){
		Close_Popup('dhxPopup_Curves');
	}

function Display_Popup_Change_Password(){
	var iHeight = 185;
	var iWidth = 375;
	sHeader = Get_RS("RS_Title_Change_MDP");
	Initialise_Popup('dhxPopup_Change_Password','../../code/asp/change_password.asp',sHeader,iWidth,iHeight,'resources/theme/img/btn_form/cadena.jpg',true,true);

}
	function Close_Popup_Change_Password(){
		Close_Popup('dhxPopup_Change_Password');
	}

function Display_Popup_Property(){
	var iHeight = 230;
	var iWidth = 360;
	var ID_Icon = Get_Selected_Object_ID_Icon();
	var sIcon = 'temp_resources/theme/img/png/'+ID_Icon+'.png';
	var sHeader = Get_RS("RS_Title_Popup_Property");
	Initialise_Popup('dhxPopup_Property','../../code/asp/Popup_Property.asp',sHeader,iWidth,iHeight,sIcon,true,true);
}

function Display_Popup_Search(AText_Search){
	var iHeight = 555;
	var iWidth = 520;
	var sParams = '?action_page="Recherche"&c_lien=1';
	var sIcon = 'temp_resources/theme/img/btn_titre/search-16.png';
	if (AText_Search){
	    if (isIE(8)) {
	        AText_Search = ReplaceWithoutAccents(AText_Search);
		}
		sParams = sParams + "&mots_cles="+Replace_For_URL(escapeJsString(AText_Search));
	}			
	
	sHeader = Get_RS("RS_Title_Search");
	Initialise_Popup('dhxPopup_Search','../../code/asp/search.asp'+sParams,sHeader,iWidth,iHeight,sIcon,true,false,true);
}

function Display_Popup_Publish_Document(AID_Attribute,AID_Object,APopup_Form,AID_Data,AStep,AFile_Name){
	Disable_Popup("dhxPopup_Form",true);	
	Disable_Popup("dhxPopup_Information",true);	
	Disable_Popup("dhxPopup_Source",true);	
	Disable_Popup("dhxPopup_Extract",true);	
	var iHeight = 190;
	var iWidth = 550;
	var sParams = '?ID_PE='+ AID_Attribute +'&ID_E='+ AID_Object + '&popup_form='+ APopup_Form +'&ID_D='+AID_Data;
	if (AStep)
		sParams = sParams + "&iStep="+AStep;
	if (AFile_Name)
		sParams = sParams + "&sFile_Name="+AFile_Name;
	
	var sIcon = sTxIcon;
	var sHeader = Get_RS("RS_Title_Popup_Publish_Document");
			
	Initialise_Popup('dhxPopup_Publish_Document','archive_doc_API.asp'+sParams,sHeader,iWidth,iHeight,sIcon,true,true,false,true);
}
	
	function Close_Popup_Publish_Document(AOpened_From_Popup){
		Disable_Popup("dhxPopup_Publish_Document",true);
		Disable_Popup("dhxPopup_Information",false);
		Disable_Popup("dhxPopup_Source",false);
		Disable_Popup("dhxPopup_Form",false);
		Disable_Popup("dhxPopup_Extract",false);
		Close_Popup('dhxPopup_Publish_Document');
	}

function Display_Popup_Delete_Document(AID_Attribute,AID_Object,AID_Data,APopup_Form){
	Disable_Popup("dhxPopup_Form",true);
	enregistrement(true);
	var iHeight = 150;
	var iWidth = 320;
	var sParams = '?id_donnee='+ AID_Data +'&popup_form='+ APopup_Form+'&id_attribute='+ AID_Attribute+'&id_object='+ AID_Object;
	var sIcon = sTxIcon;
	var sHeader = Get_RS("RS_Title_Delete_Doc");
	
	Initialise_Popup('dhxPopup_Delete_Document','delete_document.asp'+sParams,sHeader,iWidth,iHeight,sIcon,true,true);
}
	function Close_Popup_Delete_Document(){
		Disable_Popup("dhxPopup_Delete_Document",true);
		Disable_Popup("dhxPopup_Form",false);
		Close_Popup('dhxPopup_Delete_Document');
	}

//Popup__Ecriture_HeritageMultiple (id_pe, id_e, id_e_lien) {
function Display_Popup_Associatives(AID_Attribute, AID_Object, AID_Object_Link, AsID_Tree) {
	var sList_ID_Objects_Linked = Jn('list_id_e_liees_'+AID_Attribute).eq(0).val();
	var iData_Type = 1200;
	if (Jn('type_tableau_'+AID_Attribute).eq(0).val() == "heritage") {
		iData_Type = 0;
	} 
	var iHeight;
	var iWidth;
	var sHeader;
	if (AID_Object_Link > 1){
		iHeight = 460;
		iWidth = 880;
		sHeader = Get_RS("RS_Title_ASSO_Edit");
		sPopup_Name = 'dhxPopup_Associatives';
	}
	else {
		iHeight = 380;
		iWidth = 480;
		sHeader = Get_RS("RS_Title_ASSO_Link");
		sPopup_Name = 'dhxPopup_Associatives';
	}
	var sParams = '?id_pe='+AID_Attribute+'&id_e='+AID_Object+'&id_e_lien='+AID_Object_Link+'&list_id_e_liees='+sList_ID_Objects_Linked+'&type_donnee='+iData_Type+'&sID_Tree='+AsID_Tree;
	var sIcon = sTxIcon;
	
	Initialise_Popup(sPopup_Name,'popup_multiple_heritage.asp'+sParams,sHeader,iWidth,iHeight,sIcon,true,true);
}
	function Close_Popup_Associatives(){
		if (parent.dhxWins.window("dhxPopup_Associatives")){
			sPopup_Name = 'dhxPopup_Associatives';
		} else {
			sPopup_Name = 'dhxPopup_Form';
		}
		Close_Popup(sPopup_Name);
		rCurrent_Popup_Frame = "";
	}
	
function Display_Popup_Information(AID_Attribute,AAttribute_Name,AID_Information,APopup_Form) {
	Disable_Popup("dhxPopup_Form",true);
	var iHeight = 600;
	var iWidth = 800;
	var sParams = '?id_object=0&id_info='+AID_Information+'&id_attribute='+AID_Attribute+'&popup_form='+APopup_Form+'&bSource=false';
	var sIcon = sTxIcon;
	var sHeader = Get_RS("RS_Title_Information")+ '"' + AAttribute_Name+ '"';
	Initialise_Popup('dhxPopup_Information','Popup_SrcInfo_Write.asp'+sParams,sHeader,iWidth,iHeight,sIcon,true,true);
}
	function Close_Popup_Information(){
		Disable_Popup("dhxPopup_Information",true);
		Disable_Popup("dhxPopup_Form",false);
		Close_Popup('dhxPopup_Information');
	}


function Display_Popup_Source_Read(AID_Object, AID_Source, AID_PE, AType){
	var bSource;
	if (AType == "source"){
		bSource = true;
	} else {
		bSource = false;
	}
	
	if (bSource) {
		sHeader = 'Source';
		sIcon = 'resources/theme/img/btn_form/16x16_Existing_Source.png';		
	} else {
		sHeader = 'Information';
		sIcon = 'resources/theme/img/btn_form/16x16_Existing_information.png';
	}
	
	var iHeight = 450;
	var iWidth = 500;
	var sParams = '?ID_Object='+AID_Object+"&ID_Object_Source="+AID_Source+"&ID_Attribute="+AID_PE+"&bSource="+bSource;
	Initialise_Popup('dhxPopup_Source_Read','Popup_SrcInfo_Read.asp'+sParams,sHeader,iWidth,iHeight,sIcon,true,false);
}
		
function Display_Popup_Source(AID_Attribute,AAttribute_Name,AID_Object, AID_Source, APopup_Form) {
	Disable_Popup("dhxPopup_Form",true);
	var iHeight = 600;
	var iWidth = 800;
	var sParams = '?bSource=true&id_object='+AID_Object+'&popup_form='+APopup_Form+'&id_source='+AID_Source+'&id_attribute='+AID_Attribute;
	var sIcon = sTxIcon;
	var sHeader = Get_RS("RS_Title_Source")+ '"' + AAttribute_Name+ '"'; 	

	Initialise_Popup('dhxPopup_Source','Popup_SrcInfo_Write.asp'+sParams,sHeader,iWidth,iHeight,sIcon,true,true);
}

	function Close_Popup_Source(){
		Disable_Popup("dhxPopup_Source",true);
		Disable_Popup("dhxPopup_Form",false);
		Close_Popup('dhxPopup_Source');
	}
	
function Display_Popup_Import_Data_Array(AID_Attribute, AID_Object, APopup_Form) {
	var iHeight = 310;
	var iWidth = 660;
	var sParams = '?id_e='+AID_Object+'&id_pe='+AID_Attribute+'&popup_form='+APopup_Form;
	var sIcon = sTxIcon;
	var sHeader = Get_RS("RS_Title_Import_Tab");

	Initialise_Popup('dhxPopup_Import_Data_Array','../../code/asp/Popup_curve_import.asp'+sParams,sHeader,iWidth,iHeight,sIcon,true,true);
}
	function Close_Popup_Import_Data_Array(){
		Close_Popup('dhxPopup_Import_Data_Array');
	}
	
function Display_Popup_Form(AID_Object,AID_Advanced_Creation,AID_Advanced_Duplication,AsID_Tree,aIcon, aIdNewObject){
	var iHeight = resizeHeight(600);
	var iWidth = 820;
	var sParams = '?id_object=' + AID_Object + '&id_duplication_settings=' + AID_Advanced_Duplication + '&id_creation_settings=' + AID_Advanced_Creation + '&sID_Tree=' + AsID_Tree + '&bRefresh=0&sID_NewObject=' + aIdNewObject;
	var sIcon = 'temp_resources/theme/img/png/' + aIcon + '.png';
	var sHeader = Get_Object_Name(AID_Object);
	
	Initialise_Popup('dhxPopup_Form','Popup_Form.asp'+sParams,sHeader,iWidth,iHeight,sIcon,true,true);
}
	function Close_Popup_Form(){
		Close_Popup('dhxPopup_Form');		
	}
	
function Display_Popup_Duplicate_Partially(AsID_Tree){
	var iHeight = 470;
	var iWidth = 410;
	var sParams = "?sID_Tree="+AsID_Tree;
	var ID_Icon = Get_Selected_Object_ID_Icon();
	var sIcon = 'temp_resources/theme/img/png/'+ID_Icon+'.png';
	var sHeader = Get_RS("RS_Popup_Duplicate_Header");
	Initialise_Popup('dhxPopup_Duplicate_Partially','../../code/asp/popup_duplicate_partially.asp'+sParams,sHeader,iWidth,iHeight,sIcon,true,true);
}
	function Close_Popup_Duplicate_Partially(){
		new J.ajax({
			url:'../../code/asp/ajax/actions_window.asp',
			async: false,
			cache: false,
			data:{
				sFunction_Name:"Partial_Duplication_OnClose"
			}
		});
		Close_Popup('dhxPopup_Duplicate_Partially');
	}

function Display_Popup_Comparison(AsID_Tree,AID_Advanced_Comparison){
	var iHeight = 470;
	var iWidth = 410;
	var sParams = "?sID_Tree="+AsID_Tree+'&id_advanced_comparison='+AID_Advanced_Comparison;
	var ID_Icon = Get_Selected_Object_ID_Icon();
	var sIcon = 'temp_resources/theme/img/png/'+ID_Icon+'.png';
	var sHeader = Get_RS("RS_Popup_Compare_Header");
	Initialise_Popup('dhxPopup_Compare','../../code/asp/popup_compare.asp'+sParams,sHeader,iWidth,iHeight,sIcon,true,true);
}
	function Close_Popup_Compare(){
		Close_Popup('dhxPopup_Compare');
	}

function Display_Popup_About(){
	var iHeight = 390;
	var iWidth = 525;
	var sIcon = 'temp_resources/theme/img/btn_titre/about-16.png';
	var sHeader = Get_RS("RS_Popup_About");
	Initialise_Popup('dhxPopup_About','../../code/asp/popup_about.asp',sHeader,iWidth,iHeight,sIcon,true,true);
}
	
function Display_Popup_Advanced_Creations(AsID_Tree,AID_OT,AID_Object_Parent,AObject_Name,AFolder,AAdd_Type,AID_Attribute){	
	Disable_Popup("dhxPopup_Form",true);
	var iHeight = 120;
	var iWidth = 300;
	var sParams = "?sid_tree='"+AsID_Tree+"'&id_ot="+AID_OT+"&id_object_parent="+AID_Object_Parent+"&sObject_Name='"+AObject_Name+"'&bFolder="+AFolder+"&iAdd_Type="+AAdd_Type+"&ID_Attribute="+AID_Attribute;
	var sIcon = 'resources/theme/img/btn_entite/add_object_16.png';
	var sHeader = Get_RS("RS_Popup_Form_Advanced_Creation");
	Initialise_Popup('dhxPopup_Advanced_Creation','../../code/asp/Popup_Advanced_Creations.asp'+sParams,sHeader,iWidth,iHeight,sIcon,true,true);
}
	function Close_Popup_Advanced_Creations(){
		Disable_Popup("dhxPopup_Advanced_Creation",true);
		Disable_Popup("dhxPopup_Form",false);
		Close_Popup('dhxPopup_Advanced_Creation');
	}

function Display_Popup_Delete_Curve(AMessage,AID_Attribute, AID_Object,APopup_Form,ARefresh){
	if (confirm(AMessage)){
		DeleteCurve(AID_Attribute, AID_Object,APopup_Form,ARefresh);
	}
}
	
/****  DhtmlxMessage  ****/
function Display_Popup_Delete_Object(AID_OT,AMessage,AsID_Tree,ARS_Yes, ARS_No){
	if (AID_OT > 0){
		sFunction = "Windows_Get_Advanced_Deletions_Settings("+AID_OT+");";
	} else {
		rTree = eval(AsID_Tree);
		sFunction = "Tree_Delete_Node('"+rTree.getSelectedItemId()+"',0);";
	}
	Popup_Confirm(AMessage,ARS_Yes,ARS_No,sFunction);
}

/**************** Lock Object ***********************/
function Display_Popup_Confirm_Lock_Unlock(AMessage,AType){
	if (AType == 1){
		Popup_Confirm(AMessage,"Ok","Annuler","Display_Popup_Lock('Lock_Object')");
	}
	else if (AType == 2){
		Popup_Confirm(AMessage,"Ok","Annuler","Display_Popup_Lock('Lock_Document')");
	}
	else {
		Popup_Confirm(AMessage,"Ok","Annuler","Display_Popup_Lock('Unlock_Object')");
	}
}
function Display_Popup_Lock(AFunction){
	new J.ajax({
			url:"../../code/asp/ajax/actions_toolbar.asp",
			async: false,
			cache: false,
			dataType:"script",
			data:{
				sFunction_Name:AFunction
			}
		});
}

function Display_Popup_Confirm_Lock_Document_And_Retrieve_File(AMessage,AFilename){
	var iHeight = 130;
	var iWidth = 500;
	var sIcon = sTxIcon;
	var sHeader = Get_RS("RS_Confirm");
	var sParams = "?sMessage="+AMessage;
	Initialise_Popup('dhxPopup_Lock_Document_And_Retrieve_File','../../code/asp/Popup_Lock_Document_And_Retrieve_File.asp'+sParams,sHeader,iWidth,iHeight,sIcon,true,true);
}
	function Close_Popup_Lock_Document_And_Retrieve_File(){
		Close_Popup('dhxPopup_Lock_Document_And_Retrieve_File');
	}
	function Lock_Document_And_Retrieve_File(AYes){
		new J.ajax({
			url:"../../code/asp/ajax/actions_toolbar.asp",
			async: false,
			cache: false,
			dataType:"script",
			data:{
				sFunction_Name:"Lock_Document_And_Retrieve_File",
				bYes:AYes
			}
		});
	}



function Display_Popup_Confirm_Unlock_Document_And_Update_File(AMessage,AExt){
	var iHeight = 130;
	var iWidth = 500;
	var sIcon = sTxIcon;
	var sHeader = Get_RS("RS_Confirm");
	var sParams = "?sMessage="+AMessage+"&sExt="+AExt;
	Initialise_Popup('dhxPopup_Unlock_Document_And_Update_File','../../code/asp/Popup_Unlock_Document_And_Update_File.asp'+sParams,sHeader,iWidth,iHeight,sIcon,true,true);
}
	function Close_Popup_Unlock_Document_And_Update_File(){
		Close_Popup('dhxPopup_Unlock_Document_And_Update_File');
	}
	
	function Unlock_Document_And_Update_File(){
		new J.ajax({
			url:"../../code/asp/ajax/actions_toolbar.asp",
			async: false,
			cache: false,
			dataType:"script",
			data:{
				sFunction_Name:"Unlock_Document_And_Update_File",
				sFilename:"",
				sPath_File:"",
				bYes:false
			}
		});
	}