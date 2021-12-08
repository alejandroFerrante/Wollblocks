var toolbox;
var workspace
var tabsXmlContent;
var tabIndex = 0;
var globals = [];

function spaceInit(){
	tabsXmlContent = [];
	tabsXmlContent.push({name:'Scene',content:[]});
	tabsXmlContent.push({name:'Playground',content:[]});

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