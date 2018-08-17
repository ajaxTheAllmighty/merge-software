function updSoft(id){
	var _lng = system.functions.lng;
	var _ins = system.functions.insert;
	var _op = system.functions.operator;
	var _date = system.functions.tod;
	var _val = system.functions.val;
		var sccm = new SCFile('sccmSoftware');
		var pc = new SCFile('device');
		var soft = new SCFile('device');
		var jsoft = new SCFile('joinsoft');
		var rel = new SCFile('cirelationship');
		var sQuery,dQuery,joinQuery,softQuery;
		sQuery = sccm.doSelect('key="'+id+'"');
		dQuery = pc.doSelect('serial.no.="'+sccm['SerialNumber0']+'"');
		softQuery = soft.doSelect('ci.name="'+sccm['ProductName00']+'"')
		joinQuery = jsoft.doSelect('logical.name="'+soft['logical.name']+'"');
		rel['logical.name'] = pc['logical.name'];
		rel['related.cis'] = _ins(rel['related.cis'],0,1,soft['logical.name']);
		rel['relationship.type'] = 'Logical';
		rel['relationship.subtype'] = 'Includes';
		var rc = rel.doInsert();
		if(rc== RC_SUCCESS){
			print('relation ok');
			sccm['wasUpdated'] = true;
			var rcc = sccm.doInsert();
		}
}
