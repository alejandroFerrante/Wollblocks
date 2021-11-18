Blockly.Blocks['methodexecutionblock'] = {
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
 this.setHelpUrl("");
  }
};


Blockly.JavaScript['methodexecutionblock'] = function(block) {
  var value_anobject = Blockly.JavaScript.valueToCode(block, 'anObject', Blockly.JavaScript.ORDER_ATOMIC);
  value_anobject = value_anobject.replaceAll("'","");
  var value_amethod = Blockly.JavaScript.valueToCode(block, 'aMethod', Blockly.JavaScript.ORDER_ATOMIC);
  value_amethod = value_amethod.replaceAll("'","");
  var value_params = Blockly.JavaScript.valueToCode(block, 'params', Blockly.JavaScript.ORDER_ATOMIC);
  var code = "var method = "+value_amethod+";\nmethod.apply("+value_anobject+','+value_params+");\n";
  return code;
};
//////////////////////////////////////////////////////////////////////
Blockly.Blocks['instructionlist'] = {
  init: function() {
    this.appendValueInput("instructions")
        .setCheck("Array")
        .appendField("Method from Instructions: ");
    this.appendValueInput("params")
        .setCheck("Array")
        .appendField("With Arguments named:");
    this.setOutput(true, null);
    this.setColour(195);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.JavaScript['instructionlist'] = function(block) {
  var value_instructions = Blockly.JavaScript.valueToCode(block, 'instructions', Blockly.JavaScript.ORDER_ATOMIC);
  var value_params = Blockly.JavaScript.valueToCode(block, 'params', Blockly.JavaScript.ORDER_ATOMIC);
  value_instructions = value_instructions.replaceAll("'","**-**").replaceAll("\"","'").replaceAll("**-**","\"");
  var instructions = JSON.parse(value_instructions);

  var code = 'function(';
  code += (''+value_params).replaceAll(']','').replaceAll('[','').replaceAll("'","");
  code += '){\n';
  //code += (''+value_instructions).replaceAll(']','').replaceAll('[','').replaceAll("'","").replaceAll(',',';')+';';
  for(var i = 0; i < instructions.length; i++){
    code += instructions[i]+'\n';
  }
  code += '}';
  
  return [code, Blockly.JavaScript.ORDER_NONE];
};
//////////////////////////////////////////////////////////////////////
Blockly.Blocks['ramification'] = {
  init: function() {
    this.appendValueInput("objectToCheck")
        .setCheck("String")
        .appendField("CHECK");
    this.appendValueInput("checkFuntion")
        .setCheck(null)
        .appendField("WITH");
    this.appendValueInput("cases")
        .setCheck("Array")
        .appendField("ON CASE DO");
    this.setOutput(true, null);
    this.setColour(195);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.JavaScript['ramification'] = function(block) {
  var value_objecttocheck = Blockly.JavaScript.valueToCode(block, 'objectToCheck', Blockly.JavaScript.ORDER_ATOMIC);
  var value_checkfuntion = Blockly.JavaScript.valueToCode(block, 'checkFuntion', Blockly.JavaScript.ORDER_ATOMIC);
  var value_cases = Blockly.JavaScript.valueToCode(block, 'cases', Blockly.JavaScript.ORDER_ATOMIC);
  
  var code =  "(function(){\n";
      code += "var checkMethod = "+value_checkfuntion.replaceAll("'","")+";\n";
      code += "var evaluationResult = checkMethod.apply("+value_objecttocheck.replaceAll("'","")+");\n"
      code += "var cases = "+value_cases+";\n";
      code += "var result;\n";
      code += "if(evaluationResult != null){\n";
      code += "   for(var i = 0; i < cases.length; i++){\n";
      code += "     if(cases[i][0] == evaluationResult){\n";
      code += "       result = cases[i][1];\n";
      code += "       break;\n";
      code += "     }\n";
      code += "   };";
      code += "}\n";
      code += "if(result != null){return result()};\n";
      code += "return null;"
      code += "})();"

  
  return [code, Blockly.JavaScript.ORDER_NONE];
};
//////////////////////////////////////////////////////////////////////
Blockly.Blocks['ramification_option'] = {
  init: function() {
    this.appendValueInput("value")
        .setCheck(null)
        .setAlign(Blockly.ALIGN_CENTRE);
    this.appendValueInput("function")
        .setCheck(null)
        .appendField("-->");
    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(195);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.JavaScript['ramification_option'] = function(block) {
  var value_value = Blockly.JavaScript.valueToCode(block, 'value', Blockly.JavaScript.ORDER_ATOMIC);
  var value_function = Blockly.JavaScript.valueToCode(block, 'function', Blockly.JavaScript.ORDER_ATOMIC);
  
  var code = '['+value_value+','+value_function+']';
  
  return [code, Blockly.JavaScript.ORDER_NONE];
};
//////////////////////////////////////////////////////////////////////
Blockly.Blocks['object_creator'] = {
  init: function() {
    this.appendValueInput("name")
        .setCheck("String")
        .appendField("Create Object named");
    this.appendValueInput("properties")
        .setCheck("Array")
        .appendField("wih params:");
    this.setInputsInline(false);
    this.setOutput(true, null);
    this.setColour(65);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.JavaScript['object_creator'] = function(block) {
  var value_name = Blockly.JavaScript.valueToCode(block, 'name', Blockly.JavaScript.ORDER_ATOMIC);
  var value_properties = Blockly.JavaScript.valueToCode(block, 'properties', Blockly.JavaScript.ORDER_ATOMIC);
  var execCode = "{ name:'"+value_name.replaceAll("'","")+"'";
  var convertedArray = JSON.parse(value_properties.replaceAll("'","\""));
  if(convertedArray.length > 0){
    execCode +=", ";
    for(var i = 0; i < convertedArray.length; i++){
      if(i != 0){execCode += ",";}
      execCode += ""+convertedArray[i][0]+":"+convertedArray[i][1];
    }
  }
  execCode += "}";
  //eval(execCode);
  //var code = '';
  return [execCode, Blockly.JavaScript.ORDER_NONE];
};
//////////////////////////////////////////////////////////////////////
Blockly.Blocks['globalize'] = {
  init: function() {
    this.appendValueInput("varname")
        .setCheck("String")
        .appendField("Give name");
    this.appendValueInput("obj")
        .setCheck(null)
        .appendField(" to ");
    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(345);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.JavaScript['globalize'] = function(block) {
  var value_varname = Blockly.JavaScript.valueToCode(block, 'varname', Blockly.JavaScript.ORDER_ATOMIC);
  var value_obj = Blockly.JavaScript.valueToCode(block, 'obj', Blockly.JavaScript.ORDER_ATOMIC);
  var code = "var "+value_varname.replaceAll("'","")+" = "+value_obj;
  return [code, Blockly.JavaScript.ORDER_NONE];
};

//////////////////////////////////////////////////////////////////////
Blockly.Blocks['fsm_define'] = {
  init: function() {
    this.appendValueInput("name")
        .setCheck("String")
        .appendField("FSM Named:");
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.JavaScript['fsm_define'] = function(block) {
  var value_name = Blockly.JavaScript.valueToCode(block, 'name', Blockly.JavaScript.ORDER_ATOMIC);
  var code = '';
  code += 'var '+value_name.replaceAll("'","")+' = { finished : false,\n currentState: null,\n doStep : function(){ \n';
  code += ' if(this.currentState == null){alert("NULL CURRENT STATE");return;}\n';
  code += ' if(this.currentState == "END"){return;}\n';
  code += ' if(this[this.currentState] == undefined){alert("CURRENT STATE NOT DEFINED");return;}\n';
  code += ' if(! this[this.currentState] instanceof Function){alert("CURRENT STATE NOT A FUNCTION");return;}\n';
  code += ' this[this.currentState]();\n';
  code += '}\n';
  code += ' };\n';
  return code;
};


Blockly.Blocks['fsm_state'] = {
  init: function() {
    this.appendValueInput("fsm_name")
        .setCheck("String")
        .appendField("FSM:");
    this.appendValueInput("fsm_state")
        .setCheck("String")
        .appendField("STATE:");
    this.appendStatementInput("INITIAL")
        .setCheck("Boolean")
        .appendField(new Blockly.FieldCheckbox("TRUE"), "Initial");
    this.appendValueInput("fsm_check")
        .setCheck(null)
        .appendField("EVAL:");
    this.appendValueInput("fsm_clauses")
        .setCheck("Array");
    this.setInputsInline(false);
    this.setOutput(true, null);
    this.setColour(345);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.JavaScript['fsm_state'] = function(block) {
  var value_fsm_name = Blockly.JavaScript.valueToCode(block, 'fsm_name', Blockly.JavaScript.ORDER_ATOMIC);
  var value_fsm_state = Blockly.JavaScript.valueToCode(block, 'fsm_state', Blockly.JavaScript.ORDER_ATOMIC);
  var checkbox_initial = block.getFieldValue('Initial') == 'TRUE';
  var value_fsm_check = Blockly.JavaScript.valueToCode(block, 'fsm_check', Blockly.JavaScript.ORDER_ATOMIC);
  var value_fsm_clauses = Blockly.JavaScript.valueToCode(block, 'fsm_clauses', Blockly.JavaScript.ORDER_ATOMIC);
  value_fsm_name = value_fsm_name.replaceAll("'","");
  //value_fsm_state = value_fsm_state.replaceAll("'","");
  value_fsm_check = value_fsm_check.replaceAll("'","");

  var code;
  code  = '(function(){\n';
  code += '   if(typeof '+value_fsm_name+' !== undefined && '+value_fsm_name+' != undefined){\n';
  if(checkbox_initial){
    code += ' '+value_fsm_name+'.currentState = '+value_fsm_state+';\n';
  }
  code += '   '+value_fsm_name+'.'+value_fsm_state.replaceAll("'","")+' = function(){\n';
  code += '   var clauses = '+value_fsm_clauses+';\n';  
  code += '   var checkResult = '+value_fsm_check+'();\n';
  code += '   var nextState = null;\n';
  code += '   for(var i = 0; i < clauses.length; i++){\n';
  code += '     if(checkResult == clauses[i][0]){\n';
  code += '       try{\n';
  code += '         window[clauses[i][1]]();\n';
  code += '       }catch(e){}\n';
  code += '       nextState = clauses[i][2];\n';
  code += '       break;\n';
  code += '     }\n';
  code += '   }\n';
  code += '   if(nextState != null){'+value_fsm_name+'.currentState = nextState;}\n';
  code += '  };\n';
  code += '}\n';
  code += '})();\n';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};
//////////////////////////////////////////////////////////////////////
Blockly.Blocks['fsm_clause'] = {
  init: function() {
    this.appendValueInput("clause_value")
        .setCheck(null)
        .appendField("ON");
    this.appendValueInput("clause_action")
        .setCheck(null)
        .appendField("DO");
    this.appendValueInput("clause_next_State")
        .setCheck(null)
        .appendField("NEXT");
    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(345);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.JavaScript['fsm_clause'] = function(block) {
  var value_clause_value = Blockly.JavaScript.valueToCode(block, 'clause_value', Blockly.JavaScript.ORDER_ATOMIC);
  var value_clause_action = Blockly.JavaScript.valueToCode(block, 'clause_action', Blockly.JavaScript.ORDER_ATOMIC);
  var value_clause_next_state = Blockly.JavaScript.valueToCode(block, 'clause_next_State', Blockly.JavaScript.ORDER_ATOMIC);
  var code = '['+value_clause_value+','+value_clause_action+','+value_clause_next_state+']';
  return [code, Blockly.JavaScript.ORDER_NONE];
};
//////////////////////////////////////////////////////////////////////

Blockly.Blocks['event_block'] = {
  init: function() {
    this.appendValueInput("event")
        .setCheck("String")
        .appendField("ON EVENT:");
    this.appendValueInput("action")
        .setCheck("String")
        .appendField("DO:");
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.JavaScript['event_block'] = function(block) {
  var value_event = Blockly.JavaScript.valueToCode(block, 'event', Blockly.JavaScript.ORDER_ATOMIC);
  var value_action = Blockly.JavaScript.valueToCode(block, 'action', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = '...;\n';
  return code;
};
//////////////////////////////////////////////////////////////////////

/*
function createBlockWithImage(aBlockName , anImageUrl, width, height ){
  Blockly.Blocks[aBlockName] = {
  init: function() {
      this.appendDummyInput()
          .appendField(new Blockly.FieldImage(anImageUrl, width, height, "*"));
      this.setOutput(true, null);
      this.setTooltip('');
    }
  };
}

var blocksInfo = [['skull','skull.png']];
for(var i = 0; i < blocksInfo.length; i++){
  createBlockWithImage('block_image_'+blocksInfo[i][0],'icons/'+blocksInfo[i][1],150,150);
}
var xml = document.getElementById('toolbox');
var category = '<category name="ICON BLOCKS">';
for(var i = 0; i < blocksInfo.length; i++){
  category += '<block type="block_image_'+blocksInfo[i][0]+'"></block>';
}
category += '</category>';

var dom = new DOMParser().parseFromString(category, "text/xml").firstChild;
xml.appendChild(dom);
Blockly.getMainWorkspace().updateToolbox(xml);
*/
