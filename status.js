var sccm = new SCFile('sccmSoftware');
var device = new SCFile('device');
var deviceQ = device.doSelect('true');
var query = sccm.doSelect('ProductName00~="'+device['ci.name']+'"');
	if(query == RC_SUCCESS){
		do{
			sccm['status'] = 'add';
			var rc = sccm.doUpdate();
		}
	}
