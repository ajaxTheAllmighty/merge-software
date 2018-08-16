function addSoft(id){
	var file = new SCFile('device');
	var sccm = new SCFile('sccmSoftware');
	var sQ = sccm.doSelect('key="'+id+'"');
	file['ci.name'] = sccm['ProductName00'];
	file['type'] = 'soft';
	print('addsoft '+_conts(file));
	return file;
}
// TODO:  прикрутить механизм создания новой записи к sccmHardware 
