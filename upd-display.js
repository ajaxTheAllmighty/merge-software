function softwareUpd(){
	var sccm = new SCFile('sccmSoftware');
	var device = new SCFile('device');
	var joinsoft = new SCFile('joinsoft');
	var pc = new SCFile('device');
	var relation = new SCFile('cirelationship');
	var data = [];
	var sQuery,dQuery,joinQuery;
	var query;
	var count;
	var f = new SCFile('sccmSoftware');
	var cnt = 0;
	var sCR = "\n";
	var sHtmlReturn = getCSS();
	var count = new SCFile('sccmSoftware').doCount('true');
	if(vars['$direction'] != 'back'){
		query = '(wasUpdated=NULL or wasUpdated=false) and status="Update" and key >"'+vars['$lastID']+'"';
	}
	else{
		if(vars['$page']>0){
			query = '(wasUpdated=NULL or wasUpdated=false) and status="Update" and key >"'+vars['$prevID'][_lng(vars['$prevID'])-2]+'" and key<"'+vars['$prevID'][_lng(vars['$prevID'])-1]+'"';
		}
		else {
			query = '(wasUpdated=NULL or wasUpdated=false) and status="Update" and key >"'+vars['$prevID'][_lng(vars['$prevID'])-2]+'" and key<"'+count+'"';
		}
	}
	sQuery = sccm.doSelect(query);
		if (vars['$direction'] != 'back') {
			vars['$prevID'] = _ins(vars['$prevID'],0,1,sccm['key']);
		} else {
			vars['$prevID'].pop();
		}
		do{
			dQuery = device.doSelect('ci.name="'+sccm['ProductName00']+'"');
			if(dQuery == RC_SUCCESS){
				//print('device ok')
				joinQuery = joinsoft.doSelect('logical.name="'+device['logical.name']+'" and ver.no="'+sccm['ProductVersion00']+'"');
				var rcrcr = pc.doSelect('serial.no.="'+sccm['SerialNumber0']+'"');
				var rel = relation.doSelect('logical.name="'+pc['logical.name']+'" and related.cis="'+sccm['ProductName00']+'"');
				if(joinQuery == RC_SUCCESS && rcrcr == RC_SUCCESS && rel != RC_SUCCESS){
					data[cnt] = {name:sccm['ProductName00'], ver:sccm['ProductVersion00'],key:sccm['key'], status:sccm['status']};
					cnt++;
					vars['$lastID'] = sccm['key'];
				}
			}
			var rc = sccm.getNext();
			if (rc != RC_SUCCESS){
				cnt = 10;
				vars['$endNext'] = false;
		 	}
		}while (cnt<10);

	sHtmlReturn += "<table class=\"main\">" + sCR;
	// Table header
	sHtmlReturn += "<tr><th><div tabindex=\"0\"> Test </div></th>"
	sHtmlReturn += "<th><div tabindex=\"0\"> Наименование ПО </div></th>"
	sHtmlReturn += "<th><div tabindex=\"0\"> Версия ПО </div></th>"
	sHtmlReturn += "<th><div tabindex=\"0\"> Статус </div></th>";
	sHtmlReturn += "<th><div tabindex=\"0\"> key </div></th>";
	for (var i =0; i<data.length; i++) {
		var sRowClass = i%2==0 ? "evenRow" : "oddRow";
			sHtmlReturn += "<tr>";
			 sHtmlReturn += "<td class=\""+sRowClass+"\" > <a href=\"scactivelink://sccmSoftware:"+data[i]['key']+"\">Обновить</a></td>";
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
			sHtmlReturn += "<td class=\""+sRowClass+"\" >"+data[i]['key']+"</td>"
			sHtmlReturn += "<tr>";
	}
	sHtmlReturn += "</table>" + sCR;
	return sHtmlReturn;
}
