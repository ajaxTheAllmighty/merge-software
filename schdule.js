function setSoftwareStatusSchedule(){
 var expiration =  new XMLDate(new XMLDate(new Date()).addDuration('PT1M')).JSDate()
 var schedule = new SCFile("schedule");
	schedule.expiration = expiration;
	schedule._class = lib.DDCinteroperabilityHelpers.getScheduleClass();
	schedule["name"] = "Set software status";
	schedule["javascript"] = 'lib.sccmtocmdbutils.setSoftwareStatus';
	if ( schedule.doInsert() == RC_SUCCESS){
		return true;
	}
}

function setHardwareStatusSchedule(){
 var expiration =  new XMLDate(new XMLDate(new Date()).addDuration('PT1M')).JSDate()
 var schedule = new SCFile("schedule");
	schedule.expiration = expiration;
	schedule._class = lib.DDCinteroperabilityHelpers.getScheduleClass();
	schedule["name"] = "Set hardware status";
	schedule["javascript"] = 'lib.sccmtocmdbutils.setHarwareStatus';
	if ( schedule.doInsert() == RC_SUCCESS){
		return true;
	}
}
