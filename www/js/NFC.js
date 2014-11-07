/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
onDeviceReady: function() {
    app.receivedEvent('deviceready');
	init_qr();
	


		
		

   
},
    // Update DOM on a Received Event
    receivedEvent: function(id) {
    }
};

	already_toggled=false;
			
			function toggle_transc(transc_id){		
				  requesturl=localStorage.getItem("IPADDRESS")+"rest/cs/promote?cust_id="+localStorage.getItem('cust_id')+"&transc_id="+transc_id;
				  $.ajax({url:requesturl,success:function(data){
				  
				  if (data.success==true){
				  	  alert("Thank You ! \nPoints Added: "+data.added+"\nCurrent Points: "+data.current);
	  
	  if (data.promote.length>1){
	  alert("Congratulation ! You are now "+data.promote+" membership Tier");
	  }
	  				window.location="index.html#login";
				  
				  }else{
	alert("ERROR:"+data.error);
	window.location="index.html#login";
	  
				  
				  }


	  
	  }});
			
			}
			
			function init_qr(){
			
			document.addEventListener("backbutton", function(e){
window.location="index.html";
}, false);

			
			if (!already_toggled){
				cordova.plugins.barcodeScanner.scan(
      function (result) {

	  toggle_transc(result.text);

	  
	  
          //alert("We got a barcode\n" +
            //    "Result: " + result.text + "\n" +
              //  "Format: " + result.format + "\n" +
                //"Cancelled: " + result.cancelled);
				

      }, 
      function (error) {
          alert("Scanning failed: " + error);
window.location="index.html";

      }
   );
   
   already_toggled=true;
   }
   

   
			
			
			
}
