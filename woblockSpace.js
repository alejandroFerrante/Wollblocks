var toolbox;
var workspace
var definedObjectNames;
var definedBehaviourNames;
var definedObjectXmlContent;
var definedBehaviourXmlContent;
var sceneXmlContent;
var freeAreaXmlContent;
var currentTab;
var currentIndex;
var definedObjectsMappingInfo;
var definedBehavioursMappingInfo;

function spaceInit(){
	definedObjectNames = [];
	definedBehaviourNames = [];
	definedObjectXmlContent = [];
	definedBehaviourXmlContent = [];
	sceneXmlContent = [];
	freeAreaXmlContent = [];
	currentTab = 'Scene';
	currentIndex = -1;
	definedObjectsMappingInfo = [];
	definedBehavioursMappingInfo = [];

	var toolbox = document.getElementById("toolbox");
	 
	var options = { 
		toolbox : toolbox, 
		collapse : true, 
		comments : true, 
		disable : true, 
		maxBlocks : Infinity, 
		trashcan : true, 
		horizontalLayout : false, 
		toolboxPosition : 'start', 
		css : true, 
		media : 'https://blockly-demo.appspot.com/static/media/', 
		rtl : false, 
		scrollbars : true, 
		sounds : true, 
		oneBasedIndex : true
	};
	 
	/* Inject your workspace */ 
	//var workspace = Blockly.inject(/* TODO: Add ID of div to inject Blockly into */, options);
	workspace = Blockly.inject('blocklyDiv', options);
	/* Load Workspace Blocks from XML to workspace. Remove all code below if no blocks to load */
	 
	/* TODO: Change workspace blocks XML ID if necessary. Can export workspace blocks XML from Workspace Factory. */
	workspaceBlocks = document.getElementById('workspaceBlocks'); 
	 
	/* Load blocks to workspace. */
	Blockly.Xml.domToWorkspace(workspaceBlocks, workspace);

	loadWorkspaceConent(getMainToolboxXmlString());

}

function getJSCodeForCurrentWorkspace(){
	var generator = Blockly.JavaScript;
	var content = document.getElementById('blocklyDiv');
	//content.textContent = '';
	var code = '';
	if (checkAllGeneratorFunctionsDefined(generator)) {
	    code = generator.workspaceToCode(workspace);
	    //content.textContent = code;
	}
	return code;
}

function checkAllGeneratorFunctionsDefined(generator) {
  var blocks = workspace.getAllBlocks(false);
  var missingBlockGenerators = [];
  for (var i = 0; i < blocks.length; i++) {
    var blockType = blocks[i].type;
    if (!generator[blockType]) {
      if (missingBlockGenerators.indexOf(blockType) == -1) {
        missingBlockGenerators.push(blockType);
      }
    }
  }

  var valid = missingBlockGenerators.length == 0;
  if (!valid) {
    var msg = 'The generator code for the following blocks not specified for ' +
        generator.name_ + ':\n - ' + missingBlockGenerators.join('\n - ');
    Blockly.alert(msg);  // Assuming synchronous. No callback.
  }
  return valid;
}

function getWorkspaceXmlContentAsList(){
	return Blockly.Xml.workspaceToDom(workspace).childNodes;
}

function injectXmlToWorkspace(xmlContentList){
	workspace.clear();
	if(xmlContentList != undefined && xmlContentList != null && xmlContentList.length > 0){
		var xml;
		for(var i = 0; i < xmlContentList.length; i++){
			xml = jQuery.parseXML(xmlContentList[i]);
	    	Blockly.Xml.appendDomToWorkspace(xml,workspace);
		}
	}
}

function loadWorkspaceConent(stringXmlContent){
	document.getElementById('toolbox').innerHTML = stringXmlContent;
	workspace.updateToolbox(document.getElementById('toolbox'));
}

function ObjectsAndBehavioursAsBlocks(){
	var defaultIcon = 'icons/Circle.png';	
	for(var i = 0; i < definedObjectXmlContent.length; i++ ){
		createAliasXML(definedObjectNames[i],defaultIcon,[],[],[], definedObjectXmlContent[i].join(' </br> ') );
	}

	for(var i = 0; i < definedBehaviourXmlContent.length; i++ ){
		createAliasXML(definedBehaviourNames[i],defaultIcon,[],[],[], definedBehaviourXmlContent[i].join(' ') );
	}

}

function getAllUnasignedValuesFrom(aString){
	regexp = /__(.*?)__(.*?)__/g;
	return  aString.match(regexp).filter(function(item, pos, self) {return self.indexOf(item) == pos;});
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

 
  functionString = 'Blockly.getMainWorkspace().getToolbox().clearSelection();\n';

  eval(functionString);
}