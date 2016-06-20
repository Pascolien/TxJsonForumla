var ID_OT_Current = 0;
var ID_Object_Checked = "";

var rTree;
var rCombo;

var Current_Tab;
var sLabel;
var bSearchObject = false;

// Initializing DHTMLX tabbar for inserting links
function Int_Tabs(){
	tabbar=new dhtmlXTabBar("a_tabbar","top");
	tabbar.setImagePath("../../../resources/theme/img/dhtmlx/tabbar/");
	tabbar.enableAutoSize(true,true); 
	tabbar.addTab("tab1",RS_Tab1,"100px");
	tabbar.addTab("tab2",RS_Tab2,"100px");
	tabbar.setContent("tab1","a1");
	tabbar.setContent("tab2","a2");
	tabbar.setTabActive("tab1");		
	Current_Tab = "a1";
	tabbar.attachEvent("onTabClick", function(id){
		if (id=="tab2") {
			Current_Tab = "a2";
			var ed = parent.tinymce.activeEditor.windowManager.windows[0];
			var width = '650';
			var height = '200';
			ed.resizeTo(width,height); 
			document.getElementById("table").style.marginRight = "13px";
		}
		
		if (id=="tab1") { 
			Current_Tab = "a1";
			var ed = parent.tinymce.activeEditor.windowManager.windows[0];
			var width = '650';
			var height = '410';
			ed.resizeTo(width,height); 
			document.getElementById("table").style.marginRight = "12px";
		}	
	});			
}

// Load informations about the link
function init() {
	var inst =parent.tinymce.activeEditor;
	var elm = inst.selection.getNode();
	var formObj = document.forms[0];
	var action = "insert";
	elm = inst.dom.getParent(elm, "A"); //retourne le lien du noeud
	//set up popup element when update.
	if (elm == null) {
		var prospect = inst.dom.create("p", null, "test");
		if (prospect.childNodes.length === 1) {
			elm = prospect.firstChild;
		}
	}
	if (elm != null && elm.nodeName == "A") {
		var action = "update";
		var reg=new RegExp("[0-9]+");
		var sHref = inst.dom.getAttrib(elm, 'href');
		ID_Object_Checked = "" + reg.exec(sHref);
		var ID_OT;
		if (ID_Object_Checked != null) {
		    ID_OT = Get_Object_ID_OT(ID_Object_Checked);
		    ID_OT_Current = ID_OT;
		}
		
		// Get parameters of internal link 
		sLabel = inst.dom.getAttrib(elm,'object_name');
		if (sLabel == ""){
			sLabel= Get_Text_Selected();
		}	
		
		if (typeof ID_Object_Checked != "undefined")  {
			J("#entityText").val(sLabel);
			J("#ID_Object").val(ID_Object_Checked);
		}
		
		
		// Get parameters of  external link
		var text2 = inst.dom.getAttrib(elm,'object_name');
		var text3 = inst.dom.getAttrib(elm,'href');
		var text4 = inst.dom.getAttrib(elm,'target');
		if (text2 == "" ){
			text2 = Get_Text_Selected();
		}		
	
		if  (text4 == "_blank"  ){
			tabbar.setTabActive("tab2");	
			J("#entityText2").val(text2);	
			J("#URL").val(text3);	
		}	 
	} else {
		var Selected_Text = Get_Text_Selected();

		if (Selected_Text != "") J("#entityText").val(Selected_Text);
		if (Selected_Text != "") J("#entityText2").val(Selected_Text);
	}
	// formObj.insert.value = parent.tinymce.activeEditor.getLang(action, 'InsertInternalLink', true); 
	// formObj.insert.value = parent.tinymce.activeEditor.getLang(action, 'InsertExternalLink', true); 
}

	function Get_Text_Selected(){
		var inst2 =parent.tinymce.activeEditor;
		var elm2 = inst2.selection.getNode();
		var selEditor = inst2.selection;
		var sValue = selEditor.getContent({format: 'text'});
		return Replace_From_XML(sValue);	
	}

// Close the tinymce popup
function CloseTinyPop(){
	parent.tinymce.activeEditor.windowManager.windows[0].close();
}

// Condition on the link
function insertLink() {	
	if (Current_Tab == "a1") {
		insertInternalLink();
	} else {
		insertExternalLink();
	}	
}	

//Generate internal link and insert the link into the editor
function insertInternalLink() {
	// var insert_url = '<a href="www.google.fr ">'+ document.getElementById("entityText").value+'</a>';
	var elm= parent.tinymce.activeEditor.selection.getNode()			
	 
	// var ID_Object = document.getElementById("ID_Object").value;
	var ID_Object = rTree.getObjectChecked();
	var ID_OT = rCombo.getObjectSelected();
	if (ID_OT == 0) {
		ID_OT = Get_Object_ID_OT(ID_Object,"../");
	}
	var LinkName = J("#entityText").val();
	var hrefNav = "../../temp_resources/portals/navigation.asp?ID_Obj="+ID_Object;		
	var onMouseOverAction = "this.style.cursor='hand';";
	
	elm2 = parent.tinymce.activeEditor.dom.getParent(elm, 'a');
	if (elm2 == null) {
		//ça, ça fonctionne
		//var elementCreated = parent.tinymce.activeEditor.dom.create('a', {href: hrefNav, title: 'some title'},LinkName);
		var elementCreated = parent.tinymce.activeEditor.dom.create('a', {href: hrefNav,'id_object':ID_Object, 'onmouseover':onMouseOverAction, 'target':'frame_blanc', 'object_name':LinkName, 'ID_OT':ID_OT},LinkName);
		parent.tinymce.activeEditor.selection.setNode(elementCreated);
	}else{
		var newElement = parent.tinymce.activeEditor.dom.create('a', {href:hrefNav, 'id_object':ID_Object, 'onmouseover':onMouseOverAction, 'target':'frame_blanc', 'object_name':LinkName, 'ID_OT':ID_OT}, LinkName);
		parent.tinymce.activeEditor.dom.replace(newElement, elm2);
	}
	 CloseTinyPop();
}

//Generate external link and insert the link into the editor
function insertExternalLink() {
	// var insert_url = '<a href="www.google.fr ">'+ document.getElementById("entityText").value+'</a>';
	var elm = parent.tinymce.activeEditor.selection.getNode()			
	 

	var LinkName = document.getElementById("entityText2").value;
	var hrefNav =  document.getElementById("URL").value;
	var onMouseOverAction = "this.style.cursor='hand';";
	
	elm2 = parent.tinymce.activeEditor.dom.getParent(elm, 'a');
	if (elm2 == null) {
		//ça, ça fonctionne
		//var elementCreated = parent.tinymce.activeEditor.dom.create('a', {href: hrefNav, title: 'some title'},LinkName);
		var elementCreated = parent.tinymce.activeEditor.dom.createHTML('a', {href: hrefNav, 'object_name':LinkName, 'target':'_blank'},LinkName);
		parent.tinymce.activeEditor.selection.setContent(elementCreated);
	} else {
		var newElement = parent.tinymce.activeEditor.dom.create('a', {href:hrefNav,  'object_name':LinkName, 'target':'_blank'}, LinkName);
		parent.tinymce.activeEditor.dom.replace(newElement, elm2);
	}
	 CloseTinyPop();
}
	
// Initialize Tree 
function TreeInit(){
	Initialize_TxWebCombo();
	Initialize_TxWebTree();
	
	var sValueSearch = J("#entityText").val();
	
	if (!ID_Object_Checked && sValueSearch)
		bSearchObject = true;

	rCombo = Add_ComboOT("id_div_combo", 463, 200, true, false, false, true, "Toute la base", ID_OT_Current);
	HandleComboOnChange();
}
	
function HandleComboOnChange() {
    if (rTree != null) {
        rTree.destructor();
    }
		
    ID_OT = rCombo.getObjectSelected();
	if (ID_OT == 0){
	    //cas de l'arbre dans toute la base
	    rTree = Add_ObjTree(ID_OT, "id_div_tree", "id_div_toolbar", 2, 0, 1)
	    var sValueSearch = J("#entityText").val();
		if (bSearchObject){
			//apply search
		    rTree.getTree().attachEvent("onXLE", function () {
				if (bSearchObject){
					bSearchObject = false;
					rTree.searchValue(sValueSearch);					
				}
				rTree.getToolbar().hideItem("treeview");
			});
		} else {
		    rTree.getTree().attachEvent("onXLE", function () {
		        rTree.getToolbar().hideItem("treeview");
		    });
		}
	} else {
	    rTree = Add_ObjTree(ID_OT, "id_div_tree", "id_div_toolbar", 2, 1, 1, ID_Object_Checked);
	    ID_Object_Checked = '';
	}
	rTree.handleEventOnCheck(TreeOnCheck);
}

function TreeOnCheck() {
    sObjectChecked = rTree.getObjectChecked();
    if (J("#entityText").val() == "" && sObjectChecked != '')
        J("#entityText").val(rTree.getObjectCheckedName());
	
	ID_Object_Checked = "";
}
