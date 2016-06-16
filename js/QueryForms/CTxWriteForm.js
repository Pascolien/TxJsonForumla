function CTxWriteForm(aSettings, aCallBackFunction, aDummyData) {

    //aSettings contains all the needed or optional settings.

    var writeFormContent;

    var dhxWin = new dhtmlXWindows();
    var wdow = dhxWin.createWindow('TxWriteForm', 100, 100, 900, 398);
    wdow.setText(aSettings["sCaption"]);
    wdow.center();
    wdow.denyResize();
	wdow.button("park").hide();
    wdow.button("minmax1").hide();

    wdow.attachHTMLString('<div id="mainDivS"></div><div id="id_div_btns">'
        + '<input type="button" id="ok" class="cl_btn_action" value="OK"/>'
        + '<input type="button" class="cl_btn_action" id="cancel" value="Cancel"/>'
        + '</div>');

    switch (aSettings["sFillType"]) {
        case "ftFillWithAttributes":
            writeFormContent = Add_FormFilledWithAttributes("mainDivS", aSettings["sIDsAtt"], 0, true, false);
            break;
        default:
            alert("FillType '" + aSettings["sFillType"] + "' not handled");
    }

    //associate event with button ok
    J("#ok").click(OnButtonClick);

    //associate event with button cancel
    J("#cancel").click(OnButtonClick)

    function OnButtonClick() {
        wdow.close();
        aCallBackFunction(aSettings, this.id, writeFormContent.save(), aDummyData);

    }
}