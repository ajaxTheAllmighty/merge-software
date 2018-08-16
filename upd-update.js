function updSoft(id){	//serial
	var _lng = system.functions.lng;
	var _ins = system.functions.insert;
	var _op = system.functions.operator;
	var _date = system.functions.tod;
	var _val = system.functions.val;
	var _tod = system.functions.tod;
	var sccm = new SCFile('sccmSoftware');
	var soft = new SCFile('device');
	var jsoft = new SCFile('joinsoft');
	var pc = new SCFile('device');
	var sts = new SCFile('INFIntegrationBufferSoft');
	var scQuery = sccm.doSelect('SerialNumber0="'+id+'"');
	var soQuery = soft.doSelect('ci.name="'+sccm['ProductName00']+'"');
	var pcQuery = pc.doSelect('serial.no.="'+id+'"');
	do{
		vars['$serial'] =
	}while (pc.getNext() == RC_SUCCESS)
}
