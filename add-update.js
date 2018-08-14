function addLink(id){
	var soft = new SCFile('device');
	var pc new SCFile('device');
	var sccm = new SCFile('sccmHardware');
	var jsoft = new SCFile('joinsoft');
	var cir = new SCFile('cirelationship');
	var query = sccm.doSelect('SerialNumber0='+id+'');
	var pcquery = pc.doSelect('serial.no.="'+id+'"');
		soft['ci.name'] = sccm['ProductName00'];
		soft['type'] = 'soft';
		jsoft['ver.no'] = sccm['ProductVersion00'];
		cir['logical.name'] = pc['logical.name'];
		cir['related.cis'] = _ins(cir['related.cis'],0,1,soft('logical.name'));
		cir['relationship.type'] = 'Logical';
		cir['relationship.subtype'] ='Includes';
		var rc = soft.doInsert();
		var rrc = jsoft.doInsert();
		var rcc = cir.doInsert();
	return file;
}
// старый код из harware add
