function softwareUpd(){
	var sccm = new SCFile('sccmSoftware');
	var device = new SCFile('device');
	var joinsoft = new SCFile('joinsoft');
	var data = [];
	var sQuery,dQuery,joinQuery;
	var cnt = 0;
	var sCR = "\n";
	var sHtmlReturn = getCSS();
	sQuery = sccm.doSelect('wasUpdated~="true"');
	do{
		dQuery = device.doSelect('serial.no.="'+sccm['SerialNumber0']+'"');
		if(sccm['status']!='add'&& dQuery == RC_SUCCESS){
			data[cnt] = {name:sccm['ProductName00'],ver:sccm['ProductVersion00'],status:sccm['status'], pc:device['logical.name']};
			cnt++;
		}
	}while(sccm.getNext() == RC_SUCCESS && device.getNext() == RC_SUCCESS /*&& joinpc.getNext == RC_SUCCESS*/);
	sHtmlReturn += "<table class=\"main\">" + sCR;
	// Table header
	sHtmlReturn += "<tr><th><div tabindex=\"0\"> Test </div></th>"
	sHtmlReturn += "<th><div tabindex=\"0\"> Наименование ПО </div></th>"
	sHtmlReturn += "<th><div tabindex=\"0\"> Версия ПО </div></th>"
	sHtmlReturn += "<th><div tabindex=\"0\"> Связаные КЕ ПК на \n которых найдено ПО </div></th>"
	sHtmlReturn += "<th><div tabindex=\"0\"> Статус </div></th>";
	for (var i =0; i<data.length; i++) {
		var sRowClass = i%2==0 ? "evenRow" : "oddRow";
			sHtmlReturn += "<tr>";
			 sHtmlReturn += "<td class=\""+sRowClass+"\" > <a href=\"scactivelink://sccmSoftware:"+data[i]['ResourceID']+"\">Обновить</a></td>";
			if(data[i]['name']!=null){
				sHtmlReturn += "<td class=\""+sRowClass+"\" >"+data[i]['name']+"</td>";		//ResourceID
			}
			else{
				sHtmlReturn += "<td class=\""+sRowClass+"\" > </td>";
			}
			if(data[i]['ver']!=null){
				sHtmlReturn += "<td class=\""+sRowClass+"\" >"+data[i]['ver']+"</td>";	//SerialNumber0
			}
			else{
				sHtmlReturn += "<td class=\""+sRowClass+"\" > </td>";
			}
			if(les!=null){
				sHtmlReturn += "<td class=\""+sRowClass+"\" >"+ data[i]['pc'] +"</td>";	//Manufacturer00
			}
			else{
				sHtmlReturn += "<td class=\""+sRowClass+"\" > </td>";
			}
			if(data[i]['status']!=null){
				sHtmlReturn += "<td class=\""+sRowClass+"\" >"+data[i]['status']+"</td>";		//Model00
			}
			else{
				sHtmlReturn += "<td class=\""+sRowClass+"\" > </td>";
			}
			sHtmlReturn += "<tr>";
	}
	sHtmlReturn += "</table>" + sCR;
	return sHtmlReturn;
}
