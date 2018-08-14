function updSoft(id){
	var _lng = system.functions.lng;
	var _ins = system.functions.insert;
	var _op = system.functions.operator;
	var _date = system.functions.tod;
	var _val = system.functions.val;
		var sccm = new SCFile('sccmSoftware');
		var pc = new SCFile('device');
		var soft = new SCFile('device');
		var cir = new SCFile('cirelationship');
		var sQuery,dQuery,softQuery;
		sQuery = sccm.doSelect('SerialNumber0="'+id+'"');
		dQuery = pc.doSelect('serial.no.="'+id+'"');
		softQuery = soft.doSelect('logical.name="'+sccm['ProductName00']+'"');
		cir['logical.name'] = pc['logical.name'];
		cir['related.cis'] = _ins(cir['related.cis'],0,1,soft['logical.name']);
		cir['relationship.type'] = 'Logical';
		cir['relationship.subtype'] ='Includes';
		sccm['wasUpdated'] = true;
		sccm['dateUpdated'] = _tod();
		sccm['operUpdated'] = _op();
		sccm['status'] = "Обновлено " +_tod() +" "+_op();
		var rcc = sccm.doUpdate();
		var rc = cir.doInsert();
}
