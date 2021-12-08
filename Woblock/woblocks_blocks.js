//=============================================================================================================================================
//=============================================================================================================================================
//=============================================================================================================================================
//=============================================================================================================================================

//ACTION START
//This Block serves as the starting point of an object or method definition. All other blocks are designed to not generate code if this block 
//is not on top of the top of the block heriarchy. 
Blockly.Blocks['action_start'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldImage("play.png", 30, 30, "|>"));
    this.setInputsInline(false);
    this.setNextStatement(true, null);
    this.setTooltip('');
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

//OBJECT DEFINITION
//This block is used to create an object.It takes a text block for the nme and properties definition statements.
Blockly.Blocks['objetc_create'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("OBJECT");
    this.appendValueInput("objName")
        .setCheck("String")
        .appendField("Named");
    this.appendStatementInput('properties')
    .appendField('')
    .setCheck("objetc_property");///////////
    this.setPreviousStatement(true, null);
    this.setTooltip('');
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


//OBJECT PROPERTY
//used for defining a property. First block must be a text block and the second one can be any value
Blockly.Blocks['objetc_property'] = {
  init: function() {
    this.appendValueInput("name")
        .setCheck("String");
    this.appendValueInput("value")
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

//METHOD CREATE
//takes a string block for the method name and a list of parameter names (string list block) and instructions to create a method
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

    code += '};\n';

    return code;  
  }};

  Blockly.JavaScript['method_create'] = function(block) {
    var value_name = Blockly.JavaScript.valueToCode(block, 'name', Blockly.JavaScript.ORDER_ATOMIC);
    var value_params = Blockly.JavaScript.valueToCode(block, 'params', Blockly.JavaScript.ORDER_ATOMIC);
    var value_instructions = Blockly.JavaScript.statementToCode(block, 'instructions');
    var code = Blockly.Blocks['method_create'].doActionJS(block,{'name':value_name , 'params':value_params , 'instructions':value_instructions });
    return code;
  };


//METHOD INSTRUCTION
//a simple block that describes an instruction.It automatically appends the ; at the end
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

      return code;
  }};

  Blockly.JavaScript['method_instruction'] = function(block) {
    var value_instruction = Blockly.JavaScript.valueToCode(block, 'instruction', Blockly.JavaScript.ORDER_ATOMIC);
    var code = Blockly.Blocks['method_instruction'].doActionJS(block,{'instruction':value_instruction});
    return code;
  };