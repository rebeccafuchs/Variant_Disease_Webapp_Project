var couchdb = 'http://localhost:5984/';
var disdatabase = 'disease';

function wsurld(request) {
  return couchdb + disdatabase + request;
};

var skip = 0;
var page = 10;
var sort = [{"_id": "asc"}]
var term = "";
function keypressd(ele,event) {
   term = ele.value;
   skiptozerodis();
   return true;
};

function changed(ele) {
	term = ele.value;
	skiptozerodis();
}

function addtoskipdis(value) {
   skip += value;
   renderdiseases();
}

function skiptozerodis() {
   skip =  0;
   renderdiseases();
}
function getaccession1(doc,withlink=true){
	var dbSNPaccession= "";
	if (withlink) {
		dbSNPaccession += "<A href=\"#\" onclick=\"renderprotein(this.text);\">";
	}
	dbSNPaccession += doc.dbSNPaccession;
	if (withlink) {
		dbSNPaccession += "</A></td>";
	}
	return dbSNPaccession;
}

function getomim1(doc,withlink=true){
	var omim= "";
	if (withlink) {
		omim += "<A href=\"#\" onclick=\"renderdisease(this.text);\">";
	}
	omim += doc.omim;
	if (withlink) {
		omim += "</A></td>";
	}
	return omim;
}

function getgene1(doc){
  console.log(doc);
	var GeneName = "";
  GeneName += doc.GeneName;
	
	return GeneName;
}



function getpref(doc){
  console.log(doc);
	var preferredTitle = "";
  preferredTitle += doc.preferredTitle;
	
	return preferredTitle;
}
function getid1(doc){
	return doc.id;
}

function sorttabledis(header) {
	var thekey = "_id";
	if (header.innerHTML == "omim") {
	    thekey = "omim";
	} else if (header.innerHTML == "GeneName") {
	    thekey = "GeneName";
	} else if (header.innerHTML == "preferredTitle") {
	    thekey = "preferredTitle";
	} 
	if (sort.length == 0 || sort[0][thekey] != "asc") {
		sort = [{[thekey]: "asc"}];
	} else {
		sort = [{[thekey]: "desc"}];
	}
	skiptozerodis();
}
function renderdiseases() {
  var criteria = {"selector": {}, "sort": sort, "limit": (page+1), "skip": skip};
  if (term != "") {
	var caseinsensitiveterm = "(?i)"+term;
	criteria["selector"] = {"$or": [{"dbSNPaccession": {"$regex": caseinsensitiveterm}},
	                                {"GeneName": {"$regex": caseinsensitiveterm}},
									                {"preferredTitle": {"$regex": caseinsensitiveterm}},
								   ]};
  }
  json_ws_post(wsurld('/_find'),criteria,function(data) {
    var table = "<table>";
	table += '<tr>';

	table += '<th width="120px;" onclick="sorttabledis(this);">Index Disease</th>';
	table += '<th width="120px;" onclick="sorttabledis(this);">omim</th>';
		//table += '<th>ID</th>';
	table += '<th width="100px;" onclick="sorttabledis(this);">GeneName</th>';
		table += '<th width="100px;" onclick="sorttabledis(this);">preferredTitle</th>';


	table += '</tr>';	
	for (var i = 0; i < Math.min(data.docs.length,page); i++ ) {
	  table += "<tr valign=\"top\">";
	  table += "<td width=\"50px;\">";
	  table += i+1+skip;
	  table += "</td>";
	  table += "<td width=\"120px;\">";
	  table += getomim1(data.docs[i],true);
    table += "</td>";
	  //table += "<td>";
	  //table += getid(data.docs[i]);
	  //table += "</td>";
	  table += "<td width=\"100px;\">";
	  table += getgene1(data.docs[i]);
	  table += "</td>";
	  table += "<td width=\"100px;\">";
	  table += getpref(data.docs[i]);
	  table += "</td>";

	  table += "</tr>";
	}
	table += "</table>";
	table += "<div style=\"float:right;\"><P>";
	var needsep = false;
	if (skip > 0) {
	  table += "<A href=\"#\" onclick=\"skiptozerodis();\">Beginning</A>"; 
	  table += " - <A href=\"#\" onclick=\"addtoskipdis(-page);\">Previous</A>";
	  needsep = true;
	}
	if (data.docs.length > page) {
	  if (needsep) {
		table += " - ";
	  }
	  table += "<A href=\"#\" onclick=\"addtoskipdis(page);\">Next</A>";
   	}
	table += "</P></div>"
    document.getElementById('container').innerHTML = table;
	document.getElementById('search').className = "show";
  });
  return true;
}

function renderdisease(omim) {
  var criteria = {"selector": {"omim": parseInt(omim)}, "limit": 1};
  console.log(criteria);
  json_ws_post(wsurld('/_find'),criteria,function(data) {
	//console.log(data);
    var table = "<table>";
	table += "<tr><th>omim</th><td>";
	table += getomim1(data.docs[0],false);
	table += "<tr><th>dbSNPaccession</th><td>";
	table += getaccession1(data.docs[0],false);
	table += "<tr><th>preferredTitle</th><td>";
	table += getpref(data.docs[0]);

	table += "</td></tr>";
    table += "</td></tr>"

	table += "</table>";
	table += "<P align=\"right\"><A href=\"#\" onclick=\"renderdiseases();\">Return</A></P>"
    document.getElementById('container').innerHTML = table;
	document.getElementById('search').classname = "show";
  });
}

// //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var protdatabase = 'proteins';

function wsurl(request) {
  return couchdb + protdatabase + request;
};

var skip = 0;
var page = 10;
var sort = [{"_id": "asc"}]
var term = "";
function keypressp(ele,event) {
   term = ele.value;
   skiptozerop();
   return true;
};

function changep(ele) {
	term = ele.value;
	skiptozerop();
}

function addtoskip(value) {
   skip += value;
   renderproteins();
}

function skiptozerop() {
   skip =  0;
   renderproteins();
}
function getgene3(doc,withlink=true){
	var GeneName= "";
	if (withlink) {
		GeneName += "<A href=\"#\" onclick=\"renderprotein(this.text);\">";
	}
	GeneName += doc.GeneName;
	if (withlink) {
		GeneName += "</A></td>";
	}
	return GeneName;
}
function getomim4(doc){
  console.log(doc);
	var omim = "";
  omim += doc.omim;
	
	return omim;
}
function getgeneaccession(doc){
  console.log(doc);
	var Gene_Accession = "";
  Gene_Accession += doc.Gene_Accession;
	
	return Gene_Accession;
}
function getaccession3(doc){
  console.log(doc);
	var dbSNPaccession = "";
  dbSNPaccession += doc.dbSNPaccession;
	
	return dbSNPaccession;
}

function getid(doc){
	return doc.id;
}

function sorttableprot(header) {
	var thekey = "_id";
	if (header.innerHTML == "Gene_Accession") {
	    thekey = "Gene_Accession";
	} else if (header.innerHTML == "GeneName") {
	    thekey = "GeneName";
	} else if (header.omim == "omim") {
		thekey = "omim";
	} 
	if (sort.length == 0 || sort[0][thekey] != "asc") {
		sort = [{[thekey]: "asc"}];
	} else {
		sort = [{[thekey]: "desc"}];
	}
	skiptozerop();
}
function renderproteins() {
  var criteria = {"selector": {}, "sort": sort, "limit": (page+1), "skip": skip};
  if (term != "") {
	var caseinsensitiveterm = "(?i)"+term;
	criteria["selector"] = {"$or": [{"Gene_Accession": {"$regex": caseinsensitiveterm}},
	                               {"GeneName": {"$regex": caseinsensitiveterm}},
									
								   ]};
  }
  json_ws_post(wsurl('/_find'),criteria,function(data) {
    var table = "<table>";
	table += '<tr>';

	table += '<th width="120px;" onclick="sorttableprot(this);">Index Proteins</th>';
		//table += '<th>ID</th>';
	table += '<th width="100px;" onclick="sorttableprot(this);">GeneName</th>';
		table += '<th width="120px;" onclick="sorttableprot(this);">Gene_Accession</th>';
	table += '</tr>';	
	for (var i = 0; i < Math.min(data.docs.length,page); i++ ) {
	  table += "<tr valign=\"top\">";
	  table += "<td width=\"50px;\">";
	  table += i+1+skip;
	  table += "</td>";

   
	  //table += "<td>";
	  //table += getid(data.docs[i]);
	  //table += "</td>";
	  table += "<td width=\"100px;\">";
	  table += getgene3(data.docs[i]);
	  table += "</td>";
	  table += "<td width=\"120px;\">";
	  table += getgeneaccession(data.docs[i],true);
	  table += "</td>";

	  table += "</tr>";
	}
	table += "</table>";
	table += "<div style=\"float:right;\"><P>";
	var needsep = false;
	if (skip > 0) {
	  table += "<A href=\"#\" onclick=\"skiptozerop();\">Beginning</A>"; 
	  table += " - <A href=\"#\" onclick=\"addtoskip(-page);\">Previous</A>";
	  needsep = true;
	}
	if (data.docs.length > page) {
	  if (needsep) {
		table += " - ";
	  }
	  table += "<A href=\"#\" onclick=\"addtoskip(page);\">Next</A>";
   	}
	table += "</P></div>"
    document.getElementById('container').innerHTML = table;
	document.getElementById('search').className = "show";
  });
  return true;
}

function renderprotein(GeneName) {
  var criteria = {"selector": {"GeneName": (GeneName)}, "limit": 1};
  console.log(criteria);
  json_ws_post(wsurl('/_find'),criteria,function(data) {
	//console.log(data);
    var table = "<table>";


 		table += "<tr><th>GeneName</th><td>";
	  table += getgene3(data.docs[0],false); 
	  table += "<tr><th>omim</th><td>";
	  table += getomim4(data.docs[0]); 
	  table += "<tr><th>Gene_Accession</th><td>";
	  table += getgeneaccession(data.docs[0]); 
	  table += "<tr><th>dnbSNPaccession</th><td>";
	  table += getaccession3(data.docs[0]); 
    table += "</td></tr>"
    table += "</td></tr>"

	table += "</table>";
	table += "<P align=\"right\"><A href=\"#\" onclick=\"renderproteins();\">Return</A></P>"
    document.getElementById('container').innerHTML = table;
	document.getElementById('search').classname = "hide";
  });
}

// //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////




var couchdb = 'http://localhost:5984/';
var snpdatabase = 'dbsnptxt';

function wsurls(request) {
  return couchdb + snpdatabase + request;
};

var skip = 0;
var page = 10;
var sort = [{"_id": "asc"}]
var term = "";
function keypresss(ele,event) {
   term = ele.value;
   skiptozerosnp();
   return true;
};

function changes(ele) {
	term = ele.value;
	skiptozerosnp();
}

function addtoskipsnp(value) {
   skip += value;
   rendersnps();
}
function getsource(doc){
  console.log(doc);
	var source = "";
  source += doc.source;
	
	return source;
}
function getwt(doc){
  console.log(doc);
	var wt = "";
  wt += doc.wt;
	
	return wt;
}
function getcov(doc){
  console.log(doc);
	var cov_nuc = "";
  cov_nuc += doc.cov_nuc;
	
	return cov_nuc;
}
function skiptozerosnp() {
   skip =  0;
   rendersnps();
}
function getaccession(doc,withlink=true){
	var dbSNPaccession= "";
	if (withlink) {
		dbSNPaccession += "<A href=\"#\" onclick=\"rendersnp(this.text);\">";
	}
	dbSNPaccession += doc.dbSNPaccession;
	if (withlink) {
		dbSNPaccession += "</A></td>";
	}
	return dbSNPaccession;
}


function getfreq(doc){
  console.log(doc);
	var Frequency = "";
  Frequency += doc.Frequency;
	
	return parseInt(Frequency);
}

function getid(doc){
	return doc.id;
}

function sorttable(header) {
	var thekey = "_id";
	if (header.innerHTML == "dbSNPaccession") {
	    thekey = "dbSNPaccession";
	} else if (header.innerHTML == "source") {
	    thekey = "source";
	} else if (header.innerHTML == "Frequency") {
		thekey = "Frequency";
	} 
	if (sort.length == 0 || sort[0][thekey] != "asc") {
		sort = [{[thekey]: "asc"}];
	} else {
		sort = [{[thekey]: "desc"}];
	}
	skiptozerosnp();
}
function rendersnps() {
  var criteria = {"selector": {}, "sort": sort, "limit": (page+1), "skip": skip};
  if (term != "") {
	var caseinsensitiveterm = "(?i)"+term;
	criteria["selector"] = {"$or": [{"dbSNPaccession": {"$regex": caseinsensitiveterm}},
	                                 {"source": {"$regex": caseinsensitiveterm}},
									
								   ]};
  }
  json_ws_post(wsurls('/_find'),criteria,function(data) {
    var table = "<table>";
	table += '<tr>';

	table += '<th width="120px;" onclick="sorttable(this);">Index SNPs</th>';
	table += '<th width="120px;" onclick="sorttable(this);">dbSNPaccession</th>';
		//table += '<th>ID</th>';
	table += '<th width="100px;" onclick="sorttable(this);">Frequency of Conversion</th>';
		table += '<th width="100px;" onclick="sorttable(this);">Source</th>';
	table += '</tr>';	
	for (var i = 0; i < Math.min(data.docs.length,page); i++ ) {
	  table += "<tr valign=\"top\">";
	  table += "<td width=\"50px;\">";
	  table += i+1+skip;
	  table += "</td>";
	  table += "<td width=\"120px;\">";
	  table += getaccession(data.docs[i],true);
    table += "</td>";
	  //table += "<td>";
	  //table += getid(data.docs[i]);
	  //table += "</td>";
	  table += "<td width=\"100px;\">";
	  table += getfreq(data.docs[i]);
	   table += "<td width=\"100px;\">";
	  table += getsource(data.docs[i]);

	  table += "</td>";

	  table += "</tr>";
	}
	table += "</table>";
	table += "<div style=\"float:right;\"><P>";
	var needsep = false;
	if (skip > 0) {
	  table += "<A href=\"#\" onclick=\"skiptozerosnp();\">Beginning</A>"; 
	  table += " - <A href=\"#\" onclick=\"addtoskipsnp(-page);\">Previous</A>";
	  needsep = true;
	}
	if (data.docs.length > page) {
	  if (needsep) {
		table += " - ";
	  }
	  table += "<A href=\"#\" onclick=\"addtoskipsnp(page);\">Next</A>";
   	}
	table += "</P></div>"
    document.getElementById('container').innerHTML = table;
	document.getElementById('search').className = "show";
  });
  return true;
}

function rendersnp(dbSNPaccession) {
  var criteria = {"selector": {"dbSNPaccession": parseInt(dbSNPaccession)}, "limit": 1};
  console.log(criteria);
  json_ws_post(wsurls('/_find'),criteria,function(data) {
	//console.log(data);
    var table = "<table>";
	table += "<tr><th>dbSNPaccession</th><td>";
	table += dbSNPaccession;
	table += "</td></tr>"; 
 		table += "<tr><th>Frequency of Conversion</th><td>";
	table += getfreq(data.docs[0]); 
	 	table += "<tr><th>Source</th><td>";
	table += getsource(data.docs[0]);
	table += "<tr><th>Wild type Nucleotide</th><td>";
	table += getwt(data.docs[0]);
		table += "<tr><th>Conversion Nucleotide</th><td>";
	table += getcov(data.docs[0]);
    table += "</td></tr>"
    table += "</td></tr>"

	table += "</table>";
	table += "<P align=\"right\"><A href=\"#\" onclick=\"rendersnps();\">Return</A></P>"
    document.getElementById('container').innerHTML = table;
	document.getElementById('search').classname = "hide";
  });
}
