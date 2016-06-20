function CQueryInteger(aSettings, aCallBackFunction, aDummyData) {

    //initialize pop-up
    var dhxWin = new dhtmlXWindows();
    var wdow = dhxWin.createWindow('queryInteger', 100, 100, 324, 100);
    wdow.center();
    wdow.button("park").hide();
    wdow.button("minmax1").hide();
    wdow.denyResize();

    if (aSettings["sCaption"]) {
        wdow.setText(aSettings["sCaption"]);
    }
    else { 
        wdow.setText("Indicate an integer value"); }

    wdow.attachHTMLString('<div id="mainDiv"></div>');
    J("#mainDiv").append("<label style='margin:6px;text-align=center' for='Input'></label>");
    J("#mainDiv").append("<input style='margin:6px' type='number' id='input'/>");
    J("#mainDiv").append("<input type='button' class='cl_btn_action' style='margin-right:6px' disabled='disabled' id='ok' value='OK'/>");
    J("#mainDiv").append("<input type='button' class='cl_btn_action' id='cancel' value='Cancel'/>");
    J("#mainDiv").find("input[type=button]").wrapAll('<div id="id_div_btns" />');

    //indicate the label
    J("label").html(aSettings["sLabel"]);

    J("#input").change(CheckInputValue)
    J("#input").keyup(CheckInputValue)

    //associate event with button ok
    J("#ok").click(OnButtonClick);

    //associate event with button cancel
    J("#cancel").click(OnButtonClick)

    function OnButtonClick() {

        wdow.close();
        aCallBackFunction(this.id, J(this).parent().prev("#input").val(), aDummyData);

    }

    function CheckInputValue() {
        (J(this).val() >= aSettings["fLowerBound"]) ? J("#ok").removeAttr('disabled') : J("#ok").attr('disabled', 'disabled')
    }
}


