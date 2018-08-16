function softwareAdd(){
	var sccm = new SCFile('sccmSoftware');
	var device = new SCFile('device');
	var join = new SCFile('joinsoft');
	var data = [];
	var sQuery,dQuery,joinQuery;
	var cnt = 0;
	var sCR = "\n";
	var sHtmlReturn = getCSS();
	sQuery = sccm.doSelect('key>"'+vars['$page']+'" and status="add"');
		do{
			dQuery = device.doSelect('type="soft" and ci.name="'+sccm['ProductName00']+'"');
			if(dQuery == RC_SUCCESS){
				joinQuery = join.doSelect('logical.name="'+device['logical.name']+'" and ver.no="'+sccm['ProductVersion00']+'"');
				if(joinQuery != RC_SUCCESS){
					data[cnt] = {name:sccm['ProductName00'],ver:sccm['ProductVersion00'],status:sccm['status'],key:sccm['key']};
					cnt++;
				}
			}
			else{
				data[cnt] = {name:sccm['ProductName00'],ver:sccm['ProductVersion00'],status:sccm['status'],key:sccm['key']};
				cnt++;
			}
			var rc = sccm.getNext();
			if (rc != RC_SUCCESS) cnt = 50;
		}while(cnt<50);
	sHtmlReturn += "<table class=\"main\">" + sCR;
	// Table header
	sHtmlReturn += "<tr><th><div tabindex=\"0\"> Test </div></th>"
	sHtmlReturn += "<th><div tabindex=\"0\"> Наименование ПО </div></th>"
	sHtmlReturn += "<th><div tabindex=\"0\"> Версия ПО </div></th>"
	sHtmlReturn += "<th><div tabindex=\"0\"> Статус </div></th>";
	for (var i =0; i<data.length; i++) {
		var sRowClass = i%2==0 ? "evenRow" : "oddRow";
			sHtmlReturn += "<tr>";
			 sHtmlReturn += "<td class=\""+sRowClass+"\" + text-align:center > <a href=\"scactivelink://sccmSoftware:"+data[i]['key']+"\">Добавить</a></td>";
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
