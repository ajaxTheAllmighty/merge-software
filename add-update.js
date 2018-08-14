function addLink(id){
	print(id);
	var file = new SCFile('device');
	file['type'] = 'pc';
	var sccm = new SCFile('sccmHardware');
	var query = sccm.doSelect('ResourceID='+id+'');
		print(system.functions.contents(sccm));
		file['serial.no.'] = sccm['SerialNumber0'];
		file['vendor'] = sccm['Manufacturer00'];
		file['model'] = sccm['Model00'];
		file['ci.name'] = sccm['Name00'];
		file['users'].push(sccm['UserName00']);
		file['processors.model'] = sccm['ProcName00'];
		file['processors.cores'] = sccm['NumberOfCores00'];
		file['processors.proc'] = sccm['NumberOfLogicalProcessors00'];
		file['ip.address'] = sccm['IPAddress00'];
		file['mac.address'] = sccm['MACAddress00'];
		file['hdd.capacity'] = sccm['Size00'];
		print(system.functions.contents(sccm));
		print(system.functions.contents(file));
	return file;
}
// старый код из harware add
