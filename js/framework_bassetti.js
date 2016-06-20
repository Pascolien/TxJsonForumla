var teexma_mode;
var dhxPopup;
var dhxWins;
var ID_Cell_Layout_Form = 2;

function Popup_Confirm(ATitle, AMessage, AConfirm, ACancel, AConfirm_Function) {
    dhtmlx.confirm({
        title: ATitle,
        text: AMessage,
        ok: AConfirm,
        cancel: ACancel,
        callback: function (result) {
            if (result) {
                if (AConfirm_Function) {
                    eval(AConfirm_Function);
                }
            }
        }
    });
}

function Popup_Error(AMessage, AFunction) {
    dhtmlx.alert({
        title: "Error!",
        type: "alert-error",
        text: AMessage,
        callback: function () {
            if (AFunction) {
                eval(AFunction);
            }
        }
    });
}

function Popup_Alert(AMessage, AFunctionCallBack) {
    dhtmlx.alert({
        text: AMessage,
        callback: function () {
            if (AFunctionCallBack) {
                eval(AFunctionCallBack);
            }
        }
    });
}

function Get_Object_ID_OT(AID_Object) {
    var ID_OT;
    new J.ajax({
        url: '/code/asp/framework_bassetti.asp',
        async: false,
        cache: false,
        data: {
            sFunction_Name: "Get_Object_ID_OT",
            ID_Object: AID_Object
        },
        success: function (data) {
            ID_OT = parseInt(data);
        }
    });
    return ID_OT;
}

function Hide_BrowseButtonTranslatedForIe8() {
    if (Check_IE()) {
        J("#id_btn_upload_file_fictive").css("display", "none");
        J("#id_label_input_file").css("display", "none");
        J("#upload_file").css("display", "block");
    }
}

function ReplaceWithoutAccents(AString) {
    var r = AString.toLowerCase();
    r = r.replace(new RegExp(/\|/g), "");
    r = r.replace(new RegExp(/[àáâãäå]/g), "a");
    r = r.replace(new RegExp(/æ/g), "ae");
    r = r.replace(new RegExp(/ç/g), "c");
    r = r.replace(new RegExp(/[èéêë]/g), "e");
    r = r.replace(new RegExp(/[ìíîï]/g), "i");
    r = r.replace(new RegExp(/ñ/g), "n");
    r = r.replace(new RegExp(/[òóôõö]/g), "o");
    r = r.replace(new RegExp(/œ/g), "oe");
    r = r.replace(new RegExp(/[ùúûü]/g), "u");
    r = r.replace(new RegExp(/[ýÿ]/g), "y");
    return r;
};

function Set_Hash(AID) {
    location.hash = AID;
}

function Initialize_User_Info(ALogin, AConnection_Date) {
    J("#id_div_login").html(ALogin);
    J("#id_div_connexion_date").html(AConnection_Date);
}

function Focus_Element(AElement_Name) {
    J("#" + AElement_Name).focus();
}

function Get_Parent_Frame(AExcept_Popup_Name) {
    var sExcept_Popup_Name = AExcept_Popup_Name;
    if (!sExcept_Popup_Name)
        sExcept_Popup_Name = "";
    var rFrame;
    var sPopup_Name = "";
    if (parent.dhxWins.window("dhxPopup_Information") && sExcept_Popup_Name != "dhxPopup_Information")
        sPopup_Name = "dhxPopup_Information";
    else if (parent.dhxWins.window("dhxPopup_Source") && sExcept_Popup_Name != "dhxPopup_Source")
        sPopup_Name = "dhxPopup_Source";
    else if (parent.dhxWins.window("dhxPopup_Advanced_Creation") && sExcept_Popup_Name != "dhxPopup_Advanced_Creation")
        sPopup_Name = "dhxPopup_Advanced_Creation";
    else if (parent.dhxWins.window("dhxPopup_Associatives") && sExcept_Popup_Name != "dhxPopup_Associatives")
        sPopup_Name = "dhxPopup_Associatives";
    else if (parent.dhxWins.window("dhxPopup_Form") && sExcept_Popup_Name != "dhxPopup_Form")
        sPopup_Name = "dhxPopup_Form";

    if (sPopup_Name != "")
        rFrame = parent.dhxWins.window(sPopup_Name).getFrame();

    if (rFrame)
        return rFrame.contentWindow;
    else
        return parent;
}

function Get_Time_Zone_Offset() {
    var current_date = new Date();
    var gmt_offset = current_date.getTimezoneOffset() / 60;
    return gmt_offset;
}

function DateStrToFloat(ADate, ATime, ATarget) {
    if (ADate == null)
        return 0;

    sTarget = ATarget;
    if (!sTarget)
        sTarget = "";

    var fDate = 0;
    var sFormated_Date = ADate.getDate() + "|" + (ADate.getMonth() + 1) + "|" + ADate.getFullYear();

    if (ATime) {
        sFormated_Date = sFormated_Date + "|" + ADate.getHours() + "|" + ADate.getMinutes() + "|" + ADate.getSeconds();
    }
    new J.ajax({
        url: sTarget + "../../code/asp/framework_bassetti.asp",
        async: false,
        cache: false,
        dataType: 'html',
        data: {
            sFunction_Name: "DateStrToFloat",
            sValue: sFormated_Date,
            bTime: ATime
        },
        success: function (AData) {
            fDate = AData;
        }
    });
    return fDate;
}

function Get_ID_OT_Portal() {
    var ID_OT_Portal = 0;
    new J.ajax({
        url: '../../code/asp/ajax/common.asp',
        async: false,
        cache: false,
        dataType: 'html',
        data: {
            sFunction_Name: "Get_ID_OT_Portal"
        },
        success: function (data) {
            ID_OT_Portal = data;
        }
    });
    return ID_OT_Portal;
}

function Get_Selected_Object_ID_Icon() {
    var ID_Icon;
    new J.ajax({
        url: "../../code/asp/ajax/common.asp",
        dataType: 'html',
        async: false,
        cache: false,
        data: {
            sFunction_Name: "Get_Selected_Object_ID_Icon"
        },
        success: function (data) {
            ID_Icon = data;
        }
    });
    return ID_Icon;
}

function Extract_File_Name(APath) {
    if (APath.substr(0, 12) == "C:\\fakepath\\")
        return APath.substr(12); // modern browser
    var x;
    x = APath.lastIndexOf('/');
    if (x >= 0) // Unix-based path
        return APath.substr(x + 1);
    x = APath.lastIndexOf('\\');
    if (x >= 0) // Windows-based path
        return APath.substr(x + 1);
    return APath; // just the filename
}

function Check_Write_Mode() {
    var bWrite = false;
    try {
        bWrite = TxMain_Toolbar.isVisible("mWriteMode");
    } catch (e) {
        try {
            bWrite = parent.TxMain_Toolbar.isVisible("mWriteMode");
        } catch (e) { }
    }
    return bWrite;
}

function Launch_Polyspot_Search(AUrl) {
    sUrl = AUrl + J("#id_inp_keyword").val();
    J("#id_form_polyspot").attr("action", sUrl);
    J("#id_form_polyspot").submit();
}

function isNumber(value) {
    if ((undefined === value) || (null === value)) {
        return false;
    }
    if (typeof value == 'number') {
        return true;
    }
    return !isNaN(value - 0);
}

function isInt(value) {
    return (parseFloat(value) == parseInt(value)) && !isNaN(value);
}

function isFloat(value) {
    value = value.replace(",", ".");
    return parseFloat(value) && !isNaN(value);
}

function Init_Popup(AURL, AHeader, AWidth, AHeight, AIcon, AActive_Btn_Size, APopup_Name) {
    dhxWins = new dhtmlXWindows();
    sPopup_Name = "w1";
    if (APopup_Name)
        sPopup_Name = APopup_Name;
    dhxWins.createWindow(sPopup_Name, 0, 0, AWidth, AHeight);
    dhxWins.setImagePath('../../resources/theme/img/dhtmlx/windows/');
    dhxWins.setSkin("dhx_skyblue");
    dhxPopup = dhxWins.window(sPopup_Name);
    if (AIcon != "") dhxPopup.setIcon("../../../" + AIcon);
    dhxPopup.button("park").hide();
    dhxPopup.attachURL(AURL);
    dhxPopup.centerOnScreen();
    dhxPopup.setModal(true);
    dhxPopup.keepInViewport(true);
    if (!AActive_Btn_Size) {
        dhxPopup.button("minmax1").hide();
        dhxPopup.button("minmax2").hide();
    }
    dhxPopup.setText(AHeader);
}

function resizeHeight(AHeight) {
    return (window.innerHeight < AHeight) ? window.innerHeight - 50 : AHeight;
}

function resizeWidth(AWidth) {
    return (window.innerWidth < AWidth) ? window.innerWidth - 50 : AWidth;
}

function Initialise_Popup(APopup_Name, AURL, AHeader, AWidth, AHeight, AIcon_Path, ADeny_Resize, AModal, AReduce, ANew_Container) {
    var rMain_DhxPopup;
    if (parent.dhxWins) {
        rMain_DhxPopup = parent.dhxWins;
    } else if (dhxWins) {
        rMain_DhxPopup = dhxWins;
    } else {
        dhxWins = new dhtmlXWindows();
        dhxWins.setImagePath('../../resources/theme/img/dhtmlx/windows/');
        dhxWins.setSkin("dhx_skyblue");
        rMain_DhxPopup = dhxWins;
    }
    if (!rMain_DhxPopup.window(APopup_Name)) {
        rMain_DhxPopup.createWindow(APopup_Name, 0, 0, AWidth, AHeight);
    } else {
        rMain_DhxPopup.window(APopup_Name).show();
    }
    dhxPopup = rMain_DhxPopup.window(APopup_Name);
    if (AIcon_Path != "")
        dhxPopup.setIcon("../../../../../" + AIcon_Path);
    dhxPopup.button("park").hide();
    dhxPopup.attachURL(AURL);
    dhxPopup.centerOnScreen();
    dhxPopup.setModal(AModal);
    if (ADeny_Resize) {
        dhxPopup.denyResize();
        dhxPopup.button("minmax1").hide();
    }
    if (AReduce) {
        dhxPopup.button("park").show();
    }
    dhxPopup.setText(AHeader);
}

function Get_Object_Name(AID_Object) {
    var sObject_Name;
    new J.ajax({
        url: 'ajax/common.asp',
        dataType: 'html',
        async: false,
        cache: false,
        data: {
            sFunction_Name: "Get_Object_Name",
            id_object: AID_Object
        },
        success: function (data) {
            sObject_Name = data;
        }
    });
    return sObject_Name;
}

function StrToArray(AStr, ASeparator) {
    if (!ASeparator)
        ASeparator = "|";

    iNB_Carac = Get_NB_Carac_In_Str(ASeparator, AStr);
    sStr_Temp = AStr;
    array = new Array;
    for (var i = 0 ; i < iNB_Carac; i++) {
        iIndex = sStr_Temp.indexOf(ASeparator, 0);
        sValue = sStr_Temp.substring(0, iIndex);
        sStr_Temp = sStr_Temp.substring(iIndex + 1, sStr_Temp.length);
        array.push(sValue);
    }
    array.push(sStr_Temp);
    return array;
}

function Get_NB_Carac_In_Str(ACarac, AStr) {
    sStr_Temp = AStr.split(ACarac);
    return sStr_Temp.length - 1;
}

function Is() {
    var agent = navigator.userAgent.toLowerCase();
    this.major = parseInt(navigator.appVersion);
    this.minor = parseFloat(navigator.appVersion);
    this.ns = ((agent.indexOf('mozilla') != -1) &&
		(agent.indexOf('spoofer') == -1) &&
		(agent.indexOf('compatible') == -1) &&
		(agent.indexOf('opera') == -1) &&
		(agent.indexOf('webtv') == -1) &&
		(agent.indexOf('hotjava') == -1));
    this.ns2 = (this.ns && (this.major == 2));
    this.ns3 = (this.ns && (this.major == 3));
    this.ns4 = (this.ns && (this.major == 4));
    this.ns6 = (this.ns && (this.major >= 5));
    this.ie = ((agent.indexOf("msie") != -1) &&
		(agent.indexOf("opera") == -1));
    this.ie3 = (this.ie && (this.major < 4));
    this.ie4 = (this.ie && (this.major == 4) &&
		(agent.indexOf("msie 4") != -1));
    this.ie5 = (this.ie && (this.major == 4) &&
		(agent.indexOf("msie 5.") != -1) &&
		(agent.indexOf("msie 5.5") == -1) &&
		(agent.indexOf("mac") == -1));
    this.iem5 = (this.ie && (this.major == 4) &&
		(agent.indexOf("msie 5.") != -1) &&
		(agent.indexOf("mac") != -1));
    this.ie55 = (this.ie && (this.major == 4) &&
		(agent.indexOf("msie 5.5") != -1));
    this.ie6 = (this.ie && (this.major == 4) &&
		(agent.indexOf("msie 6.") != -1));
    this.ie7 = (this.ie && (this.major == 4) &&
		(agent.indexOf("msie 7.0b") != -1));
    this.nsdom = (this.ns4 || this.ns6);
    this.ie5dom = (this.ie5 || this.iem5 || this.ie55);
    this.iedom = (this.ie4 || this.ie5dom || this.ie6);
    this.w3dom = (this.ns6 || this.ie6 || this.ie7);
}

function isIE(version, comparison) {
    var div = J('<div style="display:none;"/>').appendTo(J('body'));
    div.html('<!--[if ' + (comparison || '') + ' IE ' + (version || '') + ']><a>&nbsp;</a><![endif]-->');
    var ieTest = div.find('a').length;
    div.remove();
    return ieTest;
}

function Check_Number(AString) {
    return /\d/.test(AString);
}

function Check_IE() {
    if (navigator.appName == 'Microsoft Internet Explorer') return true;
    else if (navigator.userAgent.indexOf('Trident') != -1) return true;
    else return false;
}

function Get_RS(ARS) {
    var RS_return;
    new J.ajax({
        url: '../../code/asp/ajax/actions_otherFunctions.asp',
        async: false,
        cache: false,
        data: {
            sFunction_Name: "Get_RS",
            RS: ARS
        },
        success: function (data) {
            RS_return = data;
        }
    });
    return RS_return;
}

function Execute_Model_Applications(AID_Attribute, AID_Obj, AID_OT) {
    new J.ajax({
        url: '../../code/asp/execute_model_application.asp',
        async: false,
        cache: false,
        dataType: 'script',
        data: {
            id_attribute: AID_Attribute,
            id_object: AID_Obj,
            id_ot: AID_OT
        }
    });
}

function Get_Waiting_Message(AMessage, AID_Div) {
    new J.ajax({
        url: '../../code/asp/ajax/loading_in_progress.asp',
        cache: false,
        data: {
            loading_message: AMessage
        },
        success: function (data) {
            J('#' + AID_Div).html(data);
        }
    });
}

function Set_OnClick(AID, AOnClick, APrev) {
    //obj = document.getElementById(AID);
    obj = J('#' + AID);
    if (Check_IE()) {
        obj.onclick = function () {
            Browsing_Navigation(APrev);
        };
    } else {
        //obj.setAttribute("onclick", AOnClick );
        obj.attr("onclick", AOnClick);
    }
}

function Initialize_Form() {

}

function Initialize_Interface() {

}

function Get_IE_Version() {
    var agent = navigator.userAgent.toLowerCase();
    if (agent.indexOf("msie") == -1) return 0;
    if (agent.indexOf("msie 5.") != -1) return 5;
    if (agent.indexOf("msie 6.") != -1) return 6;
    if (agent.indexOf("msie 7.") != -1) return 7;
    if (agent.indexOf("msie 8.") != -1) return 8;
    if (agent.indexOf("msie 9.") != -1) return 9;
    if (agent.indexOf("msie 10.") != -1) return 10;
    if (agent.indexOf("msie 11.") != -1) return 11;
}

function Init_IE_Version() {
    IE_Version = Get_IE_Version();
    if (IE_Version != 0) {
        new J.ajax({
            url: '../../code/asp/ajax/actions_menu.asp',
            async: false,
            cache: false,
            dataType: 'script',
            data: { sFunction_Name: "Set_IE_Version", ie_version: IE_Version }
        });
    }
}

function Initialize_Navigator_Mode() {
    var IE;
    if (Check_IE()) {
        IE = true;
    } else {
        IE = false;
    }
    new J.ajax({
        url: '../../code/asp/ajax/actions_menu.asp',
        async: false,
        cache: false,
        dataType: 'script',
        data: { sFunction_Name: "Set_Navigator_Mode", is_ie: IE, ie_version: Get_IE_Version() }
    });
}

function Get_Help_Activate_Popup(ALanguage) {
    var sBrowser_Agent = navigator.userAgent.toLowerCase();

    if (sBrowser_Agent.search(/chrome\//) != -1) {
        window.open('../../code/asp/activation_popup_chrome_' + ALanguage + '.htm', '_blank');
    } else if (Check_IE()) {
        window.open('../../code/asp/activation_popup_ie_' + ALanguage + '.htm', '_blank');
    } else {
        window.open('../../code/asp/activation_popup_firefox_' + ALanguage + '.htm', '_blank');
    }
}

function Check_Popup_Allowed() {
    var w = window.open('popupcheck.html', 'popup', "width=1, height=1, toolbar=no, top=3000px, left=3000, menubar=no, scrollbars=no, resizable=0");
    var mybrsAgent = navigator.userAgent.toLowerCase();
    if (w) {
        if (mybrsAgent.search(/chrome\//) != -1) {
            w.onload = function () {
                setTimeout(function () {
                    if (w.screenX === 0) {
                        // popup interdit
                        J("#Login_Message").css("display", "block");
                        J("#LM_Popup_Blocked").css("display", "block");
                    } else {
                        // popup autorisé
                        w.close();
                        returnValue(true);
                    }
                }, 0);
            };
        } else {
            w.close();
            returnValue(true);
        }
    } else {
        returnValue(false);
    }
}

function returnValue(arg) {
    if (arg) {
        J("#Login_Message").css("display", "none");
        J("#LM_Popup_Blocked").css("display", "none");
    } else {
        J("#Login_Message").css("display", "block");
        J("#LM_Popup_Blocked").css("display", "block");
    }
}

function Open_File(AFile_Name) {
    if (parent) {
        parent.frames['frame_blanc'].location.replace("../../code/asp/ajax/open_file.asp?file=" + AFile_Name + "");
    } else if (window.parent.opener.parent.frames['frame_blanc']) {
        window.parent.opener.parent.frames['frame_blanc'].location.replace("../../code/asp/ajax/open_file.asp?file=" + AFile_Name + "");
    } else if (window.parent.opener.parent.opener.parent.frames['frame_blanc']) {
        window.parent.opener.parent.opener.parent.frames['frame_blanc'].location.replace("../asp/ajax/open_file.asp?file=" + AFile_Name + "");
    } else if (window.parent.opener.parent.opener.parent.opener.parent.frames['frame_blanc']) {
        window.parent.opener.parent.opener.parent.opener.parent.frames['frame_blanc'].location.replace("../asp/ajax/open_file.asp?file=" + AFile_Name + "");
    } else {
        window.parent.opener.parent.opener.parent.opener.parent.location.replace("../asp/ajax/open_file.asp?file=" + AFile_Name + "");
    }
}

function Add_Toolbar_Button(AID, ARank, AOnClick, AImg_Src, ATooltip) {
    TxMain_Toolbar.addButton(AID, ARank, "", AImg_Src, "");
    TxMain_Toolbar.setItemToolTip(AID, ATooltip);
    TxMain_Toolbar.attachEvent("onClick", function (AID_Item) {
        if (AID_Item == AID)
            eval(AOnClick);
    });
}

function Resize_Div(ADiv_Name, AMargin_Width, AMargin_Height) {
    J(document).ready(function () {
        J("#" + ADiv_Name).width(J(window).width() - AMargin_Width);
        J("#" + ADiv_Name).height(J(window).height() - AMargin_Height);
        J(window).resize(function () {
            J("#" + ADiv_Name).width(J(window).width() - AMargin_Width);
            J("#" + ADiv_Name).height(J(window).height() - AMargin_Height);
        });
    });
}

function Hide_User_Info() {
    J("#id_div_navigation").click(function () {
        if (J("#user_content").css("display") == "block") Menu_Display_User_Info();
    });
    J("#id_div_banner").click(function () {
        if (J("#user_content").css("display") == "block") Menu_Display_User_Info();
    });
    J("#id_div_form").click(function () {
        if (J("#user_content").css("display") == "block") Menu_Display_User_Info();
    });
}

function TXLog(AMessage) {
    // if (Check_IE()) {
    // alert(AMessage);
    // } else {
    //console.log(AMessage);
    // }		
}

// Fonction permettant de renvoyer une chaine
// avec le remplacement des "%s" par les textes envoyés en paramètre
function text_param(text, params) {
    var tab_param = params.split("|");
    var tab_text = text.split("%s");
    reponse = "";
    for (var i = 0; i < tab_text.length - 1; i++) {
        reponse = reponse + tab_text[i] + tab_param[i];
    }
    return reponse + tab_text[i];
}

function Replace_For_URL(AString) {
    var sValue = AString;
    sValue = sValue.replace(/%/g, "%25");
    sValue = sValue.replace(/#/g, "%23");
    sValue = sValue.replace(/&/g, "%26");
    sValue = sValue.replace(/\+/g, "%2B");
    sValue = sValue.replace(/ /g, "%20");
    sValue = sValue.replace(/!/g, "%21");
    sValue = sValue.replace(/"/g, "%22");
    sValue = sValue.replace(/'/g, "%27");
    sValue = sValue.replace(/\(/g, "%28");
    sValue = sValue.replace(/\)/g, "%29");
    sValue = sValue.replace(/\*/g, "%2A");
    sValue = sValue.replace(/,/g, "%2C");
    sValue = sValue.replace(/-/g, "%2D");
    sValue = sValue.replace(/\//g, "%2F");
    sValue = sValue.replace(/:/g, "%3A");
    sValue = sValue.replace(/;/g, "%3B");
    sValue = sValue.replace(/</g, "%3C");
    sValue = sValue.replace(/=/g, "%3D");
    sValue = sValue.replace(/>/g, "%3E");
    sValue = sValue.replace(/\?/g, "%3F");
    sValue = sValue.replace(/@/g, "%40");
    sValue = sValue.replace(/\[/g, "%5B");
    sValue = sValue.replace(/\\/g, "%5C");
    sValue = sValue.replace(/\]/g, "%5D");
    sValue = sValue.replace(/\^/g, "%5E");
    sValue = sValue.replace(/_/g, "%5F");
    sValue = sValue.replace(/`/g, "%60");
    sValue = sValue.replace(/\{/g, "%7B");
    sValue = sValue.replace(/\|/g, "%7C");
    sValue = sValue.replace(/\}/g, "%7D");
    sValue = sValue.replace(/~/g, "%7E");
    return sValue;
}

function Replace_From_XML(AString) {
    var sValue = AString;
    sValue = sValue.replace(/&amp;/g, "&");
    sValue = sValue.replace(/&quot;/g, '"');
    sValue = sValue.replace(/&Aacute;/g, "Á");
    sValue = sValue.replace(/&Acirc;/g, "Â");
    sValue = sValue.replace(/&Agrave;/g, "À");
    sValue = sValue.replace(/&Aring;/g, "Å");
    sValue = sValue.replace(/&Atilde;/g, "Ã");
    sValue = sValue.replace(/&Auml;/g, "Ä");
    sValue = sValue.replace(/&AElig;/g, "Æ");
    sValue = sValue.replace(/&aacute;/g, "á");
    sValue = sValue.replace(/&acirc;/g, "â");
    sValue = sValue.replace(/&agrave;/g, "à");
    sValue = sValue.replace(/&aring;/g, "å");
    sValue = sValue.replace(/&atilde;/g, "ã");
    sValue = sValue.replace(/&auml;/g, "ä");
    sValue = sValue.replace(/&aelig;/g, "æ");
    sValue = sValue.replace(/&eacute;/g, "é");
    sValue = sValue.replace(/&ecirc;/g, "ê");
    sValue = sValue.replace(/&egrave;/g, "è");
    sValue = sValue.replace(/&euml;/g, "ë");
    sValue = sValue.replace(/&iacute;/g, "í");
    sValue = sValue.replace(/&icirc;/g, "î");
    sValue = sValue.replace(/&igrave;/g, "ì");
    sValue = sValue.replace(/&iuml;/g, "ï");
    sValue = sValue.replace(/&oacute;/g, "ó");
    sValue = sValue.replace(/&ocirc;/g, "ô");
    sValue = sValue.replace(/&ograve;/g, "ò");
    sValue = sValue.replace(/&otilde;/g, "õ");
    sValue = sValue.replace(/&ouml;/g, "ö");
    sValue = sValue.replace(/&uacute;/g, "ú");
    sValue = sValue.replace(/&ucirc;/g, "û");
    sValue = sValue.replace(/&ugrave;/g, "ù");
    sValue = sValue.replace(/&uuml;/g, "ü");
    sValue = sValue.replace(/&ccedil;/g, "ç");
    sValue = sValue.replace(/&lt;/g, "<");
    sValue = sValue.replace(/&gt;/g, ">");
    return sValue;
}

function Replace_From_URL(AString) {
    var sValue = AString;
    sValue = sValue.replace(/%23/g, "#");
    sValue = sValue.replace(/%26/g, "&");
    sValue = sValue.replace(/%2B/g, "+");
    sValue = sValue.replace(/%20/g, " ");
    sValue = sValue.replace(/%21/g, "!");
    sValue = sValue.replace(/%22/g, "\"");
    sValue = sValue.replace(/%27/g, "'");
    sValue = sValue.replace(/%28/g, "(");
    sValue = sValue.replace(/%29/g, ")");
    sValue = sValue.replace(/%2A/g, "*");
    sValue = sValue.replace(/%2C/g, ",");
    sValue = sValue.replace(/%2D/g, "-");
    sValue = sValue.replace(/%2F/g, "/");
    sValue = sValue.replace(/%3A/g, ":");
    sValue = sValue.replace(/%3B/g, ";");
    sValue = sValue.replace(/%3C/g, "<");
    sValue = sValue.replace(/%3D/g, "=");
    sValue = sValue.replace(/%3E/g, ">");
    sValue = sValue.replace(/%3F/g, "?");
    sValue = sValue.replace(/%40/g, "@");
    sValue = sValue.replace(/%5B/g, "[");
    sValue = sValue.replace(/%5C/g, "\\");
    sValue = sValue.replace(/%5D/g, "]");
    sValue = sValue.replace(/%5E/g, "^");
    sValue = sValue.replace(/%5F/g, "_");
    sValue = sValue.replace(/%60/g, "`");
    sValue = sValue.replace(/%7B/g, "{");
    sValue = sValue.replace(/%7C/g, "|");
    sValue = sValue.replace(/%7D/g, "}");
    sValue = sValue.replace(/%7E/g, "~");

    sValue = sValue.replace(/%25/g, "%");
    return sValue;
}

function escapeJsString(aValue) {
    aValue = aValue.replace(/\\/g,"\\\\");
    aValue = aValue.replace(/\"/g,"\\\"");
    aValue = aValue.replace(/'/g,"\\'");
    return aValue;
}

function Copy_To_Clipboard(AText) {
    if (window.clipboardData) { // IE  
        window.clipboardData.setData("Text", AText);
    }
    else {
        window.prompt(RS_CopyClipBoard, AText);
    }
}

function Delete_Item_From_List(liste, element) {
    element = ';' + element + ';';
    liste = ';' + liste + ';';
    var pos1 = liste.indexOf(element);
    if (pos1 >= 0) {
        return liste.substr(0, pos1) + ';' + liste.substr(pos1 + element.length, liste.length - (pos1 + element.length));
    } else {
        return liste;
    }
}

function AddObject_And_Write(AID_OT, AID_Parent, AName, AID_Advanced_Creation) {
    parent.Tree_Add_Object_And_Write(AID_OT, AID_Parent, AName, AID_Advanced_Creation);
}

function Get_ID_OT_From_Advanced_Creation(AID_Advanced_Creation) {
    var ID_OT;
    new J.ajax({
        url: '../asp/ajax/common.asp',
        dataType: 'html',
        async: false,
        cache: false,
        data: {
            sFunction_Name: "Get_ID_OT_From_Advanced_Creation",
            id_advanced_creation: AID_Advanced_Creation
        },
        success: function (data) {
            ID_OT = data;
        }
    });
    return ID_OT;
}

function Disabled_Part(APart_Name) {
    obj = J("#" + APart_Name);
    if (obj) {
        J('#' + APart_Name + ' *').attr('disabled', true);
    }
}

function Enabled_Part(APart_Name) {
    obj = J("#" + APart_Name);;
    if (obj) {
        J('#' + APart_Name + ' *').removeAttr('disabled');
    }
}

function start_model(AsID_Tree, id_model, td_model, chemin_relatif, aReloadForm) {
    if (Check_Write_Mode())
        enregistrement();

    if (td_model == 3) {
        window.parent.frames['frame_blanc'].location = '../../temp_resources/models/' + chemin_relatif;
    } else {
        sResult_Model = "";
        var date = new Date();
        new J.ajax({
            url: '../../code/asp/ajax/execute_model.asp',
            async: false,
            cache: false,
            dataType: 'html',
            data: {
                id_model: id_model,
                sid_tree: AsID_Tree,
                id_object: "",
                date: date
            },
            success: function (data) {
                sResult_Model = data;
            }
        });
        manageModelApplicationActions(sResult_Model, null, null, aReloadForm);
    }
}

function manageModelApplicationActions(aActions, aIdTree, aNewIdNode, aReloadForm) {
    if (aActions == "")
        return;
    jActions = JSON.parse(aActions);
    if (J.isArray(jActions))
        J.each(jActions, function (aIndex, aJsonObject) {
            manageModelApplicationAction(JSON.stringify(aJsonObject), aIdTree, aNewIdNode, aReloadForm);
        });
    else
        manageModelApplicationAction(aActions, aIdTree, aNewIdNode, aReloadForm);
}

function manageModelApplicationAction(aAction, aIdTree, aNewIdNode, aReloadForm) {
    function insertNewChild(aIdTree, aTargetedId, aId, aObjectName, aIdObject, aIcon) {
        rTree.insertNewChild(aTargetedId, aId, aObjectName, null, aIcon, aIcon, aIcon);
        rTree.selectItem(aId, true);
    }

    function focusNewChild(aIdTree, aTargetedId, aIdObjectToFocus, aSelect) {
        setTimeout(function () {
            sId = getSidFromTxId(aTargetedId, aIdObjectToFocus);
            rTree.selectItem(sId, true);
        }, 500);
    }

    function getSidFromTxId(aIdParent, aTxId) {
        sChildren = rTree.getAllSubItems(aIdParent);

        if (sChildren == "")
            return null;

        arrIdChildren = sChildren.split(',');
        for (var i = 0 ; i < arrIdChildren.length ; i++) {
            txId = rTree.getAttribute(arrIdChildren[i], "txId");
            if (txId == aTxId)
                return arrIdChildren[i];
        }
    }

    function moveObject(aId, aIdParent) {
        //find last item
        var arrChildren = rTree.getSubItems(aIdParent).split(",");
        var sTargetedId = arrChildren[arrChildren.length - 1];
        var sMode = "item_sibling_next";

        //sTargetedId = null;
        if (sTargetedId == "") {
            sMode = "item_child";
            sTargetedId = aIdParent;
        }

        //move item
        rTree.moveItem(aId, sMode, sTargetedId);
    }

    function deleteNodeFromId(aIdNode, aIdTree) {
        new J.ajax({
            url: '/code/asp/ajax/actions_tree.asp',
            async: false,
            cache: false,
            data: {
                sFunction_Name: "deleteNodeFromId",
                aIdTree: aIdTree,
                aIdNode: aIdNode
            }
        });
    }

    function removeAndFocus(aIdTree, aIdParent, aIdToDelete, aIdObject) {
        rTree.deleteItem(aIdToDelete);
        deleteNodeFromId(aIdToDelete, aIdTree);
        focusNewChild(aIdTree,aIdParent, aIdObject, true);
    }

    var jActions = JSON.parse(aAction),
        sIdTree = (aIdTree == null) ? "dhxTree_Nav" : aIdTree,
        rTree = eval(sIdTree),
        sMsg = jActions.sMsg == null ? "" : jActions.sMsg,
        idObject = jActions.idObject,
        idObjectRenamed = jActions.idObjectRenamed,
        sObjectName = jActions.sObjectName,
        sIdObject = (jActions.sIdObject == null) ? aNewIdNode : jActions.sIdObject,
        arrObjectsToOpen = jActions.objectsToOpen,
        sObjectNameToMove = jActions.sObjectNameToMove,
        sIcon = jActions.iIcon + ".png",
        bInserted = jActions.bInserted == null ? false : jActions.bInserted,
        sIdFolderGed = jActions.sIdFolderGed == null ? "" : jActions.sIdFolderGed,
        bAddFolderGed = jActions.bGed == null ? false : jActions.bGed && sIdFolderGed != "",
        bBusinessView = (jActions.bBusinessView == null) ? false : jActions.bBusinessView,
        bReloadForm = aReloadForm == null ? false : aReloadForm,
        idObjectToMove = jActions.idObjectToMove,
        bMove = idObjectToMove > 0,
        targetObject = null,
        sIdNext = bInserted ? rTree.getSelectedItemId() : "",
        bItemExist = rTree.getIndexById(sIdObject) != null,
        sIdSelected = "";

    // manage message to pop.
    if (sMsg != "") {
        Popup_Alert(sMsg);
        // todo : checked les autres paramètres avant de se casser ! 
        if (!sIdObject)
            return;
    }
    
    //manage move object
    if (arrObjectsToOpen != null) {
        targetObject = arrObjectsToOpen[arrObjectsToOpen.length - 1];
        bMove = rTree.getParentId(sIdObject) != targetObject.sIdObject;
    }
    //manage business view
    if (bBusinessView) {
        rTree.selectItem(sIdObject, false);
    }

    //manage ged and add folder attached
    if (bAddFolderGed) {
        //add folder at root with same name
        rTree.insertNewChild("0", sIdFolderGed, sObjectName, null, "folderClosed.gif", "folderOpen.gif", "folderClosed.gif");
        rTree.showItemCheckbox(sIdFolderGed, false);
    }

    if (bInserted && !bItemExist) {
        //case of insert an item
        sIdSelected = rTree.getSelectedItemId();

        if (targetObject == null)
            bInserted = true
        else
            bInserted = targetObject.sIdObject != null && targetObject.sIdObject == rTree.getParentId(sIdSelected);

        if (bInserted) {
            rTree.insertNewNext(sIdNext, sIdObject, sObjectName, null, sIcon, sIcon, sIcon);
            rTree.moveItem(sIdObject, 'up');
            rTree.selectItem(sIdObject, true);
            return;
        } else {
            //a move object application model is fired
            bMove = true;
        }
    }

    if (bMove) {
        //case of move item
        var bParentExist = rTree.getIndexById(targetObject.sIdObject) == null ? false : true;

        if (!bParentExist) {
            //reinit all tree navigation
            var sLastIdParentKnown = "";
            rTree.deleteItem(sIdObject);
            deleteNodeFromId(sIdObject, sIdTree);
            J.each(arrObjectsToOpen, function (aIndex, aJsonObject) {
                sIdToOpen = aJsonObject.sIdObject;

                if (sIdToOpen == null) {
                    sIdToOpen = getSidFromTxId(sLastIdParentKnown, aJsonObject.idObject);
                }
                sLastIdParentKnown = sIdToOpen;
                rTree.openItem(sIdToOpen);           
            });
        } else {
            //open last parent of the path and create object
            bHasChildren = rTree.hasChildren(targetObject.sIdObject) > 0;
            rTree.openItem(targetObject.sIdObject);

            //check if object to move is created
            bChildLoaded = rTree.getAllSubItems(targetObject.sIdObject) != "";

            if (!bItemExist) {
                //add an item.
                if (bChildLoaded || !bHasChildren)
                    insertNewChild(sIdTree, targetObject.sIdObject, sIdObject, sObjectNameToMove, idObjectToMove, sIcon);
                else
                    removeAndFocus(sIdTree,targetObject.sIdObject,sIdObject, idObjectToMove);
            } else {
                //simple move
                if (bChildLoaded || !bHasChildren){
                    moveObject(sIdObject, targetObject.sIdObject);
                } else {
                    removeAndFocus(sIdTree,targetObject.sIdObject, sIdObject, idObjectToMove);                    
                }
            }
            rTree.stopEdit();
            rTree.setItemText(sIdObject, sObjectNameToMove);
        }
    } else {
        //check if the object is created
        if (!bItemExist) {
            if (sIdObject != null)
                insertNewChild(sIdTree, 0, sIdObject, sObjectName, idObjectToMove, sIcon);
        } else if (sObjectName != "") {
            // manage object renaming.
            rTree.stopEdit();
            rTree.setItemText(sIdObject, sObjectName);
            if (J("#header_middle")) {
                Form_Get_Header();
                J("#header_middle").html(sObjectName);
            }
        }
    }

    if (bReloadForm)
        Form_Get_Content();

    rTree.focusItem(sIdObject);
    if (sIdTree != "dhxTree_Nav") {
        rTree.setCheck(sIdObject, true);
    }
} 

function ClearHTML() {
    document.body.innerHTML = '';
}

function fct_onunload() {
    new J.ajax({
        url: '../../code/asp/ajax/logout.asp',
        async: false,
        cache: false
    });
}

function CenterWindow(url, nom, largeur, hauteur, options) {
    var haut = ((screen.height - 160) - hauteur) / 2;
    if (haut < 0) {
        haut = 0;
    }
    var Gauche = (screen.width - largeur) / 2;
    if (Gauche < 0) {
        Gauche = 0;
    }
    fenetre_temp = window.open(url, nom, "top=" + haut + ",left=" + Gauche + ",width=" + largeur + ",height=" + hauteur + "," + options);
    fenetre_temp.focus();
    return fenetre_temp;
}

function OuvrirURL(url, window_name, width, height, option) {
    setTimeout("CenterWindow('" + url + "', '" + window_name + "'," + width + ", " + height + ", '" + option + "');", 500);
}

function OuvrirGDC(id_gdc, import_file) {
    parent.Display_Popup_CG(id_gdc, import_file);
    parent.dhxWins.window("dhxPopup_CG_List").hide();
}

function Test_CG() {
    document.form_upload.submit();
}

function Test_XML() {
    var file_name = J('#upload_file').val();
    var extension = file_name.substring(file_name.lastIndexOf(".") + 1);
    if (extension == "xml") {
        return true;
    }
    else {
        return false;
    }
}

function Test_CG_CDC(AFunction_Error) {
    if (Test_XML()) {
        document.form_upload.submit();
    }
    else {
        Popup_Error(Get_RS("RS_Test_XML_Error_GDC_SMC"), AFunction_Error);
    }
}

function navigation(id, id_e, source, close_window) {
    TTest = 0;
    if (close_window) {
        TTest = 1;
    }
    if (source == 'mcs') {
        origin = 7;
    } else if (source == 'search') {
        origin = 8;
    } else if (source == 'read_form') {
        origin = 4;
    } else if (source == 'write_form') {
        origin = 5;
    }
    new J.ajax({
        url: '../../code/asp/ajax/log_navigation_action.asp',
        cache: false,
        data: { origin: origin, id_obj: id_e }
    });

    if (window.parent.frames['frame_blanc']) {
        //case of select entity in content Form to display a linked node.
        if (Tree_Check_Object_Exist(id_e)) {
            Tree_Display_Node(id_e);
        }

    } else {
        if (TTest == 0) {
            new J.ajax({
                url: '../../code/asp/ajax/alert_background_window.asp',
                async: false,
                cache: false,
                success: function (data) {
                    TTest = data;
                }
            });
        }
        if (!window.parent.opener) {
            parent.Tree_Display_Node(id_e);
        } else if (window.parent.opener.parent.frames['frame_e']) {
            //case of selected node in search window.
            window.parent.opener.parent.frames['frame_e'].Tree_Display_Node(id_e);
            if (TTest == 0) {
                //window.parent.opener.parent.alert(RS__JS_Fenetre_Arriere_Plan);
            }
        } else {
            if (window.parent.opener.parent.opener.parent.frames['frame_e']) {
                window.parent.opener.parent.opener.parent.frames['frame_e'].Tree_Display_Node(id_e);
                window.parent.opener.parent.opener.parent.focus();
                if (TTest == 0) {
                    //window.parent.opener.parent.opener.parent.alert(RS__JS_Fenetre_Arriere_Plan);
                }
            } else {
                window.parent.opener.parent.opener.parent.opener.parent.frames['frame_e'].Tree_Display_Node(id_e);
                window.parent.opener.parent.opener.parent.opener.parent.focus();
                if (TTest == 0) {
                    //window.parent.opener.parent.opener.alert(RS__JS_Fenetre_Arriere_Plan);
                }
            }
        }
    }
    if (close_window) {
        window.close();
    }
}

function Ouvrir_Fichier(id_d) {
    new J.ajax({
        url: '../../code/asp/ajax/load_file.asp',
        async: false,
        cache: false,
        dataType: 'script',
        data: { id_d: id_d }
    });
}

function IsKeyEnter(e) {
    if (e.keyCode == 13) {
        return true;
    } else {
        return false;
    }
}

// Permet d'encoder le texte envoyé à l'API TEEXMA (pour les pb d'accent)
function urlencode(ch) {
    ch = ch.replace(/[ ]/g, "+");
    return escape(ch);
}

var ecartB = 0;

function ScrollOtherDiv(ecartA, div) {
    var diff = ecartB - ecartA;
    J('#' + div).css("left", parseInt(J(div).css('left') + diff + "px"));
    ecartB = ecartA;
}

function $class(className, tag, elm) {
    var testClass = new RegExp("(^|s)" + className + "(s|$)");
    var tag = tag || "*";
    var elm = elm || document;
    var elements = (tag == "*" && elm.all) ? elm.all : elm.getElementsByTagName(tag);
    var returnElements = [];
    var current;
    var length = elements.length;
    for (var i = 0; i < length; i++) {
        current = elements[i];
        if (testClass.test(current.className)) {
            returnElements.push(current);
        }
    }
    return returnElements;
}


function Jclass(className, tag, elm) {
    var testClass = new RegExp("(^|s)" + className + "(s|$)");
    var tag = tag || "*";
    var elm = elm || document;
    var elements = (tag == "*" && elm.all) ? elm.all : J(tag);//elm.getElementsByTagName(tag);
    var returnElements = [];
    var current;
    var length = elements.length;
    for (var i = 0; i < length; i++) {
        current = elements[i];
        if (testClass.test(current.className)) {
            returnElements.push(current);
        }
    }
    return returnElements;
}

// Fonction permettant de renvoyer la valeur du radio bouton sélectionné
function ValeurButtonRadio(radio) {
    if (radio) {
        for (var i = 0; i < radio.length; i++) {
            if (radio[i].checked) {
                return radio[i].value;
            }
        }
    } else {
        return 0;
    }
}

function Load_EntityPopup(e, id_te, id_e, id_tree, popup, conteneur) {
    if (id_e == '') {
        id_e = 0;
    }
    new J.ajax({
        url: 'ajax/chargement_popup_entite.asp',
        async: false,
        cache: false,
        data: {
            id_te: id_te, id_e: id_e, id_tree: id_tree
        },
        success: function (data) {
            J('#menuC').html(data);
        }
    });
    AffichePopup(e, popup, conteneur);
    return false;
}

// Fonction permettant de rendre visible une popup et de la placer au bon endroit
// par rapport à la souris et à l'objet conteneur
function AffichePopup(e, popup_id, conteneur_id) {
    popup = J("#" + popup_id);
    conteneur = J("#" + conteneur_id);
    // IE is evil and doesn't pass the event object
    if (e == null) {
        e = window.event;
    }
    var myWidth = 0, myHeight = 0;
    var mouseX = 0, mouseY = 0;

    if (conteneur == '') {
        if (typeof (window.innerWidth) == 'number') {
            //Non-IE
            myWidth = window.innerWidth;
            myHeight = window.innerHeight;
        } else if (document.documentElement && (document.documentElement.clientWidth || document.documentElement.clientHeight)) {
            //IE 6+ in 'standards compliant mode'
            myWidth = document.documentElement.clientWidth;
            myHeight = document.documentElement.clientHeight;
        } else if (document.body && (document.body.clientWidth || document.body.clientHeight)) {
            //IE 4 compatible
            myWidth = document.body.clientWidth;
            myHeight = document.body.clientHeight;
        }
        mouseX = Event.pointerX(e);
        mouseY = Event.pointerY(e);
    } else {
        myWidth = conteneur.attr('width');
        myHeight = conteneur.attr('height');
        mouseX = e.clientX;
        mouseY = e.clientY;
    }

    if (popup) {
        popup.css("display", 'block');
        popup.css("visible", true);
        popup.css("position", 'absolute');

        if (mouseX + 5 + popup.attr("width") < myWidth) {
            popup.css("left", (mouseX + 5) + 'px');
        } else if (mouseX - popup.attr("width") > 0) {
            popup.css("left", (mouseX - popup.attr("width")) + 'px');
        } else {
            popup.css("left", ((myWidth - popup.attr("width")) + parseInt(conteneur.css('left').replace('px', ''))) + 'px'); //mouseY-Math.round(popup.getHeight()/2) + 'px';; //mouseX-Math.round(popup.getWidth()/2) + 'px';
        }

        if (popup.attr("height") + 5 + mouseY < myHeight) {
            popup.css("top", (mouseY + 5) + 'px');
        } else if (mouseY - popup.attr("height") > 0) {
            popup.css("top", (mouseY - popup.attr("height")) + 'px');
        } else {
            if (conteneur.css('top')) {
                popup.css("top", ((myHeight - popup.attr("height")) + parseInt(conteneur.css('top').replace('px', ''))) + 'px'); //mouseY-Math.round(popup.getHeight()/2) + 'px';
            } else {
                popup.css("top", 0);
            }
        }
    }

    temp = popup.css("top");
    if (temp.replace('px', '') < 0) {
        popup.css("top", 0);
    }
    temp = popup.attr("height");
    if (temp > myHeight) {
        popup.css("height", myHeight + 'px');
    }

    Event.stop(e);
}

function Initialize_New_GED_Document(aIdTree,AID_Object, APath_File, AModel, AWith_Template, AOK) {
    new J.ajax({
        url: 'ajax/actions_form.asp',
        async: false,
        cache: false,
        dataType: 'html',
        data: {
            sFunction_Name: "Initialize_New_GED_Document",
            id_object: AID_Object,
            sIdTree:aIdTree,
            sPath_File: APath_File,
            bModel: AModel,
            bWith_Template: AWith_Template,
            bOk: AOK
        },
        success: function (data) {
            arrResult = data.split("|");
            if (arrResult[0] == "ok") {
                manageModelApplicationActions(arrResult[1], aIdTree);
                dhxWins.window("dhxPopup_GED").close();
            } else
                Popup_Alert(arrResult[0]);
        }
    });
}

function CachePopup(popup) {
    if (J(popup)) {
        J(popup).style.display = 'none';
        J(popup).visible = false;
    }
}

function CloseAllWindow() {

}

//Classe de définition de Browser
function Browser() {

    //Détection de la  plate forme
    if (navigator.appVersion.indexOf('Win') != -1)
        this.win = true;
    if (navigator.appVersion.indexOf('Mac') != -1)
        this.mac = true;
    if (navigator.userAgent.indexOf('Linux') != -1)
        this.linux = true;

    //La plate forme en chaîne de caractères
    if (this.win)
        this.plateForme = 'Windows';
    if (this.mac)
        this.plateForme = 'Macintosh';
    if (this.linux)
        this.plateForme = 'Linux';

    //Détection du navigateur
    if (navigator.userAgent.indexOf('Opera') != -1)
        this.opera = true;
    if (navigator.userAgent.indexOf('Konqueror') != -1)
        this.konqueror = true;
    if (navigator.userAgent.indexOf('Safari') != -1)
        this.safari = true;
    if (navigator.userAgent.indexOf('Firefox/1.0') != -1)
        this.ff10 = true;
    if (navigator.userAgent.indexOf('Firefox/1.5') != -1)
        this.ff15 = true;
    if (navigator.userAgent.indexOf('Netscape/7.0') != -1)
        this.netscape = true;
    if (navigator.userAgent.indexOf('MSIE 8') != -1)
        this.ie8 = true;
    if (navigator.userAgent.indexOf('MSIE 7') != -1)
        this.ie7 = true;
    if (navigator.userAgent.indexOf('MSIE 6') != -1)
        this.ie6 = true;

    //Le navigateur en chaîne de caractères
    if (this.opera)
        this.navigateur = 'Opera';
    if (this.konqueror)
        this.navigateur = 'Konqueror';
    if (this.safari)
        this.navigateur = 'Safari';
    if (this.ff10 || this.ff15)
        this.navigateur = 'Firefox';
    if (this.ie7 || this.ie6)
        this.navigateur = 'Internet Explorer';
    if (!this.navigateur)
        this.navigateur = 'inconnu';

    //Instancier une nouvelle requête AJAX
    this.getHttpObject = function () {
        if (this.ie6 || this.ie7)
            return new ActiveXObject('Microsoft.XMLHTTP');
        else
            return new XMLHttpRequest();
    };

    //Fonction qui affecte une opacité
    this.setOpacity = function (el, valeur) {
        //Sous IE
        if (this.ie8 || this.ie7 || this.ie6) {
            var op = parseInt(valeur * 100);
            el.style.filter = 'alpha(opacity=' + op + ')';
        }
            //Sous les autres navigateurs
        else {
            el.style.opacity = valeur;
        }
    };

    //Affecte une image de fond à un élément
    this.setBackground = function (elt, image, couleur) {
        if (this.ie6) {
            elt.style.filter = 'progid:DXImageTransform.Microsoft.AlphaImageLoader(src=\'' + image + '\',sizingMethod=\'image\')';
            elt.style.backgroundColor = couleur;
        }
        else //Sous Firefox et IE7
            elt.style.background = 'url(' + image + ') ' + couleur;
    };

    //Affecte une taille visuelle à un élément
    this.setWidth = function (elt, valeur) {
        if (this.ie6 || this.ie7)
            elt.style.width = valeur + 'px';
        else {
            //Sous Firefox, on doit récupérer la bordure
            var b = parseInt(elt.style.border || 0);
            //Et le padding
            var p = parseInt(elt.style.padding || 0);
            //Pour les soustraire à la taille réelle
            elt.style.width = (valeur - 2 * (b + p)) + 'px';
        }
    };

}

function Popup_Alert(AMessage, AFunctionCallBack) {
    dhtmlx.alert({
        text: AMessage,
        callback: function () {
            if (AFunctionCallBack) {
                eval(AFunctionCallBack);
            }
        }
    });
}

function Popup_Confirm(AMessage, AConfirm, ACancel, AConfirm_Function) {
    dhtmlx.confirm({
        text: AMessage,
        ok: AConfirm,
        cancel: ACancel,
        callback: function (result) {
            if (result) {
                if (AConfirm_Function) {
                    eval(AConfirm_Function);
                }
            }
        }
    });
}

function Popup_Error(AMessage, AFunction) {
    dhtmlx.alert({
        title: "Error!",
        type: "alert-error",
        text: AMessage,
        callback: function () {
            if (AFunction) {
                eval(AFunction);
            }
        }
    });
}

//Instanciation de l'objet browser
var browser = new Browser();

function Jn(e1) {
    return J('[name="' + e1 + '"]');
}

function $n(e1) {
    return document.getElementsByName(e1);
}

// On initialise la variable permettant de savoir si l'utilisateur à IE6
try {
    var IE6 = false;
    var strChUserAgent = navigator.userAgent;
    var intSplitStart = strChUserAgent.indexOf("(", 0);
    var intSplitEnd = strChUserAgent.indexOf(")", 0);
    var strChMid = strChUserAgent.substring(intSplitStart, intSplitEnd);
    if (strChMid.indexOf("MSIE 6") != -1) IE6 = true;
} catch (e) {

}