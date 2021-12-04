
Blockly.Blocks['mutation_container'] = {
  init: function() {
    this.appendDummyInput()	  
		.appendField("Hello World");	  
    this.setNextStatement(true, null);
  }
};

Blockly.Blocks['mutation_test'] = {
  init: function() {
    this.appendValueInput("inputValue")
        .setCheck("Number");
    this.setInputsInline(true);		
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(100);
    this.updateShape_();    
    this.setMutator(new Blockly.Mutator(""));
  },
  mutationToDom: function (workspace) {
    var container = document.createElement('mutation');
    return container;
  },
  domToMutation: function (xmlElement) {
    this.updateShape_();	
  },
  decompose: function (workspace) {
    

    var containerBlock = workspace.newBlock('mutation_container');
    containerBlock.initSvg();
	
  	var myBlock1 = workspace.newBlock("controls_if");
  	myBlock1.initSvg();	
  	containerBlock.nextConnection.connect(myBlock1.previousConnection);
  	
  	var myBlock2 = workspace.newBlock("logic_compare");
  	myBlock2.initSvg();
  	myBlock2.setFieldValue("GT","OP");
  	myBlock1.getInput("IF0").connection.connect(myBlock2.outputConnection);
  	
  	var myBlock3 = workspace.newBlock("math_number");
  	myBlock3.initSvg();
  	myBlock2.getInput("B").connection.connect(myBlock3.outputConnection);
  	
  	if (this.getInputTargetBlock("inputValue")) {
  		var myBlock4 = workspace.newBlock(this.getInputTargetBlock("inputValue").type);
  		myBlock4.initSvg();
  		myBlock2.getInput("A").connection.connect(myBlock4.outputConnection);
  		if (this.getInputTargetBlock("inputValue").type=="math_number") {
  			myBlock4.setFieldValue(this.getInputTargetBlock("inputValue").getFieldValue("NUM"),"NUM");
  		}
  	}
  	
    return containerBlock;

  },
  compose: function(containerBlock) {	  
    this.updateShape_();	
  },
  saveConnections: function(containerBlock) {	
  },
  updateShape_: function() {
  }
};


Blockly.JavaScript['mutation_container'] = function(block) {
  
}


Blockly.JavaScript['mutation_test'] = function(block) {
  var numb = Blockly.JavaScript.valueToCode(block, 'inputValue', Blockly.JavaScript.ORDER_ATOMIC);
  var decomp = block.decompose(Blockly.getMainWorkspace());
  Blockly.JavaScript[decomp.type]();
}

Blockly.Blocks['printer'] = {
  init: function() {
    this.appendValueInput("header")
        .setCheck("String")
        .appendField("(header) ");
    this.appendValueInput("toPrint")
        .setCheck("String")
        .appendField(": (message) ");
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  },doActionJS: function(self, paramsMap){
    var value_header = paramsMap['header'];
    var value_toprint = paramsMap['toPrint'];

    var code = 'alert("';
    if(value_header != undefined && value_header != null && value_header != ''){
      code += value_header;
    }else{
      code += ' __printer___header__ ';
    }
    code += ' : ';
    if(value_toprint != undefined && value_toprint != null && value_toprint != ''){
      code += value_toprint;
    }else{
      code += ' __printer___toPrint__ ';
    }
    code += '");';
    return code;
  }
};

Blockly.JavaScript['printer'] = function(block) {
  var value_header = Blockly.JavaScript.valueToCode(block, 'header', Blockly.JavaScript.ORDER_ATOMIC);
  var value_toprint = Blockly.JavaScript.valueToCode(block, 'toPrint', Blockly.JavaScript.ORDER_ATOMIC);
  return Blockly.Blocks['printer'].doActionJS(block , {'header':value_header , 'toPrint':value_toprint});
};

Blockly.Blocks['goodLooking'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldImage("talk.png", 50, 50, "*"));
    this.appendValueInput("x")
        .setCheck(null);
    this.setTooltip('');
    this.setMutator(new Blockly.Mutator(""));
  }
};

Blockly.JavaScript['goodLooking'] = function(block) {
  var value_x = Blockly.JavaScript.valueToCode(block, 'x', Blockly.JavaScript.ORDER_ATOMIC).replaceAll("'","");
  var replacements = [];
  replacements.push({k:'__printer___header__', v:"say"});
  replacements.push({k:'__printer___toPrint__', v:value_x});

  var decomposed = block.decompose(Blockly.getMainWorkspace());
  var code = Blockly.JavaScript[decomposed.type](decomposed);
  decomposed.dispose();
  for(var i = 0; i < replacements.length; i++){
    code = code.replace(replacements[i].k , replacements[i].v);
  }
  //code = code.replace("__printer___header__","say").replaceAll("__printer___toPrint__",value_x);
  return code;
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function getBlockInputs(aBlock){
  var inputs = [];
  for(var i = 0; i < aBlock.inputList.length; i++){
      if(aBlock.inputList[i].name != ''){
          inputs.push(aBlock.inputList[i].name);
      }
  }
  return inputs;
}


function addIcon(aBlock,anImageURL , aHeight, aWidth){
  aBlock.appendDummyInput().appendField(new Blockly.FieldImage(anImageURL, aHeight, aWidth, "*"));
}

function addFields(aBlock , fieldNames){
  for(var i = 0; i < fialdNames.length; i++){
    aBlock.appendValueInput(fialdNames[i]).setCheck(null);
  }
}

function createAlias(aliasBlockName , innerBlockName){

  Blockly.Blocks[aliasBlockName].mutationToDom = function (workspace) {
    var container = document.createElement('mutation');
    return container;
  };

  Blockly.Blocks[aliasBlockName].domToMutation = function (xmlElement) {
    this.updateShape_();  
  };

  Blockly.Blocks[aliasBlockName].decompose = function (workspace) {
    containerBlock = workspace.newBlock(innerBlockName);
    containerBlock.initSvg();
    return containerBlock;
  };

  Blockly.Blocks[aliasBlockName].compose = function(containerBlock) {   
    this.updateShape_();  
  };

  Blockly.Blocks[aliasBlockName].saveConnections = function(containerBlock) {};
   
  Blockly.Blocks[aliasBlockName].updateShape_ = function() {};

}

function createAliasXML(aliasBlockName, aliasBlockIconURL, paramsList, paramsReplacements, constantReplacements, innerBlockXML){
  
  //REGISTER BLOCK
  var functionString = ''; 
  functionString += 'Blockly.Blocks[\''+aliasBlockName+'\'] = {\n';
  functionString += ' init: function() {\n';
  functionString += '   this.appendDummyInput().appendField(new Blockly.FieldImage(\''+aliasBlockIconURL+'\', 50, 50, "*"));\n';
  for(var i = 0; i < paramsList.length; i++){
    functionString += '   this.appendValueInput("'+paramsList[i]+'").setCheck(null);\n';
  }
  functionString += '   this.setTooltip(\'\');\n';
  functionString += '   this.setMutator(new Blockly.Mutator(""));\n';
  functionString += ' },\n';
  
  functionString += ' mutationToDom : function (workspace) {\n';
  functionString += '   var container = document.createElement(\'mutation\');\n';
  functionString += '   return container;\n';
  functionString += ' },\n';

  
  functionString += ' domToMutation : function (xmlElement) {\n';
  functionString += '   this.updateShape_();\n';
  functionString += ' },\n';

  functionString += ' decompose : function (workspace) {\n';
  //functionString += '   var containerBlock = workspace.newBlock(\'printer\');\n';////////////////////////////////////////////
  //functionString += '   containerBlock.initSvg();';
  //functionString += '   return containerBlock';
  
  functionString += '   var innerXml = \'<xml> '+innerBlockXML+' </xml>\';\n';
  functionString += '   var newBlockId = Blockly.Xml.domToWorkspace(Blockly.Xml.textToDom(innerXml), workspace)[0];\n';
  functionString += '   workspace.getBlockById(newBlockId).initSvg();';
  functionString += '   return workspace.getBlockById(newBlockId);';
  functionString += ' },\n';

  functionString += ' compose : function(containerBlock) {\n';
  functionString += '   this.updateShape_();\n';
  functionString += ' },\n';

  functionString += ' saveConnections : function(containerBlock) {},\n';

  functionString += ' updateShape_ : function() {}\n';

  functionString += '};';

  eval(functionString);
  //DEFINE JS BEHAVIOUR
  functionString = '';

  functionString += 'Blockly.JavaScript[\''+aliasBlockName+'\'] = function(block) {\n';
  functionString += '  var decomposed = block.decompose(Blockly.getMainWorkspace());\n';
  functionString += '  var replacements = [';
  for(var i = 0; i < constantReplacements.length; i++){
    if(i > 0){functionString += ',';}
    functionString += '{ k:\''+constantReplacements[i].k+'\' , v: '+constantReplacements[i].v+'}';
  }
  functionString +='];\n';
  for(var i = 0; i < paramsReplacements.length; i++){
    functionString += '   replacements.push({k:\''+paramsReplacements[i].k+'\' , v: Blockly.JavaScript.valueToCode(block, \''+paramsReplacements[i].v+'\', Blockly.JavaScript.ORDER_ATOMIC) });\n';
  }
  functionString += '  var code = Blockly.JavaScript[decomposed.type](decomposed);\n';
  functionString += '  decomposed.dispose();\n';
  functionString += '  for(var i = 0; i < replacements.length; i++){\n';
  functionString += '    code = code.replace(replacements[i].k , replacements[i].v);\n';
  functionString += '  }\n';
  functionString += '  return code;\n';
  functionString += '};\n';

  eval(functionString);

  //ADD TO CATEGORY
  functionString = 'var myWorkspace = Blockly.getMainWorkspace();\n';
  functionString += 'var xml = document.getElementById("toolbox");\n';
  functionString += 'var cat;\n';
  functionString += 'var categories = $(\'#toolbox\').find(\'category\'); \n';
  functionString += 'for(var i = 0; i < categories.length; i++){\n';
  functionString += '  if(categories[i].attributes[\'name\'].value == \'CUSTOM\' ){\n';
  functionString += '    cat = categories[i];\n';
  functionString += '    break;\n';
  functionString += '  }\n';
  functionString += '  \n';
  functionString += '}\n';
  functionString += 'if(cat != undefined && cat != null){\n';
  functionString += '  var xmlDoc = new DOMParser().parseFromString(\'<block type="'+aliasBlockName+'"></block>\', \'text/xml\');\n';
  functionString += '  cat.appendChild(xmlDoc.documentElement);\n';
  functionString += '  myWorkspace.updateToolbox(xml);\n';
  functionString += '  Blockly.getMainWorkspace().getToolbox().clearSelection();\n';
  functionString += '}\n';

  //functionString = 'var category = Blockly.getMainWorkspace().getToolbox().getToolboxItemById(\'custom\');\n';
  //functionString += 'var blockToSet = Blockly.getMainWorkspace().newBlock(\''+aliasBlockName+'\');\n';
  //functionString += 'category.getContents().push({kind:\'BLOCK\' , type:\''+aliasBlockName+'\' , blockxml: blockToSet });\n';
  
  functionString += 'Blockly.getMainWorkspace().getToolbox().clearSelection();\n';

  eval(functionString);
}

//createAliasXML('prettyPrinter', 'talk.png', ['message'], [{k:'__printer___toPrint__' , v: 'message'}], [{k:'__printer___header__' , v:'\'say\''}], '<xml><block type="printer"></block></xml>');

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


//createAlias('goodLooking' , 'printer')
/*
<block type="printer">
    <value name="header">
      <block type="text">
        <field name="TEXT">say</field>
      </block>
    </value>
  </block>
  <block type="goodLooking">
    <value name="x">
      <block type="text" >
        <field name="TEXT">HI</field>
      </block>
    </value>
  </block>
  */