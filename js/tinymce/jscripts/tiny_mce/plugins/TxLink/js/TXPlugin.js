// /* Functions for the advlink plugin popup */

tinyMCEPopup.requireLangPack();

function init() {
	tinyMCEPopup.resizeToInnerSize();
	var inst = tinyMCEPopup.editor;
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
		var sOnclick = inst.dom.getAttrib(elm,'onclick');
		sOnclick = sOnclick.substring(13,sOnclick.lenght);
		var id_object = reg.exec(sOnclick);
		J("#ID_Object").val(id_object);
		var text = inst.dom.getAttrib(elm,'object_name');
		if (text == ""){
			text = Get_Text_Selected();
		}		
		J("#entityText").val(text);
	} else {
		var Selected_Text = Get_Text_Selected();
		if (Selected_Text != "") J("#entityText").val(Selected_Text);
	}
	formObj.insert.value = tinyMCEPopup.getLang(action, 'Insert', true); 
}

function Get_Text_Selected(){
	var inst2 = tinyMCEPopup.editor;
	 var elm2 = inst2.selection.getNode();
	var selEditor = inst2.selection;
	var sValue = selEditor.getContent({format: 'text'});
	return Replace_From_XML(sValue);	
}

function insertAction() {
	tinyMCEPopup.resizeToInnerSize();
	var inst = tinyMCEPopup.editor;
	var elm = inst.selection.getNode();
	
	var popupText = document.getElementById("entityText").value;
	if (popupText == ""){
		alert(Get_RS("RS_TinyMCE_No_Title"));
	} else {
		var id_object = document.getElementById("ID_Object").value;
		var href = "#";	
		// var onClickAction = "Form_Get_Display_Node("+id_object+",'["+popupText+"]');";
		var onClickAction = "navigation(0,"+id_object+",'read_form');";
		var onMouseOverAction = "this.style.cursor='hand';";

		elm = inst.dom.getParent(elm, "A");
		if (elm == null) {
			var elementCreated = inst.dom.create("A", {href:href, id_object:id_object, onclick:onClickAction, onmouseover:onMouseOverAction , object_name:popupText}, popupText);
			tinyMCE.activeEditor.selection.setNode(elementCreated);
		}else{
			var newElement = inst.dom.create("A", {href:href, id_object:id_object, onclick:onClickAction, onmouseover:onMouseOverAction, object_name:popupText}, popupText);
			var elementU = inst.dom.replace(newElement, elm);
		}
		tinyMCEPopup.close();
	}
}

tinyMCEPopup.onInit.add(init);
