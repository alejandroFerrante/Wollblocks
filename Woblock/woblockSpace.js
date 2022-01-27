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


var sceneErrorLog;
var sceneErrorsFound;
var sceneSteps;
var sceneAlertErrors;

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

function mappinInfoComplete(aMappingInfo){
	return (aMappingInfo.icon != undefined && aMappingInfo.icon != null && aMappingInfo.icon != '');
}

function ObjectsAndBehavioursAsBlocks(){
	//var defaultIcon = 'icons/Circle.png';	
	var paramsMappings;
	var valueMappings;
	var params;

	for(var i = 0; i < definedObjectXmlContent.length; i++ ){
		//if mapping complete
		if(mappinInfoComplete(definedObjectsMappingInfo[i])){
			paramsMappings = [];
			valueMappings = [];
			params = [];
			for (var key in definedObjectsMappingInfo[i].replacements) { 
				if(definedObjectsMappingInfo[i].replacements[key].type == 'value' || definedObjectsMappingInfo[i].replacements[key].type == 'param'){
					params.push(''+key);
					if(definedObjectsMappingInfo[i].replacements[key].type == 'value'){valueMappings.push({k:''+key , v:definedObjectsMappingInfo[i].replacements[key].val });}
					if(definedObjectsMappingInfo[i].replacements[key].type == 'param'){paramsMappings.push({k:''+key , v:definedObjectsMappingInfo[i].replacements[key].val });}

				}
			}
			createAliasXML(definedObjectNames[i],definedObjectsMappingInfo[i].icon,document.getElementById('mapping_color').value,params,paramsMappings,valueMappings, definedObjectXmlContent[i].join(' </br> '), 'obj' );
		}
	}

	for(var i = 0; i < definedBehaviourXmlContent.length; i++ ){
		//if mapping complete
		if(mappinInfoComplete(definedBehavioursMappingInfo[i])){
			paramsMappings = [];
			valueMappings = [];
			params = [];
			for (var key in definedBehavioursMappingInfo[i].replacements) { 
				if(definedBehavioursMappingInfo[i].replacements[key].type == 'value' || definedBehavioursMappingInfo[i].replacements[key].type == 'param'){
					params.push(''+key);
					if(definedBehavioursMappingInfo[i].replacements[key].type == 'value'){valueMappings.push({k:''+key , v:definedBehavioursMappingInfo[i].replacements[key].val });}
					if(definedBehavioursMappingInfo[i].replacements[key].type == 'param'){paramsMappings.push({k:''+key , v:definedBehavioursMappingInfo[i].replacements[key].val });}

				}
			}
			createAliasXML(definedBehaviourNames[i],definedBehavioursMappingInfo[i].icon,document.getElementById('mapping_color').value,params,paramsMappings,valueMappings, definedBehaviourXmlContent[i].join(' '),'bh' );
		}
	}

}

function getAllUnasignedValuesFrom(aString){
	regexp = /__(.*?)__(.*?)__/g;
	var match = aString.match(regexp);
	if(aString.match(regexp) != undefined && aString.match(regexp) != null){ 
		return  match.filter(function(item, pos, self) {return self.indexOf(item) == pos;});
	}else{
		return [];
	}
}

function createAliasXML(aliasBlockName, aliasBlockIconURL, aColor, paramsList, paramsReplacements, constantReplacements, innerBlockXML, type){
  
  //REGISTER BLOCK
  var functionString = ''; 
  functionString += 'Blockly.Blocks[\''+aliasBlockName+'\'] = {\n';
  functionString += ' init: function() {\n';
  functionString += 'this.appendDummyInput().appendField("'+aliasBlockName+'");';
  functionString += '   this.appendDummyInput().appendField(new Blockly.FieldImage(\''+aliasBlockIconURL+'\', 50, 50, "*"));\n';
  for(var i = 0; i < paramsList.length; i++){
    functionString += '   this.appendValueInput("'+paramsList[i]+'").setCheck(null);\n';
  }
  functionString += '   this.setTooltip(\'\' );\n';
  functionString += '   this.setMutator(new Blockly.Mutator(""));\n';
  functionString += '   this.setColour(\''+aColor+'\');';
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

  functionString += ' updateShape_ : function() {},\n';

  functionString += ' getMetaInfo:function(self){\n';
  if(type == 'obj'){
  	functionString += '	return {obj:\''+aliasBlockName+'\', method:null};	';
  }else if(type == 'bh'){
	functionString += '	return {method:{name:\''+aliasBlockName+'\' , paramsAmount: '+paramsList.length+'}, obj:null};	';
  }else{
  	functionString += '	return {method:null, obj:null};	';
  }
  functionString += ' }\n';
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


function getAllMethodsOfObject(anObject){
	var result = [];
	for(var propt in anObject){
	    if(typeof propt === 'function'){
	    	result.push(propt);
	    }
	    //console.log(propt + ': ' + obj[propt]);
	}
}

function getAllParentlessObjects(){
	var nodes = getWorkspaceXmlContentAsList();
	var ids = [];for(var i = 0; i < nodes.length; i++){ids.push(nodes[i].id);}

	var blocks = workspace.getAllBlocks();
	var result = [];
	for(var i = 0; i < blocks.length; i++ ){
		if(ids.includes(blocks[i].id)){
			result.push(blocks[i]);
		}
	}
	//TODO ORDER BY block.getRelativeToSurfaceXY().y
	result = result.sort(function(a,b){
		return a.getRelativeToSurfaceXY().y - b.getRelativeToSurfaceXY().y
	});
	return result;
}

function getSceneExecution(alertErrors){
	sceneAlertErrors = alertErrors;

	var objs = getAllParentlessObjects();
	var res;
	var partialMetaInfo;
	var metaInfo;
	var strsToEval = [];
	sceneErrorsFound = false;
	sceneErrorLog = '';
	sceneSteps = [];

	for(var i = 0; i < objs.length && !sceneErrorsFound; i++){
		if(Blockly.JavaScript[ objs[i].type ] != undefined){
			
			if(objs[i].type == 'executor'){
				//colllect meta info
				partialMetaInfo = {objects:[],methods:{}};
				for(var j = 0; j < i; j++){
					if(objs[j].type == 'action_start'){
						
						if(objs[j].getNextBlock() != null && objs[j].getNextBlock().type == 'method_create'){
							metaInfo = Blockly.Blocks['method_create'].getMetaInfo(objs[j].getNextBlock());
							if(metaInfo.method.name != null && metaInfo.method.paramsAmount != null){
								partialMetaInfo.methods[metaInfo.method.name] = metaInfo.method.paramsAmount;
							}
						}

						if(objs[j].getNextBlock() != null && objs[j].getNextBlock().type == 'objetc_create'){ 
							metaInfo = Blockly.Blocks['objetc_create'].getMetaInfo(objs[j].getNextBlock());
							if(metaInfo.obj != null){
								partialMetaInfo.objects.push(metaInfo.obj);
							}
						}
					}else if(definedObjectNames.includes(objs[j].type)){
						metaInfo = Blockly.Blocks[objs[j].type].getMetaInfo(objs[j]);
						if(metaInfo.obj != null){
							partialMetaInfo.objects.push(metaInfo.obj);
						}

					}else if(definedBehaviourNames.includes(objs[j].type)){
						metaInfo = Blockly.Blocks[objs[j].type].getMetaInfo(objs[j]);
						if(metaInfo.method.name != null && metaInfo.method.paramsAmount != null){
							partialMetaInfo.methods[metaInfo.method.name] = metaInfo.method.paramsAmount;
						}
					}
				}

				res = Blockly.JavaScript['executor'](objs[i],partialMetaInfo);
				//DETECT ERROR
				if(typeof res === 'string'){
					//console.log(res);
					strsToEval.push(res);
				}else{
					break;
					sceneErrorsFound = true;
				}

			}else{
				res = Blockly.JavaScript[ objs[i].type ](objs[i]);
				if(typeof res === 'string'){
					//console.log(res);
					strsToEval.push(res);
				}
			}
		}
	}
	sceneSteps = strsToEval;
}

function doPlayScene(alertErrors){
	getSceneExecution(alertErrors);
	if(sceneErrorsFound){
		///
	}else{
		for(var i = 0; i < sceneSteps.length; i++){
			eval(sceneSteps[i]);
		}
	} 
}