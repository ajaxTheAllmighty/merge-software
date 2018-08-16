function softwareAdd(){
	var sccm = new SCFile('sccmSoftware');
	var device = new SCFile('device');
	var rel = new SCFile('cirelationship');
	var joinsoft = new SCFile('joinsoft');
	var data = [];
	var sQuery,dQuery,joinQuery;
	var cnt = 0;
	var pg;
	var sCR = "\n";
	var sHtmlReturn = getCSS();
	var les = 'Тут будет лес';
	sQuery = sccm.doSelect('status="'+'add'+'"');
	dQuery = device.doSelect('true');

	if(vars['$page']==null){
		do{
			if(sccm['ProductName00']!=device['ci.name']){
				var relqu = rel.doSelect('related.cis="'+sccm['ProductName00']+'"');
				data[cnt] = {name:sccm['ProductName00'],ver:sccm['ProductVersion00'],status:sccm['status'], pc:rel['logical.name']};
				cnt++;
				print(data[cnt]['name']);
			}
		}while(sccm.getNext() == RC_SUCCESS && device.getNext() == RC_SUCCESS && cnt<50);
	}
	else{
		print(vars['$page']);
		for(var i = vars['$page']; i < vars['$page'] + 50; i++){
			if(sccm['SerialNumber0']!=device['serial.no.']){
				var relqu = rel.doSelect('related.cis="'+sccm['ProductName00']+'"');
				data[i] = {name:sccm['ProductName00'],ver:sccm['ProductVersion00'],status:sccm['status'],pc:rel['logical.name']};
				pg = i;
				print(data[i]['name']);
				print(' добавление '+data[i]);
			}
		}
	}

	sHtmlReturn += "<table class=\"main\">" + sCR;
	// Table header
	sHtmlReturn += "<tr><th><div tabindex=\"0\"> Test </div></th>"
	sHtmlReturn += "<th><div tabindex=\"0\"> Наименование ПО </div></th>"
	sHtmlReturn += "<th><div tabindex=\"0\"> Версия ПО </div></th>"
	sHtmlReturn += "<th><div tabindex=\"0\"> Связаные КЕ ПК на которых найдено ПО </div></th>"
	sHtmlReturn += "<th><div tabindex=\"0\"> Статус </div></th>";
	for (var i =0; i<data.length; i++) {
		print(data[i]['name']);
		var sRowClass = i%2==0 ? "evenRow" : "oddRow";
			sHtmlReturn += "<tr>";
			 sHtmlReturn += "<td class=\""+sRowClass+"\" > <a href=\"scactivelink://sccmSoftware:"+data[i]['name']+"\">Добавить</a></td>";
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
			if(data[i]['pc']!=null){
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
	vars['$page']  = pg;
	return sHtmlReturn;
}
