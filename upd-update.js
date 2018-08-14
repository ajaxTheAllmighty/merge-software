function updSoft(id){
	var _lng = system.functions.lng;
	var _ins = system.functions.insert;
	var _op = system.functions.operator;
	var _date = system.functions.tod;
	var _val = system.functions.val;
		var sccm = new SCFile('sccmSoftware');
		var device = new SCFile('device');
		var jsoft = new SCFile('joinsoft');
		var sQuery,dQuery,joinQuery;
		sQuery = sccm.doSelect('SerialNumber0="'+id+'"');
		dQuery = device.doSelect('serial.no.="'+id+'"');
		joinQuery = jsoft.doSelect('logical.name="'+device['logical.name']+'"');
		device['ci.name'] = sccm['ProductName00'];
		jsoft['ver.no'] = sccm['ProductVersion00'];
		sccm['wasUpdated'] = true;
		sccm['dateUpdated'] = _tod();
		sccm['operUpdated'] = _op();
		sccm['status'] = "Обновлено " +_tod() +" "+_op();
		var rc = device.doUpdate();
		var rrc = jsoft.doUpdate();
		var rcc = sccm.doUpdate();
}
