function TxFormula(aJson) {
    var name;
    var variables = [];
    var formula = {};
    var res = 0
    //var res = {};
    this.json = aJson;

    this.read = function (aJSON) {
       // this.res = aJSON.result; //???
        this.name = aJSON.name;
        for (var i = 0; i < aJSON.variables; i++) {
            var newvar = new TxVariable;
            this.variables.push(newvar);
        }
        formula = aJSON.formula;
         
    }

    this.calculate = function (aJSON) {
        res = 02
      
       //parcours des valeurs de l'objet
       
        var scope = this.json.variables.reduce(function (prev, cur) {
            prev[cur.name] = cur.value; return prev;
        }, {});

       // var node = math.parse(this.json.formula);
        //var comp = node.compile();

        res = math.eval(this.json.formula,scope);
        res = math.round(res);
        $("#" + this.idDiv).find("#res").val(res);
        return res
    }

    //display form with object name and input cells

    this.display = function (id_div) {
        this.idDiv = id_div;
        var form = $("<form name='" + this.json.name + "'/>");
        var self = this;
        this.json.variables.forEach(function (variable) {

            //display names 
            form.append((variable.label ? variable.label : variable.name) + " : ");

            //display inputs with variable's values
            var input = $("<input type='text' name='" + variable.name + "' value ='" + variable.value + "'size=3 />");
            form.append(input);
            form.append("\t" + (variable.unit ? variable.unit : ""));
            form.append("<br/><br/>");

            //calcul dynamique 
            input.on('input', function () {
                variable.value = $(this).val();
                //variable.value === "" ? "0" : variable.value.replace(',', '.');
                self.calculate();
            });

        });

        form.append("<label for='result'> result : </label>");
        form.append("<input type='text' name='res' id='res' size=5/>");
        form.append("\t \t" + this.json.result.unit);
        form.append("<br/><br/>");
        form.append("<label for='formule'> formule : </label>");
        form.append("<input type='text' name='formula'  value='" + this.json.formula + "' readonly='readonly' size=45/>");

        form.append("<br/><br/>");
        // form.append("<input type='submit' value='Calculate' />");
        $("#" + id_div).append(form);

    }

    this.ParamVar = function (id_div) {
        this.idDiv = id_div;
        var form = $("<form name='" + this.json.name + "'/>");
        var self = this;
        var variable = this.json.variables;
        self.idDiv = id_div;
        var form = $("<form name='" + self.json.name + "'/>");
                
        form.append("<label for='name'> nom : </label>");
        form.append("<input type='text' name='nom' id='nom' size=5/>");
        form.append("<label for='value'> valeur : </label>");
        form.append("<input type='text' name='value' id='value' size=5/>");
        form.append("<label for='unit'> unit : </label>");
        form.append("<input type='text' name='unit' id='unit' size=5/>");
        form.append("<br/><br/>");
        $("#" + id_div).append(form);
               
             
           
        form.append("<input type='button' id='add' value='Add' />");
        form.append("\t \t");
         
        form.append("<input type='button' id='delete' value='delete' />");
        form.append("<br/><br/>");
               
        $("#add").on('click', function (e) {
            e.preventDefault();
            variable.push({ name: $("#nom").val(), value: $("#value").val(), unit: $("#unit").val() });
            
        });


        $("#delete").on('click', function (e) {
            e.preventDefault();
             variable.splice();

        });


        

    }


/*    this.Delete = function (id_div) {
        this.idDiv = id_div;
        var form = $("<form name='" + this.json.name + "'/>");
        var self = this;
        var variable = this.json.variables;
        self.idDiv = id_div;
        var form = $("<form name='" + self.json.name + "'/>");

        form.append("<label for='name'> nom : </label>");
        form.append("<input type='text' name='nom' id='nom' size=5/>");
        form.append("<label for='value'> valeur : </label>");
        form.append("<input type='text' name='value' id='value' size=5/>");
        form.append("<label for='unit'> unit : </label>");
        form.append("<input type='text' name='unit' id='unit' size=5/>");
        form.append("<br/><br/>");
        $("#" + id_div).append(form);



        form.append("<input type='submit' id='ok' value='Ok' />");
        form.append("<br/><br/>");

        $("#ok").on('click', function (e) {
            e.preventDefault();
            delete variable({ name: $("#nom").val(), value: $("#value").val(), unit: $("#unit").val() });

        });
    }

    */
    



function TxVariable() {
 
    //input_JSON.variables.push({name :"testcost" ,value:22});

    

    init = function(name, value,unit){
        this.name = nom;
        this.value = value;
        this.unit = unit;

       // var newvar = Object.create( );
 

    }

}

}


 