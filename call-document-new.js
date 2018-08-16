function docnew_run(name,rec){
	var rteReturnValue = new SCDatum();
  	var rteNames = new SCDatum();
  	var rteVals = new SCDatum();
	rteNames.setType(8); //type array
	rteNames.push("file");        //Notification Name - INTO.NAME
	rteNames.push("name");      //Current File - INTO.FILE
	rteVals.setType(8);
	rteVals.push(rec); // Interaction Record
	rteVals.push(name);	//RuleSet Name //TODO: на текущий момент такого не существует
	system.functions.rtecall("callrad",rteReturnValue,"document.new",rteNames,rteVals,true); //false to run in the same thread, true to run in new one.
}
