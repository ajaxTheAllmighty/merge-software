function setSoftwareStatus(){
	var sccm = new SCFile('sccmSoftware');
	var device = new SCFile('device');
	var i=0;
	var deviceQ = device.doSelect('type="soft"');
	do{
		var query = sccm.doSelect('ProductName00="'+device['ci.name']+'"');
			sccm['status'] = 'Update';

			var rc = sccm.doUpdate();
			if(rc = RC_SUCCESS){
				i++;
			}
	}while(device.getNext() == RC_SUCCESS)

}


function setHardwareStatus(){
	var sccm = new SCFile('sccmHardware');
	var device = new SCFile('device');
	var deviceQ = device.doSelect('type="pc"');
	do{
		var query = sccm.doSelect('SerialNumber0="'+device['serial.no.']+'"');
			sccm['status'] = 'Update';
			var rc = sccm.doUpdate();
	}while(device.getNext() == RC_SUCCESS)
}
