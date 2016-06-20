J(function () {
    var CT = 0;
    var Trpt = 0;
    var DT = 0;
    var Yield = 90;
    var CC2 = 1
    var CC = 0;
    var scope = { 'CC2': CC2, "Yield": Yield, 'CC': CC };
    var scope1 = { 'CT': CT, 'Trpt': Trpt, 'DT': DT };

    J("#CC2").val(CC2);
    J("#Yield").val(Yield);
    calculate();
    J("Cycletime").val(CT);
    J("Thruput").val(Trpt);
    J("Downtime").val(DT);
    calculate1();
    function calculate() {
        scope.CC2 =getValue( J("#CC2").val());
        scope.Yield = getValue(J("#Yield").val());
        J("#CC").val(math.eval('1+((100-' + scope.Yield + ')/100*' + scope.CC2 + ')'));
        scope.CC = J("#CC").val();

    }

    function calculate1() {
        scope1.CT = getValue(J('#Cycletime').val());
        scope1.Trpt = getValue(J('#Thruput').val());
        scope1.DT = getValue(J('#Downtime').val());
        J("#CycletimeNet").val(math.eval('(' + scope1.CT + ')*(' + scope1.Trpt + '/100)*((100+' + scope1.DT + ')/100)*' + scope.CC + ''));
    }
    J("#CycleTime").keyup(function () {
        calculate1();
    });
    J("#CycleTime").change(function () {
        calculate1();
    });

    J("#Thruput").keyup(function () {
        calculate1();
    });
    J("#Thruput").change(function () {
        calculate1();
    });

    J("#Downtime").keyup(function () {
        calculate1();
    });
    J("#Downtime").change(function () {
        calculate1();
    });

    J("#CC2").keyup(function () {
        calculate();
    });
    J("#CC2").change(function () {
        calculate();
    });

    J("#Yield").change(function () {
        calculate();
    });
    J("#Yield").keyup(function () {
        calculate();
    });

    J("#CC").change(function () {
        calculate1();
    });
    J("#validate").click(function () {
        calculate();
    });
});

function getValue(AValue) {
    return AValue === "" ? "0" : AValue.replace(',', '.');

}