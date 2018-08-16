function updSoft(id){	//serial
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
