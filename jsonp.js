(funciton(window,document){
	var JSONP=funciton(url,data,callback){
		var fnSuffix=Math.random().toString().replace(".","");
		var cbFunName="my_json_cb_"+fnSuffix;
		window[cbFunName]=callback;

	var querystring=url.indexOf("?")==-1?"?":"&";
	for(var key in data){
		querystring+=key+"="data[key]+"&";
	}
	querystring+="callback="+cbFunName;
	var scriptElement=document.createElement("script");
	scriptElement.src=url+querystring;
	document.body.appendChild(scriptElement);
	window.$jsonp=JSONP;
})()


