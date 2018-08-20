var sccm = new SCFile('sccmSoftware');
var device = new SCFile('device');
var deviceQ = device.doSelect('type="soft"');
var query = sccm.doSelect('ProductName00="'+device['ci.name']+'"');
	if(query == RC_SUCCESS){
		do{
			sccm['status'] = 'Update';
			print('ok');
			var rc = sccm.doUpdate();
		}
	}
