Blockly.Blocks['action_start'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldImage("play.png", 30, 30, "|>"));
    this.setInputsInline(false);
    this.setNextStatement(true, null);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }, isLinkedToActionStart : function(aBlock){
    if(aBlock.previousConnection == null){return false;}
    var iterator = aBlock.previousConnection.targetBlock();
    for(var i  = 0; i < 5000; i++){
      if(iterator == null){
        return false;
      }

      if(iterator.type == 'action_start'){
        return true;
      }

      if(iterator.previousConnection == null){
        return false;
      }

      iterator = iterator.previousConnection.targetBlock();

    } 
    return false;
  }
};

Blockly.JavaScript['action_start'] = function(block) { return ''; };



//=============================================================================================================================================
//=============================================================================================================================================
//=============================================================================================================================================
//=============================================================================================================================================

/*
Blockly.Blocks['objetc_create'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("OBJECT");
    this.appendValueInput("objName")
        .setCheck("String")
        .appendField("Named");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true,null);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  },doActionJS : function(self, paramsMap){
    if(! Blockly.Blocks['action_start'].isLinkedToActionStart(self)){return '';}

    var value_objname = paramsMap['objName'];
    var code = 'var ';
    if(value_objname != undefined && value_objname != null && value_objname != null){
      code += value_objname.replaceAll("'","");
    }else{
      code += ' __objetc_create___objName__ ';
    } 
    code += ' = { name:';
    if(value_objname != undefined && value_objname != null && value_objname != null){
      code += value_objname;
    }else{
      code += ' __objetc_create___objName__ ';
    }

    
    if(self.nextConnection.targetConnection == null || self.nextConnection.targetBlock().type != 'objetc_property'){
      code += ' };\n';
    }
    
    return code;
  }
};

Blockly.JavaScript['objetc_create'] = function(block) {
  var value_objname = Blockly.JavaScript.valueToCode(block, 'objName', Blockly.JavaScript.ORDER_ATOMIC);
  var code = Blockly.Blocks['objetc_create'].doActionJS(block,{'objName':value_objname});
  return code;
};
*/

Blockly.Blocks['objetc_create'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("OBJECT");
    this.appendValueInput("objName")
        .setCheck("String")
        .appendField("Named");
    this.appendStatementInput('properties')
    .appendField('');
    this.setPreviousStatement(true, null);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  },doActionJS : function(self, paramsMap){
    if(! Blockly.Blocks['action_start'].isLinkedToActionStart(self)){return '';}

    var value_objname = paramsMap['objName'];
    var value_properties = paramsMap['properties']; 
    var code = 'var ';
    if(value_objname != undefined && value_objname != null && value_objname != ''){
      code += value_objname.replaceAll("'","");
    }else{
      code += ' __objetc_create___objName__ ';
    } 
    code += ' = { name:';
    if(value_objname != undefined && value_objname != null && value_objname != ''){
      code += value_objname;
    }else{
      code += ' __objetc_create___objName__ ';
    }

    if(value_properties != undefined && value_properties != null){
      code += value_properties;
    }else{
      code += ' __object_create___value_properties__ ';
    }
    
    code += ' };\n';
    
    return code;
  }
};

Blockly.JavaScript['objetc_create'] = function(block) {
  var value_objname = Blockly.JavaScript.valueToCode(block, 'objName', Blockly.JavaScript.ORDER_ATOMIC);
  var value_properties = Blockly.JavaScript.statementToCode(block, 'properties');
  var code = Blockly.Blocks['objetc_create'].doActionJS(block,{'objName':value_objname , 'properties':value_properties});
  return code;
};

Blockly.Blocks['objetc_property'] = {
  init: function() {
    this.appendValueInput("name")
        .setCheck("String");
    this.appendValueInput("value")
        .setCheck("String")
        .appendField(":");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setPreviousStatement(true, null);
    this.setTooltip('');
  },doActionJS:function(self, paramsMap){
    if(! Blockly.Blocks['action_start'].isLinkedToActionStart(self)){return '';}

    var value_name = paramsMap['name'];
    var value_value = paramsMap['value'];

    var code = ' , ';
    if(value_name != undefined && value_name != null && value_name != ''){
      code += value_name.replaceAll("'","");
    }else{
      code += ' __objetc_property___name__ ';
    }

    code += ':';
    
    if(value_name != undefined && value_name != null && value_name != ''){
      code += value_value.replaceAll("'","")+' ';
    }else{
      code += ' __objetc_property___value__ '
    }

    //if(self.nextConnection.targetConnection == null || self.nextConnection.targetBlock().type != 'objetc_property'){
    //  code += ' };\n';
    //}  

    return code;
  }
};

Blockly.JavaScript['objetc_property'] = function(aBlock) {
  var value_name = Blockly.JavaScript.valueToCode(aBlock, 'name', Blockly.JavaScript.ORDER_ATOMIC);
  var value_value = Blockly.JavaScript.valueToCode(aBlock, 'value', Blockly.JavaScript.ORDER_ATOMIC);
  var code = Blockly.Blocks['objetc_property'].doActionJS(aBlock,{'name':value_name , 'value':value_value});
  return code;
};

//=============================================================================================================================================
//=============================================================================================================================================
//=============================================================================================================================================
//=============================================================================================================================================

/*
Blockly.Blocks['method_create'] = {
  init: function() {
    this.appendValueInput("name")
        .setCheck("String")
        .appendField("METHOD");
    this.appendValueInput("params")
        .setCheck("Array")
        .appendField("with params:");
    this.appendDummyInput()
        .appendField("AND INSTRUCTIONS");
    this.setInputsInline(false);
    this.setNextStatement(true, null);
    this.setPreviousStatement(true, null);
    this.setTooltip('');
  },doActionJS:function(self, paramsMap){
    if(! Blockly.Blocks['action_start'].isLinkedToActionStart(self)){return '';}

    var value_name = paramsMap['name'];
    var value_params = paramsMap['params'];
    var code = 'var ';
    if(value_name != undefined && value_name != null && value_name != ''){
      code += value_name.replaceAll("'",""); 
    }else{
      code += ' __method_create___name__ ';
    }
    code += ' = function(';
    if(value_params != undefined && value_params != null && value_params != ''){
      code += (''+value_params).replaceAll(']','').replaceAll('[','').replaceAll("'",""); 
    }else{
      code += ' __method_create___params__ ';
    }
    code += '){';

    code += ' \n};\n';
    return code;  
  }};

  Blockly.JavaScript['method_create'] = function(block) {
    var value_name = Blockly.JavaScript.valueToCode(block, 'name', Blockly.JavaScript.ORDER_ATOMIC);
    var value_params = Blockly.JavaScript.valueToCode(block, 'params', Blockly.JavaScript.ORDER_ATOMIC);
    var code = Blockly.Blocks['method_create'].doActionJS(block,{'name':value_name , 'params':value_params });
    return code;
  };
*/

Blockly.Blocks['method_create'] = {
  init: function() {
    this.appendValueInput("name")
        .setCheck("String")
        .appendField("METHOD");
    this.appendValueInput("params")
        .setCheck("Array")
        .appendField("with params:");
    this.appendDummyInput()
        .appendField("AND INSTRUCTIONS");
    this.appendStatementInput('instructions')
    .appendField('');
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setTooltip('');
  },doActionJS:function(self, paramsMap){
    if(! Blockly.Blocks['action_start'].isLinkedToActionStart(self)){return '';}

    var value_name = paramsMap['name'];
    var value_params = paramsMap['params'];
    var value_instructions = paramsMap['instructions'];
    var code = 'var ';
    if(value_name != undefined && value_name != null && value_name != ''){
      code += value_name.replaceAll("'",""); 
    }else{
      code += ' __method_create___name__ ';
    }
    code += ' = function(';
    if(value_params != undefined && value_params != null && value_params != ''){
      code += (''+value_params).replaceAll(']','').replaceAll('[','').replaceAll("'",""); 
    }else{
      code += ' __method_create___params__ ';
    }
    code += '){\n';

    if(value_instructions != undefined && value_instructions != null && value_instructions != ''){
      code += value_instructions.replaceAll("'",""); 
    }else{
      code += ' __method_create___instructions__ ';
    }

    //if(self.nextConnection.targetConnection == null || self.nextConnection.targetBlock().type != 'method_instruction'){
    code += '};\n';
    //}
    return code;  
  }};

  Blockly.JavaScript['method_create'] = function(block) {
    var value_name = Blockly.JavaScript.valueToCode(block, 'name', Blockly.JavaScript.ORDER_ATOMIC);
    var value_params = Blockly.JavaScript.valueToCode(block, 'params', Blockly.JavaScript.ORDER_ATOMIC);
    var value_instructions = Blockly.JavaScript.statementToCode(block, 'instructions');
    var code = Blockly.Blocks['method_create'].doActionJS(block,{'name':value_name , 'params':value_params , 'instructions':value_instructions });
    return code;
  };


Blockly.Blocks['method_instruction'] = {
  init: function() {
    this.appendValueInput("instruction")
        .setCheck("String");
    this.setInputsInline(true);
    this.setNextStatement(true, null);
    this.setPreviousStatement(true, null);
    this.setTooltip('');
  },doActionJS:function(self, paramsMap){
      if(! Blockly.Blocks['action_start'].isLinkedToActionStart(self)){return '';}

      var value_instruction = paramsMap['instruction'];
      var code = '';
      if(value_instruction != undefined && value_instruction != null && value_instruction != ''){
        code += value_instruction.replaceAll("'","");
      }else{
        code += ' __method_instruction___instruction__ ';
      }
      code +=';\n';

      //if(self.nextConnection.targetConnection == null || self.nextConnection.targetBlock().type != 'method_instruction'){
      //  code += ' \n};\n';
      //}

      return code;
  }};

  Blockly.JavaScript['method_instruction'] = function(block) {
    var value_instruction = Blockly.JavaScript.valueToCode(block, 'instruction', Blockly.JavaScript.ORDER_ATOMIC);
    var code = Blockly.Blocks['method_instruction'].doActionJS(block,{'instruction':value_instruction});
    return code;
  };

//=============================================================================================================================================
//=============================================================================================================================================
//=============================================================================================================================================
//=============================================================================================================================================

Blockly.Blocks['globalize'] = {
  init: function() {
    this.appendValueInput("varname")
        .setCheck("String")
        .appendField("Give name");
    this.appendValueInput("obj")
        .setCheck(null)
        .appendField(" to ");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(345);
 this.setTooltip("");
 this.setHelpUrl("");
  },doActionJS:function(self, paramsMap){
    if(! Blockly.Blocks['action_start'].isLinkedToActionStart(self)){return '';}

    var value_varname = paramsMap['varname'];
    var value_obj = paramsMap['obj'];
    var code = "";
    if(self.previousConnection.targetConnection != null){
        code += '\n';
    }
    code += "var ";
    if(value_varname != undefined && value_varname != null && value_varname != ''){
      code += value_varname.replaceAll("'",""); 
    }else{
      code += " __globalize___varname__ ";
    }
    code += " = ";
    if(value_obj != undefined && value_obj != null && value_obj != ''){
      code += value_obj; 
    }else{
      code += " __globalize___obj__ ";
    }  
    return code;
  }
};

Blockly.JavaScript['globalize'] = function(block) {
  var value_varname = Blockly.JavaScript.valueToCode(block, 'varname', Blockly.JavaScript.ORDER_ATOMIC);
  var value_obj = Blockly.JavaScript.valueToCode(block, 'obj', Blockly.JavaScript.ORDER_ATOMIC);
  var code = Blockly.Blocks['globalize'].doActionJS(block,{'varname':value_varname , 'obj':value_obj});
  return code;
};

//=============================================================================================================================================
//=============================================================================================================================================
//=============================================================================================================================================
//=============================================================================================================================================

Blockly.Blocks['method_execution'] = {
  init: function() {
    /*this.appendDummyInput()
        .appendField(new Blockly.FieldImage("skull.png", 150, 150, "*"));*/
    this.appendValueInput("anObject")
        /*.setCheck("Object")*/
        .appendField("LET OBJECT");
    this.appendValueInput("aMethod")
        /*.setCheck("function")*/
        .appendField("EXECUTE METHOD");
    this.appendValueInput("params")
        .setCheck("Array")
        .appendField("WITH PARAMS");

    this.setColour(60);
 this.setPreviousStatement(true, null);
 this.setNextStatement(true, null);
 this.setTooltip("");
  }, doActionJS : function(self , paramsMap){
    if(! Blockly.Blocks['action_start'].isLinkedToActionStart(self)){return '';}

    var value_object = paramsMap['obj'];
    var value_method = paramsMap['method'];
    var value_params = paramsMap['params'];
    var code = '';
    if(self.previousConnection.targetConnection != null){
        code += '\n';
    }
    code += '(';
    if(value_method != undefined && value_method != null && value_method != ''){
      code += value_method.replaceAll("'","");
    }else{
      code += ' __method_execution___method__ ';
    }
    code += ').apply(';
    if(value_object != undefined && value_object != null && value_object != ''){
      code += value_object.replaceAll("'","");
    }else{
      code += ' __method_execution___obj__ ';
    }

    if(value_params != undefined && value_params != null && value_params != ''){
      try{
        var paramsList = JSON.parse(value_params);
        if(paramsList.length > 0){
          code += ', '+paramsList.join();
        }
      }catch(e){
        code += ' __method_execution___params__ ';
      }
    }else{
      code += ' __method_execution___params__ ';
    }
    code +=');';

    return code;

  }
};

Blockly.JavaScript['method_execution'] = function(block) {
  var value_anobject = Blockly.JavaScript.valueToCode(block, 'anObject', Blockly.JavaScript.ORDER_ATOMIC);
  var value_amethod = Blockly.JavaScript.valueToCode(block, 'aMethod', Blockly.JavaScript.ORDER_ATOMIC);
  var value_params = Blockly.JavaScript.valueToCode(block, 'params', Blockly.JavaScript.ORDER_ATOMIC);
  var code = Blockly.Blocks['method_execution'].doActionJS(block, {'obj': value_anobject,'method': value_amethod, 'params':value_params});
  return code;
};

//=============================================================================================================================================
//=============================================================================================================================================
//=============================================================================================================================================
//=============================================================================================================================================


    